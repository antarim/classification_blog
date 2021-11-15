import React from 'react';
import {BrowserRouter as Router} from "react-router-dom";
import RouterConfig from "./navigation/RouterConfig";
import {ThemeProvider} from '@mui/material/styles';
import theme from "./theme";


export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <RouterConfig/>
      </Router>
    </ThemeProvider>
  );
}