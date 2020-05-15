import React, {useContext, useEffect, useState} from "react";
import {Formik} from "formik";
import {Button, Col, Form, Spinner} from "react-bootstrap";
import * as yup from "yup";
import {FaSignInAlt} from "react-icons/fa";
import {AppContext} from "../../Context/app-context";

import "./admin-store-manager-form-edit-styles.scss";
import axios from "axios";

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
    .required("Enter the telephone number")
});

var errorss = "";

const EditStoreManagerForm = props => {
  const appContext = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [storeManagerData, setStoreManagerData] = useState({
    firstName: "",
    lastName: "",
    teleNo: "",
    passwordConfirm: "",
    email: "",
    password: "",
    passwordResetQuestion: "",
    answer: ""
  });

  const userid = appContext.editStoreManagerId;
  console.log('-----------');

  console.log(appContext);
  console.log(appContext.storeManagers[0])

  useEffect(() => {
    axios.get('http://localhost:5000/admin/storemanager/' + userid)
      .then(response => {
        console.log("434488888888888888888888888");

        console.log(response.data);
        setStoreManagerData(response.data);
        appContext.addStoreManagers(response.data);
      })
      .catch(function (error) {
        console.log(error);
      })
  }, [appContext, userid]);

  const onSubmitHand = async (values, {setSubmitting}) => {
    setLoading(true);

    console.log(values);
    setStoreManagerData(values);

    try {
      const response = await fetch("http://localhost:5000/admin/storemanager", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(values)
      });

      const responseData = await response.json();
      console.log(responseData);

      setLoading(false);
      console.log(responseData);
    } catch (errorss) {
      console.log(errorss);
      setLoading(false);
      setError(errorss.message || "Something went wrong, try again later");
    }

    console.log(errorss + " errosdfdfdf");
  };

  //
  // const index= appContext.storeManagers.findIndex(item => item._id === userid);
  // console.log("index = " + index)

  return (
    <React.Fragment>
      <div className="signupFormHead">
        <Formik
          validationSchema={schema}
          onSubmit={onSubmitHand}
          initialValues={appContext.storeManagers[0]}
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
                    {errors.passwordConfirm}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} controlId="formGridState">
                  <Form.Label>
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
                    <option value="What is the name of your first name ? ">
                      What is the name of your first name ?{" "}
                    </option>
                    <option value="What is your favorite color ?">
                      What is your favorite color ?{" "}
                    </option>
                  </Form.Control>
                  <Form.Control.Feedback type="invalid">
                    {errors.passwordResetQuestion}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="12" controlId="validationFormik05">
                  <Form.Label>Answer to above question</Form.Label>
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
                    transform: "rotate(270deg)"
                  }}
                />
                Edit
              </Button>
              {errorss && <div id="loginServerError">{errorss}</div>}
            </Form>
          )}
        </Formik>
      </div>
    </React.Fragment>
  );
};

export default EditStoreManagerForm;
