import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Home } from './Home';
import store from "./store";
import { Provider } from "react-redux";
import { AzureAD } from 'react-aad-msal';
import { authProvider } from './authProvider';

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <AzureAD provider={authProvider} forceLogin={true}>
    <Provider store={store}>
      <Home />
    </Provider>
  </AzureAD>,
);
