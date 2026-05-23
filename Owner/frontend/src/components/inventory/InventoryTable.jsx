import { useMemo, useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { categories, inventoryItems } from "../../data/mockData";
import { getLocal, setLocal } from "../../utils/storage";
import { useToast } from "../ui/Toast";
import ProductDetailModal from "./ProductDetailModal";
import { downloadCSV, parseCSVFile } from "../../utils/csv";

const statusStyle = {
  "In Stock": "bg-emerald-100 text-emerald-700",
  Low: "bg-amber-100 text-amber-700",
  "Out of Stock": "bg-rose-100 text-rose-700"
};

const sortOptions = [
  { label: "Stock level: High to Low", value: "stock_desc" },
  { label: "Stock level: Low to High", value: "stock_asc" },
  { label: "Price: High to Low", value: "price_desc" },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Rating: High to Low", value: "rating_desc" },
  { label: "Name: A to Z", value: "name_asc" },
  { label: "Critical first", value: "critical_first" }
];

const statusRank = {
  "Out of Stock": 0,
  Low: 1,
  "In Stock": 2
};

const initialForm = {
  name: "",
  category: "Beverages",
  qty: 0,
  price: "",
  supplier: "",
  supplierEmail: "",
  supplierPhone: "",
  purchaseLink: "",
  description: "",
  image: ""
};

const makeSvg = (label, start, end) => {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240">
      <defs>
        <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stop-color="${start}" />
          <stop offset="100%" stop-color="${end}" />
        </linearGradient>
      </defs>
      <rect width="320" height="240" rx="28" fill="url(#g)" />
      <circle cx="260" cy="52" r="38" fill="rgba(255,255,255,0.14)" />
      <circle cx="72" cy="184" r="52" fill="rgba(255,255,255,0.12)" />
      <text x="32" y="132" fill="white" font-size="28" font-family="Arial, sans-serif" font-weight="700">${label}</text>
      <text x="32" y="164" fill="rgba(255,255,255,0.8)" font-size="14" font-family="Arial, sans-serif">New stock item</text>
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
};

export default function InventoryTable() {
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("critical_first");
  const [viewMode, setViewMode] = useState("details");
  const [selectedItem, setSelectedItem] = useState(null);
  const toast = useToast();
  const [items, setItems] = useState(() => getLocal("inventoryItems", inventoryItems));
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(9);
  const uploadRef = useRef(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState(initialForm);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    setLocal("inventoryItems", items);
  }, [items]);

  const filtered = useMemo(() => {
    const base = category === "All" ? items : items.filter((item) => item.category === category);

    return [...base].sort((a, b) => {
      switch (sortBy) {
        case "stock_desc":
          return b.qty - a.qty;
        case "stock_asc":
          return a.qty - b.qty;
        case "price_desc":
          return b.price - a.price;
        case "price_asc":
          return a.price - b.price;
        case "rating_desc":
          return b.rating - a.rating;
        case "name_asc":
          return a.name.localeCompare(b.name);
        case "critical_first":
        default:
          return statusRank[a.status] - statusRank[b.status] || a.qty - b.qty;
      }
    });
  }, [category, items, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [totalPages]);

  const paged = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page, pageSize]);

  const triggerReorderAnim = (event) => {
    const button = event.currentTarget;
    gsap.fromTo(
      button,
      { scale: 1, backgroundColor: "#0f766e" },
      {
        scale: 1.06,
        backgroundColor: "#14b8a6",
        duration: 0.25,
        yoyo: true,
        repeat: 1,
        ease: "power1.inOut"
      }
    );
  };

  const updateField = (field, value) => {
    setFormData((current) => ({ ...current, [field]: value }));
  };

  const handleAddItem = (event) => {
    event.preventDefault();

    if (!formData.name || !formData.supplier || !formData.supplierEmail || !formData.supplierPhone || !formData.purchaseLink) {
      setFormError("Please fill the item name and supplier contact details.");
      return;
    }

    const price = Number(formData.price);
    const qty = Number(formData.qty);
    const normalizedName = formData.name.trim();
    const newItem = {
      id: `SKU-${Date.now().toString().slice(-4)}`,
      name: normalizedName,
      category: formData.category,
      qty: Number.isFinite(qty) ? qty : 0,
      status: qty === 0 ? "Out of Stock" : qty < 20 ? "Low" : "In Stock",
      price: Number.isFinite(price) ? price : 0,
      rating: 4.4,
      salesVelocity: "New",
      supplier: formData.supplier,
      supplierEmail: formData.supplierEmail,
      supplierPhone: formData.supplierPhone,
      purchaseLink: formData.purchaseLink,
      threshold: 20,
      image: formData.image || makeSvg(normalizedName.slice(0, 9), "#0f766e", "#1d4ed8"),
      description: formData.description || "New inventory item added by the owner.",
      aiReply: "AI insight: new item saved locally. Supplier contacts are ready for message, call, or order actions.",
      reviews: [{ name: "AI Preview", rating: 5, comment: "This is a newly added stock item, awaiting real customer feedback." }],
      attributes: ["Newly added item", "Supplier contact saved", "Ready to order"]
    };

    setItems((current) => [newItem, ...current]);
    setSelectedItem(newItem);
    setFormData(initialForm);
    setFormError("");
    setShowAddForm(false);
    toast.push(`${newItem.name} added to inventory`);
  };

  const fileRef = useRef(null);
  const exportInventory = () => {
    downloadCSV("inventory.csv", items);
    toast.push("Inventory exported as CSV");
  };

  const importInventory = async (file) => {
    try {
      const parsed = await parseCSVFile(file);
      const mapped = parsed.map((p) => ({
        id: p.id || `SKU-${Date.now().toString().slice(-4)}`,
        name: p.name || p.title || "Imported item",
        category: p.category || "Misc",
        qty: p.qty || p.quantity || 0,
        price: p.price || 0,
        supplier: p.supplier || "Imported",
        supplierEmail: p.supplierEmail || p.email || "",
        supplierPhone: p.supplierPhone || p.phone || "",
        purchaseLink: p.purchaseLink || "",
        description: p.description || "Imported via CSV",
        image: p.image || "",
        status: p.status || (Number(p.qty) === 0 ? "Out of Stock" : Number(p.qty) < 20 ? "Low" : "In Stock")
      }));
      setItems((cur) => [...mapped, ...cur]);
      toast.push(`Imported ${mapped.length} inventory items`);
    } catch (e) {
      toast.push("Failed to import inventory: invalid CSV");
    }
  };

  const viewButtonClass = (mode) =>
    `rounded-xl border px-3 py-2 text-xs font-semibold transition ${
      viewMode === mode ? "border-slate-900 bg-slate-900 text-white" : "border-slate-300 bg-white text-slate-600 hover:border-slate-400"
    }`;

  return (
    <section className="space-y-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-panel">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">Inventory Tracker</h3>
            <p className="text-sm text-slate-500">Click a product to open AI insights, reviews, and product details.</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setShowAddForm(true)}
              className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Add New Item
            </button>

            <input ref={fileRef} type="file" accept=".csv,text/csv" onChange={(e) => e.target.files?.[0] && importInventory(e.target.files[0])} style={{ display: "none" }} />
            <button onClick={exportInventory} type="button" className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:border-slate-400">
              Export CSV
            </button>
            <button onClick={() => fileRef.current?.click()} type="button" className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:border-slate-400">
              Import CSV
            </button>

            <div className="flex items-center rounded-2xl border border-slate-200 bg-slate-50 p-1">
              <button type="button" onClick={() => setViewMode("cards")} className={viewButtonClass("cards")}>
                Icons
              </button>
              <button type="button" onClick={() => setViewMode("list")} className={viewButtonClass("list")}>
                List
              </button>
              <button type="button" onClick={() => setViewMode("details")} className={viewButtonClass("details")}>
                Details
              </button>
            </div>

            <div className="grid gap-3 md:min-w-[360px] md:grid-cols-2">
              <label className="space-y-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                Sort by
                <select
                  value={sortBy}
                  onChange={(event) => setSortBy(event.target.value)}
                  className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 outline-none"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>

              <label className="space-y-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                Filter category
                <select
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}
                  className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 outline-none"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                category === cat
                  ? "bg-slate-900 text-white"
                  : "border border-slate-300 bg-white text-slate-600 hover:border-slate-400"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {viewMode === "cards" ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {paged.map((item) => (
            <article
              key={item.id}
              className="group overflow-hidden rounded-2xl border border-slate-200 bg-white text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              <button type="button" onClick={() => setSelectedItem(item)} className="block w-full text-left">
                <div className="relative h-52 overflow-hidden">
                  <img src={item.image} alt={item.name} className="h-full w-full object-cover transition duration-300 group-hover:scale-105" />
                  <div className="absolute left-3 top-3 flex flex-wrap gap-2">
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyle[item.status]}`}>{item.status}</span>
                    <span className="rounded-full bg-slate-900/90 px-3 py-1 text-xs font-semibold text-white">{item.category}</span>
                  </div>
                </div>
              </button>

              <div className="space-y-3 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">{item.id}</p>
                    <h4 className="mt-1 text-base font-semibold text-slate-900">{item.name}</h4>
                  </div>
                  <p className="text-sm font-semibold text-slate-900">${item.price.toFixed(2)}</p>
                </div>

                <p className="text-sm text-slate-500">{item.description}</p>

                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-xl bg-slate-50 p-3">
                    <p className="text-[10px] uppercase tracking-[0.18em] text-slate-400">Qty</p>
                    <p className="mt-1 font-semibold text-slate-900">{item.qty}</p>
                  </div>
                  <div className="rounded-xl bg-slate-50 p-3">
                    <p className="text-[10px] uppercase tracking-[0.18em] text-slate-400">Rating</p>
                    <p className="mt-1 font-semibold text-slate-900">{item.rating}/5</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button onClick={(event) => event.stopPropagation()} className="rounded-lg border border-slate-300 px-3 py-1 text-xs hover:border-slate-400">
                    Edit
                  </button>
                  <button onClick={(event) => event.stopPropagation()} className="rounded-lg border border-rose-200 px-3 py-1 text-xs text-rose-600 hover:bg-rose-50">
                    Delete
                  </button>
                  <button
                    onClick={(event) => {
                      event.stopPropagation();
                      triggerReorderAnim(event);
                    }}
                    className="rounded-lg bg-teal-700 px-3 py-1 text-xs font-semibold text-white hover:bg-teal-600"
                  >
                    Reorder
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : viewMode === "list" ? (
        <div className="space-y-3">
          {paged.map((item) => (
            <article
              key={item.id}
              className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-3 text-left shadow-sm transition hover:bg-slate-50"
            >
              <button type="button" onClick={() => setSelectedItem(item)} className="flex min-w-0 flex-1 items-center gap-4 text-left">
                <img src={item.image} alt={item.name} className="h-20 w-20 shrink-0 rounded-xl object-cover" />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className="text-base font-semibold text-slate-900">{item.name}</h4>
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyle[item.status]}`}>{item.status}</span>
                  </div>
                  <p className="mt-1 truncate text-sm text-slate-500">{item.description}</p>
                  <div className="mt-2 flex flex-wrap gap-4 text-xs text-slate-500">
                    <span>{item.category}</span>
                    <span>Qty {item.qty}</span>
                    <span>${item.price.toFixed(2)}</span>
                    <span>Supplier: {item.supplier}</span>
                  </div>
                </div>
              </button>
              <div className="flex shrink-0 gap-2">
                <button onClick={(event) => event.stopPropagation()} className="rounded-lg border border-slate-300 px-3 py-1 text-xs hover:border-slate-400">Edit</button>
                <button onClick={(event) => event.stopPropagation()} className="rounded-lg border border-rose-200 px-3 py-1 text-xs text-rose-600 hover:bg-rose-50">Delete</button>
                <button
                  onClick={(event) => {
                    event.stopPropagation();
                    triggerReorderAnim(event);
                  }}
                  className="rounded-lg bg-teal-700 px-3 py-1 text-xs font-semibold text-white hover:bg-teal-600"
                >
                  Reorder
                </button>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-slate-200">
          <table className="w-full min-w-[940px] text-left text-sm">
          <thead className="bg-slate-50">
            <tr className="text-slate-500">
              <th className="px-4 py-3 font-medium">SKU</th>
              <th className="px-4 py-3 font-medium">Item</th>
              <th className="px-4 py-3 font-medium">Supplier</th>
              <th className="px-4 py-3 font-medium">Contact</th>
              <th className="px-4 py-3 font-medium">Quantity</th>
              <th className="px-4 py-3 font-medium">Price</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paged.map((item) => (
              <tr key={item.id} className="cursor-pointer border-t border-slate-100 text-slate-700 hover:bg-slate-50" onClick={() => setSelectedItem(item)}>
                <td className="px-4 py-3 font-medium">{item.id}</td>
                <td className="px-4 py-3">{item.name}</td>
                <td className="px-4 py-3">{item.supplier}</td>
                <td className="px-4 py-3 text-xs text-slate-500">
                  <div>{item.supplierEmail}</div>
                  <div>{item.supplierPhone}</div>
                </td>
                <td className="px-4 py-3">{item.qty}</td>
                <td className="px-4 py-3">${item.price.toFixed(2)}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyle[item.status]}`}>{item.status}</span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button onClick={(event) => event.stopPropagation()} className="rounded-lg border border-slate-300 px-3 py-1 text-xs hover:border-slate-400">
                      Edit
                    </button>
                    <button onClick={(event) => event.stopPropagation()} className="rounded-lg border border-rose-200 px-3 py-1 text-xs text-rose-600 hover:bg-rose-50">
                      Delete
                    </button>
                    <button
                      onClick={(event) => {
                        event.stopPropagation();
                        triggerReorderAnim(event);
                      }}
                      className="rounded-lg bg-teal-700 px-3 py-1 text-xs font-semibold text-white hover:bg-teal-600"
                    >
                      Reorder
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
          </table>
        </div>
      )}

      {showAddForm ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm">
          <form onSubmit={handleAddItem} className="w-full max-w-3xl rounded-3xl bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-2xl font-semibold text-slate-900">Add New Inventory Item</h3>
                <p className="text-sm text-slate-500">Enter the item and supplier details so the AI can reorder it automatically later.</p>
              </div>
              <button type="button" onClick={() => setShowAddForm(false)} className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-600 hover:bg-slate-200">
                Close
              </button>
            </div>

            {formError ? <p className="mt-4 rounded-xl bg-rose-50 px-4 py-3 text-sm text-rose-600">{formError}</p> : null}

              <div className="mt-5 grid gap-4 md:grid-cols-2">
              <input value={formData.name} onChange={(event) => updateField("name", event.target.value)} placeholder="Item name" className="rounded-xl border border-slate-300 px-4 py-3 outline-none" />
              <select value={formData.category} onChange={(event) => updateField("category", event.target.value)} className="rounded-xl border border-slate-300 px-4 py-3 outline-none">
                {categories.filter((cat) => cat !== "All").map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              <input value={formData.qty} onChange={(event) => updateField("qty", event.target.value)} type="number" min="0" placeholder="Quantity" className="rounded-xl border border-slate-300 px-4 py-3 outline-none" />
              <input value={formData.price} onChange={(event) => updateField("price", event.target.value)} type="number" min="0" step="0.01" placeholder="Price" className="rounded-xl border border-slate-300 px-4 py-3 outline-none" />
              <input value={formData.supplier} onChange={(event) => updateField("supplier", event.target.value)} placeholder="Supplier name" className="rounded-xl border border-slate-300 px-4 py-3 outline-none" />
              <input value={formData.supplierEmail} onChange={(event) => updateField("supplierEmail", event.target.value)} type="email" placeholder="Supplier email" className="rounded-xl border border-slate-300 px-4 py-3 outline-none" />
              <input value={formData.supplierPhone} onChange={(event) => updateField("supplierPhone", event.target.value)} placeholder="Supplier mobile number" className="rounded-xl border border-slate-300 px-4 py-3 outline-none" />
              <input value={formData.purchaseLink} onChange={(event) => updateField("purchaseLink", event.target.value)} placeholder="Purchase/order link" className="rounded-xl border border-slate-300 px-4 py-3 outline-none" />
              <input value={formData.image} onChange={(event) => updateField("image", event.target.value)} placeholder="Optional image URL or data URI" className="rounded-xl border border-slate-300 px-4 py-3 outline-none md:col-span-2" />
              <div className="md:col-span-2 flex items-center gap-3">
                <input ref={uploadRef} type="file" accept="image/*" style={{ display: "none" }} onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  const reader = new FileReader();
                  reader.onload = () => updateField("image", reader.result);
                  reader.readAsDataURL(file);
                }} />
                <button type="button" onClick={() => uploadRef.current?.click()} className="rounded-lg border border-slate-300 px-3 py-2 text-sm">Upload image</button>
                <div className="text-sm text-slate-500">or paste URL above</div>
              </div>
              <textarea value={formData.description} onChange={(event) => updateField("description", event.target.value)} placeholder="Product description" className="min-h-28 rounded-xl border border-slate-300 px-4 py-3 outline-none md:col-span-2" />
            </div>

            <div className="mt-5 flex flex-wrap justify-end gap-3">
              <button type="button" onClick={() => setShowAddForm(false)} className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 hover:border-slate-400">
                Cancel
              </button>
              <button type="submit" className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-500">
                Save Item
              </button>
            </div>
          </form>
        </div>
      ) : null}
      
      <div className="mt-4 flex items-center justify-between">
        <div className="text-sm text-slate-600">Page {page} of {totalPages}</div>
        <div className="flex items-center gap-2">
          <select value={pageSize} onChange={(e) => { setPageSize(Number(e.target.value)); setPage(1); }} className="rounded-xl border border-slate-300 px-3 py-1">
            <option value={6}>6</option>
            <option value={9}>9</option>
            <option value={18}>18</option>
          </select>
          <button onClick={() => setPage((p) => Math.max(1, p - 1))} className="rounded-lg border px-3 py-1">Prev</button>
          <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} className="rounded-lg border px-3 py-1">Next</button>
        </div>
      </div>

      <ProductDetailModal item={selectedItem} onClose={() => setSelectedItem(null)} />
    </section>
  );
}

// persist items when they change
// (placed after component so hook declaration order remains valid)
// Note: this effect will run in the component closure because it's declared at top-level of file

