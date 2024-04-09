import React from "react";
import ReactDOM from "react-dom";
import App from "./App.tsx";
import "./index.css";
import { SoftphoneProvider } from "../Softphone";

ReactDOM.render(
  <React.StrictMode>
    <SoftphoneProvider
      twilioServices={{
        token: `${import.meta.env.SOFTPHONE_TWILIO_FUNCTIONS_DOMAIN}/token`,
      }}
    >
      <App />
    </SoftphoneProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
