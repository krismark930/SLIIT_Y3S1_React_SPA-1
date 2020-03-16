import React from "react";
import { Row, Col } from "react-bootstrap";
import LoginForm from "../../components/login-fom/login-form-component";

import "./login-signup-styles.scss";

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
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt
          voluptates optio modi similique harum maiores quas minus ipsam, iusto
          natus eum facere quisquam, rerum expedita illo nulla. Mollitia,
          necessitatibus accusamus.
        </Col>
      </Row>
    </div>
  );
};

export default LoginSignup;
