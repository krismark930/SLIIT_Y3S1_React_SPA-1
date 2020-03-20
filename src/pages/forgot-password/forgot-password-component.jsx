import React, { useState, useContext } from "react";
import { Formik } from "formik";
import {
  Form,
  Col,
  InputGroup,
  Button,
  Spinner,
  Badge,
  Row,
  Container
} from "react-bootstrap";
import * as yup from "yup";
import { FaSignInAlt } from "react-icons/fa";
import { AppContext } from "../../Context/app-context";
import { Link } from "react-router-dom";

const schema = yup.object().shape({
  email: yup.string().email(),
  // .required("Enter the email"),
  answer: yup
    .string()
    // .required("Enter the password")
    .oneOf(["red", null], "Answer isn't match with required"),
  password: yup.string().min(5, "password must have at least 5 characters"),
  // .required("Enter the password"),
  passwordConfirm: yup
    .string()
    .min(3, "min")
    // .required("Confirm the password")
    .oneOf([yup.ref("password"), null], "Passwords must match")
});

var errorss = "";

const UpdatePassword = props => {
  const [emailIsValid, setemailIsValid] = useState(false);
  const [userDetails, setuserDetails] = useState();

  const [loading, setLoading] = useState(false);
  const appContext = useContext(AppContext);
  const [errorLogin, seterrorLogin] = useState(null);

  var responseError = "";
  const [loginData, setloginData] = useState({
    email: "",
    password: ""
  });

  const onSubmitHand = async (values, { setSubmitting }) => {
    setLoading(true);
    console.log(values);
    setloginData(values);

    try {
      const response = await fetch(
        "http://localhost:5000/users/updatePassword",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(values.e)
        }
      );

      const responseData = await response.json();

      console.log(responseData);
      if (!responseData.login) {
        errorss = responseData.message;
        throw new Error(responseData.message);
      }
      responseError = responseData.message;
      setemailIsValid(true);
      console.log(responseError);
      //   appContext.login();
      setLoading(false);
    } catch (err) {
      seterrorLogin(err.message);
      console.log(err.message);
      setLoading(false);
    }
    console.log(errorss + " errrrrr");
  };

  return (
    <div className="updatePAsswordComponentHead">
      <div className="container">
        <Row>
          <Col md="5" style={{ margin: "auto", marginTop: "102px" }}>
            <Formik
              validationSchema={schema}
              onSubmit={onSubmitHand}
              initialValues={{
                email: loginData.email,
                password: loginData.password
              }}
            >
              {({
                handleSubmit,
                isSubmitting,
                handleChange,
                handleBlur,
                values,
                touched,
                isValid,
                errors
              }) => (
                <Form noValidate onSubmit={handleSubmit}>
                  <Form.Row>
                    <Form.Group as={Col} md="12" controlId="validationFormik01">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Email"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.email && errors.email}
                        isValid={touched.email && !errors.email}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.email}
                      </Form.Control.Feedback>
                    </Form.Group>

                    {emailIsValid ? (
                      <div className="col-md-12">
                        <Form.Group controlId="validationFormik02">
                          <Form.Label>
                            {/* {userDetails.passwordResetQuestion} */}
                          </Form.Label>
                          <Form.Control
                            placeholder="Answer"
                            type="text"
                            name="answer"
                            value={values.answer}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={touched.answer && errors.answer}
                            isValid={touched.answer && !errors.answer}
                          />

                          <Form.Control.Feedback type="invalid">
                            {errors.answer}
                          </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="validationFormik02">
                          <Form.Label>New Password</Form.Label>
                          <Form.Control
                            placeholder="Password"
                            type="password"
                            name="password"
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={touched.password && errors.password}
                            isValid={touched.password && !errors.password}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.password}
                          </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="validationFormik05">
                          <Form.Label>Confirm Password</Form.Label>
                          <Form.Control
                            placeholder="Confirm Password"
                            type="password"
                            name="passwordConfirm"
                            value={values.passwordConfirm}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={
                              touched.passwordConfirm && errors.passwordConfirm
                            }
                            isValid={
                              touched.passwordConfirm && !errors.passwordConfirm
                            }
                          />

                          <Form.Control.Feedback type="invalid">
                            {errors.passwordConfirm}
                          </Form.Control.Feedback>
                        </Form.Group>{" "}
                      </div>
                    ) : null}

                    {loading && (
                      <Spinner
                        animation="border"
                        style={{ textAlign: "center", marginLeft: "44%" }}
                      />
                    )}
                  </Form.Row>
                  <Row>
                    <Col md={12}>
                      <div style={{ display: "grid" }}>
                        <Button
                          type="submit"
                          style={{}}
                          disabled={isSubmitting}
                        >
                          <FaSignInAlt
                            style={{
                              marginRight: "10px",
                              marginBottom: "3px"
                            }}
                          />
                          Submit
                        </Button>
                      </div>
                    </Col>
                    <Col md={2}></Col>
                  </Row>

                  <Row></Row>
                  {errorss && <div id="loginServerError">{errorss}</div>}
                </Form>
              )}
            </Formik>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default UpdatePassword;
