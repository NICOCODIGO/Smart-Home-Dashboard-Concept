//this page powers the alerts page

import React, { useEffect, useMemo, useState } from "react";
import "animate.css"; //this page used animated card that fade in and fade out

//helpers data & lookup

//bootsytap colors for different severity levels
const SEVERITY_COLORS = {
  High: "bg-danger",
  Medium: "bg-warning text-dark",
  Low: "bg-success",
}; 

//bootstrap icons for different alert types
const ALERT_ICONS = {
  Power: "bi-lightning-charge",
  Temperature: "bi-thermometer-half",
  Motion: "bi-person-walking",
  CO2: "bi-cloud-fog2",
  Offline: "bi-wifi-off",
  Online: "bi-wifi",
};

//This are used in a random alert generator 
const TYPES = ["Power", "Temperature", "Motion", "CO2", "Offline"];
const ROOMS = ["Living Room", "Kitchen", "Dining Room", "Bedroom", "Bathroom", "Garage"];

//small reusable component that shows severity level with colored pill (badge) with High, Medium, Low
function SeverityPill({ level }) {
  return (
    <span className={`badge rounded-pill ${SEVERITY_COLORS[level] || "bg-secondary"}`}>
      {level}
    </span>
  );
}

//helper to get current time as a string
const nowTime = () => new Date().toLocaleTimeString();

// the engine behind the live alert feed; makes a random alert object, prick random sensor type, rooms, severity level and build a message top right
function makeAlert() {
  const type = TYPES[Math.floor(Math.random() * TYPES.length)];
  const room = ROOMS[Math.floor(Math.random() * ROOMS.length)];
  const sev = Math.random() < 0.25 ? "High" : Math.random() < 0.6 ? "Low" : "Medium";
  let message = "";
  switch (type) {
    case "Power":
      message = `Power spike in ${room}: ${(0.4 + Math.random()).toFixed(2)} kW`;
      break;
    case "Temperature":
      message = `Temp in ${room} is ${70 + Math.floor(Math.random() * 15)}°F`;
      break;
    case "Motion":
      message = `Unexpected motion detected`;
      break;
    case "CO2":
      message = `CO₂ in ${room}: ${800 + Math.floor(Math.random() * 700)} ppm`;
      break;
    case "Offline":
      message = `Sensor disconnected from network: ${room}`;
      break;
    default:
      message = `Status update for ${room}`;
  }
  return {
    id: crypto.randomUUID(),
    type,
    room,
    severity: sev,
    message,
    time: nowTime(),
  };
}

//main component that makes everything runs and here that i can manage state and display the UI
export default function Alerts() {
  const [alerts, setAlerts] = useState([]);     // live feed alert (staged)
  const [activity, setActivity] = useState([]); // smart home activity logs(staged)

  // static activity list; will reveal items one by one
  const staticActivity = [
    { icon: "bi-lightbulb",        action: "Garage Light Turned On",  details: "Activated manually at wall switch", location: "Garage" },
    { icon: "bi-thermometer-half", action: "AC Temperature Adjusted", details: "Set to 72°F via mobile app",        location: "Living Room" },
    { icon: "bi-person-walking",   action: "Motion Detected",          details: "AI classified: Human — doorway",    location: "Bedroom" },
    { icon: "bi-heart",            action: "Motion Detected",          details: "AI classified: Pet",                location: "Hallway" },
    { icon: "bi-question-circle",  action: "Object Detected",          details: "AI classified: Unknown item",       location: "Garage" },
    { icon: "bi-wifi-off",         action: "Sensor Offline",           details: "Network disconnect",                location: "Kitchen" },
  ];


  // This is where timing is created for live alert feed
  useEffect(() => {
    const alertInterval = setInterval(() => { // add one alert every 20 seconds
      setAlerts((prev) => [makeAlert(), ...prev].slice(0, 12));
    }, 20000); //THIS DECIDES THE SPEED OF ALERT POPPING UP

  // This is where timing is created for activity log
    let idx = 0;
    const actInterval = setInterval(() => {
      if (idx < staticActivity.length) {
        setActivity((prev) => [{ ...staticActivity[idx], time: nowTime() }, ...prev]);
        idx++;
      } else {
        clearInterval(actInterval);
      }
    }, 20000); //THIS DECIDES THE SPEED OF ACTIVITY LOG POPPING UP

    return () => {
      clearInterval(alertInterval);
      clearInterval(actInterval);
    };
  }, []);

  // KPIs from alerts, counts how many High, Medium, Low severity alerts there are
  const counts = useMemo(() => {
    const c = { High: 0, Medium: 0, Low: 0 };
    alerts.forEach((a) => (c[a.severity] += 1));
    return { ...c, total: alerts.length };
  }, [alerts]);

  // The actual UI rendering, and custom styling for the badge/cards
  return (
    <div
      className="page-wrap"
      style={{
        maxWidth: "1200px",         // wider so two columns fit nicely
        margin: "0 auto",
        padding: "24px 12px 60px",
      }}
    >
      {/* Header */}
      <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-3">
        <h3 className="mb-0">
          <i className="bi bi-bell text-warning me-2"></i>
          SmartSense Alerts &amp; Notifications
        </h3>
      </div>

      {/* KPI cards */}
      <div className="row g-3 mb-3">
        {["High", "Medium", "Low", "Total"].map((key) => (
          <div key={key} className="col-6 col-md-3">
            <div className="card shadow-sm border-0 text-center">
              <div className="card-body">
                <div className="text-muted small mb-1">{key} Alerts</div>
                <div
                  className={`display-6 ${
                    key === "High"
                      ? "text-danger"
                      : key === "Medium"
                      ? "text-warning"
                      : key === "Low"
                      ? "text-success"
                      : ""
                  }`}
                >
                  {counts[key] ?? (key === "Total" ? counts.total : 0)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* TWO-COLUMN LAYOUT */}
      <div className="row g-4">
        <div className="col-12 col-lg-6">
          <div className="card shadow-sm border-0" style={{ maxHeight: 420, overflowY: "auto" }}>
            <div className="card-header bg-light fw-semibold">
              <i className="bi bi-activity text-danger me-2"></i>
              Live Alert Feed
            </div>

            {/* @@@@@@@@@ Live Alert Feed @@@@@@@@@@@@ */}
            <ul className="list-group list-group-flush">  
              {alerts.length === 0 && (
                <li className="list-group-item text-center text-muted py-3">
                  Waiting for alerts...
                </li>
              )}
              {alerts.map((a, index) => (
                <li
                  key={a.id}
                  className="list-group-item d-flex justify-content-between align-items-center animate__animated animate__fadeInDown"
                  style={{ animationDelay: `${index * 0.12}s` }}>
                  <div className="d-flex align-items-start gap-3">
                    <i className={`bi ${ALERT_ICONS[a.type] || "bi-info-circle"} fs-5 text-secondary mt-1`}></i>
                    <div>
                      <div className="fw-semibold">{a.type}</div>
                      <div className="small text-muted">{a.message}</div>
                    </div>
                  </div>

                  <div className="d-flex align-items-center gap-3">
                    <SeverityPill level={a.severity} />
                    <div className="small text-muted">{a.time}</div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="card-footer text-center small text-muted">
              Alerts refresh every <strong>20 seconds</strong> — newest first.
            </div>
          </div>
        </div>

        {/* @@@@@@@@@ Activity Log @@@@@@@@@@@@ */}

        <div className="col-12 col-lg-6">
          <div className="card shadow-sm border-0" style={{ maxHeight: 420, overflowY: "auto" }}>
            <div className="card-header bg-light fw-semibold">
              <i className="bi bi-clock-history text-primary me-2"></i>
              Smart Home Activity Log
            </div>
            <ul className="list-group list-group-flush">
              {activity.length === 0 && (
                <li className="list-group-item text-center text-muted py-3">
                  No data available yet
                </li>
              )}
              {activity.map((log, i) => (
                <li
                  key={`${log.action}-${i}`}
                  className="list-group-item d-flex justify-content-between align-items-center animate__animated animate__fadeInUp"
                  style={{ animationDelay: `${i * 0.12}s` }}
                >
                  <div className="d-flex align-items-start gap-3">
                    <i className={`bi ${log.icon} text-secondary fs-5 mt-1`}></i>
                    <div>
                      <div className="fw-semibold">{log.action}</div>
                      <div className="small text-muted">
                        {log.details} — <em>{log.location}</em>
                      </div>
                    </div>
                  </div>
                  <div className="small text-muted">{log.time}</div>
                </li>
              ))}
            </ul>
            <div className="card-footer text-muted small text-center">
              Activity logs load every <strong>20 seconds</strong> — newest first.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}