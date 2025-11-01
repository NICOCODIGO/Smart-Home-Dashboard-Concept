
PROGRESS 1:

Ive built a react app that that simulates an IoT building dashboard (like something your target company would use).
React gives me reusable components that render live data from JavaScript objects.
Bootstrap gives me a responsive grid layout and ready-made design styles.

index.html - The “shell” of your website — just a blank page with a <div id="root"> where React will insert everything.

main.jsx - The first JavaScript file that “boots up” your app — connects React to the HTML and loads App.jsx.

App.jsx - The “brain” that connects all pages, holds shared data, updates sensors every few seconds, and switches between Dashboard, Alerts, Reports, etc.

dashboard.jsx - The main “home” screen — shows top-level stats, charts, and room data.

reports.jsx - The analytics page — builds graphs, charts, and comparisons using simulated energy data. 

sensors.jsx - The technical diagnostics table showing live voltage, current, CO₂, noise, and battery levels for each room.

alerts.jsx - The real-time notifications center — fake alerts and activity logs appear every 20 seconds to simulate live events.

settings.jsx - Where users can toggle Celsius/Fahrenheit and (later) will manage more preferences.

mockdata.jsx - Fake sensor and room data that drives the entire dashboard.

Created mock data, necessary since this is just front end work.

	•	kW = power at a moment (instant reading)
	•	kWh = energy over time (total consumption)

You used arrays and objects to model sensors, rooms, and charts:
	•	Arrays ([]) for lists (e.g., rooms)
	•	Objects ({}) for key–value pairs (e.g., a single room’s sensors)

In the sensors page I made all the date in the table to be changed timely as a way to show that how it would look like if something was chaneged, just to show off the animation 

React makes multple pages to look "connected" (no backend) by using internal states

Dashboard looks "live" becasue of setInterval() and useEffect(), making numbers move and update, almost like the IoT is sending info

React components splits big UI into small, reusable parts, 

Props passed data between parent and child components 





