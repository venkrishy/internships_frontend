import "./App.css";

import React, { useEffect, useState } from "react";

import 'bulma/css/bulma.min.css'
import useConfig from "./components/useConfig";
import logo from "./logo.svg";
import Internships from "./components/Internships";
import DataTableTS from "./components/DataTableTS";

/**
 * Our Web Application
 */
export default function App() {
  console.log("App Rendering");
  const config = useConfig();

  return (
      <DataTableTS />
  );
}
