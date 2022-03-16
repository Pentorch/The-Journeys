import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";

import "./assets/styles/style.scss";
import { BrowserRouter as Router } from "react-router-dom";

import { UserContextProvider } from "./context/userContext";
import { FilterContextProvider } from "./context/filterContext";

ReactDOM.render(
  <UserContextProvider>
    <FilterContextProvider>
      <Router>
        <App />
      </Router>
    </FilterContextProvider>
  </UserContextProvider>,
  document.getElementById("index")
);
