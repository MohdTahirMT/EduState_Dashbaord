import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "App";
import './i18n.js'

// Material Dashboard 2 React Context Provider
import { MaterialUIControllerProvider } from "context";

// Redux Components
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { reducers } from "redux/reducers";

const store = createStore(reducers, compose(applyMiddleware(thunk)));

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
    <Suspense fallback="...loading">
      <MaterialUIControllerProvider>
        <App />
      </MaterialUIControllerProvider>
      </Suspense>
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);
