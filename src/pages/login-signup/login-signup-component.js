import React from "react";
import {Col, Row} from "react-bootstrap";
import LoginForm from "../../components/login-fom/login-form-component";
import ProductAdd  from "../../pages/Product-add/product-add-component";

import "./login-signup-styles.scss";
import SignupForm from "../../components/signup-form/signup-form-component";

const LoginSignup = props => {
  return (
    <div className="loginSignupMainHead">
      {/* <ProductAdd/> */}
      <div className="container">
        <Row>
          <Col md="4">
            <div className="loginSignupPageLginForm">
              <h4>I already have an account </h4>
              <p>Signin using email and password</p>
              <LoginForm/>
            </div>
          </Col>
          <Col md="6" className="clll">
            <div className="loginSignupPageSignupForm">
              <h4>I don't have an account </h4>
              <p>Signin using required details</p>
              <SignupForm/>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default LoginSignup;
