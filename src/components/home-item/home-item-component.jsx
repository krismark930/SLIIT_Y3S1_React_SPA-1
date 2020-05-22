import React, { useContext } from "react";
import { Button, Card } from "react-bootstrap";
import { FaCartArrowDown } from "react-icons/fa";
import { AppContext } from "../../Context/app-context";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";

const HomeItem = ({ item }) => {
  const appContext = useContext(AppContext);
  const urls = item.productImage;

  return (
    <Card
      className="col-3"
      style={{ alignItems: "center", maxWidth: "23%", margin: "10px 8px" }}
    >
      <Card.Img
        variant="top"
        style={{ width: "215px", height: "238px", margin: "10px" }}
        src={require("../../assets/img1.jpg")}
      />

      <Card.Title
        style={{
          textAlign: "center",
          margin: "10px",
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <span>{item.title}</span>
        <span>${item.price}</span>
        {appContext.loggedin ? (
          <div>
            {item.wishList ? (
              <span>
                <FaHeart
                  // onClick={() => appContext.addToWishList(item)}
                  style={{
                    marginRight: "6px",
                    marginLeft: "6px",
                    marginBottom: "3px",
                  }}
                />
              </span>
            ) : (
              <span>
                <FaRegHeart
                  onClick={() => appContext.addToWishList(item.title)}
                  style={{
                    marginRight: "6px",
                    marginLeft: "6px",
                    marginBottom: "3px",
                  }}
                />
              </span>
            )}
          </div>
        ) : null}
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
          <FaCartArrowDown
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
