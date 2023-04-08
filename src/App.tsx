import "./App.css";

import React, { useEffect, useState } from "react";

import 'bulma/css/bulma.min.css'
import useConfig from "./components/useConfig";
import logo from "./logo.svg";
import { Amplify } from "aws-amplify";
import awsconfig from "./aws-exports";
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import InternHive from "./components/InternHive";


Amplify.configure(awsconfig);

export default function App() {
  console.log("App Rendering");
  const config = useConfig();
  
  return (
      <InternHive />
  );
}
