import React, {useContext,useState} from "react";
import {Button, Card, Col, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import {AppContext} from "../../Context/app-context";
import Modal from 'react-bootstrap/Modal'


const PlaceOrderSuccessful = props => {
  const appContext = useContext(AppContext);


  console.log("333333333333333333333333333pay order successful ekata eddi 33333333333333333333333333311111");
  console.log("user" + appContext.payUserConfirmed);
  console.log("card" + appContext.payCardConfirmed);

  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);
  //const handleShow = () => setShow(true);

  const setConfirmedBackToHome = () => {
    console.log("place order success eke back to home click kala");
    appContext.setFalsePayCardConfirmed();
  }


  return (
    
     
<div>
      <Modal show={show} onHide={handleClose}>
        
          <Modal.Title>Confirm Message</Modal.Title>
        
        <Modal.Body>Your Order has been confirmed successfully!</Modal.Body>
        <Modal.Footer>
        
        <Link to="/" onClick={() => {
                setConfirmedBackToHome()
              }}>
          <Button variant="primary">
            OK
          </Button>
          </Link>
        </Modal.Footer>
      </Modal>
      </div>
  );
}


 /* return (
    <div className="updatePAsswordComponentHead">
      <div className="container">


        <Row>
          <Col md="7" style={{margin: "auto", marginTop: "102px"}}>
            <Card
              body
              style={{
                borderBlockColor: "grey",
                borderWidth: "3px",
                width: "100%"
              }}
            >
              <p style={{textAlign: "center", fontWeight: "600"}}>
                Your Order has been confirmed successfully
              </p>{" "}
              <Link to="/" onClick={() => {
                setConfirmedBackToHome()
              }}>
                <Button style={{float: "center"}}>Back to Home</Button>
              </Link>
            </Card>
          </Col>
        </Row>

      </div>
    </div>
  );
};
*/


export default PlaceOrderSuccessful;
