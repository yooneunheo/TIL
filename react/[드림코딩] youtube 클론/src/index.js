import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app';
import reportWebVitals from './reportWebVitals';
import '@fortawesome/fontawesome-free/js/all.js';
import Youtube from './service/youtube';

const httpClient = axios.create({
  baseURL = 'https://www.googleapis.com/youtube/v3',
  params: {key: process.env.REACT_APP_YOUTUBE_API_KEY},
});
const youtube = new Youtube(httpClient);
ReactDOM.render(
  <React.StrictMode>
    <App youtube={youtube} />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
