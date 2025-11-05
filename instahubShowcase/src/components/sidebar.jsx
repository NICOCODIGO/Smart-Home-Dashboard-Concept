import React, { useState } from "react";

export default function Sidebar({ active, setActive }) {
  const [isOpen, setIsOpen] = useState(false);
  const menu = [
    { name: "Dashboard", icon: "bi-speedometer2" },
    { name: "Sensors", icon: "bi-cpu" },
    { name: "Reports", icon: "bi-bar-chart-line" },
    { name: "Alerts", icon: "bi-bell" },
    { name: "Settings", icon: "bi-gear" },
  ];

  return (
    <>
      {/* Hamburger for mobile */}
      <button
        className="btn btn-outline-secondary d-lg-none position-fixed top-0 start-0 m-3 z-3"
        onClick={() => setIsOpen(!isOpen)}
      >
        <i className={`bi ${isOpen ? "bi-x-lg" : "bi-list"} fs-4`}></i>
      </button>

      {/* Sidebar */}
      <div
        className={`sidebar bg-dark text-white p-3 vh-100 position-fixed top-0 ${
          isOpen ? "start-0" : "start-n100"
        }`}
        style={{
          width: "240px",
          zIndex: 1040,
          transition: "all 0.3s ease",
        }}
      >
        <div className="d-flex align-items-center mb-4">
          <i className="bi bi-moon-stars fs-4 me-2"></i>
          <h5 className="mb-0">SmartSense</h5>
        </div>

        <ul className="nav flex-column">
          {menu.map((item) => (
            <li key={item.name} className="nav-item mb-2">
              <button
                className={`btn w-100 text-start d-flex align-items-center ${
                  active === item.name ? "btn-primary" : "btn-outline-light"
                }`}
                onClick={() => {
                  setActive(item.name);
                  setIsOpen(false);
                }}
              >
                <i className={`bi ${item.icon} me-2`} />
                {item.name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Overlay when open */}
      {isOpen && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50"
          style={{ zIndex: 1030 }}
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
}