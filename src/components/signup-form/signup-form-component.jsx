import React, { useState } from "react";
import { Formik } from "formik";
import { Form, Col, InputGroup, Button } from "react-bootstrap";
import * as yup from "yup";
import { FaSignInAlt } from "react-icons/fa";

const schema = yup.object().shape({
  firstName: yup
    .string()
    .min(2, "first name must have at least 2 characters")
    .required("Enter the first name"),
  lastName: yup
    .string()
    .min(2, "last name must have at least 2 characters")
    .required("Enter the last name"),
  email: yup
    .string()
    .email()
    .required("Enter the email"),
  teleNo: yup
    .string()
    .matches(
      /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/g,
      "Enter a valid telephone number"
    )
    .required("Enter the telephone number"),
  password: yup
    .string()
    .min(5, "password must have at least 5 characters")
    .required("Enter the password"),
  passwordConfirm: yup
    .string()
    .min(3, "min")
    .required("Confirm the password")
    .oneOf([yup.ref("password"), null], "Passwords must match")
});

const SignupForm = props => {
  const [signUpData, setSignupData] = useState({
    firstName: "",
    lastName: "",
    teleNo: "",
    passwordConfirm: "",
    email: "",
    password: ""
  });

  return (
    <div className="signupFormHead">
      <Formik
        validationSchema={schema}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            console.log(values);
            setSignupData(values);
          }, 500);
        }}
        initialValues={signUpData}
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
              <Form.Group as={Col} md="6" controlId="validationFormik01">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  placeholder="First Name"
                  type="text"
                  name="firstName"
                  value={values.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.firstName && errors.firstName}
                  isValid={touched.firstName && !errors.firstName}
                />

                <Form.Control.Feedback type="invalid">
                  {errors.firstName}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="6" controlId="validationFormik02">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  placeholder="Last Name"
                  type="text"
                  name="lastName"
                  value={values.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.lastName && errors.lastName}
                  isValid={touched.lastName && !errors.lastName}
                />

                <Form.Control.Feedback type="invalid">
                  {errors.lastName}
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} md="12" controlId="validationFormik04">
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

              <Form.Group as={Col} md="12" controlId="validationFormik03">
                <Form.Label>Telephone</Form.Label>
                <Form.Control
                  placeholder="Telephone Number"
                  type="text"
                  name="teleNo"
                  value={values.teleNo}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.teleNo && errors.teleNo}
                  isValid={touched.teleNo && !errors.teleNo}
                />

                <Form.Control.Feedback type="invalid">
                  {errors.teleNo}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md="12" controlId="validationFormik05">
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

              <Form.Group as={Col} md="12" controlId="validationFormik05">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  placeholder="Confirm Password"
                  type="password"
                  name="passwordConfirm"
                  value={values.passwordConfirm}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.passwordConfirm && errors.passwordConfirm}
                  isValid={touched.passwordConfirm && !errors.passwordConfirm}
                />

                <Form.Control.Feedback type="invalid">
                  {errors.passwordConfirm}
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>

            <Button
              type="submit"
              disabled={isSubmitting}
              style={{ marginTop: "10px" }}
            >
              <FaSignInAlt
                style={{
                  marginRight: "10px",
                  marginBottom: "3px",
                  transform: "rotate(270deg)"
                }}
              />
              SignUp
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignupForm;
