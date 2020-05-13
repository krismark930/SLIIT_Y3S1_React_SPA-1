import React, {useContext,useState,useEffect} from "react";

import "./use-pay-card-details-styles.scss";
import {Button} from "react-bootstrap";
//import CheckoutItem from "../../components/checkout-item/checkout-item-component";
import {AppContext} from "../../Context/app-context";
import {Link} from "react-router-dom";



const UsePayCardDetails =  () => {
  const appContext = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [payCardDetails, setPayCardDetails] = useState({
    email:"",
    cardType: "",
    cardNumber: "",
    isSave: false
  });

  var currentEmail ;

 

  useEffect(() => {
    appContext.currentUser.forEach(user => {
        currentEmail = user.email;
    });

    getPayCardDetails(); 
    
  }, [payCardDetails,currentEmail,isDelete]);

 const setEditPayCard = (id) => {
   appContext.payCardEdit();
   appContext.setEditPayCardID(id);
   console.log("hi machan edit wada");
 console.log(id);
 }


const DeletePayCard = async (id) => {
  //console.log("hi oya delete eka athule");
  
  try {

    const response = await fetch('http://localhost:5000/payments/pay-card/'+id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
     
    });

    const responseData = await response.json();
    console.log(responseData);
    //console.log("hi delete una");
   // currentEmail = " ";
    //getPayCardDetails();
    if(responseData){ 
      setIsDelete(true);
    }
   
    setLoading(false);
    
  } catch (errorss) {
    console.log(errorss);
    setLoading(false);
    
  }
}

  const getPayCardDetails = async() =>{
    console.log("hi details ganna awa");
    console.log(currentEmail);
    try {
        const response = await fetch("http://localhost:5000/payments/pay-card");
  
      const responseData = await response.json();
       //const cardid= appContext.editPayCardId;

        responseData.map(payCard => {
          if((payCard.email === currentEmail) && (payCard.isSave)){
            
            setPayCardDetails(payCard);
            appContext.addEditPayCardDetails(payCard);
          }

        });
        
        console.log(responseData);
        console.log(payCardDetails);
        
      
        
      } catch (errorss) {
        console.log(errorss);
      
      }
  }
 
 /* if(isDelete){
    currentEmail = " ";
    getPayCardDetails();
    console.log("me is delete check karapu eka");
  }*/
 
  console.log(isDelete);
  console.log(currentEmail);
  




  return (
    <div>
       {isDelete ? (<div><h2>There is no saved data to display</h2></div>) : (<div>
        <h2>Saved Card Details</h2>
         <table className="table">
         
          <thead className="thead-light">
            <tr>
              <th>Card Type</th>
              <th>Card Number</th>
    
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{payCardDetails.cardType}</td>
              <td>{payCardDetails.cardNumber}</td>
          
            </tr> 
            </tbody>

     <Link to="/pay-card">
      <Button className="buyNowBtn" type="submit" style={{margin : "10px"}}>
        Use This
      </Button>
      </Link>

      
      <Button className="buyNowBtn" type="submit" style={{margin : "10px"}} onClick={() => {setEditPayCard(payCardDetails._id)}}>
        Update
      </Button>
      

      
      <Button className="buyNowBtn" type="submit" style={{margin : "10px"}} onClick={() => {DeletePayCard(payCardDetails._id)}}>
        Delete
      </Button>
    
         
        </table></div>
       )}
        
      
      </div>
    
      

  );
};

export default UsePayCardDetails;
