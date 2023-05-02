import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import axios from "axios";
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";

import App from "./App";

import "./stylesheets/_reset.scss";
import "./stylesheets/main.scss";

// import "./stylesheets/all.scss";
import "bootstrap-icons/font/bootstrap-icons.css";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <HashRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </HashRouter>
  </React.StrictMode>
);
reportWebVitals();
