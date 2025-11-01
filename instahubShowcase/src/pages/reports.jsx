// This page basically turns raw data given from other files into into nice reports with charts and summaries

import React, { useState, useMemo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

// rooms data is passed from App.jsx
export default function Reports({ rooms }) { 
  const [range, setRange] = useState("week");
  const COLORS = ["#007bff", "#28a745", "#ffc107", "#dc3545", "#6610f2", "#20c997"];

  //convert rooms data into format suitable for pie chart
  const roomEnergyData = useMemo(
    () =>
      rooms.map((r) => ({
        name: r.name,
        value: parseFloat(r.kWhToday.toFixed(2)),
      })),
    [rooms]
  );

  //adds room energy values together and finds which room used the most energy
  const totalEnergy = roomEnergyData.reduce((sum, r) => sum + r.value, 0);
  const topRoom = roomEnergyData.reduce((a, b) => (a.value > b.value ? a : b), {});


  //build a dataset for line chart (This Week or This Month dropdown)
  const trendData = useMemo(() => {
    const labels =
      range === "week"
        ? ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
        : Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`);
    return labels.map((label) => ({
      label,
      energy: parseFloat((totalEnergy * (0.8 + Math.random() * 0.3)).toFixed(2)),
    }));
  }, [range, totalEnergy]);

  //calculations for summary cards at the top
  const yesterdayEnergy = (totalEnergy * 0.9).toFixed(2);
  const diff = (totalEnergy - yesterdayEnergy).toFixed(2);
  const diffPercent = ((diff / yesterdayEnergy) * 100).toFixed(1);

  return (
    <div className="container-fluid px-5 py-4" style={{ maxWidth: "2000px" }}>


     {/* Below are the layout components using bootstrap */}

      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
        <h3 className="fw-bold mb-0">
          <i className="bi bi-graph-up-arrow me-2"></i> Energy Reports & Analytics
        </h3>

        {/* RANGE SELECTOR & EXPORT BUTTON */}
        <div className="d-flex align-items-center gap-2">
          <select
            className="form-select form-select-sm"
            value={range}
            onChange={(e) => setRange(e.target.value)}
            style={{ width: "160px" }}
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>

          <button className="btn btn-outline-secondary btn-sm">
            <i className="bi bi-download me-1"></i> Export
          </button>
        </div>
      </div>

      {/* SUMMARY CARDS */}
      <div className="row row-cols-1 row-cols-md-2 row-cols-xl-4 g-4 mb-4">
        <div className="col">
          <div className="card shadow-sm border-0 p-4 text-center h-100">
            <h6 className="text-muted">Total Energy Today</h6>
            <h2 className="fw-bold">{totalEnergy.toFixed(2)} kWh</h2>
          </div>
        </div>
        <div className="col">
          <div className="card shadow-sm border-0 p-4 text-center h-100">
            <h6 className="text-muted">Yesterday’s Total</h6>
            <h2>{yesterdayEnergy} kWh</h2>
          </div>
        </div>
        <div className="col">
          <div className="card shadow-sm border-0 p-4 text-center h-100">
            <h6 className="text-muted">Change</h6>
            <h2 className={diff > 0 ? "text-danger" : "text-success"}>
              {diff > 0 ? "+" : ""}
              {diffPercent}%
            </h2>
          </div>
        </div>
        <div className="col">
          <div className="card shadow-sm border-0 p-4 text-center h-100">
            <h6 className="text-muted">Top Room</h6>
            <h4 className="fw-semibold">{topRoom.name}</h4>
            <small className="text-muted">{topRoom.value} kWh</small>
          </div>
        </div>
      </div>



      {/* CHARTS ROW */}
      <div className="row g-4 mb-4">


        {/* PIE CHART */}
        <div className="col-12 col-lg-6">
          <div className="card shadow-sm border-0 p-4 h-100">
            <h5 className="fw-bold text-center mb-3">Room Energy Distribution</h5>
            <div style={{ width: "100%", height: "400px" }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
  data={roomEnergyData}
  dataKey="value"
  nameKey="name"
  cx="50%"
  cy="50%"
  innerRadius="40%"
  outerRadius="70%"
  labelLine={false}
  label={({ name, percent }) =>
    `${(percent * 100).toFixed(1)}%`
  } // Only % inside each slice
>
                    {roomEnergyData.map((entry, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>

                  {/* move legend BELOW and make it horizontal */}
                  <Tooltip />
                  <Legend
                    layout="horizontal"
                    verticalAlign="bottom"
                    align="center"
                    wrapperStyle={{ marginTop: "20px" }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* LINE CHART */}
        <div className="col-12 col-lg-6">
          <div className="card shadow-sm border-0 p-4 h-100">
            <h5 className="fw-bold text-center mb-3">
              {range === "week" ? "Weekly Energy Trend" : "Monthly Energy Trend"}
            </h5>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart
                data={trendData}
                margin={{ top: 10, right: 30, left: 10, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="label" tick={{ fontSize: 12 }} />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="energy"
                  stroke="#007bff"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* BREAKDOWN + COMPARISON */}
      <div className="row g-4">
        
        {/* ENERGY BREAKDOWN */}
        <div className="col-12 col-xl-5">
          <div className="card shadow-sm border-0 p-4 h-100">
            <h5 className="fw-bold mb-3">
              <i className="bi bi-lightning-charge me-2"></i> Energy Breakdown
            </h5>
            <div className="row text-center">
              <div className="col-6 mb-3">
                <h6 className="text-muted">Peak Hour</h6>
                <h5 className="fw-semibold">6:00 PM - 9:00 PM</h5>
              </div>
              <div className="col-6 mb-3">
                <h6 className="text-muted">Average Voltage</h6>
                <h5 className="fw-semibold">223 V</h5>
              </div>
              <div className="col-6 mb-3">
                <h6 className="text-muted">Avg Current</h6>
                <h5 className="fw-semibold">1.23 A</h5>
              </div>
              <div className="col-6 mb-3">
                <h6 className="text-muted">Weekly Usage</h6>
                <h5 className="fw-semibold">{(totalEnergy * 7).toFixed(1)} kWh</h5>
              </div>
            </div>
          </div>
        </div>

        {/* COMPARISON */}
        <div className="col-12 col-xl-7">
          <div className="card shadow-sm border-0 p-4 h-100">
            <h5 className="fw-bold mb-3">
              <i className="bi bi-bar-chart-line me-2"></i> Comparison Overview
            </h5>
            <table className="table table-striped align-middle">
              <thead className="table-light">
                <tr>
                  <th>Room</th>
                  <th>Energy (Today)</th>
                  <th>Energy (Yesterday)</th>
                  <th>Change (%)</th>
                </tr>
              </thead>
              <tbody>
                {rooms.map((r, i) => {
                  const yesterday = r.kWhToday * 0.9;
                  const change = ((r.kWhToday - yesterday) / yesterday) * 100;
                  return (
                    <tr key={i}>
                      <td>{r.name}</td>
                      <td>{r.kWhToday.toFixed(2)} kWh</td>
                      <td>{yesterday.toFixed(2)} kWh</td>
                      <td
                        className={
                          change >= 0
                            ? "text-danger fw-semibold"
                            : "text-success fw-semibold"
                        }
                      >
                        {change >= 0 ? "+" : ""}
                        {change.toFixed(1)}%
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <p className="text-muted text-center small mt-4">
        Reports simulate daily and weekly energy summaries — live updates every 10 seconds.
      </p>
    </div>
  );
}