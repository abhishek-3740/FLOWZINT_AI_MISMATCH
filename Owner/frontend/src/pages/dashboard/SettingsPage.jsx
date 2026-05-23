import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { getLocal, setLocal } from "../../utils/storage";
import { useToast } from "../../components/ui/Toast";
import { downloadCSV } from "../../utils/csv";
import { getLocal as getLocalRoot, setLocal as setLocalRoot } from "../../utils/storage";

export default function SettingsPage() {
  const ref = useRef(null);
  const toast = useToast();
  const [autoReorder, setAutoReorder] = useState(() => getLocal("settings", { autoReorder: true }).autoReorder ?? true);
  const [approvalMode, setApprovalMode] = useState(() => getLocal("settings", { approvalMode: "auto" }).approvalMode || "auto");
  const [permissions, setPermissions] = useState({
    viewInventory: true,
    createDrafts: true,
    placeOrders: false,
    updateStock: true,
    sendAlerts: true,
    analyzeSales: true,
    adjustPricing: false
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".setting-row", {
        opacity: 0,
        x: -10,
        duration: 0.35,
        stagger: 0.05,
        ease: "power2.out"
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  const togglePermission = (key) => {
    setPermissions((current) => ({
      ...current,
      [key]: !current[key]
    }));
  };

  useEffect(() => {
    setLocal("settings", { autoReorder, approvalMode });
  }, [autoReorder, approvalMode]);

  const runAISimulation = () => {
    // Create draft orders for low-stock items
    const inventory = getLocal("inventoryItems", []);
    const orders = getLocal("orders", []);
    const drafts = [];
    inventory.forEach((item) => {
      if ((item.threshold || 20) > (item.qty || 0)) {
        drafts.push({
          id: `ORD-${Date.now().toString().slice(-4)}-${Math.random().toString(36).slice(2,5)}`,
          item: item.name,
          supplier: item.supplier || "Unknown",
          quantity: (item.threshold || 20) - (item.qty || 0) + 10,
          total: (((item.price || 0) * ((item.threshold || 20) - (item.qty || 0) + 10))||0).toFixed(2),
          eta: "7-10 days",
          status: approvalMode === "auto" ? "Pending" : "Draft",
          source: "AI",
          createdAt: new Date().toLocaleString()
        });
      }
    });
    if (drafts.length) {
      setLocal("orders", [...drafts, ...orders]);
      const notifs = getLocal("notifications", []);
      const note = {
        id: Date.now(),
        title: "AI reorder draft ready",
        summary: `AI created ${drafts.length} reorder drafts for low-stock items.`,
        details: `Drafts were created by simulation. Review before placing orders.`,
        tag: "AI Action",
        tone: "teal",
        category: "ai",
        time: "now",
        read: false
      };
      setLocal("notifications", [note, ...notifs]);
      toast.push(`AI created ${drafts.length} drafts`);
    } else {
      toast.push("No low-stock items found by AI");
    }
  };

  return (
    <section ref={ref} className="space-y-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-panel">
      <div>
        <h2 className="setting-row text-2xl font-semibold text-slate-900">Settings</h2>
        <p className="setting-row text-sm text-slate-500">
          Configure AI automation, stock permissions, and owner approval guardrails.
        </p>
      </div>

      <div className="grid gap-5 xl:grid-cols-2">
        <div className="setting-row rounded-2xl border border-slate-200 p-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-base font-semibold text-slate-900">Autonomous Reordering</h3>
              <p className="mt-1 text-sm leading-6 text-slate-500">
                Let the AI monitor inventory, detect low stock, and create or place reorder actions automatically.
              </p>
            </div>
            <label className="relative inline-flex cursor-pointer items-center">
              <input type="checkbox" className="peer sr-only" checked={autoReorder} onChange={() => setAutoReorder((value) => !value)} />
              <div className="peer h-6 w-11 rounded-full bg-slate-200 after:absolute after:top-0.5 after:left-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all peer-checked:bg-teal-600 peer-checked:after:translate-x-full" />
            </label>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <label className="space-y-2 text-sm text-slate-700">
              Approval mode
              <select
                value={approvalMode}
                onChange={(event) => setApprovalMode(event.target.value)}
                className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none"
              >
                <option value="auto">Auto approve reorder</option>
                <option value="review">Create draft for review</option>
                <option value="manual">Manual approval only</option>
              </select>
            </label>

            <label className="space-y-2 text-sm text-slate-700">
              Reorder threshold
              <input
                type="number"
                defaultValue={20}
                min="1"
                className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none"
              />
            </label>
          </div>

          <div className="mt-4 rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
            {autoReorder
              ? "AI is allowed to monitor stock continuously and trigger reorders according to the selected approval mode."
              : "AI monitoring is enabled, but reordering actions are paused until the owner re-enables automation."}
          </div>
        </div>

        <div className="setting-row rounded-2xl border border-slate-200 p-4">
          <h3 className="text-base font-semibold text-slate-900">AI Permission Controls</h3>
          <p className="mt-1 text-sm leading-6 text-slate-500">
            Choose what the AI assistant can access or change on behalf of the owner.
          </p>

          <div className="mt-4 space-y-3">
            {[
              { key: "viewInventory", label: "View inventory status and stock levels" },
              { key: "createDrafts", label: "Create reorder drafts" },
              { key: "placeOrders", label: "Place supplier orders automatically" },
              { key: "updateStock", label: "Update stock after order confirmation" },
              { key: "sendAlerts", label: "Send notifications and low-stock alerts" },
              { key: "analyzeSales", label: "Analyze sales and demand trends" },
              { key: "adjustPricing", label: "Suggest or adjust prices" }
            ].map((permission) => (
              <label key={permission.key} className="flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3">
                <span className="mr-3 text-sm text-slate-700">{permission.label}</span>
                <input
                  type="checkbox"
                  checked={permissions[permission.key]}
                  onChange={() => togglePermission(permission.key)}
                  className="h-4 w-4 accent-indigo-600"
                />
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="setting-row rounded-2xl border border-slate-200 p-4">
        <h3 className="text-base font-semibold text-slate-900">Safety Guardrails</h3>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <label className="space-y-2 text-sm text-slate-700">
            Max order budget
            <input type="text" defaultValue="$2,500 per week" className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none" />
          </label>
          <label className="space-y-2 text-sm text-slate-700">
            Preferred suppliers
            <input type="text" defaultValue="Auto-select top-rated vendors" className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none" />
          </label>
          <label className="space-y-2 text-sm text-slate-700">
            Notification frequency
            <select className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none">
              <option>Instant alerts</option>
              <option>Every 4 hours</option>
              <option>Daily summary</option>
            </select>
          </label>
        </div>
      </div>

      <button type="button" className="setting-row rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-500">
        Save Preferences
      </button>
      <div className="mt-4 flex gap-3">
        <button onClick={runAISimulation} className="rounded-xl bg-teal-600 px-4 py-2 text-sm font-semibold text-white">Run AI reorder simulation</button>
        <button onClick={() => { const orders = getLocal("orders", []); downloadCSV("orders_export.csv", orders); toast.push("Exported orders"); }} className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold">Export orders CSV</button>
      </div>
    </section>
  );
}
