import React, {useContext, useState} from "react"
import {Formik} from "formik"
import {Button, Col, Form, Spinner} from "react-bootstrap"
import * as yup from "yup"
import {FaUserPlus} from "react-icons/fa"
import {AppContext} from "../../Context/app-context"
import "./admin-store-manager-form-styles.scss"

const schema = yup.object().shape({
  firstName: yup
    .string()
    .min(2, "First name must be at least 2 characters long.")
    .required("Please enter the first name."),
  lastName: yup
    .string()
    .min(2, "Last name must be at least 2 characters long.")
    .required("Please enter the last name."),
  email: yup
    .string()
    .email("Please enter a valid email address.")
    .required("Please enter the email."),
  teleNo: yup
    .string()
    .matches(
      /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/g,
      "Please enter a valid phone number."
    )
    .required("Please enter the phone number."),
  password: yup
    .string()
    .min(5, "Password must be at least 5 characters long.")
    .required("Please enter the password."),
  passwordConfirm: yup
    .string()
    .min(5, "Password must be at least 5 characters long.")
    .required("Please enter the password again for confirmation.")
    .oneOf([yup.ref("password"), null], "Please make sure the two passwords match."),
  passwordResetQuestion: yup
    .string()
    .required("Please select the password reset question."),
  answer: yup
    .string()
    .required("Please enter the answer for the password reset question.")
})

let errors_ = ""

const AddStoreManagerForm = props => {
  const appContext = useContext(AppContext)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()
  const [storeManagerData, setStoreManagerData] = useState({
    firstName: "",
    lastName: "",
    teleNo: "",
    passwordConfirm: "",
    email: "",
    password: "",
    passwordResetQuestion: "",
    answer: ""
  })

  const onSubmitHand = async (values, {setSubmitting}) => {
    setLoading(true)
    setStoreManagerData(values)
    try {
      const response = await fetch("http://localhost:5000/admin/storemanager", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(values)
      })
      const responseData = await response.json()
      setLoading(false)
    } catch (errors_) {
      setLoading(false)
      setError(errors_.message || "Something went wrong, please try again later.")
    }
  }

  return (
    <React.Fragment>
      <div>
        <Formik
          validationSchema={schema}
          onSubmit={onSubmitHand}
          initialValues={storeManagerData}
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
                <Form.Group as={Col} md="12" controlId="validationFormik02">
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
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    placeholder="Phone Number"
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
                    Password Reset Question{" "}
                  </Form.Label>
                  <Form.Control
                    as="select"
                    placeholder="Password Reset Question"
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
                    <option/>
                    <option value="What is your favorite food?">
                      What is your favorite food?{" "}
                    </option>
                    <option value="What is your favorite color?">
                      What is your favorite color?{" "}
                    </option>
                  </Form.Control>
                  <Form.Control.Feedback type="invalid">
                    {errors.passwordResetQuestion}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="12" controlId="validationFormik05">
                  <Form.Label>Answer to Password Reset Question</Form.Label>
                  <Form.Control
                    placeholder="Answer to Password Reset Question"
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
                style={{
                  marginTop: "3%",
                  marginLeft: "40%",
                  paddingLeft: "15px",
                  paddingRight: "15px",
                  paddingTop: "10px",
                  paddingBottom: "10px"
                }}
              >
                <FaUserPlus
                  style={{
                    marginRight: "9px",
                    marginBottom: "6px"
                  }}
                />
                Add
              </Button>
              {errors_ && <div id="loginServerError">{errors_}</div>}
            </Form>
          )}
        </Formik>
      </div>
    </React.Fragment>
  )
}

export default AddStoreManagerForm
