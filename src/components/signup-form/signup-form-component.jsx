import React, {useContext, useState} from "react";
import {Formik} from "formik";
import {Button, Col, Form, Spinner} from "react-bootstrap";
import * as yup from "yup";
import {FaMinusCircle, FaSignInAlt} from "react-icons/fa";
import {AppContext} from "../../Context/app-context";
import {proxy} from "../../conf";

import "./signup-form.scss";

const schema = yup.object().shape({
  firstName: yup
    .string()
    .min(2, "first name must have at least 2 characters")
    .required("Enter the first name"),
  lastName: yup
    .string()
    .min(2, "last name must have at least 2 characters")
    .required("Enter the last name"),
  email: yup.string().email().required("Enter the email"),
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
    .oneOf([yup.ref("password"), null], "Passwords must match"),
  passwordResetQuestion: yup.string().required("Select a question"),
  answer: yup.string().required("Enter the password"),
});

var errorss = "";

const SignupForm = (props) => {
  const appContext = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [signUpData, setSignupData] = useState({
    firstName: "",
    lastName: "",
    teleNo: "",
    passwordConfirm: "",
    email: "",
    password: "",
    passwordResetQuestion: "",
    answer: "",
  });

  const onSubmitHand = async (values, {setSubmitting}) => {
    setLoading(true);

    console.log(values);
    setSignupData(values);

    try {
      const response = await fetch(`${proxy}/users/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const responseData = await response.json();
      console.log(responseData);
      if (!responseData.login) {
        setError("lol");
        errorss = responseData.message;
        throw new Error(responseData.message);
      }
      appContext.setProductsMethod();
      appContext.addCurrentUser(responseData.user);
      appContext.login();
      appContext.setCheckCustomerMethod();

      appContext.setWishListmethod(values.email);
      setLoading(false);
      console.log(responseData);
    } catch (errorss) {
      console.log(errorss);
      setLoading(false);
      setError(errorss.message || "Something went wrong, try again later");
    }
  };

  return (
    <React.Fragment>
      <div className="signupFormHead">
        <Formik
          validationSchema={schema}
          onSubmit={onSubmitHand}
          initialValues={signUpData}
        >
          {({
              handleSubmit,
              isSubmitting,
              handleChange,
              handleBlur,
              resetForm,
              setFieldValue,
              values,
              touched,
              isValid,
              errors,
            }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <Form.Row>
                <Form.Group as={Col} md="6" controlId="validationFormik01">
                  <Form.Label
                    style={{
                      fontFamily: "Roboto Slab",
                      fontSize: "16px",
                    }}
                  >
                    First Name
                  </Form.Label>
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
                    <i>{errors.firstName}</i>
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="6" controlId="validationFormik02">
                  <Form.Label
                    style={{
                      fontFamily: "Roboto Slab",
                      fontSize: "16px",
                    }}
                  >
                    Last Name
                  </Form.Label>
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
                    <i>{errors.lastName}</i>
                  </Form.Control.Feedback>
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} md="12" controlId="validationFormik04">
                  <Form.Label
                    style={{
                      fontFamily: "Roboto Slab",
                      fontSize: "16px",
                    }}
                  >
                    Email
                  </Form.Label>
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
                    <i>{errors.email}</i>
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} md="12" controlId="validationFormik03">
                  <Form.Label
                    style={{
                      fontFamily: "Roboto Slab",
                      fontSize: "16px",
                    }}
                  >
                    Telephone
                  </Form.Label>
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
                    <i>{errors.teleNo}</i>
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} md="12" controlId="validationFormik05">
                  <Form.Label
                    style={{
                      fontFamily: "Roboto Slab",
                      fontSize: "16px",
                    }}
                  >
                    Password
                  </Form.Label>
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
                    <i>{errors.password}</i>
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} md="12" controlId="validationFormik05">
                  <Form.Label
                    style={{
                      fontFamily: "Roboto Slab",
                      fontSize: "16px",
                    }}
                  >
                    Confirm Password
                  </Form.Label>
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
                    isValid={touched.passwordConfirm && !errors.passwordConfirm}
                  />
                  {loading && (
                    <Spinner
                      animation="border"
                      style={{textAlign: "center", marginLeft: "49%"}}
                    />
                  )}

                  <Form.Control.Feedback type="invalid">
                    <i>{errors.passwordConfirm}</i>
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} controlId="formGridState">
                  <Form.Label
                    style={{
                      fontFamily: "Roboto Slab",
                      fontSize: "16px",
                    }}
                  >
                    Select a question to update password option..{" "}
                  </Form.Label>
                  <Form.Control
                    as="select"
                    placeholder="Confirm Password"
                    type="select"
                    name="passwordResetQuestion"
                    value={values.passwordResetQuestion}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={
                      touched.passwordResetQuestion &&
                      errors.passwordResetQuestion
                    }
                    isValid={
                      touched.passwordResetQuestion &&
                      !errors.passwordResetQuestion
                    }
                  >
                    <option></option>
                    <option value="What is the name of your first pet ? ">
                      What is the name of your first pet ?{" "}
                    </option>
                    <option value="What is your favorite color ?">
                      What is your favorite color ?{" "}
                    </option>
                    <option value="Where are your parents met ?">
                      Where are your parents met ?{" "}
                    </option>
                  </Form.Control>
                  <Form.Control.Feedback type="invalid">
                    <i>{errors.passwordResetQuestion}</i>
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="12" controlId="validationFormik05">
                  <Form.Label
                    style={{
                      fontFamily: "Roboto Slab",
                      fontSize: "16px",
                    }}
                  >
                    Answer to above question
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
                    <i>{errors.answer}</i>
                  </Form.Control.Feedback>
                </Form.Group>
              </Form.Row>

              <Button
                type="submit"
                disabled={isSubmitting}
                style={{marginTop: "5px"}}
              >
                <FaSignInAlt
                  style={{
                    marginRight: "10px",
                    marginBottom: "3px",
                    transform: "rotate(270deg)",
                  }}
                />
                SignUp
              </Button>
              {errorss && (
                <div id="loginServerError">
                  <i>{errorss}</i>
                </div>
              )}
              <Button
                onClick={resetForm}
                type="submit"
                variant="outline-danger"
                style={{marginTop: "5px", float: "right"}}
              >
                <FaMinusCircle
                  style={{
                    marginRight: "10px",
                    marginBottom: "3px",
                    transform: "rotate(270deg)",
                  }}
                />
                Reset Form
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </React.Fragment>
  );
};

export default SignupForm;
