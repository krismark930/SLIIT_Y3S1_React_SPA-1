import React, {useContext, useEffect, useState} from "react";

import "./display-comments-styles.scss";
//import CheckoutItem from "../../components/checkout-item/checkout-item-component";
import {AppContext} from "../../Context/app-context";
import {proxy} from "../../conf";

const DisplayComments = (props) => {
  const appContext = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [commentDetails, setCommentDetails] = useState([]);

  var currentEmail;
  var productId = props.pid;
  console.log("!!!!!!!!!!!!!!!!!! " + productId);

  const productComments = [];

  useEffect(() => {
    /*appContext.currentUser.forEach(user => {
        currentEmail = user.email;
      });
  */
    getComments();
  }, [commentDetails, currentEmail]);

  /* const setEditPayUser = (id) => {
     appContext.payUserEdit();
     appContext.setEditPayUserID(id);
     console.log("hi machan edit wada");
     console.log(id);
   }


   const DeletePayUser = async (id) => {
     //console.log("hi oya delete eka athule");

     try {

       const response = await fetch('http://localhost:5000/payments/pay-user/' + id, {
         method: "DELETE",
         headers: {
           "Content-Type": "application/json"
         },

       });

       const responseData = await response.json();
       console.log(responseData);
       //console.log("hi delete una");
       // currentEmail = " ";
       //getPayUserDetails();
       if (responseData) {
         setIsDelete(true);
       }
       setLoading(false);

     } catch (errorss) {
       console.log(errorss);
       setLoading(false);

     }
   }*/

  const getComments = async () => {
    console.log("hi details ganna awa");
    try {
      const response = await fetch(`${proxy}/comments//product-comment`);

      const responseData = await response.json();
      //const userid= appContext.editPayUserId;

      responseData.forEach((comment) => {
        console.log("awa awa for each ekata");
        //console.log(comment);
        //console.log(comment.product_id);

        if (comment.product_id === productId) {
          console.log("44444444444 meka thama id eka 1 wana comment");
          //console.log(comment);

          productComments.push({...comment});

          //setCategories(updatedCategory);
          //appContext.addEditPayUserDetails(payUser);
        }
      });

      setCommentDetails(productComments);
      console.log(productComments);

      //console.log(responseData);
      console.log(commentDetails);
    } catch (errorss) {
      console.log(errorss);
    }
  };

  /* if(isDelete){
     currentEmail = " ";
     getPayUserDetails();
     console.log("me is delete check karapu eka");
   }*/

  /*console.log(isDelete);

  const setConfirmedUser = () => {
    appContext.setTruePayUserConfirmed();
    //pay user savewa context ekata daganna
    appContext.addPayUserDetails(payUserDetails);
  }
*/

  /*return (
    <div>
       
          <table className="table">
            <thead className="thead-light">
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Address</th>
              <th>City</th>
              <th>Province</th>
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


            <Button className="buyNowBtn" type="submit" style={{margin: "10px"}} onClick={() => {
              setConfirmedUser()
            }}>
              Use This
            </Button>


            <Button className="buyNowBtn" type="submit" style={{margin: "10px"}} onClick={() => {
              setEditPayUser(payUserDetails._id)
            }}>
              Update
            </Button>


            <Button className="buyNowBtn" type="submit" style={{margin: "10px"}} onClick={() => {
              DeletePayUser(payUserDetails._id)
            }}>
              Delete
            </Button>


          </table>
        </div>
      )}


    </div>


  );*/

  return (
    <div className="cart-dropdownss">
      <div className="cart-items">
        {commentDetails.map((comment) => {
          return (
            <div>
              <div className="container">
                <h6>
                  {comment.user_firstName} {comment.user_lastName}
                </h6>
                {comment.comment}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DisplayComments;
