import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { Col, Button } from "react-bootstrap";

import "./cart-dropdown-styles.scss";
import CartItem from "../cart-item/cart-item-component";

const CartDropdown = ({ cartItems, history, dispatch }) => {
  return (
    <div className="cart-dropdown">
      <div className="cart-items">
        {/* {cartItems.length ? (
          cartItems.map(cartItem => (
            <CartItem key={cartItem.id} item={cartItem} />
          ))
        ) : (
          <span className="red-text empty-cart">Cart is Empty</span>
        )} */}
      </div>

      <Button
        type="submit"
        style={{ marginTop: "10px" }}
        onClick={() => {
          //   history.push("/checkout");
          //   dispatch(toggeleCardHidden());
        }}
      >
        <FaShoppingCart
          style={{
            marginRight: "10px",
            marginBottom: "3px"
          }}
        />
        Go to checkout
      </Button>
    </div>
  );
};

export default CartDropdown;
