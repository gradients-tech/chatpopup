import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import '/node_modules/flag-icons/css/flag-icons.min.css';
import './index.css';

ReactDOM.createRoot(document.getElementById('chat-module-root') as HTMLElement).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
