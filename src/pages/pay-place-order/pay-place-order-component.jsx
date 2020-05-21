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

  var userProvince;

 
  appContext.payUserDetails.forEach(user => {
    userProvince = user.province;
  });

  var delivery;
  var subtotal = 0;
  var total = 0;
  var subtotals = 0;
  console.log(userProvince);

  if(userProvince === "Western"){
    delivery = 100.00;
  }
  if(userProvince === "Eastern"){
    delivery = 200.00;
  }
  if(userProvince === "North Central"){
    delivery = 300.00;
  }
  if(userProvince === "Northern"){
    delivery = 400.00;
  }
  if(userProvince === "North Western"){
    delivery = 500.00;
  }
  if(userProvince === "Sabaragamuwa"){
    delivery = 600.00;
  }
  if(userProvince === "Southern"){
    delivery = 700.00;
  }
  if(userProvince === "Uva"){
    delivery = 800.00;
  }
  if(userProvince === "Central"){
    delivery = 900.00;
  }

  appContext.cart.forEach(element => {
    var itemTotal = 0;
    itemTotal = element.quantity * element.price;
    subtotals = subtotals + itemTotal;
    subtotal = Number(subtotals).toFixed(2);
    // total = (Math.round(total * 100) / 100).toFixed(2);
  });

  total = (Number(subtotal) + Number(delivery)).toFixed(2);

  const setConfirmedOrderCancel = () => {
    console.log("place order eke cancel click kala");
    appContext.setFalsePayCardConfirmed();
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

      </div>

      {appContext.cart.map(cartItem => (
        <UsePlaceOrderDetails key={cartItem.id} cartItem={cartItem}/>
      ))}
      <div className="total"><h5>Sub Total: ${subtotal}</h5></div>
      <div className="total"><h5>Delivery Fee: ${delivery}</h5></div>
      <Link to="/delivery-charges">How to add delivery charges?</Link>
      <div className="total">TOTAL: ${total}</div>
      <Link to="/pay-order-success">
        <Button className="buyNowBtn" type="submit" style={{float: "right"}}>
          Buy Order
        </Button>
      </Link>
      <Link to="/" onClick={() => {
        setConfirmedOrderCancel()
      }}>
        <Button className="buyNowBtn" type="reset" style={{float: "right"}}>
          Cancel
        </Button>
      </Link>

      <div className="total"><h6>(It will be delivered within 10 days)</h6></div>

    </div>
  );
};

export default PayPlaceOrder;
