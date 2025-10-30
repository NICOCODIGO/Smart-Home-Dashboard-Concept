import React from "react";

// Simple thresholds—tweak as you like
function levelFromTotalKWh(total) {
  if (total < 6) return { level: "Low",   cls: "alert-success" };
  if (total < 7.5) return { level: "Medium", cls: "alert-warning" };
  return { level: "High",  cls: "alert-danger" };
}

export default function EnergySummary({ rooms }) {
  if (!rooms || rooms.length === 0) return null;

  const total = rooms.reduce((sum, r) => sum + (Number(r.kWhToday) || 0), 0);
  const { level, cls } = levelFromTotalKWh(total);

  return (
    <div className={`alert ${cls} text-center shadow-sm`} role="alert">
      ⚡ Building energy usage is <strong>{level}</strong> today
      &nbsp;— total so far: <strong>{total.toFixed(2)} kWh</strong>.
    </div>
  );
}