import React, {useContext} from "react";

import "./pay-place-order-style.scss";
import {Button} from "react-bootstrap";
import UsePlaceOrderDetails from "../../components/use-place-order-details/use-place-order-details-component";
import {AppContext} from "../../Context/app-context";
import {Link} from "react-router-dom";


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

  if (userProvince === "Western") {
    delivery = 100.00;
  }
  if (userProvince === "Eastern") {
    delivery = 200.00;
  }
  if (userProvince === "North Central") {
    delivery = 300.00;
  }
  if (userProvince === "Northern") {
    delivery = 400.00;
  }
  if (userProvince === "North Western") {
    delivery = 500.00;
  }
  if (userProvince === "Sabaragamuwa") {
    delivery = 600.00;
  }
  if (userProvince === "Southern") {
    delivery = 700.00;
  }
  if (userProvince === "Uva") {
    delivery = 800.00;
  }
  if (userProvince === "Central") {
    delivery = 900.00;
  }

  appContext.cart.forEach(element => {
    var itemTotal = 0;
    itemTotal = element.quantity * element.price;
    subtotals = subtotals + itemTotal;
    subtotal = Number(subtotals).toFixed(2);
    
  });

  total = (Number(subtotal) + Number(delivery)).toFixed(2);

  const setConfirmedOrderCancel = () => {
    
    appContext.setFalsePayCardConfirmed();
    appContext.setFalsePayUserConfirmed();
  }


  return (
    <div
      className="loginSignupMainHead"
      style={{marginTop: "10%", marginBottom: "4%"}}
    >
      <div className="checkout-page1">
        <h2
          style={{
            padding: "10px",
            marginLeft: "10px ",
            fontSize: "55px",
            marginTop: "5%",
            fontFamily: "Roboto Slab",
            fontWeight: "700",
            textAlign: "center",
            marginBottom: "20px",
          }}
        >
          Place Order
        </h2>
        <div className="checkout-header">
          <div className="header-block">
        <span
          style={{
            marginTop: "100px",
            fontSize: "25px",
            color: "currentcolor",
            fontWeight: "600",
            fontFamily: "Lemonada",
          }}
        >
          Product
        </span>
          </div>
          <div className="header-block">
        <span
          style={{
            marginTop: "100px",
            fontSize: "25px",
            color: "currentcolor",
            fontWeight: "600",
            fontFamily: "Lemonada",
          }}
        >
          Description
        </span>
          </div>
          <div className="header-block">
        <span
          style={{
            marginTop: "100px",
            fontSize: "25px",
            color: "currentcolor",
            fontWeight: "600",
            fontFamily: "Lemonada",
          }}
        >
          Quantity
        </span>
          </div>
          <div className="header-block">
        <span
          style={{
            marginTop: "100px",
            fontSize: "25px",
            color: "currentcolor",
            fontWeight: "600",
            fontFamily: "Lemonada",
          }}
        >
          Price
        </span>
          </div>
          <div className="header-block">
              <span
                style={{
                  marginTop: "100px",
                  fontSize: "25px",
                  color: "currentcolor",
                  fontWeight: "600",
                  fontFamily: "Lemonada",
                }}
              >
                
              </span>
          </div>
        </div>
        {appContext.cart.map(cartItem => (
          <UsePlaceOrderDetails key={cartItem.id} cartItem={cartItem}/>
        ))}
        <div className="container" style={{marginBottom: "6%"}}>
          <div className="row">


            <div
              className="total col-4"
              style={{
                fontSize: "18px",
                color: "currentcolor",
                fontWeight: "700",
                fontFamily: "Lemonada",
                marginTop: "40px",
              }}
            >
              Sub Total: ${subtotal}
            </div>


            <div className="col-5"></div>


            <div className="col-3">
              <Link to="/pay-order-success">
                <Button className="buyNowBtn" type="submit" style={{float: "right"}}>
                  Buy Order
                </Button>
              </Link>
            </div>


          </div>

          <div className="row">


            <div
              className="total col-4"
              style={{
                fontSize: "18px",
                color: "currentcolor",
                fontWeight: "700",
                fontFamily: "Lemonada",
                marginTop: "40px",
              }}
            >
              Delivery Fee: ${delivery}

            </div>


            <div className="col-5"></div>

            <div className="col-3">
              <Link to="/" onClick={() => {
                setConfirmedOrderCancel()
              }}>
                <Button className="buyNowBtn" type="reset" style={{float: "right"}}>
                  Cancel
                </Button>
              </Link>
            </div>
          </div>
          <div className="container" style={{marginBottom: "6%"}}>

            <div className="row">


              <div
                className="total col-4"
                style={{
                  fontSize: "28px",
                  color: "currentcolor",
                  fontWeight: "700",
                  fontFamily: "Lemonada",
                  marginTop: "40px",
                  color: "darkblue"
                }}
              >
                TOTAL: ${total}
              </div>


              <div className="col-5"></div>
              <div className="col-3">

              </div>
            </div>

          </div>
          <div className="col-5">
            <Link to="/delivery-charges" style={{color: 'red'}}><h5>How to add delivery charges?</h5></Link>
          </div>
          <div className="col-3"></div>
          <div className="col-3"></div>
          <div className="col-3"></div>

          <div className="col-8">
            <h4>(It will be delivered within 10 days)</h4>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PayPlaceOrder;
