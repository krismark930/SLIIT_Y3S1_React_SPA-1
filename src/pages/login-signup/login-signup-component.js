import React from "react";
import { Row, Col } from "react-bootstrap";
import LoginForm from "../../components/login-fom/login-form-component";

import "./login-signup-styles.scss";
import SignupForm from "../../components/signup-form/signup-form-component";

const LoginSignup = props => {
  return (
    <div className="loginSignupMainHead container">
      <Row>
        <Col md="5">
          <div className="loginSignupPageLginForm">
            <h4>I already have an account </h4>
            <p>Signin using email and password</p>
            <LoginForm />
          </div>
        </Col>
        <Col md="7">
          <div className="loginSignupPageSignupForm">
            <h4>I don't have an account </h4>
            <p>Signin using required details</p>
            <SignupForm />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default LoginSignup;
