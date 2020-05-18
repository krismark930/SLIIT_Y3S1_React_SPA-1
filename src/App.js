import React, {useContext} from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import MainNavbar from './components/navbar/navbar-component'
import LoginSignup from './pages/login-signup/login-signup-component'
import Homepage from './pages/homepage/homepage-component'
import Checkout from './pages/checkout/checkout-component'
import PayPlaceOrder from './pages/pay-place-order/pay-place-order-component'
import UpdatePassword from './pages/forgot-password/forgot-password-component'
import {AppContext} from './Context/app-context'
import PayUserDetails from './pages/pay-user-details/pay-user-details-component'
import PayCardDetails from './pages/pay-card-details/pay-card-details-component'
import ManageStoreManager from './pages/admin-store-managers/admin-store-managers-component'
import ManageCategory from './pages/admin-categories/admin-categories-component'

function App() {
  let routes;
  const app = useContext(AppContext)
  console.log("-------------------------------")
  console.log(app);

  // console.log(app.loggedin + ' routes check')
console.log(app.currentUser[0].type)

if (app.loggedin && app.currentUser[0].type == "Administrator") {
  console.log("Admin")
   routes = (
      <Switch>
          <Route exact path='/' component={Homepage}/>
        <Redirect to='/'/>
      </Switch>
    )
}else if(app.loggedin && app.currentUser[0].type == 'Store Manager'){
  console.log("Store Manager")
  routes = (
      <Switch>
          <Route exact path='/' component={Homepage}/>
        <Redirect to='/'/>
      </Switch>
    )
}else if (app.loggedin && app.currentUser[0].type == 'Customer') {
    console.log("Customer")
    routes = (
      <Switch>
        <Route exact path='/' component={Homepage}/>
        <Route exact path='/checkout-page' component={Checkout}/>
        <Route exact path='/place-order' component={PayPlaceOrder}/>
        <Route exact path='/pay-user' component={PayUserDetails}/>
        <Route exact path='/pay-card' component={PayCardDetails}/>
        <Redirect to='/'/>
      </Switch>
    )
  } 
  
  if(! app.loggedin) {
    console.log("Guest")
    routes = (
      <Switch>
        <Route exact path='/' component={Homepage}/>
        <Route exact path='/signin-signup' component={LoginSignup}/>
        <Route exact path='/forgot-password' component={UpdatePassword}/>
        <Route exact path='/admin-login' component={ManageStoreManager}/>
        <Route exact path='/categories' component={ManageCategory}/>
        <Redirect to='/signin-signup'/>
      </Switch>
    )
  }

  return (
    <div className='App'>
      <MainNavbar/>
      {routes}
    </div>
  )
}

export default App
