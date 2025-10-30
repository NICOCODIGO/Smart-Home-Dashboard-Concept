import React, { useEffect, useState } from "react";
import "animate.css";

export default function AlertBanner() {
  const [banner, setBanner] = useState(null);

  // pool of possible system alerts
  const alerts = [
    {
      msg: "⚠️ Device sensor battery is low. Please replace soon.",
      color: "#dc3545",
      icon: "bi-battery",
    },
    {
      msg: "🔥 High temperature detected in the Living Room (exceeds 32°C).",
      color: "#ff4136",
      icon: "bi-thermometer-high",
    },
    {
      msg: "📡 Kitchen sensor offline — connection lost.",
      color: "#fd7e14",
      icon: "bi-wifi-off",
    },
    {
      msg: "🚨 AI detected an unknown person near the main doorway.",
      color: "#c82333",
      icon: "bi-person-exclamation",
    },
  ];

  useEffect(() => {
    // function to show one random banner
    const showRandom = () => {
      const randomAlert = alerts[Math.floor(Math.random() * alerts.length)];
      setBanner(randomAlert);
      setTimeout(() => setBanner(null), 6000); // fade out after 6s
    };

    showRandom(); // first one at mount
    const interval = setInterval(showRandom, 60000); // every 1 minute
    return () => clearInterval(interval);
  }, []);

  if (!banner) return null;

  return (
    <div
      className="animate__animated animate__fadeInDown"
      style={{
        position: "fixed",
        top: "20px",
        right: "20px",
        zIndex: 2000,
        backgroundColor: banner.color,
        color: "#fff",
        padding: "14px 18px",
        borderRadius: "8px",
        boxShadow: "0 6px 18px rgba(0,0,0,0.2)",
        minWidth: "340px",
        maxWidth: "420px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div className="d-flex align-items-center gap-2">
        <i className={`bi ${banner.icon} fs-5`}></i>
        <span style={{ fontWeight: "500" }}>{banner.msg}</span>
      </div>
      <button
        className="btn btn-sm btn-close btn-close-white ms-3"
        onClick={() => setBanner(null)}
      />
    </div>
  );
}