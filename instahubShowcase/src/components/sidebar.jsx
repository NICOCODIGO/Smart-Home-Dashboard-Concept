import React from "react";

export default function Sidebar({ active, setActive }) {
  const menu = [
    { name: "Dashboard", icon: "bi-speedometer2" },
    { name: "Sensors",   icon: "bi-cpu" },
    { name: "Reports",   icon: "bi-bar-chart-line" },
    { name: "Alerts",    icon: "bi-bell" },
    { name: "Settings",  icon: "bi-gear" },
  ];

  return (
    <aside
      className="app-sidebar d-flex flex-column bg-dark text-white p-3"
      style={{ width: "220px" }}
    >
      {/* Brand */}
      <div className="d-flex align-items-center mb-3">
        <i className="bi bi-moon-stars fs-4 me-2" />
        <h5 className="mb-0">SmartSense</h5>
      </div>

      {/* Nav */}
      <ul className="nav flex-column mb-auto">
        {menu.map((item) => {
          const isActive = active === item.name;
          return (
            <li key={item.name} className="nav-item mb-1">
              <button
                onClick={() => setActive(item.name)}
                className={`nav-link w-100 text-start border-0 d-flex align-items-center px-2 py-2 rounded
                  ${isActive ? "bg-primary text-white" : "text-secondary"}`}
                style={{ transition: "background .15s ease" }}
              >
                <i className={`bi ${item.icon} me-2`} />
                {item.name}
              </button>
            </li>
          );
        })}
      </ul>

      {/* Footer */}
      <div className="mt-auto pt-3 border-top border-secondary-subtle">
        <button className="btn btn-outline-light btn-sm w-100">
          <i className="bi bi-box-arrow-right me-2" />
          Logout
        </button>
      </div>
    </aside>
  );
}