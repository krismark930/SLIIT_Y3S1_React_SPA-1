import React, { useContext } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import MainNavbar from "./components/navbar/navbar-component";
import LoginSignup from "./pages/login-signup/login-signup-component";
import Homepage from "./pages/homepage/homepage-component";
import Checkout from "./pages/checkout/checkout-component";
import PayPlaceOrder from "./pages/pay-place-order/pay-place-order-component";
import UpdatePassword from "./pages/forgot-password/forgot-password-component";
import { AppContext } from "./Context/app-context";
import PayUserDetails from "./pages/pay-user-details/pay-user-details-component";
import PayCardDetails from "./pages/pay-card-details/pay-card-details-component";
import SingleCategory from "./pages/single-category/single-category-page";
import PlaceOrderSuccessful from "./pages/place-order-successful/place-order-successful-component";
import WishListPage from "./pages/wishlist/wishlist-page";
import DisplayDeliveryCharges from "./pages/display-delivery-charges/display-delivery-charges-component";
import ManageStoreManager from "./pages/admin-store-managers/admin-store-managers-component";
import ManageCategory from "./pages/admin-categories/admin-categories-component";

function App() {
  const app = useContext(AppContext);

  let routes;

  if (app.loggedin && app.currentUser[0].type === "Administrator") {
    console.log("Administrator");
    routes = (
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route exact path="/store-managers" component={ManageStoreManager} />
        <Route exact path="/categories" component={ManageCategory} />
        <Redirect to="/" />
      </Switch>
    );
  }

  if (app.loggedin && app.currentUser[0].type === "Store Manager") {
    console.log("Store Manager");
    routes = (
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route
          exact
          path="/product-category/:category"
          component={SingleCategory}
        />
        <Redirect to="/" />
      </Switch>
    );
  }

  if (app.loggedin && app.currentUser[0].type === "Customer") {
    console.log("Customer");
    routes = (
      <Switch>
        {app.payUserConfirmed ? (
          <div>
            <Route exact path="/pay-card" component={PayCardDetails} />
            <Redirect to="/pay-card" />
          </div>
        ) : (
          <div>
            {app.payCardConfirmed ? (
              <div>
                <Route exact path="/pay-order" component={PayPlaceOrder} />
                <Route
                  exact
                  path="/pay-order-success"
                  component={PlaceOrderSuccessful}
                />
                <Route
                  exact
                  path="/delivery-charges"
                  component={DisplayDeliveryCharges}
                />
                <Redirect to="/pay-order" />
              </div>
            ) : (
              <div>
                <Route exact path="/" component={Homepage} />
                <Route
                  exact
                  path="/product-category/:category"
                  component={SingleCategory}
                />
                <Route exact path="/checkout-page" component={Checkout} />
                <Route exact path="/pay-user" component={PayUserDetails} />
                <Route exact path="/wishlist" component={WishListPage} />
                <Redirect to="/" />
              </div>
            )}
          </div>
        )}
      </Switch>
    );
  }

  if (!app.loggedin) {
    console.log("Guest");
    routes = (
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route exact path="/signin-signup" component={LoginSignup} />
        <Route exact path="/forgot-password" component={UpdatePassword} />
        <Route
          exact
          path="/product-category/:category"
          component={SingleCategory}
        />
        <Redirect to="/signin-signup" />
      </Switch>
    );
  }

  return (
    <div className="App">
      <MainNavbar />
      {routes}
    </div>
  );
}

export default App;
