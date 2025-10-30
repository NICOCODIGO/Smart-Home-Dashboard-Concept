
PROGRESS 1:

Ive built a react app that that simulates an IoT building dashboard (like something your target company would use).
React gives me reusable components that render live data from JavaScript objects.
Bootstrap gives me a responsive grid layout and ready-made design styles.

src/
 ├── App.jsx                ← main layout
 ├── data/
 │    └── mockData.js       ← fake IoT sensor data (no backend)
 └── components/
      ├── Header.jsx        ← top bar (username + F/C toggle)
      ├── SensorCards.jsx   ← main sensor summary cards
      ├── LineChart.jsx     ← weekly temperature/energy chart
      └── RoomStats.jsx     ← detailed per-room metrics

Created mock data, necessary since this is just front end work.

	•	kW = power at a moment (instant reading)
	•	kWh = energy over time (total consumption)

You used arrays and objects to model sensors, rooms, and charts:
	•	Arrays ([]) for lists (e.g., rooms)
	•	Objects ({}) for key–value pairs (e.g., a single room’s sensors)

COMPONENTS AND UI:
Each component has its own purpose, props, and data.


Also the "Total so far: will be higher than the "Energy today" card since the energy today is the building
while the energy todays sums up all rooms sensors data

“The building total and per-room totals are intentionally simulated separately to mimic real-world IoT data variance — where aggregated sensor data may not exactly match main meter readings due to drift or latency.”

its realism, real-world drift 





