import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import "bootstrap-icons/font/bootstrap-icons.css";
import App from './App';
import reportWebVitals from './reportWebVitals';

/*
Это можно добавить для настройки векторной карты, добавление маркеров и т.д.

// import ReactMapboxGl, {Layer, Feature} from "react-mapbox-gl";
import Map from "react-mapbox-gl";
import 'mapbox-gl/dist/mapbox-gl.css'

// const Map = ReactMapboxGl({
//   accessToken: "sk.eyJ1IjoiYWRtaXJhbGdlbmVyYWwiLCJhIjoiY2xjczVzOWtsMDJzdDNvbWNzNjZpdGhvYSJ9.TMhwAobWuyP3SBixQlCf5w"
// });
// const MAPBOX_TOKEN = "sk.eyJ1IjoiYWRtaXJhbGdlbmVyYWwiLCJhIjoiY2xjczVzOWtsMDJzdDNvbWNzNjZpdGhvYSJ9.TMhwAobWuyP3SBixQlCf5w";
 
*/

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
