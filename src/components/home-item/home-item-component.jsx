import React, { useContext } from "react";
import { Card, Button } from "react-bootstrap";
import { FaCaretDown } from "react-icons/fa";
import { AppContext } from "../../Context/app-context";

const HomeItem = ({ item }) => {
  const appContext = useContext(AppContext);
  const urls = item.productImage;
  return (
    <Card className="col-3">
      <Card.Img variant="top" src={require("../../assets/img1.jpg")} />
      <Card.Body>
        <Card.Title style={{ textAlign: "center" }}>
          {item.productName}
        </Card.Title>
        <Card.Text style={{ textAlign: "center" }}>{item.price}</Card.Text>
      </Card.Body>
      <Card.Footer style={{ textAlign: "center" }}>
        <Button
          onClick={() => appContext.addItemToCart(item)}
          variant="dark"
          style={{
            margin: "0px auto",
            width: "80%",
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
  );
};

export default HomeItem;
