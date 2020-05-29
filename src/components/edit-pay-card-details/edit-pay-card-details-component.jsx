import React, {useContext, useEffect, useState} from "react";
import {Formik} from "formik";
import {Button, Col, Form} from "react-bootstrap";
import * as yup from "yup";
import {AppContext} from "../../Context/app-context";
import {Link} from "react-router-dom";
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import {proxy} from "../../conf";
import "./edit-pay-card-details-styles.scss";

const schema = yup.object().shape({
  cardType: yup
    .string()
    .min(2, " cardType must have at least 2 characters")
    .required("Enter the card type"),

  cardNumber: yup
    .string()
    .min(2, "card number must have at least 2 characters")
    .required("Enter the card number"),

});


const EditPayCardDetails = props => {
  var payCard;


  const appContext = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [payCardDetails, setPayCardDetails] = useState({
    email: "",
    cardType: "",
    cardNumber: "",
    isSave: false
  });


  var currentEmail;
  var cardid;


  console.log(payCardDetails);

  const initialCard = appContext.editPayCardDetails;

  useEffect(() => {

    axios.get(`${proxy}/payments/pay-card/` + cardid)
      .then(response => {

        setPayCardDetails(response.data);
        setDetails(response.data);

      })
      .catch(function (error) {
        console.log(error);
      })


  }, [cardid]);

  const setConfirmedCardCancel = () => {

    appContext.setFalsePayUserConfirmed();
    appContext.setFalsePayCardConfirmed();
  }


  const setDetails = (data) => {
    payCard = data;
  }

  console.log(appContext.editPayCardDetails[0]);


  const onSubmitHandle = async (values, {setSubmitting}) => {

    setLoading(true);

    appContext.currentUser.forEach(user => {
      currentEmail = user.email;

      setPayCardDetails({...values, email: currentEmail});
    });

    payCard = {...values, email: currentEmail};


    appContext.setFalsePayUserConfirmed();
    appContext.setTruePayCardConfirmed();

    try {
      if (values.isSave) {
        console.log(values.isSave);
        console.log(values);
        appContext.addPayCardDetails(payCard);

        cardid = appContext.editPayCardId;

        const response = await fetch(`${proxy}/payments/pay-card/update/` + cardid, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(payCard)
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
      <div className="addPayCardDetailsFormHead">

        <Formik
          validationSchema={schema}
          onSubmit={onSubmitHandle}
          initialValues={appContext.editPayCardDetails[0]}
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
              <Form.Row><Form.Label><h1>Card Details</h1></Form.Label></Form.Row>


              <Form.Row>
                <Form.Group as={Col} md="12" controlId="validationFormik04">
                  <Form.Label>Card Type</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Card Type"
                    name="cardType"
                    value={values.cardType}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.cardType && errors.cardType}
                    isValid={touched.cardType && !errors.cardType}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.cardType}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} md="12" controlId="validationFormik04">
                  <Form.Label>Card Number</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Card Number"
                    name="cardNumber"
                    value={values.cardNumber}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.cardNumber && errors.cardNumber}
                    isValid={touched.cardNumber && !errors.cardNumber}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.cardNumber}
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
                className="outline"
                onClick={handleReset}
                disabled={isSubmitting}
                style={{marginTop: "5px", marginRight: "5px"}}
              >
                Reset to Saved Data
              </Button>

            </Form>
          )}
        </Formik>

        <Link to="/" onClick={() => {
          setConfirmedCardCancel()
        }} style={{marginTop: "5px", marginRight: "5px"}}>
          Back to Home
        </Link>
      </div>
    </React.Fragment>

  );
};

export default EditPayCardDetails;
