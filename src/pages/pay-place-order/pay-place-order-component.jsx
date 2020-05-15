import React, {useContext} from "react";

import "./pay-place-order-style.scss";
import {Button} from "react-bootstrap";
import UsePlaceOrderDetails from "../../components/use-place-order-details/use-place-order-details-component";
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
const PayPlaceOrder = () => {
  const appContext = useContext(AppContext);

  var delivery = 500.00;
  var subtotal = 0;
  var total = 0;
  var subtotals = 0;

  appContext.cart.forEach(element => {
    var itemTotal = 0;
    itemTotal = element.quantity * element.price;
    subtotals = subtotals + itemTotal;
    subtotal = Number(subtotals).toFixed(2);
    // total = (Math.round(total * 100) / 100).toFixed(2);
  });

  total = (Number(subtotal) + Number(delivery)).toFixed(2);


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

      </div>

      {appContext.cart.map(cartItem => (
        <UsePlaceOrderDetails key={cartItem.id} cartItem={cartItem}/>
      ))}
      <div className="total"><h5>Sub Total: ${subtotal}</h5></div>
      <div className="total"><h5>Delivery Fee: ${delivery}</h5></div>
      <div className="total"><h6>(It will be delivered within 10 days)</h6></div>
      <div className="total">TOTAL: ${total}</div>
      <Link to="/pay-user">
        <Button className="buyNowBtn" type="submit" style={{float: "right"}}>
          Buy Order
        </Button>
      </Link>
      <Link to="/">
        <Button className="buyNowBtn" type="reset" style={{float: "right"}}>
          Cancel
        </Button>
      </Link>

    </div>
  );
};

export default PayPlaceOrder;
