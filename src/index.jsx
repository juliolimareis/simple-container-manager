import React from 'react';
import App from './pages/App';
import ReactDOM from 'react-dom';
import theme from "./libs/theme";
import reportWebVitals from './reportWebVitals';
import { ChakraProvider } from '@chakra-ui/react'
// import { createRoot } from 'react-dom/client'
import { SystemProvider } from './core/SystemContext';
//deprecated
ReactDOM.render(
  <ChakraProvider theme={theme}>
    <React.StrictMode>
      <SystemProvider>
        <App />
      </SystemProvider>
    </React.StrictMode>
  </ChakraProvider>,
  document.getElementById('root')
);

// const container = document.getElementById('app')
// const root = createRoot(container)

// root.render(
//   <ChakraProvider theme={theme}>
//     <App tab="home" />
//   </ChakraProvider>
// )
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
