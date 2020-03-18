import React, { createContext, useState } from "react";
import MainNavbar from "./components/navbar/navbar-component";
import LoginSignup from "./pages/login-signup/login-signup-component";
import { Route, Switch, Redirect } from "react-router-dom";
import Homepage from "./pages/homepage/homepage-component";
import Checkout from "./pages/checkout/checkout-component";
import { AppContext } from "./Context/app-context";
import GlobalState from "./Context/global-state";

function App() {
  return (
    <div className="App">
      <GlobalState>
        <MainNavbar />

        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route path="/signin-signup" component={LoginSignup} />
          <Route path="/checkout-page" component={Checkout} />
        </Switch>
      </GlobalState>
    </div>
  );
}

export default App;
