import React from "react";
import {Col, Row} from "react-bootstrap";
import LoginForm from "../../components/login-fom/login-form-component";

import "./login-signup-styles.scss";
import SignupForm from "../../components/signup-form/signup-form-component";

const LoginSignup = (props) => {
  return (
    <div
      className="loginSignupMainHead"
      style={{marginTop: "10%", marginBottom: "4%"}}
    >
      {/* <ProductAdd/> */}
      <div className="container">
        <Row>
          <Col md="4">
            <div
              className="loginSignupPageLginForm"
              style={{
                background: "white",
                borderRadius: "8px",
                padding: "6%",
              }}
            >
              <h4
                style={{
                  fontFamily: "Lemonada",
                  textAlign: "center",
                  fontSize: "23px",
                }}
              >
                I already have an account{" "}
              </h4>
              <p
                style={{
                  fontFamily: "Work Sans",
                  textAlign: "center",
                  fontSize: "14px",
                  marginBottom: "15px",
                }}
              >
                Signin using email and password
              </p>
              <LoginForm/>
            </div>
          </Col>
          <Col md="6" className="clll">
            <div
              className="loginSignupPageSignupForm"
              style={{background: "white", borderRadius: "8px"}}
            >
              <h4 style={{textAlign: "center"}}>I don't have an account </h4>
              <p style={{textAlign: "center"}}>
                Signin using required details
              </p>
              <SignupForm/>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default LoginSignup;
