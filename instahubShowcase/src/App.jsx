//this files is the car that uses the engine (main.jsx) to run the app


import React, { useEffect, useState } from "react"; //useEffect and useState are hooks, 
                                                    //State tracks values (or data) that change (like what page the user is on), and Effect runs code over time or whenn something changes (like auto updating sensor data)

// Navigation panel to the side
import Sidebar from "./components/sidebar.jsx";

// Dashboard bits
import Header from "./components/header.jsx"; //top part of dashboard
import SensorCards from "./components/sensorcards.jsx"; //four colored boxes (temp, humidity, power, energy)
import LineChart from "./components/linechart.jsx"; //graph showing temp and humidity over time
import RoomStats from "./components/roomstats.jsx"; //table showing room by room stats

// Pages
import Sensors from "./pages/sensors.jsx";
import Reports from "./pages/reports.jsx";
import Alerts from "./pages/alerts.jsx";
import Settings from "./pages/settings.jsx";

// The fake Data
import { mockSensors, rooms as mockRooms } from "./data/mockdata.js";

// Alert banner, the red/yellow animted waning banner top right
import AlertBanner from "./components/alertbanner.jsx";

function App() { //All states, heart of the app, helps react know what data to track and what to show on screen
  const [activePage, setActivePage] = useState("Dashboard"); //tracks what page the user is on, default is Dashboard
  const [isCelsius, setIsCelsius] = useState(true); //tracks if temperature is shown in Celsius
  const [sensors, setSensors] = useState(mockSensors);
  const [rooms, setRooms] = useState(mockRooms);
  const [lastUpdatedRooms, setLastUpdatedRooms] = useState(Date.now()); //timestamp used for "last updated" in room stats
  const username = "Username123"; //just a placeholder username since no login system, backend, or database


  // Building-level sensor drift (every 10s) -- simulates real-time data changes
  useEffect(() => {
    const t = setInterval(() => {
      setSensors((prev) => ({
        ...prev,
        temperatureC: Math.max(20, Math.min(30, prev.temperatureC + (Math.random() - 0.5) * 0.4)), //clamp between 20-30C
        humidityPct: Math.max(40, Math.min(80, prev.humidityPct + (Math.random() - 0.5) * 1.0)), //clamp between 40-80%
        powerKW: Math.max(0.8, Math.min(2.0, (prev.powerKW || 1.2) + (Math.random() - 0.5) * 0.05)),//clamp between 0.8-2.0kW
        energyTodayKWh: +(prev.energyTodayKWh + 0.01).toFixed(2),
      }));
    }, 10000);
    return () => clearInterval(t); //I believe this cleans up the interval when the component unmounts for some reason
  }, []);


  // Room-level drift (every 10s) -- simulates real-time data changes for each room (borrowing data from the property up above)
  useEffect(() => {
    const t = setInterval(() => {
      setLastUpdatedRooms(Date.now());
      setRooms((prevRooms) =>
        prevRooms.map((room) => {

          //temperature changes happen here
          const nextT = room.temperatureC + (Math.random() - 0.5) * 0.8; 
          const clampT = Math.max(18, Math.min(32, nextT)); 
          const step = Math.random() < 0.7 ? 1 : 2;
          const sign = Math.random() < 0.5 ? -1 : 1;

          //humidity changes happen here
          const nextH = room.humidityPct + sign * step;
          const clampH = Math.max(18, Math.min(60, nextH));

          //kWh changes happen here
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

  // Page rendering logic, shows different pages to show when user clicks on sidebar items
  const renderPage = () => {
    if (activePage === "Dashboard") { //activePage tells which page to show
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
      <Sidebar active={activePage} setActive={setActivePage} />  {/* Sidebar stays in place even when the user scrolls the page */}
      <main className="app-main">{renderPage()}</main> {/* shows whatever page is active (what user is looking at) */}
      <AlertBanner />
    </>
  );
}

export default App;