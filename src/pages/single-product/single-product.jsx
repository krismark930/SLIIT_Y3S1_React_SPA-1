import React, {useContext} from "react";
import {Button, Card, Col, Container, Image, ListGroup, ListGroupItem, Row,} from "react-bootstrap";
import {AppContext} from "../../Context/app-context";
import {Link} from "react-router-dom";
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
  let pId = productFiltered[0].title;
  let linkzz = `/edit-product/${pId}`;

  return (
    <div
      className="loginSignupMainHead23"
      style={{marginTop: "10%", marginBottom: "4%"}}
    >
      <div className="singleproductHeader" style={{margin: "100px"}}>
        <Container>
          <Row>
            <Col>
              <Image src={productFiltered[0].image} rounded/>
            </Col>

            <Col>
              <Card style={{width: "30rem"}}>
                <Card.Body style={{textAlign: "center"}}>
                  <Card.Title>Product Title</Card.Title>
                  <Card.Title>{productFiltered[0].title}</Card.Title>
                </Card.Body>
                <ListGroup className="singleproduct-list-group-flush">
                  <ListGroupItem>
                    Brand : {productFiltered[0].brand}
                  </ListGroupItem>
                  <ListGroupItem>
                    Price : Rs.{productFiltered[0].price}.00
                  </ListGroupItem>
                  <ListGroupItem>
                    Colour : {productFiltered[0].colour}
                  </ListGroupItem>
                  <ListGroupItem>
                    Discount : {productFiltered[0].discount}
                  </ListGroupItem>
                  <ListGroupItem>About Product</ListGroupItem>
                  <ListGroupItem>
                    {productFiltered[0].discription}
                  </ListGroupItem>
                </ListGroup>
                {appContext.checkStoreManager ? (
                  <Card.Body style={{textAlign: "center"}}>
                    <Link to={linkzz}>
                      <Button variant="primary">Update</Button>
                    </Link>
                  </Card.Body>
                ) : null}

                <ListGroup className="singleproduct-list-group-flush">
                  {/* <ListGroupItem>
                    <SelectedItem id={productFiltered[0].title} />
                  </ListGroupItem> */}
                  <ListGroupItem>
                    <AddComment pid={productFiltered[0]._id}/>
                  </ListGroupItem>
                </ListGroup>
                <ListGroup className="singleproduct-list-group-flush">
                  <ListGroupItem>
                    {" "}
                    <DisplayComments pid={productFiltered[0]._id}/>
                  </ListGroupItem>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default SingleProductView;
