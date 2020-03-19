import React, { useContext, useState } from "react";

import "./checkout-item-styles.scss";
import { AppContext } from "../../Context/app-context";

const CheckoutItem = ({ cartItem }) => {
  // const [quantityHelper, setQuantityHelper] = useState(0);

  // setQuantityHelper(cartItem.quantity);

  const appContext = useContext(AppContext);

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
        <img src={cartItem.id} alt="item" />
      </div>
      <span className="name">{cartItem.title}</span>
      <span className="quantity">
        <div className="arrow">&#10094;</div>
        <span className="value">{cartItem.quantity}</span>
        {console.log(cartItem)}
        <div
          className="arrow"
          onClick={() => appContext.addItemToCart(cartItem)}
        >
          &#10095;
        </div>
      </span>
      <span className="price">{cartItem.price}</span>
      <div className="remove-button">&#10005;</div>
    </div>
  );
};

export default CheckoutItem;
