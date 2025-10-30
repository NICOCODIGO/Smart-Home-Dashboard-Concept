//when adding mock data, follow the existing structure and naming conventions carefully,
// a data file should be the first file created and worked on before anything else
// mock data purpose is to simulate real data since there will be no backend for this project

// Energy Usage (kWh per day) 
export const energyUsage = [ // uses [] for array
  { room: "Living Room", kWh: 2.4 },
  { room: "Kitchen", kWh: 3.1 },
  { room: "Dining Room", kWh: 1.9 },
  { room: "Bedroom", kWh: 1.5 },
  { room: "Bathroom", kWh: 0.8 },
  { room: "Garage", kWh: 0.6 }
];

// ---- Main Sensor Readings (building-level) ----
export const mockSensors = { // uses {} for object
  temperatureC: 26,
  humidityPct: 60,
  airQualityIndex: 42,
  airQualityStatus: "Good",
  lightLevelPct: 56,
  motionDetected: true,
  energyTodayKWh: 7.4,   // total energy consumed today (kWh)
  powerKW: 1.23,         // current power draw in kilowatts (live)
  powerW: 1230           // same value in watts (useful for gauges or precision)
};

// Room-Level Data for various rooms in the building, each with their own sensor readings
export const rooms = [
  { name: "Living Room", temperatureC: 23, humidityPct: 65, lightLevelPct: 48, kWhToday: 2.4, airQualityIndex: 35, airQualityStatus: "Good", motionDetected: true, powerKW: 0.45, powerW: 450 },
  { name: "Kitchen", temperatureC: 28, humidityPct: 70, lightLevelPct: 72, kWhToday: 3.1, airQualityIndex: 78, airQualityStatus: "Moderate", motionDetected: false, powerKW: 0.62, powerW: 620 },
  { name: "Dining Room", temperatureC: 25, humidityPct: 60, lightLevelPct: 60, kWhToday: 1.9, airQualityIndex: 120, airQualityStatus: "Unhealthy", motionDetected: true, powerKW: 0.38, powerW: 380 },
  { name: "Bedroom", temperatureC: 22, humidityPct: 55, lightLevelPct: 30, kWhToday: 1.5, airQualityIndex: 40, airQualityStatus: "Good", motionDetected: true, powerKW: 0.32, powerW: 320 },
  { name: "Bathroom", temperatureC: 24, humidityPct: 70, lightLevelPct: 40, kWhToday: 0.8, airQualityIndex: 60, airQualityStatus: "Moderate", motionDetected: false, powerKW: 0.21, powerW: 210 },
  { name: "Garage", temperatureC: 21, humidityPct: 50, lightLevelPct: 10, kWhToday: 0.6, airQualityIndex: 35, airQualityStatus: "Good", motionDetected: false, powerKW: 0.15, powerW: 150 }
];

// @@@ The Chart Data, this data is used to be shown in the charts in the dashboard
export const chartTimeLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
export const chartSeries = {
  temperatureC: [24, 25, 26, 28, 27, 29, 30],
  humidityPct: [60, 62, 65, 63, 66, 68, 70],
  energyKWh: [6.5, 6.8, 7.0, 7.4, 7.2, 7.8, 8.0],
  powerKW: [1.1, 1.2, 1.3, 1.25, 1.35, 1.28, 1.32], // optional: daily average power trend
  airQualityIdx: [40, 38, 65, 42, 110, 80, 45]
};
export const chartJsDatasets = [ // this prints the label text first before the data points in the chart
  { label: "Temperature (°C)", data: chartSeries.temperatureC, yAxisID: "yTemp" },
  { label: "Humidity (%)", data: chartSeries.humidityPct, yAxisID: "yHum" },
  { label: "Energy (kWh)", data: chartSeries.energyKWh, yAxisID: "yEnergy" },
  { label: "Power (kW)", data: chartSeries.powerKW, yAxisID: "yPower" } // extra line for live power trends
];

// Helpers 
export const toF = (c) => (c * 9) / 5 + 32;
export const aqStatusFromIndex = (aqi) => {
  if (aqi <= 50) return "Good";
  if (aqi <= 100) return "Moderate";
  if (aqi <= 150) return "Unhealthy (SG)";
  if (aqi <= 200) return "Unhealthy";
  if (aqi <= 300) return "Very Unhealthy";
  return "Hazardous";
};

export const energyLevelFromKWh = (kWh, maxKWh) => {
  if (!maxKWh) return "Low";
  const pct = (kWh / maxKWh) * 100;
  if (pct <= 33) return "Low";
  if (pct <= 66) return "Medium";
  return "High";
};

export const badgeClassForEnergyLevel = (level) => {
  const s = level.toLowerCase();
  if (s === "low") return "bg-success";
  if (s === "medium") return "bg-warning text-dark";
  return "bg-danger"; // high
};

export const energyHistory = [
  { date: "2025-10-29", Kitchen: 3.2, Living: 2.1, Bedroom: 1.5 },
  { date: "2025-10-30", Kitchen: 3.4, Living: 1.9, Bedroom: 1.6 },
];


export const totalEnergyToday = energyUsage.reduce((s, r) => s + r.kWh, 0);
export const totalPowerKW = rooms.reduce((s, r) => s + r.powerKW, 0); // optional: for total live power
