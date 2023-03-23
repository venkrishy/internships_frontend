import "./App.css";

import React, { useEffect, useState } from "react";

import 'bulma/css/bulma.min.css'
import useConfig from "./components/useConfig";
import logo from "./logo.svg";
//import Internships from "./components/Internships";
//import BasicTable  from "./components/BasicTable";
import SortingTable  from "./components/SortingTable";
import PaginationTable  from "./components/PaginationTable";
import Internships from "./components/Internships";

/**
 * Our Web Application
 */
export default function App() {
  console.log("App Rendering");
  const config = useConfig();

  return (
    <div className="App" >
      <h1 className="App-title">Welcome to {config.app.TITLE}</h1>
      <Internships />
    </div>
  );
}
