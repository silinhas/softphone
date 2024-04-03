import React from "react";
import ReactDOM from "react-dom";
import App from "./App.tsx";
import "./index.css";
import { SoftphoneProvider } from "./index.ts";

ReactDOM.render(
  <React.StrictMode>
    <SoftphoneProvider>
      <App />
    </SoftphoneProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
