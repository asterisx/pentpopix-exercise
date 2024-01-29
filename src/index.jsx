import React from 'react';
import ReactDOM from "react-dom";
import { Editor } from "./editor";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { StylesProvider } from '@material-ui/core/styles';

import "./styles.css";

const defaultTheme = createTheme();

const theme = createTheme({
  ...defaultTheme,
  palette: {
    ...defaultTheme.palette,
    primary: {
      main: '#4096ff',
      contrastText: '#ffffff', 
    },
  },
});

function App() {
  return <StylesProvider injectFirst><ThemeProvider theme={theme}><Editor /></ThemeProvider></StylesProvider>;
}

if (process.env.NODE_ENV === 'development') {
  const whyDidYouRender = require('@welldone-software/why-did-you-render');
  whyDidYouRender(React, {
    trackAllPureComponents: true,
  });
}


const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);