import React, { useContext, useEffect, useState } from "react";

import "./use-pay-user-details-styles.scss";
import { Button } from "react-bootstrap";
//import CheckoutItem from "../../components/checkout-item/checkout-item-component";
import { AppContext } from "../../Context/app-context";
import { FaRegHourglass } from "react-icons/fa";
import { proxy } from "../../conf";

const UsePayUserDetails = () => {
  const appContext = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [isData, setIsData] = useState();
  const [payUserDetails, setPayUserDetails] = useState({
    email: "",
    name: "",
    phone: "",
    address: "",
    city: "",
    province: "",
    isSave: false,
  });

  var currentEmail;
  var countThis = 0;
  var countAll;

  useEffect(() => {
    appContext.currentUser.forEach((user) => {
      currentEmail = user.email;
    });

    getPayUserDetails();
  }, [payUserDetails, currentEmail, isDelete]);

  const setEditPayUser = (id) => {
    appContext.payUserEdit();
    appContext.setEditPayUserID(id);
    console.log(
      "**************************88edit click kala.hi machan edit wada"
    );
    console.log(id);
  };

  const DeletePayUser = async (id) => {
    console.log(
      "=======================================================hi oya delete eka athule"
    );

    try {
      const response = await fetch("${proxy}/payments/pay-user/" + id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
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
  };

  const getPayUserDetails = async () => {
    console.log("hi details ganna awa");
    try {
      const response = await fetch("${proxy}/payments/pay-user");

      const responseData = await response.json();
      //const userid= appContext.editPayUserId;
      countAll = responseData.length;

      if (countAll === 0) {
        setIsData(true);
      } else {
        setIsData(false);
      }

      responseData.map((payUser) => {
        if (payUser.email === currentEmail && payUser.isSave) {
          setPayUserDetails(payUser);
          appContext.addEditPayUserDetails(payUser);
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

      console.log(payUserDetails);
    } catch (errorss) {
      console.log(errorss);
    }
  };

  /* if(isDelete){
     currentEmail = " ";
     getPayUserDetails();
     console.log("me is delete check karapu eka");
   }*/

  console.log(isDelete);

  const setConfirmedUser = () => {
    console.log("----------------------------use this click kala");
    appContext.setTruePayUserConfirmed();
    //pay user savewa context ekata daganna
    appContext.addPayUserDetails(payUserDetails);
  };

  return (
    <div>
      {isDelete ? (
        <div>
          <h1>Saved Shipping Information</h1>
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
      ) : (
        <div>
          <h1>Saved Shipping Information</h1>
          <div
            style={{
              textAlign: "center",
              marginTop: "30px",
              marginBottom: "30px",
              width: "585px",
            }}
          >
            <table className="table" style={{ border: "solid gray  2px" }}>
              <thead className="thead-light">
                <tr>
                  <th
                    style={{ borderBottom: "solid gray   1px", color: "black" }}
                  >
                    <h5>Name</h5>
                  </th>
                  <th
                    style={{ borderBottom: "solid gray   1px", color: "black" }}
                  >
                    <h5>Phone</h5>
                  </th>
                  <th
                    style={{ borderBottom: "solid gray   1px", color: "black" }}
                  >
                    <h5>Address</h5>
                  </th>
                  <th
                    style={{ borderBottom: "solid gray   1px", color: "black" }}
                  >
                    <h5>City</h5>
                  </th>
                  <th
                    style={{ borderBottom: "solid gray   1px", color: "black" }}
                  >
                    <h5>Province</h5>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{payUserDetails.name}</td>
                  <td>{payUserDetails.phone}</td>
                  <td>{payUserDetails.address}</td>
                  <td>{payUserDetails.city}</td>
                  <td>{payUserDetails.province}</td>
                </tr>
              </tbody>
            </table>

            <Button
              className="buyNowBtn"
              type="submit"
              style={{ margin: "10px" }}
              onClick={() => {
                setConfirmedUser();
              }}
            >
              Use This
            </Button>

            <Button
              className="buyNowBtn"
              type="submit"
              style={{ margin: "10px" }}
              onClick={() => {
                setEditPayUser(payUserDetails._id);
              }}
            >
              Update
            </Button>

            <Button
              className="buyNowBtn"
              type="submit"
              style={{ margin: "10px" }}
              onClick={() => {
                DeletePayUser(payUserDetails._id);
              }}
            >
              Delete
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsePayUserDetails;
