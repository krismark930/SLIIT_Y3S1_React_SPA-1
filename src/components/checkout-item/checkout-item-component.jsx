import React, { useContext, useEffect, useState } from "react";

import "./checkout-item-styles.scss";
import { AppContext } from "../../Context/app-context";
import { Button, Modal } from "react-bootstrap";

const CheckoutItem = ({ cartItem }) => {
  const [quantityHelper, setQuantityHelper] = useState(0);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  var quantity = cartItem.quantity;

  const appContext = useContext(AppContext);

  const contentss = null;

  useEffect(() => {
    quantity = cartItem.quantity;
  });

  // var itemToSend = {
  //   id: item.id,
  //   title: item.title,
  //   price: item.price,
  //   quantity: item.quantity
  // };
  // const { name, imageUrl, price, quantity } = cartItem;

  return (
    <div className="checkout-item">
      <div className="image-container">
        <img src={cartItem.image} alt="item" />
      </div>
      <span className="name">{cartItem.title}</span>
      <span className="quantity">
        <div
          className="arrow"
          onClick={() => appContext.removeItemFromCart(cartItem)}
        >
          &#10094;
        </div>
        <span className="value">{quantity}</span>
        {console.log(cartItem)}
        <div
          className="arrow"
          onClick={() => appContext.addItemToCart(cartItem)}
        >
          &#10095;
        </div>
      </span>
      <span className="price">{cartItem.price}</span>
      <div
        className="remove-button"
        onClick={handleShow}
        style={{ fontWeight: "1000" }}
      >
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
          <Button
            variant="danger"
            onClick={() => appContext.removeCompletelyItemFromCart(cartItem)}
          >
            Confirm Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CheckoutItem;
