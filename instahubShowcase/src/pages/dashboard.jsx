//This act like the home page, user sees this first since it was set by the app.jsx
import Header from "../components/header.jsx";
import SensorCards from "../components/sensorcards.jsx";
import LineChart from "../components/linechart.jsx";
import RoomStats from "../components/roomstats.jsx";

//accepting everything in needs as props, shows the user a quick dashboard of everything 
export default function Dashboard({ username, isCelsius, setIsCelsius, sensors, rooms, lastUpdated }) {
  return (
    <>
      <Header username={username} isCelsius={isCelsius} setIsCelsius={setIsCelsius} />
      <SensorCards isCelsius={isCelsius} sensors={sensors} />
      <LineChart isCelsius={isCelsius} sensors={sensors} />
      <RoomStats isCelsius={isCelsius} rooms={rooms} lastUpdated={lastUpdated} />
    </>
  );
}