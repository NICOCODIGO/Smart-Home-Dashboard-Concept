// diagnostucs screen

import React, { useState, useEffect } from "react";
const toF = (c) => (c * 9) / 5 + 32; //helper to convert Celsius to Fahrenheit is user chosses to 

export default function Sensors({ rooms, isCelsius }) { //React component (reasuable table) that displays Room and their live values coming from app.jsx, isCelsius is a boolean whether to show temperature in Celsius or Fahrenheit
  const [simData, setSimData] = useState([]); //this invents extra data for CO2, noise, voltage, current, battery, online status


  // Builds first set of readings for each room
  useEffect(() => {
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
    
      // Turns the readings into live data that updates every 10 seconds
    const interval = setInterval(() => {
      setSimData((prev) =>
        prev.map((s, i) => {
          const room = rooms[i];
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

           // return a new object with updated random diagnostics + updated “previous” values
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

    // cleans up when user leaves the page, stops the interval (probably should delete this to keep it realistically running?)
    return () => clearInterval(interval);
  }, [rooms]);
  return ( //I probably should add an "if" safety check just in case but for the sake of this project, its probably not neccesary
    
    // the page tables text, and appearances is created from here and now on 
    <div className="the table"> {/* Name of the entire table page */}

      {/* Header */}
      <div className="header">
        <h4 className="Bold text">
          <i className="Text"></i> Advanced Sensor Diagnostics 
        </h4>
      </div>

      {/* Data Table */}
      <div className="Data table">
        <table className="layouts">
          <thead className="text inside the table">
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

          <tbody className="room names in bold">
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

                  {/* display temperature with trend arrow once the data changes */}
                  <td>
                    {temp.toFixed(1)}{" "}
                    {s.tempTrend !== "steady" && (
                      <i
                        className={`bi bi-arrow-${s.tempTrend} ${
                          s.tempTrend === "up" ? "text-danger" : "text-info"
                        }`}>
                      </i>
                    )}
                  </td>

                  <td>
                    {room.humidityPct}%{" "}
                    {s.humTrend !== "steady" && (
                      <i
                        className={`bi bi-arrow-${s.humTrend} ${
                          s.humTrend === "up" ? "text-warning" : "text-primary"
                        }`}
                      ></i>
                    )}
                  </td>
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
                  <td>
                    <span className={`badge ${s.co2 > 550 ? "bg-danger" : "bg-success"}`}>
                      {s.co2}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`badge ${s.noise > 60 ? "bg-warning text-dark" : "bg-secondary"}`}
                    >
                      {s.noise}
                    </span>
                  </td>
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
      
      {/* Basic p text underneath the table */}
      <p className="text-muted small text-center mt-3">
        Live diagnostic data — updates every 10 seconds.
      </p>
    </div>
  );
}