import React, {useContext, useState} from "react";
//import {Col, Row, Form ,Button} from "react-bootstrap";
import {Link} from "react-router-dom";
import {Formik} from "formik";
import {Button, Col, Form, Row} from "react-bootstrap";
import * as yup from "yup";

import "./pay-card-details-styles.scss";
import AddPayCardDetails from "../../components/add-pay-card-details/add-pay-card-details-component";
import UsePayCardDetails from "../../components/use-pay-card-details/use-pay-card-details-component";
import EditPayCardDetails from "../../components/edit-pay-card-details/edit-pay-card-details-component";


import {AppContext} from "../../Context/app-context";

const schema = yup.object().shape({

  type: yup
    .string()
    .min(2, "payment Method must have at least 2 characters")
    .required("Select payment method"),


});

const PayCardDetails = props => {
  let route;

  const app = useContext(AppContext);


  const [paymentType, setPaymentType] = useState({
    type: "",

  });
  const [card, setCardPayment] = useState(false);

  const setConfirmedCardCancel = () => {
    console.log("add pay card eke payment type select karana eke cancel click kala");
    app.setFalsePayUserConfirmed();
  }


  const onSubmitHandle = async (values, {setSubmitting}) => {
    console.log("Ane manda");
    console.log(values);
    console.log(values.type);

    if (values.type === "card") {
      setCardPayment(true);
      setPaymentType(values.paymentType);

    }
    if (values.type === "cash") {
      app.setFalsePayUserConfirmed();
      app.setTruePayCardConfirmed();
      setPaymentType(values.type);
    }
  }

  if (app.editPayCard) {
    route = (<EditPayCardDetails/>);
  } else {
    route = (
      <React.Fragment>
        <div className="addPayCardDetailsFormHead">
          <Formik
            validationSchema={schema}
            onSubmit={onSubmitHandle}
            initialValues={paymentType}
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
                <Form.Row><Form.Label><h1>Payment Details</h1></Form.Label></Form.Row>

                <Form.Row>
                  <Form.Group as={Col} md="6" controlId="formGridState">
                    <Form.Label>
                      Payment Method{" "}
                    </Form.Label>
                    <Form.Control
                      as="select"
                      placeholder="Payment Method"
                      type="select"
                      name="type"
                      value={values.type}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={
                        touched.type &&
                        errors.type
                      }
                      isValid={
                        touched.type &&
                        !errors.type
                      }
                    >
                      <option>Choose payment method</option>
                      <option value="cash">
                        1.Cash on Delivery {" "}
                      </option>
                      <option value="card">
                        2.Card Payment{" "}
                      </option>


                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                      {errors.type}
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

                <Link to="/" onClick={() => {
                  setConfirmedCardCancel()
                }}>
                  <Button
                    type="submit"
                    style={{marginTop: "5px", marginRight: "5px"}}
                  >
                    Cancel
                  </Button>
                </Link>


                <Link to="/" style={{marginTop: "5px", marginRight: "5px"}}>
                  Back to Home
                </Link>
              </Form>
            )}
          </Formik>

          {card ? (<AddPayCardDetails/>) : (<Link to='/pay-order'></Link>)}
        </div>

      </React.Fragment>

    );
  }

  return (
    <div className="loginSignupMainHead">
      <div className="container">
        <Row>
          <Col md="6">
            <div className="loginSignupPageLginForm">

              <UsePayCardDetails/>


            </div>
          </Col>
          <Col md="6" className="clll">
            <div className="loginSignupPageSignupForm">

              {route}


            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default PayCardDetails;
