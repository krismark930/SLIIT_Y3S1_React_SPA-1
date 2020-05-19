import React, {useContext, useState,useEffect} from "react";
import {Formik} from "formik";
import {Button, Col, Form, Spinner} from "react-bootstrap";
import * as yup from "yup";
import {FaSignInAlt} from "react-icons/fa";
import {AppContext} from "../../Context/app-context";
import {Link} from "react-router-dom";
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";

import "./edit-pay-card-details-styles.scss";

const schema = yup.object().shape({
  cardType: yup
    .string()
    .min(2, " cardType must have at least 2 characters")
    .required("Enter the card type"),

    cardNumber: yup
    .string()
    .min(2, "card number must have at least 2 characters")
    .required("Enter the card number"),

});


const EditPayCardDetails  = props => {
  var payCard;
  

  const appContext = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [payCardDetails, setPayCardDetails] = useState({
    email:"",
    cardType: "",
    cardNumber: "",
    isSave: false
  });

  //var payCard;
  var currentEmail ;
  var cardid;

  

  console.log(payCardDetails);
  
    const initialCard = appContext.editPayCardDetails;
 
  //console.log("Ane manda me initial ekata ganna ewa");

  
  //console.log(initialCard[0]);
  //console.log(initialCard.name );


  useEffect(() => {
    
    
    //console.log("meka thama edit karana id eka");
    //console.log(cardid);


   axios.get('http://localhost:5000/payments/pay-card/'+cardid)
      .then(response => {

        setPayCardDetails(response.data); 
        setDetails(response.data); 
        //console.log("me edit wenna ena data");
        //console.log(response.data);     
       
        
   })
      .catch(function (error) {
        console.log(error);
      })
     

  },[cardid]);

  const setConfirmedCardCancel = () => {
    console.log("edit pay card eke cancel click kala");
    appContext.setFalsePayUserConfirmed();
  }


  const setDetails = (data) => {
    payCard = data;
    //console.log("me thama payCard");
    //console.log(payCard);
}

console.log(appContext.editPayCardDetails[0]);


//appContext.addPayCardDetails(payCard);
//console.log("me thama context eken ganna edit details");
//console.log(appContext.PayCardDetails);

  //console.log("me payCardDetails ekata set una ewa");
 // console.log(payCardDetails);

 /* const onChangeName = (e) => {
       setPayCardDetails({name:e.target.value});
  }

  const onChangePhone = (e) => {
    setPayCardDetails({phone:e.target.value});
  }

  const onChangeAddress = (e) => {
    setPayCardDetails({address:e.target.value});
  }

  const onChangeCity = (e) => {
    setPayCardDetails({city:e.target.value});
  }

  const onChangeProvince = (e) => {
    setPayCardDetails({province:e.target.value});
  }

  const onChangeIsSave = (e) => {
    setPayCardDetails({isSave:e.target.value});
  }

  const onSubmit = async(e)  => {
    e.preventDefault();

    appContext.currentCard.forEach(card => {
      currentEmail = card.email;
      //console.log(currentEmail);
    
    });
    const payCard = {
      email:currentEmail,
      name: payCardDetails.name,
      phone: payCardDetails.phone,
      address: payCardDetails.address,
      city: payCardDetails.city,
      province:payCardDetails.province,
      isSave: payCardDetails.isSave
      
    }

    console.log(payCard);

    try {
      if(payCard.isSave){
        appContext.addPayCardDetails(payCard);
      }
      const response = await fetch("http://localhost:5000/payments/pay-card/update/"+ cardid,{
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payUser)
      });

      const responseData = await response.json();
      console.log(responseData);
      if (!responseData.login) {
        setError("lol");
        
        throw new Error(responseData.message);
      }

      appContext.login();
      setLoading(false);
      console.log(responseData);
    } catch (errorss) {
      console.log(errorss);
      setLoading(false);
      setError(errorss.message || "Something went wrong, try again later");
    }
  }*/
  

 const onSubmitHandle = async (values, {setSubmitting}) => {

    
    //console.log("Ane manda");
    //console.log(values);
    setLoading(true);

    appContext.currentUser.forEach(user => {
      currentEmail = user.email;
      console.log(currentEmail);
      setPayCardDetails({...values, email:currentEmail});
    });

    payCard = {...values, email:currentEmail};
  

    appContext.setFalsePayUserConfirmed();
    appContext.setTruePayCardConfirmed();

    try {
      if(values.isSave){
        console.log(values.isSave);
        console.log(values);
        appContext.addPayCardDetails(payCard);

        cardid= appContext.editPayCardId;
 
       const response = await fetch("http://localhost:5000/payments/pay-card/update/"+cardid, {
         method: "POST",
         headers: {
           "Content-Type": "application/json"
         },
         body: JSON.stringify(payCard)
       });

       const responseData = await response.json();
       console.log(responseData);
       if (!responseData.login) {
         setError("lol");
        
         throw new Error(responseData.message);
       }
    
       //appContext.login();
       setLoading(false);
       //console.log(responseData);
      }
      

      
    } catch (errorss) {
      console.log(errorss);
      setLoading(false);
      setError(errorss.message || "Something went wrong, try again later");
    }


  
  };

  return (
    <React.Fragment>
    <div className="addPayCardDetailsFormHead">
      <Formik
        validationSchema={schema}
        onSubmit={onSubmitHandle}
        initialValues={appContext.editPayCardDetails[0]}
         >
        {({
            handleSubmit,
            isSubmitting,
            handleChange,
            handleBlur,
            values,
            touched,
            isValid,
            errors
          }) => (
          <Form noValidate onSubmit={handleSubmit}>
             <Form.Row><Form.Label><h1>Card Details</h1></Form.Label></Form.Row>
           
            
             <Form.Row>
                <Form.Group as={Col} md="12" controlId="validationFormik04">
                  <Form.Label>Card Type</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Card Type"
                    name="cardType"
                    value={values.cardType}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.cardType && errors.cardType}
                    isValid={touched.cardType && !errors.cardType}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.cardType}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} md="12" controlId="validationFormik04">
                  <Form.Label>Card Number</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Card Number"
                    name="cardNumber"
                    value={values.cardNumber}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.cardNumber && errors.cardNumber}
                    isValid={touched.cardNumber && !errors.cardNumber}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.cardNumber}
                  </Form.Control.Feedback>
                </Form.Group>

                </Form.Row>

              <Form.Row>
              <Form.Group as={Col} md="12" controlId="validationFormik04">
               <Form.Control
                    type="checkbox"
                    name="isSave" 
                    value={values.isSave }
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.isSave  && errors.isSave }
                    isValid={touched.isSave  && !errors.isSave }
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.isSave }
                  </Form.Control.Feedback>

                  <Form.Label>Save for future</Form.Label>
               </Form.Group>

             

              </Form.Row>

         
              <Button
                type="submit"
                disabled={isSubmitting}
                style={{marginTop: "5px", marginRight: "5px"}}
              >
                Confirm
              </Button>  

            </Form>
        )}
      </Formik>

      <Link to="/" onClick={() => {setConfirmedCardCancel()} }>
              <Button
                type="submit"
                style={{marginTop: "5px", marginRight: "5px"}}
              >
                Cancel
              </Button>
              </Link>
    </div>
  </React.Fragment>
  
  );
};

export default EditPayCardDetails;
