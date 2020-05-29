import React, {useContext, useEffect, useState} from "react";
import {Formik} from "formik";
import {Button, Col, Form} from "react-bootstrap";
import * as yup from "yup";
import {AppContext} from "../../Context/app-context";
import {Link} from "react-router-dom";
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import {proxy} from "../../conf";
import "./edit-pay-user-details-styles.scss";

const schema = yup.object().shape({
  name: yup
    .string()
    .min(2, " name must have at least 2 characters")
    .required("Enter the name"),
  phone: yup
    .string()
    .matches(
      /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/g,
      "Enter a valid telephone number"
    )
    .required("Enter the telephone number"),
  address: yup
    .string()
    .min(2, "address must have at least 2 characters")
    .required("Enter the address"),
  city: yup
    .string()
    .min(2, "city must have at least 2 characters")
    .required("Enter the city"),
  province: yup
    .string()
    .min(2, "province must have at least 2 characters")
    .required("Enter the province")

});


const EditPayUserDetails = props => {
  var payUser;


  const appContext = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [payUserDetails, setPayUserDetails] = useState({
    email: "",
    name: "fgdhdhd",
    phone: "",
    address: "",
    city: "",
    province: "",
    isSave: false
  });

  var currentEmail;
  var userid;


  console.log(payUserDetails);

  const initialUser = appContext.editPayUserDetails;


  console.log(initialUser[0]);
  console.log(initialUser.name);


  useEffect(() => {


    axios.get(`${proxy}/payments/pay-user/` + userid)
      .then(response => {

        setPayUserDetails(response.data);
        setDetails(response.data);
        ;


      })
      .catch(function (error) {
        console.log(error);
      })


  }, [userid]);

  const setDetails = (data) => {
    payUser = data;

  }


  const setConfirmedCardCancel = () => {

    appContext.setFalsePayUserConfirmed();
    appContext.setFalsePayCardConfirmed();
  }


  const onSubmitHandle = async (values, {setSubmitting}) => {


    setLoading(true);

    appContext.currentUser.forEach(user => {
      currentEmail = user.email;

      setPayUserDetails({...values, email: currentEmail});
    });

    payUser = {...values, email: currentEmail};


    appContext.addPayUserDetails(payUser);

    appContext.setTruePayUserConfirmed();

    try {
      if (values.isSave) {


        userid = appContext.editPayUserId;

        const response = await fetch(`${proxy}/payments/pay-user/update/` + userid, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(payUser)
        });

        const responseData = await response.json();
        console.log(responseData);
        if (!responseData.login) {
          setError("lol");

          throw new Error(responseData.message);
        }

        setLoading(false);

      }


    } catch (errorss) {
      console.log(errorss);
      setLoading(false);
      setError(errorss.message || "Something went wrong, try again later");
    }


  };

  return (
    <React.Fragment>
      <div className="addPayUserDetailsFormHead">
        <Formik
          validationSchema={schema}
          onSubmit={onSubmitHandle}
          initialValues={appContext.editPayUserDetails[0]}
        >
          {({
              handleSubmit,
              handleReset,
              isSubmitting,
              handleChange,
              handleBlur,
              values,
              touched,
              isValid,
              errors
            }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <Form.Row><Form.Label><h1>Shipping Information</h1></Form.Label></Form.Row>

              <Form.Row>
                <Form.Group as={Col} md="12" controlId="validationFormik04">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Name"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.name && errors.name}
                    isValid={touched.name && !errors.name}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.name}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} md="12" controlId="validationFormik04">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Phone"
                    name="phone"
                    value={values.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.phone && errors.phone}
                    isValid={touched.phone && !errors.phone}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.phone}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} md="12" controlId="validationFormik04">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Address"
                    name="address"
                    value={values.address}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.address && errors.address}
                    isValid={touched.address && !errors.address}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.address}
                  </Form.Control.Feedback>
                </Form.Group>


              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} md="6" controlId="validationFormik01">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    placeholder="City"
                    type="text"
                    name="city"
                    value={values.city}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.city && errors.city}
                    isValid={touched.city && !errors.city}
                  />

                  <Form.Control.Feedback type="invalid">
                    {errors.city}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} md="6" controlId="formGridState">
                  <Form.Label>
                    Province{" "}
                  </Form.Label>
                  <Form.Control
                    as="select"
                    placeholder="Province"
                    type="select"
                    name="province"
                    value={values.province}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={
                      touched.province &&
                      errors.province
                    }
                    isValid={
                      touched.province &&
                      !errors.province
                    }
                  >
                    <option>Choose province</option>
                    <option value="Western">
                      1.Western{" "}
                    </option>
                    <option value="Eastern">
                      2.Eastern{" "}
                    </option>
                    <option value="North Central">
                      3.North Central{" "}
                    </option>
                    <option value="Northern">
                      4.Northern{" "}
                    </option>
                    <option value="North Western">
                      5.North Western{" "}
                    </option>
                    <option value="Sabaragamuwa">
                      6.Sabaragamuwa{" "}
                    </option>
                    <option value="Southern">
                      7. Southern{" "}
                    </option>
                    <option value="Uva">
                      8. Uva{" "}
                    </option>
                    <option value="Central">
                      9.Central{" "}
                    </option>

                  </Form.Control>
                  <Form.Control.Feedback type="invalid">
                    {errors.province}
                  </Form.Control.Feedback>
                </Form.Group>


              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} md="12" controlId="validationFormik04">
                  <Form.Check
                    type="checkbox"
                    name="isSave"
                    value={values.isSave}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.isSave && errors.isSave}
                    isValid={touched.isSave && !errors.isSave}
                    label="Save for future"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.isSave}
                  </Form.Control.Feedback>


                </Form.Group>


              </Form.Row>


              <Button
                type="submit"
                disabled={isSubmitting}
                style={{marginTop: "5px", marginRight: "5px"}}
              >
                Confirm
              </Button>


              <Button
                type="button"
                onClick={handleReset}
                disabled={isSubmitting}
                style={{marginTop: "5px", marginRight: "5px"}}
              >
                Reset to Saved Data
              </Button>

              <Link to="/" style={{marginTop: "5px", marginRight: "5px"}} onClick={() => {
                setConfirmedCardCancel()
              }}>
                Back to Home
              </Link>


            </Form>
          )}
        </Formik>
      </div>
    </React.Fragment>

  );
};

export default EditPayUserDetails;
