import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { Col, Button } from "react-bootstrap";

import "./cart-dropdown-styles.scss";
import CartItem from "../cart-item/cart-item-component";
import { Link } from "react-router-dom";

const cartItems = [
  {
    id: 1,
    name: "Brown Brim",
    imageUrl: "https://i.ibb.co/ZYW3VTp/brown-brim.png",
    price: 25,
    quantity: 3
  },
  {
    id: 1,
    name: "Brown Brim",
    imageUrl: "https://i.ibb.co/ZYW3VTp/brown-brim.png",
    price: 25,
    quantity: 3
  },
  {
    id: 1,
    name: "Brown Brim",
    imageUrl: "https://i.ibb.co/ZYW3VTp/brown-brim.png",
    price: 25,
    quantity: 3
  }
];

const CartDropdown = ({ checkoutToggle }) => {
  return (
    <div className="cart-dropdown">
      <div className="cart-items">
        {cartItems.length ? (
          cartItems.map(cartItem => (
            <CartItem key={cartItem.id} item={cartItem} />
          ))
        ) : (
          <span className="red-text empty-cart">Cart is Empty</span>
        )}
      </div>

      <Link to="/checkout-page">
        <Button
          type="submit"
          style={{ marginTop: "10px" }}
          onSubmit={checkoutToggle}
        >
          <FaShoppingCart
            style={{
              marginRight: "10px",
              marginBottom: "3px"
            }}
          />
          Go to checkout
        </Button>
      </Link>
    </div>
  );
};

export default CartDropdown;
