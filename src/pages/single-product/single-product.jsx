import React, { useContext } from "react";
import { Card, ListGroup, ListGroupItem,Container, Row, Image, Col, Label, Button} from "react-bootstrap";
import { AppContext } from "../../Context/app-context";

const SingleProductView = (props) => {
  console.log(props.match.params.product);

  const appContext = useContext(AppContext);

  let productFiltered = appContext.products.filter(
    (item) => item.title == props.match.params.product
  );

  console.log(productFiltered);

  return (
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
          </Card>
        </Col>
        
        </Row> 
      
      </Container>
      
    </div>
  );
};

export default SingleProductView;
