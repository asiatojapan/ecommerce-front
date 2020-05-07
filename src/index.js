import 'react-app-polyfill/ie9';
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import React from "react";
import ReactDOM from "react-dom";
import configureStore from "./store/store";
import Routes from './Routes';
import { Provider } from "react-redux";
import { checkLoggedIn1 } from "./util/session";

const renderApp = preloadedState => {
  const store = configureStore(preloadedState);
  window.state = store.getState;


  ReactDOM.render(
    <Provider store={store}>
        <Routes />
    </Provider>,
  document.getElementById("root")
  );
};

(async () => renderApp(await checkLoggedIn1()))();