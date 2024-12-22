import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store';
import { FlightProvider } from './context/FlightContext';
import './index.css';
import App from './App';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <FlightProvider>
        <App />
      </FlightProvider>
    </Provider>
  </StrictMode>
);
