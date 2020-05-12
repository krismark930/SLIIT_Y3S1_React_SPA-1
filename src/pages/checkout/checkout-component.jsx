import React, {useContext} from "react";

import "./checkout-style.scss";
import {Button} from "react-bootstrap";
import CheckoutItem from "../../components/checkout-item/checkout-item-component";
import {AppContext} from "../../Context/app-context";
import {Link} from "react-router-dom";

// const cartItems = [
//   {
//     id: 1,
//     name: "Brown Brim",
//     imageUrl: "https://i.ibb.co/ZYW3VTp/brown-brim.png",
//     price: 25,
//     quantity: 3
//   },
//   {
//     id: 1,
//     name: "Brown Brim",
//     imageUrl: "https://i.ibb.co/ZYW3VTp/brown-brim.png",
//     price: 25,
//     quantity: 3
//   },
//   {
//     id: 1,
//     name: "Brown Brim",
//     imageUrl: "https://i.ibb.co/ZYW3VTp/brown-brim.png",
//     price: 25,
//     quantity: 3
//   }
// ];
const Checkout = () => {
  const appContext = useContext(AppContext);

  var total = 0;
  var totals = 0;

  appContext.cart.forEach(element => {
    var itemTotal = 0;
    itemTotal = element.quantity * element.price;
    totals = totals + itemTotal;
    total = Number(totals).toFixed(2);
    // total = (Math.round(total * 100) / 100).toFixed(2);
  });

  const setFalseEdit = () =>{
    appContext.payUserEditFalse();
  }

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

      {appContext.cart.map(cartItem => (
        <CheckoutItem key={cartItem.id} cartItem={cartItem}/>
      ))}
      <div className="total">TOTAL: ${total}</div>
      <Link to="/pay-user">
      <Button className="buyNowBtn" type="submit" style={{float: "right"}} onClick={() => {setFalseEdit()}}>
        Buy Now
      </Button>
      </Link>
    </div>
  );
};

export default Checkout;
