import React from "react";
import { Card, Button } from "react-bootstrap";
import { FaCaretDown } from "react-icons/fa";

const HomeItem = ({ productName, price, productImage }) => {
  return (
    <div className="col-3">
      <Card>
        <Card.Img variant="top" src={require({ productImage })} />
        <Card.Body>
          <Card.Title style={{ textAlign: "center" }}>{productName}</Card.Title>
          <Card.Text style={{ textAlign: "center" }}>{price}</Card.Text>
        </Card.Body>
        <Card.Footer style={{ textAlign: "center" }}>
          <Button
            variant="dark"
            style={{
              margin: "0px auto",
              width: "60%",
            }}
          >
            Add to Cart{" "}
            <FaCaretDown
              style={{
                marginRight: "10px",
                marginBottom: "3px",
              }}
            />
          </Button>
        </Card.Footer>
      </Card>
    </div>
  );
};

export default HomeItem;
