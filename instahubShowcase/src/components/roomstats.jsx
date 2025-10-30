import React from "react";
import { energyLevelFromKWh, badgeClassForEnergyLevel } from "../data/mockdata.js";

export default function RoomStats({ isCelsius, rooms, lastUpdated }) {
  if (!rooms || rooms.length === 0) return null;

  const last = lastUpdated ? new Date(lastUpdated).toLocaleTimeString() : null;
  const maxKWh = Math.max(...rooms.map((r) => r.kWhToday || 0));

  return (
    <div>
      {last && (
        <div className="text-end text-muted small mb-2">
          Last updated: {last}
        </div>
      )}

      <div className="row g-3">
        {rooms.map((r) => {
          const temp = isCelsius ? r.temperatureC : (r.temperatureC * 9) / 5 + 32;
          const unit = isCelsius ? "°C" : "°F";
          const energyLevel = energyLevelFromKWh(r.kWhToday, maxKWh);
          const energyBadge = badgeClassForEnergyLevel(energyLevel);

          return (
            <div className="col-lg-4 col-md-6" key={r.name}>
              <div className="card shadow-sm h-100">
                <div className="card-body">
                  {/* Header: room name + ENERGY badge */}
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h6 className="mb-0">{r.name}</h6>
                    <span className={`badge ${energyBadge}`}>{energyLevel}</span>
                  </div>

                  {/* Sensor values */}
                  <div className="d-flex flex-wrap gap-3 mb-3">
                    <div>
                      <div className="text-muted small">Temp</div>
                      <div className="fw-semibold">
                        {temp.toFixed(1)} {unit}
                      </div>
                    </div>
                    <div>
                      <div className="text-muted small">Humidity</div>
                      <div className="fw-semibold">{r.humidityPct}%</div>
                    </div>
                    <div>
                      <div className="text-muted small">Energy Today</div>
                      <div className="fw-semibold">{r.kWhToday} kWh</div>
                    </div>
                  </div>

                  {/* Light Level */}
                  <div className="mb-2 small text-muted">Light Level</div>
                  <div className="progress" role="progressbar">
                    <div
                      className="progress-bar"
                      style={{ width: `${r.lightLevelPct}%` }}
                    >
                      {r.lightLevelPct}%
                    </div>
                  </div>

                  {/* Motion + AQI */}
                  <div className="d-flex justify-content-between align-items-center mt-3">
                    <span
                      className={`badge ${
                        r.motionDetected ? "bg-success" : "bg-secondary"
                      }`}
                    >
                      {r.motionDetected ? "Motion Detected" : "No Motion"}
                    </span>
                    <small className="text-muted">AQI: {r.airQualityIndex}</small>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}