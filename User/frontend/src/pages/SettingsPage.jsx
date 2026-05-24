import React, { useState } from 'react';

export default function SettingsPage() {
  const [preferences, setPreferences] = useState({
    emailAlerts: true,
    replenishmentHints: true,
    darkCheckout: true,
  });

  return (
    <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
      <div className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-6 shadow-soft">
        <p className="text-xs font-semibold uppercase tracking-[0.34em] text-sage-200">Settings</p>
        <h1 className="mt-3 text-4xl text-white">Store preferences</h1>
        <div className="mt-8 space-y-4">
          {[
            ['emailAlerts', 'Email me order updates'],
            ['replenishmentHints', 'Show replenishment hints'],
            ['darkCheckout', 'Use darker checkout panels'],
          ].map(([key, label]) => (
            <label key={key} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-sm text-slate-200">
              <span>{label}</span>
              <input
                type="checkbox"
                checked={preferences[key]}
                onChange={(event) => setPreferences({ ...preferences, [key]: event.target.checked })}
                className="h-5 w-5 accent-sage-200"
              />
            </label>
          ))}
        </div>
      </div>
    </main>
  );
}