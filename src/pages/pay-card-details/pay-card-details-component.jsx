import React, {useContext, useEffect} from "react";
import {Col, Row} from "react-bootstrap";

import "./pay-card-details-styles.scss";
import AddPayCardDetails from "../../components/add-pay-card-details/add-pay-card-details-component";
import UsePayCardDetails from "../../components/use-pay-card-details/use-pay-card-details-component";
import EditPayCardDetails from "../../components/edit-pay-card-details/edit-pay-card-details-component";


import {AppContext} from "../../Context/app-context";


const PayCardDetails = props => {
  let route;
  const app = useContext(AppContext);

  useEffect(() => {
    //console.log(payCardDetails);
    //payCard = payCardDetails;

  });

  if (app.editPayCard) {
    route = (<EditPayCardDetails/>);
  } else {
    route = (<AddPayCardDetails/>);
  }

  return (
    <div className="loginSignupMainHead">
      <div className="container">
        <Row>
          <Col md="4">
            <div className="loginSignupPageLginForm">


              {route}
            </div>
          </Col>
          <Col md="6" className="clll">
            <div className="loginSignupPageSignupForm">

              <UsePayCardDetails/>

            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default PayCardDetails;
