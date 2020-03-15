import React from "react";
import MainNavbar from "./components/navbar/navbar-component";
import LoginSignup from "./pages/login-signup/login-signup-component";

function App() {
  return (
    <div className="App">
      <MainNavbar />
      <LoginSignup />
      <div className="container"></div>
    </div>
  );
}

export default App;
