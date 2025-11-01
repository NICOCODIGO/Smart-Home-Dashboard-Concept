// So when a user opens this web app in their browser, 
// the browser first checks the html.file and then its redirected to this file
// this file also loads global styles and libraries (Bootstrap, icons, animations, css)

import React from "react";
import { createRoot } from "react-dom/client"; 
import App from "./App.jsx"; // Main App component
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap CSS
import "bootstrap-icons/font/bootstrap-icons.css"; // Bootstrap icons
import "./index.css"; //import css to the website
import "animate.css"; //import animation library

// Bootstrap styles:
import "bootstrap/dist/css/bootstrap.min.css";
// Your global styles if any:
// import "./index.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
