import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import AuthContextProvider from './contexts/AuthContext';
import IdeasContextProvider from './contexts/IdeasContext';

const theme = createMuiTheme({
	palette: {
		primary: {
			main: '#2e7d32',
		},
		secondary: {
			main: '#fff176',
		},
	},
});

ReactDOM.render(
	<ThemeProvider theme={theme}>
		<AuthContextProvider>
			<IdeasContextProvider>
				<App />
			</IdeasContextProvider>
		</AuthContextProvider>
	</ThemeProvider>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
