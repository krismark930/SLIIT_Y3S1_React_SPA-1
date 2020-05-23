import React, { useContext } from "react";
import { Card, ListGroup, ListGroupItem,Container, Row, Image, Col, Label, Button} from "react-bootstrap";
import { AppContext } from "../../Context/app-context";
import "./single-product.scss";
import AddComment from "../../components/add-comment/add-comment-component";
import DisplayComments from "../../components/display-comments/display-comments-component";

const SingleProductView = (props) => {
  console.log(props.match.params.product);

  const appContext = useContext(AppContext);

  let productFiltered = appContext.products.filter(
    (item) => item.title == props.match.params.product
  );

  console.log(productFiltered);

  return (
    <div
      className="loginSignupMainHead23"
      style={{marginTop: "10%", marginBottom: "4%"}}
    >
    <div className="singleproductHeader" style={{ margin: "100px" }}>
      <Container>
        <Row>
        <Col>
          <Image rounded />
        </Col>
      
        <Col>
          <Card style={{ width: "30rem" }}>
            <Card.Body style={{textAlign:"center"}}>
              <Card.Title>Product Title</Card.Title>
              <Card.Title>{productFiltered[0].title}</Card.Title>
            </Card.Body>
            <ListGroup className="singleproduct-list-group-flush" >
              <ListGroupItem>Brand : {productFiltered[0].brand}</ListGroupItem>
              <ListGroupItem>Price : Rs.{productFiltered[0].price}.00</ListGroupItem>
              <ListGroupItem>Colour : {productFiltered[0].colour}</ListGroupItem>
              <ListGroupItem>Discount : {productFiltered[0].discount}</ListGroupItem>
              <ListGroupItem>About Product</ListGroupItem>
              <ListGroupItem>{productFiltered[0].discription}</ListGroupItem>
            </ListGroup>
            <Card.Body>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
            <Card.Body>
            <div className="loginSignupMainHead22">
      <div className="container">
        <Row>
          <Col md="4">
            <div className="loginSignupPageLginForm">


              <AddComment pid={productFiltered[0]._id}/>
            </div>
          </Col>
          <Col md="6" className="clll">
            <div className="loginSignupPageSignupForm">

              <DisplayComments pid={productFiltered[0]._id}/>

            </div>
          </Col>
        </Row>
      </div>
    </div>
            </Card.Body>
          </Card>
        </Col>
        
        </Row> 
      
      </Container>
      
    </div>
    </div>
  );
};

export default SingleProductView;
