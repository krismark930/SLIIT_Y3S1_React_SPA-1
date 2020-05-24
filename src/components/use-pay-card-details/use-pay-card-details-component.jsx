import React, {useContext, useEffect, useState} from "react";

import "./use-pay-card-details-styles.scss";
import {Button} from "react-bootstrap";
//import CheckoutItem from "../../components/checkout-item/checkout-item-component";
import {AppContext} from "../../Context/app-context";
import {FaRegHourglass} from "react-icons/fa";
import { proxy } from "../../conf";

const UsePayCardDetails = () => {
  const appContext = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [isData, setIsData] = useState();
  const [payCardDetails, setPayCardDetails] = useState({
    email: "",
    cardType: "",
    cardNumber: "",
    isSave: false
  });

  var currentEmail;
  var countThis = 0;
  var countAll;


  useEffect(() => {
    appContext.currentUser.forEach(user => {
      currentEmail = user.email;
    });

    getPayCardDetails();

  }, [payCardDetails, currentEmail, isDelete]);

  const setEditPayCard = (id) => {
    appContext.payCardEdit();
    appContext.setEditPayCardID(id);

  }


  const DeletePayCard = async (id) => {


    try {

      const response = await fetch('${proxy}/payments/pay-card/' + id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },

      });

      const responseData = await response.json();


      if (responseData) {
        setIsDelete(true);
      }

      setLoading(false);

    } catch (errorss) {
      console.log(errorss);
      setLoading(false);

    }
  }

  const getPayCardDetails = async () => {
    console.log("hi details ganna awa");
    console.log(currentEmail);
    try {
      const response = await fetch("${proxy}/payments/pay-card");

      const responseData = await response.json();


      countAll = responseData.length;

      if (countAll === 0) {
        setIsData(true);
      } else {
        setIsData(false);
      }

      responseData.map(payCard => {
        if ((payCard.email === currentEmail) && (payCard.isSave)) {

          setPayCardDetails(payCard);
          appContext.addEditPayCardDetails(payCard);
          countThis = countThis + 1;
        }

        if (countAll != 0) {
          if (countThis === 0) {
            setIsData(true);
          } else {
            setIsData(false);
          }
        }

      });

      console.log(responseData);
      console.log(payCardDetails);


    } catch (errorss) {
      console.log(errorss);

    }
  }


  const setConfirmedCard = () => {
    appContext.setFalsePayUserConfirmed();
    appContext.setTruePayCardConfirmed();

  }


  return (
    <div>
      {(isData || isDelete) ? (
        <div><h1>Saved Card Details</h1>
          <div
            style={{
              textAlign: "center",
              marginTop: "70px",
              marginBottom: "70px",
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

              <h2>There is no saved data to display</h2>
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
        </div>
      ) : (<div>
          <h1>Saved Card Details</h1>
          <div
            style={{
              textAlign: "center",
              marginTop: "30px",
              marginBottom: "30px",
            }}
          >
            <table className="table" style={{border: 'solid gray  2px'}}>

              <thead className="thead-light">
              <tr>
                <th style={{borderBottom: 'solid gray   1px', color: 'black'}}><h5>Card Type</h5></th>
                <th style={{borderBottom: 'solid gray   1px', color: 'black'}}><h5>Card Number</h5></th>

              </tr>
              </thead>
              <tbody>
              <tr>
                <td>{payCardDetails.cardType}</td>
                <td>{payCardDetails.cardNumber}</td>

              </tr>
              </tbody>

            </table>

            <Button className="buyNowBtn" type="submit" style={{margin: "10px"}} onClick={() => {
              setConfirmedCard()
            }}>
              Use This
            </Button>


            <Button className="buyNowBtn" type="submit" style={{margin: "10px"}} onClick={() => {
              setEditPayCard(payCardDetails._id)
            }}>
              Update
            </Button>


            <Button className="buyNowBtn" type="submit" style={{margin: "10px"}} onClick={() => {
              DeletePayCard(payCardDetails._id)
            }}>
              Delete
            </Button>

          </div>
        </div>
      )}


    </div>


  );
};

export default UsePayCardDetails;
