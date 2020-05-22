import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import {BrowserRouter} from "react-router-dom";
import GlobalState from "./Context/global-state";
import WebFont from "webfontloader";

WebFont.load({
  google: {
    families: ["Work Sans", "Lemonada", "Roboto Slab", "Dancing Script"],
  },
});

ReactDOM.render(
  <BrowserRouter>
    <GlobalState>
      <App/>
    </GlobalState>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
