import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { Auth0Provider } from "@auth0/auth0-react"

import Palette from "./materials/Palette"

ReactDOM.render(
  <Auth0Provider
    domain="thebullpen.us.auth0.com"
    clientId="xL0puSYboL2xkS14f2zqS62r4Z8Q7rqc"
    redirectUri={window.location.origin}
  >
    <React.StrictMode>
      <Palette>
        <App />
      </Palette>
    </React.StrictMode>
  </Auth0Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
