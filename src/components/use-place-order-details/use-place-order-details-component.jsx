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

  //
  return (

    <div className="checkout-item">
      <div className="image-container">
        <img src={cartItem.image} alt="item"/>
      </div>
      <span className="name">{cartItem.title}</span>
      <span className="quantity">
      
        <span className="value">{quantity}</span>
        {console.log(cartItem)}
       
      </span>
      <span className="price">{cartItem.price}</span>
      <span></span>

    </div>

  );
};

export default UsePlaceOrderDetails;
