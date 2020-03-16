import React, { useState } from "react";
import { Formik } from "formik";
import { Form, Col, InputGroup, Button } from "react-bootstrap";
import * as yup from "yup";
// import * as FontAwesome from "react-icons";
import { FaSignInAlt } from "react-icons/fa";

const schema = yup.object().shape({
  email: yup
    .string()
    .email()
    .required("Enter the email"),
  password: yup
    .string()
    .min(3, "min")
    .required("Enter the password")
});

const LoginForm = props => {
  const [loginData, setloginData] = useState({
    email: "",
    password: ""
  });

  return (
    <div className="loginComponentHead">
      <Formik
        validationSchema={schema}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            console.log(values);
            setloginData(values);
          }, 500);
        }}
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
              <Form.Group as={Col} md="12" controlId="validationFormik02">
                <Form.Label>Password</Form.Label>
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
            </Form.Row>

            <Button
              type="submit"
              style={{ marginLeft: "13px" }}
              disabled={isSubmitting}
            >
              <FaSignInAlt
                style={{
                  marginRight: "10px",
                  marginBottom: "3px"
                }}
              />
              Login
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
