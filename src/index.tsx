import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DoublesTournament from './MainTurnier/DoublesTournament';
import SinglesTournament from './MainTurnier/SinglesTournament';
import { TeamsProvider } from './context/TeamsContext';
import { PlayersProvider } from './context/PlayerContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <TeamsProvider>
        <PlayersProvider>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/SinglesTournament" element={<SinglesTournament />} />
            <Route path="/DoublesTournament" element={<DoublesTournament />} />
          </Routes>
        </PlayersProvider>
      </TeamsProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
