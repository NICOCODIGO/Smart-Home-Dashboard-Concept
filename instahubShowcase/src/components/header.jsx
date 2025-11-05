// src/components/header.jsx
import React from "react";

export default function Header({ username = "User" }) {
  return (
    <header className="header-bar mb-4">
      {/* --- Left side greeting --- */}
      <div className="header-title">
        <h2 className="fw-bold mb-0 text-truncate">Hey, {username} 👋</h2>
        <p className="text-secondary mb-0">SmartSense Dashboard</p>
      </div>

      {/* --- Search input --- */}
      <div className="header-search">
        <div className="input-group">
          <span className="input-group-text bg-light border-0">
            <i className="bi bi-search"></i>
          </span>
          <input
            type="text"
            className="form-control border-0 bg-light"
            placeholder="Search..."
          />
        </div>
      </div>

      {/* --- Profile Avatar --- */}
      <div className="header-avatar rounded-circle bg-primary d-flex align-items-center justify-content-center text-white fw-semibold">
        {username.charAt(0).toUpperCase()}
      </div>
    </header>
  );
}