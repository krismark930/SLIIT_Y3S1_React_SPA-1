import React, { createContext, useState } from "react";
import MainNavbar from "./components/navbar/navbar-component";
import LoginSignup from "./pages/login-signup/login-signup-component";
import { Route, Switch, Redirect } from "react-router-dom";
import Homepage from "./pages/homepage/homepage-component";
import Checkout from "./pages/checkout/checkout-component";
import { AppContext } from "./Context/app-context";
import GlobalState from "./Context/global-state";

function App() {
  // const [loggedin, setLoggedin] = useState(true);
  // const [hidden, setHidden] = useState(false);
  // const [products, setProducts] = useState([
  //   { id: "p1", title: "Gaming Mouse", price: 29.99 },
  //   { id: "p2", title: "Harry Potter 3", price: 9.99 },
  //   { id: "p3", title: "Used plastic bottle", price: 0.99 },
  //   { id: "p4", title: "Half-dried plant", price: 2.99 }
  // ]);

  // const [cart, setCart] = useState([
  //   { id: "p1", title: "Gaming Mouse", price: 29.99 }
  // ]);

  // const toggleDropdownHidden = () => {
  //   setLoggedin(!loggedin);
  // };

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
