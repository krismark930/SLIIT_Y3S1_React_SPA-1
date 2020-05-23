import React, {useContext, useState} from "react";
import {Button} from "react-bootstrap";
import {Link} from "react-router-dom";
import {AppContext} from "../../Context/app-context";
import Modal from 'react-bootstrap/Modal'


const PlaceOrderSuccessful = props => {
  const appContext = useContext(AppContext);



  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);
  //const handleShow = () => setShow(true);

  const setConfirmedBackToHome = () => {
    
    appContext.setFalsePayCardConfirmed();
    appContext.setFalsePayUserConfirmed();
  }


  return (


    <div>
      <Modal show={show} onHide={handleClose}>
        <div  style={{border:'solid gray 3px'}}>
      

        <Modal.Body>
        <h4>Your Order has been confirmed successfully!</h4>
        </Modal.Body>
        <Modal.Footer>

          <Link to="/" onClick={() => {
            setConfirmedBackToHome()
          }}>
            <Button variant="primary" style={{width:'100px'}}>
              OK
            </Button>
          </Link>
        </Modal.Footer>
        </div>
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
