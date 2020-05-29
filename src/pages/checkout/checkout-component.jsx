import React, {useContext, useEffect} from "react";

import "./checkout-style.scss";
import {Button} from "react-bootstrap";
import CheckoutItem from "../../components/checkout-item/checkout-item-component";
import {AppContext} from "../../Context/app-context";
import {FaHandHoldingUsd, FaRegHourglass} from "react-icons/fa";
import {Link} from "react-router-dom";
import "aos/dist/aos.css";
import Aos from "aos";
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
  useEffect(() => {
    // void reset();
    Aos.init({duration: 1000});
  }, []);
  const appContext = useContext(AppContext);

  var total = 0;
  var totals = 0;

  appContext.cart.forEach((element) => {
    var itemTotal = 0;
    itemTotal = element.quantity * element.price;
    totals = totals + itemTotal;
    total = Number(totals).toFixed(2);
    // total = (Math.round(total * 100) / 100).toFixed(2);
  });

  const setFalseEdit = () => {
    console.log("edit click kala");
    appContext.payUserEditFalse();
    appContext.payCardEditFalse();
    console.log("edit click kala");
    console.log(appContext);
  };

  let classNamesss = appContext.cart.length ? "checkOutHead" : null;

  return (
    <div className={classNamesss} style={{minHeight: "57vh"}}>
      {appContext.cart.length ? (
        <div className="checkout-page">
          <h2
            data-aos="fade-up"
            data-aos-duration="600"
            data-aos-delay="100"
            style={{
              padding: "10px",
              marginLeft: "10px ",
              fontSize: "35px",
              marginTop: "5%",
              fontFamily: "Roboto Slab",
              fontWeight: "700",
              textAlign: "center",
              marginBottom: "20px",
            }}
          >
            Checkout Here
          </h2>
          <div className="checkout-header">
            <div className="header-block">
              <span
                data-aos="fade-down"
                data-aos-duration="600"
                data-aos-delay="400"
                style={{
                  marginTop: "100px",
                  fontSize: "15px",
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
                data-aos="fade-down"
                data-aos-duration="600"
                data-aos-delay="500"
                style={{
                  marginTop: "100px",
                  fontSize: "15px",
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
                data-aos="fade-down"
                data-aos-duration="600"
                data-aos-delay="600"
                style={{
                  marginTop: "100px",
                  fontSize: "15px",
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
                data-aos="fade-down"
                data-aos-duration="600"
                data-aos-delay="700"
                style={{
                  marginTop: "100px",
                  fontSize: "15px",
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
                data-aos="fade-down"
                data-aos-duration="600"
                data-aos-delay="800"
                style={{
                  marginTop: "100px",
                  fontSize: "15px",
                  color: "currentcolor",
                  fontWeight: "600",
                  fontFamily: "Lemonada",
                }}
              >
                Remove
              </span>
            </div>
          </div>
          {appContext.cart.map((cartItem) => (
            <CheckoutItem key={cartItem.id} cartItem={cartItem}/>
          ))}
          <div className="container" style={{marginBottom: "6%"}}>
            <div className="row">
              <div
                // data-aos="zoom-in"
                // data-aos-duration="600"
                // data-aos-delay="200"
                className="total col-4"
                style={{
                  fontSize: "18px",
                  color: "currentcolor",
                  fontWeight: "700",
                  fontFamily: "Lemonada",
                  marginTop: "40px",
                }}
              >
                TOTAL: ${total}
              </div>

              <div className="col-5"></div>
              <div className="col-3">
                <Link to="/pay-user">
                  <Button
                    // data-aos="flip-left"
                    // data-aos-duration="600"
                    // data-aos-delay="200"
                    className="buyNowBtn"
                    type="submit"
                    style={{
                      float: "right",
                      fontWeight: "700",
                      fontFamily: "Roboto Slab",
                    }}
                    onClick={() => {
                      setFalseEdit();
                    }}
                  >
                    Buy Now
                    <FaHandHoldingUsd
                      style={{
                        marginLeft: "10px",
                        // marginBottom: "3px",
                        fontSize: "22px",
                        color: "white",
                      }}
                    />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          data-aos="flip-up"
          data-aos-duration="600"
          data-aos-delay="200"
          style={{
            textAlign: "center",
            marginTop: "150px",
            marginBottom: "239px",
          }}
        >
          <p
            style={{
              marginTop: "100px",
              fontSize: "25px",
              color: "rgb(0, 123, 255)",
              fontWeight: "600",
              fontFamily: "Lemonada",
            }}
          >
            There's nothing in the Checkout
          </p>

          <FaRegHourglass
            style={{
              marginRight: "10px",
              marginBottom: "3px",
              fontSize: "123px",
              color: "rgb(0, 123, 255)",
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Checkout;
