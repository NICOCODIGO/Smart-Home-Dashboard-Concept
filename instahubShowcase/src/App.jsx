// src/App.jsx
import React, { useEffect, useState } from "react";

// Layout
import Sidebar from "./components/sidebar.jsx";

// Dashboard bits
import Header from "./components/header.jsx";
import SensorCards from "./components/sensorcards.jsx";
import LineChart from "./components/linechart.jsx";
import RoomStats from "./components/roomstats.jsx";

// Pages
import Sensors from "./pages/sensors.jsx";
import Reports from "./pages/reports.jsx";
import Alerts from "./pages/alerts.jsx";
import Settings from "./pages/settings.jsx";

// Data
import { mockSensors, rooms as mockRooms } from "./data/mockdata.js";

// Alert banner
import AlertBanner from "./components/alertbanner.jsx";

function App() {
  const [activePage, setActivePage] = useState("Dashboard");
  const [isCelsius, setIsCelsius] = useState(true);

  const [sensors, setSensors] = useState(mockSensors);
  const [rooms, setRooms] = useState(mockRooms);
  const [lastUpdatedRooms, setLastUpdatedRooms] = useState(Date.now());

  const username = "Username123";

  /* ---- Building-level sensor drift (every 10s) ---- */
  useEffect(() => {
    const t = setInterval(() => {
      setSensors((prev) => ({
        ...prev,
        temperatureC: Math.max(20, Math.min(30, prev.temperatureC + (Math.random() - 0.5) * 0.4)),
        humidityPct: Math.max(40, Math.min(80, prev.humidityPct + (Math.random() - 0.5) * 1.0)),
        powerKW: Math.max(0.8, Math.min(2.0, (prev.powerKW || 1.2) + (Math.random() - 0.5) * 0.05)),
        energyTodayKWh: +(prev.energyTodayKWh + 0.01).toFixed(2),
      }));
    }, 10000);
    return () => clearInterval(t);
  }, []);

  /* ---- Room-level drift (every 10s) ---- */
  useEffect(() => {
    const t = setInterval(() => {
      setLastUpdatedRooms(Date.now());
      setRooms((prevRooms) =>
        prevRooms.map((room) => {
          const nextT = room.temperatureC + (Math.random() - 0.5) * 0.8;
          const clampT = Math.max(18, Math.min(32, nextT));

          const step = Math.random() < 0.7 ? 1 : 2;
          const sign = Math.random() < 0.5 ? -1 : 1;
          const nextH = room.humidityPct + sign * step;
          const clampH = Math.max(18, Math.min(60, nextH));

          const nextK = room.kWhToday + (Math.random() - 0.5) * 0.1;
          const clampK = Math.max(0, nextK);

          return {
            ...room,
            temperatureC: +clampT.toFixed(1),
            humidityPct: Math.round(clampH),
            kWhToday: +clampK.toFixed(2),
          };
        })
      );
    }, 10000);
    return () => clearInterval(t);
  }, []);

  /* ---- Router-like rendering ---- */
  const renderPage = () => {
    if (activePage === "Dashboard") {
      return (
        <div className="page-wrap">
          <Header username={username} />
          <SensorCards isCelsius={isCelsius} sensors={sensors} />
          <LineChart isCelsius={isCelsius} sensors={sensors} />
          <RoomStats isCelsius={isCelsius} rooms={rooms} lastUpdated={lastUpdatedRooms} />
        </div>
      );
    }

    if (activePage === "Sensors") {
      return (
        <div className="page-wrap">
          <Sensors rooms={rooms} isCelsius={isCelsius} />
        </div>
      );
    }

    if (activePage === "Reports") {
      return (
        <div className="page-wrap">
          <Reports rooms={rooms} />
        </div>
      );
    }

    if (activePage === "Alerts") {
      return (
        <div className="alerts-page">
          <div className="page-wrap">
            <Alerts />
          </div>
        </div>
      );
    }

    if (activePage === "Settings") {
      return (
        <div className="page-wrap">
          <Settings isCelsius={isCelsius} setIsCelsius={setIsCelsius} />
        </div>
      );
    }

    return null;
  };

  return (
    <>
      <Sidebar active={activePage} setActive={setActivePage} />
      <main className="app-main">{renderPage()}</main>
      <AlertBanner />
    </>
  );
}

export default App;