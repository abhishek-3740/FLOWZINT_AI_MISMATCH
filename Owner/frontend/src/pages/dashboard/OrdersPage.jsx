import { useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { orders as ordersData } from "../../data/mockData";
import { getLocal, setLocal } from "../../utils/storage";
import { useToast } from "../../components/ui/Toast";
import { downloadCSV, parseCSVFile } from "../../utils/csv";

const filters = ["All", "Draft", "Pending", "Approved", "Shipped"];

const statusStyle = {
  Draft: "bg-slate-100 text-slate-700 border-slate-200",
  Pending: "bg-amber-50 text-amber-700 border-amber-200",
  Approved: "bg-indigo-50 text-indigo-700 border-indigo-200",
  Shipped: "bg-emerald-50 text-emerald-700 border-emerald-200"
};

export default function OrdersPage() {
  const ref = useRef(null);
  const [filter, setFilter] = useState("All");
  const toast = useToast();
  const [items, setItems] = useState(() => getLocal("orders", ordersData));
  const [viewMode, setViewMode] = useState("details");
  const fileRef = useRef(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);

  useEffect(() => {
    setLocal("orders", items);
  }, [items]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".order-card, .order-panel", {
        opacity: 0,
        y: 12,
        duration: 0.35,
        stagger: 0.06,
        ease: "power2.out"
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  const visible = useMemo(() => {
    return items.filter((order) => filter === "All" || order.status === filter);
  }, [filter, items]);

  const updateStatus = (id, status) => {
    setItems((current) => {
      const updated = current.map((order) => (order.id === id ? { ...order, status } : order));
      toast.push(`Order ${id} marked ${status}`);
      return updated;
    });
  };

  const exportOrders = () => {
    downloadCSV("orders.csv", items);
    toast.push("Orders exported as CSV");
  };

  const importOrders = async (file) => {
    try {
      const parsed = await parseCSVFile(file);
      const mapped = parsed.map((p) => ({
        id: p.id || `ORD-${Date.now().toString().slice(-4)}`,
        item: p.item || p.name || "Imported item",
        supplier: p.supplier || "Imported supplier",
        quantity: p.quantity || p.qty || 0,
        total: p.total || 0,
        eta: p.eta || "",
        status: p.status || "Draft",
        source: p.source || "import",
        createdAt: p.createdAt || new Date().toLocaleDateString()
      }));
      setItems((cur) => [...mapped, ...cur]);
      toast.push(`Imported ${mapped.length} orders`);
    } catch (e) {
      toast.push("Failed to import orders: invalid CSV");
    }
  };

  const totalValue = visible.reduce((sum, order) => sum + order.total, 0);
  const totalPages = Math.max(1, Math.ceil(visible.length / pageSize));
  useEffect(() => { if (page > totalPages) setPage(totalPages); }, [totalPages]);
  const pagedVisible = visible.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);

  const viewButtonClass = (mode) =>
    `rounded-xl border px-3 py-2 text-xs font-semibold transition ${
      viewMode === mode ? "border-slate-900 bg-slate-900 text-white" : "border-slate-300 bg-white text-slate-600 hover:border-slate-400"
    }`;

  return (
    <section ref={ref} className="space-y-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-panel">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900">Order Management</h2>
          <p className="text-sm text-slate-500">Review AI reorder drafts, approve supplier orders, and track fulfillment status.</p>
        </div>

        <div className="flex flex-wrap gap-2">
            <button onClick={exportOrders} className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:border-slate-400">
              Export orders
            </button>
            <input ref={fileRef} type="file" accept=".csv,text/csv" onChange={(e) => e.target.files?.[0] && importOrders(e.target.files[0])} style={{ display: "none" }} />
            <button onClick={() => fileRef.current?.click()} className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:border-slate-400">
              Import orders
            </button>
          <button className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800">
            Total value ${totalValue.toFixed(0)}
          </button>
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

        <div className="text-xs font-medium text-slate-500">Explorer view for pending and fulfilled orders</div>
      </div>

      <div className="flex flex-wrap gap-2">
        {filters.map((item) => (
          <button
            key={item}
            onClick={() => setFilter(item)}
            className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
              filter === item
                ? "bg-slate-900 text-white"
                : "border border-slate-300 bg-white text-slate-600 hover:border-slate-400"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.35fr_1fr]">
        <div className="space-y-3">
          {viewMode === "cards" ? (
            pagedVisible.map((order) => (
              <article key={order.id} className="order-card rounded-2xl border border-slate-200 p-4 shadow-sm">
                <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">{order.id}</p>
                    <h3 className="mt-1 text-lg font-semibold text-slate-900">{order.item}</h3>
                    <p className="mt-1 text-sm text-slate-500">Supplier: {order.supplier} • Created {order.createdAt}</p>
                  </div>
                  <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${statusStyle[order.status]}`}>
                    {order.status}
                  </span>
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-4">
                  <div className="rounded-xl bg-slate-50 p-3 text-sm">
                    <p className="text-[10px] uppercase tracking-[0.18em] text-slate-400">Qty</p>
                    <p className="mt-1 font-semibold text-slate-900">{order.quantity}</p>
                  </div>
                  <div className="rounded-xl bg-slate-50 p-3 text-sm">
                    <p className="text-[10px] uppercase tracking-[0.18em] text-slate-400">Total</p>
                    <p className="mt-1 font-semibold text-slate-900">${order.total}</p>
                  </div>
                  <div className="rounded-xl bg-slate-50 p-3 text-sm">
                    <p className="text-[10px] uppercase tracking-[0.18em] text-slate-400">ETA</p>
                    <p className="mt-1 font-semibold text-slate-900">{order.eta}</p>
                  </div>
                  <div className="rounded-xl bg-slate-50 p-3 text-sm">
                    <p className="text-[10px] uppercase tracking-[0.18em] text-slate-400">Source</p>
                    <p className="mt-1 font-semibold text-slate-900">{order.source}</p>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <button onClick={() => updateStatus(order.id, "Approved")} className="rounded-lg bg-indigo-600 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-500">
                    Approve
                  </button>
                  <button onClick={() => updateStatus(order.id, "Pending")} className="rounded-lg border border-slate-300 px-4 py-2 text-xs font-semibold text-slate-700 hover:border-slate-400">
                    Hold
                  </button>
                  <button onClick={() => updateStatus(order.id, "Draft")} className="rounded-lg border border-rose-200 px-4 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50">
                    Revert to draft
                  </button>
                  <button onClick={() => updateStatus(order.id, "Shipped")} className="rounded-lg bg-teal-700 px-4 py-2 text-xs font-semibold text-white hover:bg-teal-600">
                    Mark shipped
                  </button>
                </div>
              </article>
            ))
          ) : viewMode === "list" ? (
            pagedVisible.map((order) => (
              <article key={order.id} className="order-card flex items-center gap-4 rounded-2xl border border-slate-200 p-4 shadow-sm">
                <div className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-slate-900 text-sm font-bold text-white">
                  {order.id.slice(-2)}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-base font-semibold text-slate-900">{order.item}</h3>
                    <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${statusStyle[order.status]}`}>{order.status}</span>
                  </div>
                  <p className="mt-1 text-sm text-slate-500">{order.supplier} • Qty {order.quantity} • ETA {order.eta}</p>
                  <div className="mt-2 flex flex-wrap gap-4 text-xs text-slate-500">
                    <span>{order.id}</span>
                    <span>${order.total}</span>
                    <span>{order.source}</span>
                  </div>
                </div>

                <div className="flex shrink-0 flex-wrap gap-2">
                  <button onClick={() => updateStatus(order.id, "Approved")} className="rounded-lg bg-indigo-600 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-500">
                    Approve
                  </button>
                  <button onClick={() => updateStatus(order.id, "Pending")} className="rounded-lg border border-slate-300 px-4 py-2 text-xs font-semibold text-slate-700 hover:border-slate-400">
                    Hold
                  </button>
                </div>
              </article>
            ))
          ) : (
            <div className="overflow-x-auto rounded-2xl border border-slate-200">
              <table className="w-full min-w-[900px] text-left text-sm">
                <thead className="bg-slate-50">
                  <tr className="text-slate-500">
                    <th className="px-4 py-3 font-medium">Order</th>
                    <th className="px-4 py-3 font-medium">Item</th>
                    <th className="px-4 py-3 font-medium">Supplier</th>
                    <th className="px-4 py-3 font-medium">Quantity</th>
                    <th className="px-4 py-3 font-medium">Total</th>
                    <th className="px-4 py-3 font-medium">ETA</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                    <th className="px-4 py-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {pagedVisible.map((order) => (
                    <tr key={order.id} className="border-t border-slate-100 text-slate-700 hover:bg-slate-50">
                      <td className="px-4 py-3 font-medium">{order.id}</td>
                      <td className="px-4 py-3">{order.item}</td>
                      <td className="px-4 py-3">{order.supplier}</td>
                      <td className="px-4 py-3">{order.quantity}</td>
                      <td className="px-4 py-3">${order.total}</td>
                      <td className="px-4 py-3">{order.eta}</td>
                      <td className="px-4 py-3">
                        <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${statusStyle[order.status]}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap gap-2">
                          <button onClick={() => updateStatus(order.id, "Approved")} className="rounded-lg bg-indigo-600 px-3 py-1 text-xs font-semibold text-white hover:bg-indigo-500">
                            Approve
                          </button>
                          <button onClick={() => updateStatus(order.id, "Draft")} className="rounded-lg border border-slate-300 px-3 py-1 text-xs font-semibold text-slate-700 hover:border-slate-400">
                            Draft
                          </button>
                          <button onClick={() => updateStatus(order.id, "Shipped")} className="rounded-lg bg-teal-700 px-3 py-1 text-xs font-semibold text-white hover:bg-teal-600">
                            Ship
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <aside className="order-panel rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Order flow</h3>
          <div className="mt-4 space-y-3">
            {[
              "AI generates draft orders from inventory risk",
              "Owner reviews and approves supplier contact details",
              "Orders are placed or held based on budget and rules",
              "Shipment updates flow back into the dashboard"
            ].map((step, index) => (
              <div key={step} className="rounded-xl bg-white p-3 text-sm text-slate-700 shadow-sm">
                <div className="flex items-center gap-2">
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-slate-900 text-[10px] font-bold text-white">
                    {index + 1}
                  </span>
                  <p>{step}</p>
                </div>
              </div>
            ))}
          </div>
        </aside>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <div className="text-sm text-slate-600">Page {page} of {totalPages}</div>
        <div className="flex items-center gap-2">
          <select value={pageSize} onChange={(e) => { setPageSize(Number(e.target.value)); setPage(1); }} className="rounded-xl border border-slate-300 px-3 py-1">
            <option value={5}>5</option>
            <option value={8}>8</option>
            <option value={12}>12</option>
          </select>
          <button onClick={() => setPage((p) => Math.max(1, p - 1))} className="rounded-lg border px-3 py-1">Prev</button>
          <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} className="rounded-lg border px-3 py-1">Next</button>
        </div>
      </div>
    </section>
  );
}

// persist orders