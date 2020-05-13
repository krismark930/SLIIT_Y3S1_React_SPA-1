import React, {useContext, useEffect, useState} from "react";

import "./use-place-order-details-styles.scss";
import {AppContext} from "../../Context/app-context";

const UsePlaceOrderDetails = ({cartItem}) => {
  const [quantityHelper, setQuantityHelper] = useState(0);

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
        <img src={cartItem.id} alt="item"/>
      </div>
      <span className="name">{cartItem.title}</span>
      <span className="quantity">
      
        <span className="value">{quantity}</span>
        {console.log(cartItem)}
       
      </span>
      <span className="price">{cartItem.price}</span>
      
    </div>
  );
};

export default UsePlaceOrderDetails;
