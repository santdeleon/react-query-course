import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { worker } from "@uidotdev/react-query-api";

import QueryProvider from "./contexts/query";

import App from "./App";

import "./index.css";

new Promise((res) => setTimeout(res, 100))
  .then(() =>
    worker.start({
      quiet: true,
      onUnhandledRequest: "bypass",
    })
  )
  .then(() => {
    ReactDOM.render(
      <React.StrictMode>
        <QueryProvider>
          <BrowserRouter>
            <div className="container">
              <App />
            </div>
          </BrowserRouter>
        </QueryProvider>
      </React.StrictMode>,
      document.getElementById("root")
    );
  });
