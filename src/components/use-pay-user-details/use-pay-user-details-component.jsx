import React, {useContext,useState,useEffect} from "react";

import "./use-pay-user-details-styles.scss";
import {Button} from "react-bootstrap";
//import CheckoutItem from "../../components/checkout-item/checkout-item-component";
import {AppContext} from "../../Context/app-context";
import {Link} from "react-router-dom";



const UsePayUserDetails =  () => {
  const appContext = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [payUserDetails, setPayUserDetails] = useState({
    email:"",
    name: "",
    phone: "",
    address: "",
    city: "",
    province: "",
    isSave: false
  });

  var currentEmail ;

 

  useEffect(() => {
    appContext.currentUser.forEach(user => {
        currentEmail = user.email;
    });

    getPayUserDetails(); 
    
  }, [payUserDetails,currentEmail]);

 const setEditPayUser = (id) => {
   appContext.payUserEdit();
   appContext.setEditPayUserID(id);
   console.log("hi machan edit wada");
 console.log(id);
 }


const DeletePayUser = async (id) => {
  //console.log("hi oya delete eka athule");
  
  try {

    const response = await fetch('http://localhost:5000/payments/pay-user/'+id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
     
    });

    const responseData = await response.json();
    console.log(responseData);
    console.log("hi delete una");
    getPayUserDetails();
   
    setLoading(false);
    
  } catch (errorss) {
    console.log(errorss);
    setLoading(false);
    
  }
}

  const getPayUserDetails = async() =>{
    console.log("hi details ganna awa");
    try {
        const response = await fetch("http://localhost:5000/payments/pay-user");
  
      const responseData = await response.json();
       //const userid= appContext.editPayUserId;

        responseData.map(payUser => {
          if((payUser.email === currentEmail) && (payUser.isSave)){
            setPayUserDetails(payUser);
            appContext.addEditPayUserDetails(payUser);
          }

        });
        
        console.log(responseData);
      
        
      } catch (errorss) {
        console.log(errorss);
      
      }
  }
 
  console.log(payUserDetails);
  




  return (
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

     <Link to="/pay-user">
      <Button className="buyNowBtn" type="submit" style={{margin : "10px"}}>
        Use This
      </Button>
      </Link>

      
      <Button className="buyNowBtn" type="submit" style={{margin : "10px"}} onClick={() => {setEditPayUser(payUserDetails._id)}}>
        Update
      </Button>
      

      
      <Button className="buyNowBtn" type="submit" style={{margin : "10px"}} onClick={() => {DeletePayUser(payUserDetails._id)}}>
        Delete
      </Button>
    
         
        </table>

      
      </div>
    
      

  );
};

export default UsePayUserDetails;
