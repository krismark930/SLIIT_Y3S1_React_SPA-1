import React, { useContext } from "react";
import { Card, Button } from "react-bootstrap";
import { FaCaretDown } from "react-icons/fa";
import { AppContext } from "../../Context/app-context";

const HomeItem = ({ item }) => {
  const appContext = useContext(AppContext);
  const urls = item.productImage;
  const titlePrice = `${item.title}    $${item.price} `;

  return (
    <Card className="col-3" style={{ alignItems: "center" }}>
      <Card.Img
        variant="top"
        style={{ width: "215px", height: "238px", margin: "10px" }}
        src={require("../../assets/img1.jpg")}
      />

      <Card.Title style={{ textAlign: "center", margin: "10px" }}>
        {titlePrice}
      </Card.Title>

      <Card.Footer style={{ textAlign: "center", backgroundColor: "white" }}>
        <Button
          onClick={() => appContext.addItemToCart(item)}
          variant="dark"
          style={{
            margin: "0px auto",
            width: "100%",
          }}
        >
          Add to Cart{" "}
          <FaCaretDown
            style={{
              marginRight: "6px",
              marginLeft: "6px",
              marginBottom: "3px",
            }}
          />
        </Button>
      </Card.Footer>
    </Card>
  );
};

export default HomeItem;
