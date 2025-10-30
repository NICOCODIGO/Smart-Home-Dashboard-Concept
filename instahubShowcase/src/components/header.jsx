// src/components/header.jsx
import React from "react";

export default function Header({ username }) {
  return (
    <header className="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h2 className="fw-bold mb-0">Hello, {username} 👋</h2>
        <p className="text-secondary mb-0">SmartSense Dashboard</p>
      </div>

      <div className="d-flex align-items-center gap-3">
        {/* --- Search --- */}
        <div className="input-group" style={{ width: "220px" }}>
          <span className="input-group-text bg-light border-0">
            <i className="bi bi-search"></i>
          </span>
          <input
            type="text"
            className="form-control border-0 bg-light"
            placeholder="Search..."
          />
        </div>

        {/* --- Profile Avatar --- */}
        <div
          className="rounded-circle bg-primary d-flex align-items-center justify-content-center text-white fw-semibold"
          style={{ width: "40px", height: "40px" }}
        >
          {username[0]}
        </div>
      </div>
    </header>
  );
}