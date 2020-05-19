import React, {useContext,useState,useEffect} from "react";

import "./use-pay-user-details-styles.scss";
import {Button} from "react-bootstrap";
//import CheckoutItem from "../../components/checkout-item/checkout-item-component";
import {AppContext} from "../../Context/app-context";
import {Link} from "react-router-dom";



const UsePayUserDetails =  () => {
  const appContext = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
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
    
  }, [payUserDetails,currentEmail,isDelete]);

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
    //console.log("hi delete una");
   // currentEmail = " ";
    //getPayUserDetails();
    if(responseData){ 
      setIsDelete(true);
    }
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
        console.log(payUserDetails);
        
      
        
      } catch (errorss) {
        console.log(errorss);
      
      }
  }
 
 /* if(isDelete){
    currentEmail = " ";
    getPayUserDetails();
    console.log("me is delete check karapu eka");
  }*/
 
  console.log(isDelete);
  
  const setConfirmedUser = () => {
    appContext.setTruePayUserConfirmed();
    
   }



  return (
    <div>
       {isDelete ? (<div><h2>There is no saved data to display</h2></div>) : (<div><table className="table">
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

     
      <Button className="buyNowBtn" type="submit" style={{margin : "10px"}} onClick={() => {setConfirmedUser()} }>
        Use This
      </Button>
      

      
      <Button className="buyNowBtn" type="submit" style={{margin : "10px"}} onClick={() => {setEditPayUser(payUserDetails._id)}}>
        Update
      </Button>
      

      
      <Button className="buyNowBtn" type="submit" style={{margin : "10px"}} onClick={() => {DeletePayUser(payUserDetails._id)}}>
        Delete
      </Button>
    
         
        </table></div>
       )}
        
      
      </div>
    
      

  );
};

export default UsePayUserDetails;
