import React, { useState, useEffect } from "react";
const toF = (c) => (c * 9) / 5 + 32;

export default function Sensors({ rooms, isCelsius, setIsCelsius }) {
  // Holds simulated data (CO₂, voltage, noise, etc.) + trend info
  const [simData, setSimData] = useState([]);

  // Initialize once, then update every 10 seconds
  useEffect(() => {
    // Create baseline data
    const initializeSimData = () =>
      rooms.map((room) => ({
        co2: Math.round(350 + Math.random() * 250),
        noise: Math.round(30 + Math.random() * 40),
        voltage: Math.round(220 + Math.random() * 5),
        current: (Math.random() * 2).toFixed(2),
        battery: Math.round(50 + Math.random() * 50),
        online: Math.random() > 0.1,
        tempPrev: room.temperatureC,
        humPrev: room.humidityPct,
        tempTrend: "steady",
        humTrend: "steady",
      }));

    setSimData(initializeSimData());

    const interval = setInterval(() => {
      setSimData((prev) =>
        prev.map((s, i) => {
          const room = rooms[i];

          // Compare new vs previous temperature and humidity
          const tempTrend =
            room.temperatureC > s.tempPrev
              ? "up"
              : room.temperatureC < s.tempPrev
              ? "down"
              : "steady";

          const humTrend =
            room.humidityPct > s.humPrev
              ? "up"
              : room.humidityPct < s.humPrev
              ? "down"
              : "steady";

          // Generate updated auxiliary sensor data
          return {
            ...s,
            co2: Math.round(350 + Math.random() * 250),
            noise: Math.round(30 + Math.random() * 40),
            voltage: Math.round(220 + Math.random() * 5),
            current: (Math.random() * 2).toFixed(2),
            battery: Math.round(50 + Math.random() * 50),
            online: Math.random() > 0.1,
            tempPrev: room.temperatureC,
            humPrev: room.humidityPct,
            tempTrend,
            humTrend,
          };
        })
      );
    }, 10000);

    return () => clearInterval(interval);
  }, [rooms]);

  if (!rooms || rooms.length === 0) return <p>No sensor data available.</p>;

  return (
    <div className="container py-3">
      {/* Header + Unit Toggle */}
      <div className="d-flex align-items-center justify-content-between mb-4">
        <h4 className="fw-bold m-0">
          <i className="bi bi-speedometer2 me-2"></i> Advanced Sensor Diagnostics
        </h4>

        {/* Toggle °F / °C */}
        <div className="btn-group" role="group" aria-label="Unit toggle">
          <button
            type="button"
            className={`btn btn-sm ${!isCelsius ? "btn-primary" : "btn-outline-primary"}`}
            onClick={() => setIsCelsius(false)}
          >
            F
          </button>
          <button
            type="button"
            className={`btn btn-sm ${isCelsius ? "btn-primary" : "btn-outline-primary"}`}
            onClick={() => setIsCelsius(true)}
          >
            C
          </button>
        </div>
      </div>

      {/* Data Table */}
      <div className="table-responsive">
        <table className="table table-striped align-middle shadow-sm">
          <thead className="table-dark text-center">
            <tr>
              <th>Room</th>
              <th>Temperature ({isCelsius ? "°C" : "°F"})</th>
              <th>Humidity (%)</th>
              <th>Light (%)</th>
              <th>Energy (kWh)</th>
              <th>Voltage (V)</th>
              <th>Current (A)</th>
              <th>CO₂ (ppm)</th>
              <th>Noise (dB)</th>
              <th>Battery</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody className="text-center">
            {rooms.map((room, i) => {
              const s = simData[i];
              if (!s) return null;

              const temp = isCelsius ? room.temperatureC : toF(room.temperatureC);

              return (
                <tr key={room.name}>
                  <td className="fw-semibold text-start">
                    <i className="bi bi-house-door me-2 text-primary"></i>
                    {room.name}
                  </td>

                  {/* Temperature */}
                  <td>
                    {temp.toFixed(1)}{" "}
                    {s.tempTrend !== "steady" && (
                      <i
                        className={`bi bi-arrow-${s.tempTrend} ${
                          s.tempTrend === "up"
                            ? "text-danger"
                            : "text-info"
                        }`}
                      ></i>
                    )}
                  </td>

                  {/* Humidity */}
                  <td>
                    {room.humidityPct}%{" "}
                    {s.humTrend !== "steady" && (
                      <i
                        className={`bi bi-arrow-${s.humTrend} ${
                          s.humTrend === "up"
                            ? "text-warning"
                            : "text-primary"
                        }`}
                      ></i>
                    )}
                  </td>

                  {/* Light */}
                  <td>
                    <div className="progress" style={{ height: "6px" }}>
                      <div
                        className="progress-bar bg-info"
                        style={{ width: `${room.lightLevelPct ?? 50}%` }}
                      ></div>
                    </div>
                    <small>{room.lightLevelPct ?? 50}%</small>
                  </td>

                  <td>{room.kWhToday.toFixed(2)}</td>
                  <td>{s.voltage}</td>
                  <td>{s.current}</td>

                  {/* CO₂ */}
                  <td>
                    <span className={`badge ${s.co2 > 550 ? "bg-danger" : "bg-success"}`}>
                      {s.co2}
                    </span>
                  </td>

                  {/* Noise */}
                  <td>
                    <span
                      className={`badge ${s.noise > 60 ? "bg-warning text-dark" : "bg-secondary"}`}
                    >
                      {s.noise}
                    </span>
                  </td>

                  {/* Battery */}
                  <td>
                    <div className="progress" style={{ height: "6px" }}>
                      <div
                        className={`progress-bar ${
                          s.battery < 30
                            ? "bg-danger"
                            : s.battery < 60
                            ? "bg-warning"
                            : "bg-success"
                        }`}
                        style={{ width: `${s.battery}%` }}
                      ></div>
                    </div>
                    <small>{s.battery}%</small>
                  </td>

                  {/* Status */}
                  <td>
                    <span className={`badge ${s.online ? "bg-success" : "bg-danger"}`}>
                      {s.online ? "Online" : "Offline"}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <p className="text-muted small text-center mt-3">
        Live diagnostic data — updates every 10 seconds.
      </p>
    </div>
  );
}