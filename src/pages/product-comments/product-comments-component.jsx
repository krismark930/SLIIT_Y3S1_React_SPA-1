import React, {useContext} from "react";
import {Col, Row} from "react-bootstrap";

import "./product-comments-styles.scss";
import AddComment from "../../components/add-comment/add-comment-component";
import DisplayComments from "../../components/display-comments/display-comments-component";


import {AppContext} from "../../Context/app-context";


const ProductComments = props => {
  let route;
  const app = useContext(AppContext);

  /* if (app.editPayUser) {
     route = (<EditPayUserDetails/>);
   } else {
     route = (<AddPayUserDetails/>);
   }*/

  const productId = 1;

  return (
    <div className="loginSignupMainHead">
      <div className="container">
        <Row>
          <Col md="4">
            <div className="loginSignupPageLginForm">


              <AddComment pid={productId}/>
            </div>
          </Col>
          <Col md="6" className="clll">
            <div className="loginSignupPageSignupForm">

              <DisplayComments pid={productId}/>

            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default React.memo(ProductComments);
