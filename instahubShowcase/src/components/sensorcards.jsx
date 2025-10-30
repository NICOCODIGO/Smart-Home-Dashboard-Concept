import React from "react";
import { totalEnergyToday } from "../data/mockdata"; // the reason for no .jsx is because the file only exports plain objects/array

function SensorCards({ isCelsius, sensors }) {
  // Safety: if sensors isn't passed for some reason, show nothing (or you can render a skeleton)
  if (!sensors) return null;

  const tempC = Number(sensors.temperatureC ?? 0);
  const humidity = Number(sensors.humidityPct ?? 0);
  const powerKW = Number(sensors.powerKW ?? 0);
  const powerW = Number(sensors.powerW ?? powerKW * 1000);

  const temperature = isCelsius ? tempC : (tempC * 9) / 5 + 32;
  const tempUnit = isCelsius ? "°C" : "°F";

  // Prefer live building total if provided; otherwise fall back to room-sum mock
  const energyToday = Number(sensors.energyTodayKWh ?? totalEnergyToday);

  return (
    <div className="row g-3 mb-4">
      {/* Temperature */}
      <div className="col-md-3">
        <div className="card text-center bg-primary text-white shadow-sm">
          <div className="card-body">
            <h6 className="text-uppercase">Temperature</h6>
            <h2 className="m-0">{temperature.toFixed(1)} {tempUnit}</h2>
          </div>
        </div>
      </div>

      {/* Humidity */}
      <div className="col-md-3">
        <div className="card text-center bg-info text-white shadow-sm">
          <div className="card-body">
            <h6 className="text-uppercase">Humidity</h6>
            <h2 className="m-0">{humidity.toFixed(0)}%</h2>
          </div>
        </div>
      </div>

      {/* Current Power */}
      <div className="col-md-3">
        <div className="card text-center bg-warning text-dark shadow-sm">
          <div className="card-body">
            <h6 className="text-uppercase">Current Power</h6>
            <h2 className="m-0">{powerKW.toFixed(2)} kW</h2>
            <small className="text-muted">{Math.round(powerW)} W</small>
          </div>
        </div>
      </div>

      {/* Energy Today */}
      <div className="col-md-3">
        <div className="card text-center bg-success text-white shadow-sm">
          <div className="card-body">
            <h6 className="text-uppercase">Energy Today</h6>
            <h2 className="m-0">{energyToday.toFixed(2)} kWh</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SensorCards;