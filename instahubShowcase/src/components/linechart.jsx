//visualising data with a line chart, temperatre and energy usage 

import React from "react";
import { Line } from "react-chartjs-2";
import { chartTimeLabels, chartSeries } from "../data/mockdata.js";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

export default function LineChart({ isCelsius }) {
  const tempData = isCelsius
    ? chartSeries.temperatureC
    : chartSeries.temperatureC.map((c) => (c * 9) / 5 + 32);
  const tempLabel = isCelsius ? "Temperature (°C)" : "Temperature (°F)";

  const data = {
    labels: chartTimeLabels,
    datasets: [
      {
        label: tempLabel,
        data: tempData,
        borderColor: "#0d6efd",
        backgroundColor: "rgba(13,110,253,0.15)",
        yAxisID: "yTemp",
        tension: 0.3,
      },
      {
        label: "Energy (kWh)",
        data: chartSeries.energyKWh,
        borderColor: "#198754",
        backgroundColor: "rgba(25,135,84,0.15)",
        yAxisID: "yEnergy",
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: "index", intersect: false },
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Weekly Overview" },
    },
    scales: {
      yTemp: { type: "linear", position: "left", title: { display: true, text: isCelsius ? "°C" : "°F" } },
      yEnergy: { type: "linear", position: "right", title: { display: true, text: "kWh" }, grid: { drawOnChartArea: false } },
    },
  };

  return (
    <div className="card shadow-sm my-4">
      <div className="card-body" style={{ height: 380 }}>
        <Line data={data} options={options} />
      </div>
    </div>
  );
}