import React, {useContext, useState} from "react";
import {Formik} from "formik";
import {Button, Col, Form, Row, Spinner} from "react-bootstrap";
import * as yup from "yup";
import {FaSignInAlt, FaUnlockAlt} from "react-icons/fa";
import {AppContext} from "../../Context/app-context";
import {Link} from "react-router-dom";
import {proxy} from "../../conf";

const schema = yup.object().shape({
  email: yup.string().email().required("Enter the email"),
  password: yup.string().required("Enter the password"),
});

var errorss = "";

const LoginForm = (props) => {
  const appContext = useContext(AppContext);
  appContext.editStoreManagerFalse();
  appContext.editCategoryFalse();
  appContext.editExistingCategoryFalse();
  appContext.editExistingStoreManagerFalse();

  const [loading, setLoading] = useState(false);
  const [errorLogin, seterrorLogin] = useState(null);

  var responseError = "";
  const [loginData, setloginData] = useState({
    email: "",
    password: "",
  });

  const onSubmitHand = async (values, {setSubmitting}) => {
    setLoading(true);
    console.log("login eke submit athulata awa" + values);
    console.log(values);
    setloginData(values);

    try {
      const response = await fetch(`${proxy}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const responseData = await response.json();
      // console.log(responseData.userDetails);

      if (!responseData.login) {
        errorss = responseData.message;
        throw new Error(responseData.message);
      }
      responseError = responseData.message;
      // console.log(responseData.userDetails);
      if (responseData.type == "Administrator") {
        console.log("--------------");
        // console.log(responseData.type);
        console.log("Administrator");
        appContext.setCheckAdminMethod();
      } else if (responseData.type == "Store Manager") {
        console.log("--------------");
        console.log("Store Manager");
        // console.log(responseData.type);
        appContext.setChecksetCheckStoreManagerMethod();
      } else if (responseData.type == "Customer") {
        console.log("--------------");
        console.log(responseData.type);
        console.log("Customerrdfdsfsdfsdf");
        appContext.setCheckCustomerMethod();
      }

      appContext.login();
      appContext.setCategoriesMethod();
      appContext.setProductsMethod();
      console.log("-------------");
      console.log(responseData.userDetails);
      appContext.addCurrentUser(values);
      appContext.setWishListmethod(values.email);
      console.log(appContext.addCurrentUser(responseData.userDetails));
      setLoading(false);
    } catch (err) {
      seterrorLogin(err.message);
      console.log(err.message);
      setLoading(false);
    }
    console.log(errorss + " errrrrr");
  };

  return (
    <div className="loginComponentHead">
      <Formik
        validationSchema={schema}
        onSubmit={onSubmitHand}
        initialValues={{
          email: loginData.email,
          password: loginData.password,
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
            errors,
          }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Form.Row>
              <Form.Group as={Col} md="12" controlId="validationFormik01">
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
              <Form.Group as={Col} md="12" controlId="validationFormik02">
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
                {loading && (
                  <Spinner
                    animation="border"
                    style={{textAlign: "center", marginLeft: "44%"}}
                  />
                )}
                <Form.Control.Feedback type="invalid">
                  <i>{errors.password}</i>
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>
            <Row>
              <Col md={4}>
                <Button type="submit" style={{}} disabled={isSubmitting}>
                  <FaSignInAlt
                    style={{
                      marginRight: "10px",
                      marginBottom: "3px",
                    }}
                  />
                  Login
                </Button>
              </Col>
              <Col md={1}></Col>

              <Link to="/forgot-password">
                <Col
                  md={6}
                  style={{
                    paddingTop: "7px",
                    fontWeight: "500",
                    color: "red",
                    fontSize: "14px",
                    maxWidth: "100%",
                    marginLeft: "14px",
                  }}
                >
                  <Button
                    type="submit"
                    variant="outline-danger"
                    style={{marginTop: "-6px", float: "right"}}
                  >
                    <FaUnlockAlt
                      style={{
                        marginRight: "10px",
                        marginBottom: "3px",
                      }}
                    />
                    Forgot Password
                  </Button>
                </Col>
              </Link>
            </Row>
            <Row/>
            <i>{errorss && <div id="loginServerError">{errorss}</div>}</i>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
