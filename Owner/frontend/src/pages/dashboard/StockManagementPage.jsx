import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import InventoryTable from "../../components/inventory/InventoryTable";

export default function StockManagementPage() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".stock-title, .stock-subtitle, .stock-table", {
        opacity: 0,
        y: 12,
        duration: 0.4,
        stagger: 0.06,
        ease: "power2.out"
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className="space-y-4">
      <div>
        <h2 className="stock-title text-2xl font-semibold text-slate-900">Stock Management</h2>
        <p className="stock-subtitle text-sm text-slate-500">
          View item-level quantities, apply category filters, and trigger quick AI-assisted reorder actions.
        </p>
      </div>
      <div className="stock-table">
        <InventoryTable />
      </div>
    </div>
  );
}
