import React,{useContext} from "react";
import {Col, Row} from "react-bootstrap";

import "./pay-user-details-styles.scss";
import AddPayUserDetails  from "../../components/add-pay-user-details/add-pay-user-details-component";
import UsePayUserDetails  from "../../components/use-pay-user-details/use-pay-user-details-component";
import EditPayUserDetails  from "../../components/edit-pay-user-details/edit-pay-user-details-component";


import {AppContext} from "../../Context/app-context";



const PayUserDetails = props => {
  let route;
  const app = useContext(AppContext);

  if(app.editPayUser){
    route = (<EditPayUserDetails/>);
  }

  else{
    route = (<AddPayUserDetails/>);
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
              
            <UsePayUserDetails/>
              
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default React.memo(PayUserDetails);
