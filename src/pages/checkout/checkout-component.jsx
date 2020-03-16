import React from "react";

import "./checkout-style.scss";
import { Button } from "react-bootstrap";

const Checkout = () => {
  return (
    <div className="checkout-page">
      <div className="checkout-header">
        <div className="header-block">
          <span>Product</span>
        </div>
        <div className="header-block">
          <span>Description</span>
        </div>

        <div className="header-block">
          <span>Quantity</span>
        </div>
        <div className="header-block">
          <span>Price</span>
        </div>
        <div className="header-block">
          <span>Remove</span>
        </div>
      </div>
      {/* {cartItems.map(cartItem => (
        <CheckoutItem key={cartItem.id} cartItem={cartItem} />
      ))} */}
      <div className="total">TOTAL: ${}</div>
      <Button className="buyNowBtn" type="submit" style={{ float: "right" }}>
        Buy Now
      </Button>
    </div>
  );
};

export default Checkout;
