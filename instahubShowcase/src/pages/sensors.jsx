// diagnostucs screen

import React, { useState, useEffect } from "react";
const toF = (c) => (c * 9) / 5 + 32; //helper to convert Celsius to Fahrenheit if user chooses to

export default function Sensors({ rooms, isCelsius }) { //React component (reusable table) that displays Room and their live values coming from app.jsx, isCelsius is a boolean whether to show temperature in C or F
  const [simData, setSimData] = useState([]); //this invents extra data for CO2, noise, voltage, current battery and online status

  // Builds set of reading data for each room
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

    //turns the reading data into live data that updates every 10 second 
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

          return {  // return a new object with updated randpm diagnostics + updated "previous" values
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

      //cleans up when user leaves the page 
    return () => clearInterval(interval); 
  }, [rooms]);
  return (

    // the page tables text, and apperance is created from here and now on 
    <div className="container py-3">

      {/* Header */}
      <div className="d-flex align-items-center justify-content-between mb-4">
        <h4 className="fw-bold m-0">
          <i className="bi bi-speedometer2 me-2"></i> Advanced Sensor Diagnostics
        </h4>
      </div>

      {/* The div table layout is created */}
      <div className="table-responsive">

        {/*The table is created inside the layout */}
        <table className="table table-striped align-middle shadow-sm"> 

          {/* The small black box that appears on top of table and the text appearing in it*/}
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

          {/* The box below the black box is inserted with data and text */}
          <tbody className="text-center">
            {rooms.map((room, i) => {
              const s = simData[i];
              if (!s) return null;

              const temp = isCelsius ? room.temperatureC : toF(room.temperatureC);

              return (

                // targets all room name to be displayed first left to right
                <tr key={room.name}>
                  <td className="fw-semibold text-start"> 
                    <i className="bi bi-house-door me-2 text-primary"></i>
                    {room.name}
                  </td>

                 
                  <td>
                    {temp.toFixed(1)}{" "}
                    {s.tempTrend !== "steady" && (
                      <i
                        className={`bi bi-arrow-${s.tempTrend} ${
                          s.tempTrend === "up" ? "text-danger" : "text-info"
                        }`}
                      ></i>
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
      
      {/* Basic p undernathc table */}
      <p className="text-muted small text-center mt-3">
        Live diagnostic data — updates every 10 seconds.
      </p>
    </div>
  );
}