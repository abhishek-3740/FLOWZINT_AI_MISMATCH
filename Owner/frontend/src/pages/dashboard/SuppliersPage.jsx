import { useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { suppliers as suppliersData } from "../../data/mockData";
import { getLocal, setLocal } from "../../utils/storage";
import { useToast } from "../../components/ui/Toast";

const categories = ["All", "Beverages", "Ingredients", "Kitchen"];

const statusStyle = {
  Preferred: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Watch: "bg-amber-50 text-amber-700 border-amber-200",
  Active: "bg-indigo-50 text-indigo-700 border-indigo-200"
};

export default function SuppliersPage() {
  const ref = useRef(null);
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState("details");
  const toast = useToast();
  const [supplierList, setSupplierList] = useState(() => getLocal("suppliers", suppliersData));
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);

  const handleSaveSupplier = (supplier) => {
    if (editing) {
      setSupplierList((cur) => cur.map((s) => (s.id === editing.id ? { ...s, ...supplier } : s)));
      toast.push(`Supplier ${supplier.name} updated`);
    } else {
      const newSupplier = { id: `SUP-${Date.now().toString().slice(-4)}`, ...supplier };
      setSupplierList((cur) => [newSupplier, ...cur]);
      toast.push(`Supplier ${supplier.name} added`);
    }
    setShowModal(false);
    setEditing(null);
  };

  const handleEditInitiate = (supplier) => {
    setEditing(supplier);
    setShowModal(true);
  };

  const handleDeleteSupplier = (id) => {
    setSupplierList((cur) => cur.filter((s) => s.id !== id));
    toast.push(`Supplier ${id} deleted`);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".supplier-card, .supplier-panel", {
        opacity: 0,
        y: 12,
        duration: 0.35,
        stagger: 0.06,
        ease: "power2.out"
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  const filtered = useMemo(() => {
    return supplierList.filter((supplier) => {
      const matchesCategory = category === "All" || supplier.category === category;
      const matchesSearch = supplier.name.toLowerCase().includes(search.toLowerCase()) ||
        supplier.products.some((product) => product.toLowerCase().includes(search.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [category, search, supplierList]);

  const handleAction = (label) => {
    toast.push(`${label} action is mocked locally in this frontend.`);
  };

  useEffect(() => {
    setLocal("suppliers", supplierList);
  }, [supplierList]);

  const defaultModal = {
    name: "",
    category: "Beverages",
    leadTime: "7 days",
    fillRate: 95,
    activeOrders: 0,
    rating: 4.5,
    email: "",
    phone: "",
    website: "#",
    products: "",
    status: "Active"
  };

  const [modalForm, setModalForm] = useState(defaultModal);

  useEffect(() => {
    if (editing) {
      setModalForm({ ...editing, products: (editing.products || []).join(", ") });
    } else {
      setModalForm(defaultModal);
    }
  }, [editing, showModal]);

  const viewButtonClass = (mode) =>
    `rounded-xl border px-3 py-2 text-xs font-semibold transition ${
      viewMode === mode ? "border-slate-900 bg-slate-900 text-white" : "border-slate-300 bg-white text-slate-600 hover:border-slate-400"
    }`;

  return (
    <section ref={ref} className="space-y-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-panel">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900">Supplier Management</h2>
          <p className="text-sm text-slate-500">Track supplier reliability, lead times, and direct reorder contacts.</p>
        </div>

        <div className="grid gap-3 md:grid-cols-[220px_220px]">
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search suppliers or products"
            className="rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none"
          />
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className="rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none"
          >
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center rounded-2xl border border-slate-200 bg-slate-50 p-1">
          <button type="button" onClick={() => setViewMode("cards")} className={viewButtonClass("cards")}>
            Cards
          </button>
          <button type="button" onClick={() => setViewMode("list")} className={viewButtonClass("list")}>
            List
          </button>
          <button type="button" onClick={() => setViewMode("details")} className={viewButtonClass("details")}>
            Details
          </button>
        </div>

        <div className="text-xs font-medium text-slate-500">
          {filtered.length} suppliers shown
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {categories.map((item) => (
          <button
            key={item}
            onClick={() => setCategory(item)}
            className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
              category === item
                ? "bg-slate-900 text-white"
                : "border border-slate-300 bg-white text-slate-600 hover:border-slate-400"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      {viewMode === "cards" ? (
        <div className="grid gap-4 lg:grid-cols-2">
          {filtered.map((supplier) => (
            <article key={supplier.id} className="supplier-card rounded-2xl border border-slate-200 p-5 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">{supplier.id}</p>
                  <h3 className="mt-1 text-xl font-semibold text-slate-900">{supplier.name}</h3>
                  <p className="mt-1 text-sm text-slate-500">{supplier.category} supplier</p>
                </div>
                <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${statusStyle[supplier.status]}`}>
                  {supplier.status}
                </span>
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl bg-slate-50 p-3 text-sm">
                  <p className="text-[10px] uppercase tracking-[0.18em] text-slate-400">Lead time</p>
                  <p className="mt-1 font-semibold text-slate-900">{supplier.leadTime}</p>
                </div>
                <div className="rounded-xl bg-slate-50 p-3 text-sm">
                  <p className="text-[10px] uppercase tracking-[0.18em] text-slate-400">Fill rate</p>
                  <p className="mt-1 font-semibold text-slate-900">{supplier.fillRate}%</p>
                </div>
                <div className="rounded-xl bg-slate-50 p-3 text-sm">
                  <p className="text-[10px] uppercase tracking-[0.18em] text-slate-400">Active orders</p>
                  <p className="mt-1 font-semibold text-slate-900">{supplier.activeOrders}</p>
                </div>
                <div className="rounded-xl bg-slate-50 p-3 text-sm">
                  <p className="text-[10px] uppercase tracking-[0.18em] text-slate-400">Rating</p>
                  <p className="mt-1 font-semibold text-slate-900">{supplier.rating}/5</p>
                </div>
              </div>

              <div className="mt-4 rounded-xl border border-slate-200 p-4 text-sm text-slate-600">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Products</p>
                <p className="mt-2">{supplier.products.join(" • ")}</p>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <a href={`mailto:${supplier.email}`} className="rounded-lg bg-indigo-600 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-500">
                  Email
                </a>
                <a href={`tel:${supplier.phone}`} className="rounded-lg bg-teal-700 px-4 py-2 text-xs font-semibold text-white hover:bg-teal-600">
                  Call
                </a>
                <a href={supplier.website} target="_blank" rel="noreferrer" className="rounded-lg border border-slate-300 px-4 py-2 text-xs font-semibold text-slate-700 hover:border-slate-400">
                  Order Link
                </a>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <button onClick={() => handleAction(`Message ${supplier.name}`)} className="rounded-lg border border-slate-300 px-4 py-2 text-xs font-semibold text-slate-700 hover:border-slate-400">
                  Send message
                </button>
                <button onClick={() => handleAction(`Create order for ${supplier.name}`)} className="rounded-lg border border-rose-200 px-4 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50">
                  Place order draft
                </button>
                <button onClick={() => handleEditInitiate(supplier)} className="rounded-lg border border-slate-300 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50">
                  Edit
                </button>
                <button onClick={() => handleDeleteSupplier(supplier.id)} className="rounded-lg border border-rose-200 px-4 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50">
                  Delete
                </button>
              </div>
            </article>
          ))}
        </div>
      ) : viewMode === "list" ? (
        <div className="space-y-3">
          {filtered.map((supplier) => (
            <article key={supplier.id} className="supplier-card flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-slate-900 text-sm font-bold text-white">
                {supplier.name
                  .split(" ")
                  .map((word) => word[0])
                  .join("")
                  .slice(0, 2)}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-base font-semibold text-slate-900">{supplier.name}</h3>
                  <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${statusStyle[supplier.status]}`}>{supplier.status}</span>
                </div>
                <p className="mt-1 text-sm text-slate-500">{supplier.category} supplier • {supplier.leadTime} lead time • {supplier.fillRate}% fill rate</p>
                <p className="mt-2 truncate text-sm text-slate-600">{supplier.products.join(" • ")}</p>
              </div>

              <div className="flex shrink-0 flex-wrap gap-2">
                <a href={`mailto:${supplier.email}`} className="rounded-lg bg-indigo-600 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-500">
                  Email
                </a>
                <a href={`tel:${supplier.phone}`} className="rounded-lg bg-teal-700 px-4 py-2 text-xs font-semibold text-white hover:bg-teal-600">
                  Call
                </a>
                <a href={supplier.website} target="_blank" rel="noreferrer" className="rounded-lg border border-slate-300 px-4 py-2 text-xs font-semibold text-slate-700 hover:border-slate-400">
                  Link
                </a>
                <button onClick={() => handleEditInitiate(supplier)} className="rounded-lg border border-slate-300 px-3 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-50">Edit</button>
                <button onClick={() => handleDeleteSupplier(supplier.id)} className="rounded-lg border border-rose-200 px-3 py-1 text-xs font-semibold text-rose-600 hover:bg-rose-50">Delete</button>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-slate-200">
          <table className="w-full min-w-[920px] text-left text-sm">
            <thead className="bg-slate-50">
              <tr className="text-slate-500">
                <th className="px-4 py-3 font-medium">Supplier</th>
                <th className="px-4 py-3 font-medium">Category</th>
                <th className="px-4 py-3 font-medium">Lead Time</th>
                <th className="px-4 py-3 font-medium">Fill Rate</th>
                <th className="px-4 py-3 font-medium">Active Orders</th>
                <th className="px-4 py-3 font-medium">Contact</th>
                <th className="px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((supplier) => (
                <tr key={supplier.id} className="border-t border-slate-100 text-slate-700 hover:bg-slate-50">
                  <td className="px-4 py-3">
                    <div className="font-medium text-slate-900">{supplier.name}</div>
                    <div className="text-xs text-slate-400">{supplier.id}</div>
                  </td>
                  <td className="px-4 py-3">{supplier.category}</td>
                  <td className="px-4 py-3">{supplier.leadTime}</td>
                  <td className="px-4 py-3">{supplier.fillRate}%</td>
                  <td className="px-4 py-3">{supplier.activeOrders}</td>
                  <td className="px-4 py-3 text-xs text-slate-500">
                    <div>{supplier.email}</div>
                    <div>{supplier.phone}</div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-2">
                      <a href={`mailto:${supplier.email}`} className="rounded-lg bg-indigo-600 px-3 py-1 text-xs font-semibold text-white hover:bg-indigo-500">
                        Email
                      </a>
                      <a href={`tel:${supplier.phone}`} className="rounded-lg bg-teal-700 px-3 py-1 text-xs font-semibold text-white hover:bg-teal-600">
                        Call
                      </a>
                      <button onClick={() => handleAction(`Create order for ${supplier.name}`)} className="rounded-lg border border-slate-300 px-3 py-1 text-xs font-semibold text-slate-700 hover:border-slate-400">
                        Order
                      </button>
                      <button onClick={() => handleEditInitiate(supplier)} className="rounded-lg border border-slate-300 px-3 py-1 text-xs font-semibold text-slate-700 hover:border-slate-400">Edit</button>
                      <button onClick={() => handleDeleteSupplier(supplier.id)} className="rounded-lg border border-rose-200 px-3 py-1 text-xs font-semibold text-rose-600 hover:bg-rose-50">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showModal ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const payload = {
                name: modalForm.name,
                category: modalForm.category,
                leadTime: modalForm.leadTime,
                fillRate: Number(modalForm.fillRate) || 0,
                activeOrders: Number(modalForm.activeOrders) || 0,
                rating: Number(modalForm.rating) || 0,
                email: modalForm.email,
                phone: modalForm.phone,
                website: modalForm.website,
                products: (modalForm.products || "").split(",").map((p) => p.trim()).filter(Boolean),
                status: modalForm.status || "Active"
              };
              handleSaveSupplier(payload);
            }}
            className="w-full max-w-2xl rounded-3xl bg-white p-6 shadow-2xl"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-2xl font-semibold text-slate-900">{editing ? "Edit Supplier" : "Add Supplier"}</h3>
                <p className="text-sm text-slate-500">Manage supplier contact and performance details.</p>
              </div>
              <button type="button" onClick={() => { setShowModal(false); setEditing(null); }} className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-600 hover:bg-slate-200">Close</button>
            </div>

            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <input value={modalForm.name} onChange={(e) => setModalForm((s) => ({ ...s, name: e.target.value }))} placeholder="Supplier name" className="rounded-xl border border-slate-300 px-4 py-3 outline-none" />
              <input value={modalForm.category} onChange={(e) => setModalForm((s) => ({ ...s, category: e.target.value }))} placeholder="Category" className="rounded-xl border border-slate-300 px-4 py-3 outline-none" />
              <input value={modalForm.leadTime} onChange={(e) => setModalForm((s) => ({ ...s, leadTime: e.target.value }))} placeholder="Lead time" className="rounded-xl border border-slate-300 px-4 py-3 outline-none" />
              <input value={modalForm.fillRate} onChange={(e) => setModalForm((s) => ({ ...s, fillRate: e.target.value }))} placeholder="Fill rate" className="rounded-xl border border-slate-300 px-4 py-3 outline-none" />
              <input value={modalForm.rating} onChange={(e) => setModalForm((s) => ({ ...s, rating: e.target.value }))} placeholder="Rating" className="rounded-xl border border-slate-300 px-4 py-3 outline-none" />
              <input value={modalForm.activeOrders} onChange={(e) => setModalForm((s) => ({ ...s, activeOrders: e.target.value }))} placeholder="Active orders" className="rounded-xl border border-slate-300 px-4 py-3 outline-none" />
              <input value={modalForm.email} onChange={(e) => setModalForm((s) => ({ ...s, email: e.target.value }))} placeholder="Email" className="rounded-xl border border-slate-300 px-4 py-3 outline-none md:col-span-2" />
              <input value={modalForm.phone} onChange={(e) => setModalForm((s) => ({ ...s, phone: e.target.value }))} placeholder="Phone" className="rounded-xl border border-slate-300 px-4 py-3 outline-none" />
              <input value={modalForm.website} onChange={(e) => setModalForm((s) => ({ ...s, website: e.target.value }))} placeholder="Website" className="rounded-xl border border-slate-300 px-4 py-3 outline-none" />
              <input value={modalForm.products} onChange={(e) => setModalForm((s) => ({ ...s, products: e.target.value }))} placeholder="Products (comma separated)" className="rounded-xl border border-slate-300 px-4 py-3 outline-none md:col-span-2" />
            </div>

            <div className="mt-4 flex justify-end gap-3">
              <button type="button" onClick={() => { setShowModal(false); setEditing(null); }} className="rounded-xl border border-slate-300 px-4 py-2">Cancel</button>
              <button type="submit" className="rounded-xl bg-indigo-600 px-4 py-2 text-white">Save</button>
            </div>
          </form>
        </div>
      ) : null}

      <div className="supplier-panel rounded-2xl border border-slate-200 bg-slate-50 p-4">
        <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Supplier workflow</h3>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          Important feature for this kind of project: centralize supplier contacts, lead times, and order links so the owner can send a message, call, or place a reorder without leaving the dashboard.
        </p>
      </div>
    </section>
  );
}