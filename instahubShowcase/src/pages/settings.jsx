// Lesson to myself: DO NOT CHANGE THE DIV NAMES, THEYRE FOR BOOTSTRAPS TO STYLE THEM 
import React from "react";
import "animate.css";

export default function Settings({ isCelsius, setIsCelsius }) {
  const [darkMode, setDarkMode] = React.useState(false);
  const [alertSound, setAlertSound] = React.useState(true);
  const [devices, setDevices] = React.useState([
    { name: "Living Room Sensor", status: "Online" },
    { name: "Garage Camera", status: "Offline" },
    { name: "Kitchen Light", status: "Online" },
  ]);

  const toggleDeviceStatus = (index) => {
    setDevices((prev) =>
      prev.map((d, i) =>
        i === index
          ? { ...d, status: d.status === "Online" ? "Offline" : "Online" }
          : d
      )
    );
  };

  return (
    <div
      className="page-wrap animate__animated animate__fadeIn"
      style={{ maxWidth: "1000px", margin: "0 auto", padding: "24px 12px 60px" }}
    >
      <h3 className="mb-4">
        <i className="bi bi-gear-fill text-secondary me-2"></i>
        System Settings & Preferences
      </h3>

      {/* PROFILE SECTION */}
      <div className="card shadow-sm border-0 mb-4">
        <div className="card-header bg-light fw-semibold">
          <i className="bi bi-person-circle me-2 text-primary"></i>
          Profile & Account
        </div>
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label fw-semibold">Username</label>
              <input type="text" className="form-control" value="Username123" readOnly />
            </div>
            <div className="col-md-6">
              <label className="form-label fw-semibold">Email</label>
              <input type="email" className="form-control" value="user@example.com" readOnly />
            </div>
          </div>
          <div className="mt-3 text-muted small">
            Account connected to SmartSense Cloud — last sync 2 mins ago.
          </div>
        </div>
      </div>

      {/* SYSTEM PREFERENCES */}
      <div className="card shadow-sm border-0 mb-4">
        <div className="card-header bg-light fw-semibold">
          <i className="bi bi-sliders me-2 text-success"></i>
          System Preferences
        </div>
        <div className="card-body">
          <div className="form-check form-switch mb-2">
            <input
              className="form-check-input"
              type="checkbox"
              id="tempSwitch"
              checked={isCelsius}
              onChange={() => setIsCelsius(!isCelsius)}
            />
            <label className="form-check-label" htmlFor="tempSwitch">
              Use Celsius (°C) instead of Fahrenheit (°F)
            </label>
          </div>

          <div className="form-check form-switch mb-2">
            <input
              className="form-check-input"
              type="checkbox"
              id="darkMode"
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
            />
            <label className="form-check-label" htmlFor="darkMode">
              Enable Dark Mode Theme
            </label>
          </div>

          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              id="alertSound"
              checked={alertSound}
              onChange={() => setAlertSound(!alertSound)}
            />
            <label className="form-check-label" htmlFor="alertSound">
              Enable Alert Sound Notifications
            </label>
          </div>
        </div>
      </div>

      {/* DEVICE MANAGEMENT */}
      <div className="card shadow-sm border-0 mb-4">
        <div className="card-header bg-light fw-semibold">
          <i className="bi bi-cpu me-2 text-warning"></i>
          Connected Devices
        </div>
        <div className="card-body">
          <ul className="list-group list-group-flush">
            {devices.map((device, i) => (
              <li
                key={i}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <div>
                  <i className="bi bi-house-door text-secondary me-2"></i>
                  {device.name}
                </div>
                <div className="d-flex align-items-center gap-3">
                  <span
                    className={`badge ${
                      device.status === "Online" ? "bg-success" : "bg-danger"
                    }`}
                  >
                    {device.status}
                  </span>
                  <button
                    className="btn btn-sm btn-outline-secondary"
                    onClick={() => toggleDeviceStatus(i)}
                  >
                    Toggle
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* SYSTEM ACTIONS */}
      <div className="card shadow-sm border-0">
        <div className="card-header bg-light fw-semibold">
          <i className="bi bi-tools me-2 text-danger"></i>
          System Actions
        </div>
        <div className="system-actions">
          <button className="btn btn-outline-primary">Backup Data</button>
          <button className="btn btn-outline-warning">Restore Defaults</button>
          <button className="btn btn-outline-danger">Restart System</button>
        </div>
        <div className="card-footer text-muted small text-center">
          Any changes you make here are saved automatically.
        </div>
      </div>
    </div>
  );
}