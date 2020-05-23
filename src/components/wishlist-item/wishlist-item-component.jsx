import React, { useContext, useState } from "react";
import { AppContext } from "../../Context/app-context";
import "./wishlist-item-styles.scss";
import { Button, Modal } from "react-bootstrap";

const WishListItem = ({ product, removeWishItem }) => {
  const appContext = useContext(AppContext);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div className="wishlist-item" style={{ alignItems: "center" }}>
      <div className="image-container">
        <img src={require("../../assets/img1.jpg")} alt="item" />
      </div>
      <span className="name" style={{ fontFamily: "Roboto Slab" }}>
        {product.title}
      </span>

      <span className="price" style={{ fontWeight: "700" }}>
        {" "}
        ${product.price}{" "}
      </span>
      <div className="remove-button" onClick={handleShow}>
        &#10005;
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title
            style={{
              textAlign: "center",
              margin: "auto",
              width: "100%",
              fontWeight: "700",
              fontStyle: "italic",
            }}
          >
            Confirm Delete
          </Modal.Title>
        </Modal.Header>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={() => removeWishItem(product)}>
            Confirm Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default WishListItem;
