import React from 'react';
import App from './pages/App';
import ReactDOM from 'react-dom';
import theme from "./libs/theme";
import reportWebVitals from './reportWebVitals';
import { ChakraProvider } from '@chakra-ui/react'
import { SystemProvider } from './core/SystemContext';

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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
