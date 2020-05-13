import React, {useContext, useEffect, useState} from "react";
import {Formik} from "formik";
import {Button, Col, Form} from "react-bootstrap";
import * as yup from "yup";
import {AppContext} from "../../Context/app-context";
import {Link} from "react-router-dom";
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";

import "./edit-pay-user-details-styles.scss";

const schema = yup.object().shape({
  name: yup
    .string()
    .min(2, " name must have at least 2 characters")
    .required("Enter the name"),
  phone: yup
    .string()
    .matches(
      /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/g,
      "Enter a valid telephone number"
    )
    .required("Enter the telephone number"),
  address: yup
    .string()
    .min(2, "address must have at least 2 characters")
    .required("Enter the address"),
  city: yup
    .string()
    .min(2, "city must have at least 2 characters")
    .required("Enter the city"),
  province: yup
    .string()
    .min(2, "province must have at least 2 characters")
    .required("Enter the province")

});


const EditPayUserDetails = props => {
  var payUser;


  const appContext = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [payUserDetails, setPayUserDetails] = useState({
    email: "",
    name: "fgdhdhd",
    phone: "",
    address: "",
    city: "",
    province: "",
    isSave: false
  });

  //var payUser;
  var currentEmail;
  var userid;


  console.log(payUserDetails);

  //const initialUser = appContext.editPayUserDetails;

  //console.log("Ane manda me initial ekata ganna ewa");


  //console.log(initialUser[0]);
  //console.log(initialUser.name );


  useEffect(() => {


    //console.log("meka thama edit karana id eka");
    //console.log(userid);


    axios.get('http://localhost:5000/payments/pay-user/' + userid)
      .then(response => {

        setPayUserDetails(response.data);
        setDetails(response.data);
        //console.log("me edit wenna ena data");
        //console.log(response.data);     


      })
      .catch(function (error) {
        console.log(error);
      })


  }, [setDetails, userid]);

  const setDetails = (data) => {
    payUser = data;
    //console.log("me thama payUser");
    //console.log(payUser);
  }


//appContext.addPayUserDetails(payUser);
//console.log("me thama context eken ganna edit details");
//console.log(appContext.PayUserDetails);

  //console.log("me payUserDetails ekata set una ewa");
  // console.log(payUserDetails);

  /* const onChangeName = (e) => {
        setPayUserDetails({name:e.target.value});
   }

   const onChangePhone = (e) => {
     setPayUserDetails({phone:e.target.value});
   }

   const onChangeAddress = (e) => {
     setPayUserDetails({address:e.target.value});
   }

   const onChangeCity = (e) => {
     setPayUserDetails({city:e.target.value});
   }

   const onChangeProvince = (e) => {
     setPayUserDetails({province:e.target.value});
   }

   const onChangeIsSave = (e) => {
     setPayUserDetails({isSave:e.target.value});
   }

   const onSubmit = async(e)  => {
     e.preventDefault();

     appContext.currentUser.forEach(user => {
       currentEmail = user.email;
       //console.log(currentEmail);

     });
     const payUser = {
       email:currentEmail,
       name: payUserDetails.name,
       phone: payUserDetails.phone,
       address: payUserDetails.address,
       city: payUserDetails.city,
       province:payUserDetails.province,
       isSave: payUserDetails.isSave

     }

     console.log(payUser);

     try {
       if(payUser.isSave){
         appContext.addPayUserDetails(payUser);
       }
       const response = await fetch("http://localhost:5000/payments/pay-user/update/"+ userid,{
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
      setPayUserDetails({...values, email: currentEmail});
    });

    payUser = {...values, email: currentEmail};

    // console.log("Ane manda Bn");
    // console.log(currentEmail);
    //console.log(currentEmail);
    //console.log(payUser);


    try {
      if (values.isSave) {
        appContext.addPayUserDetails(payUser);
      }

      userid = appContext.editPayUserId;

      const response = await fetch("http://localhost:5000/payments/pay-user/update/" + userid, {
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
      //appContext.login();
      setLoading(false);
      //console.log(responseData);
    } catch (errorss) {
      console.log(errorss);
      setLoading(false);
      setError(errorss.message || "Something went wrong, try again later");
    }


  };

  return (
    <React.Fragment>
      <div className="addPayUserDetailsFormHead">
        <Formik
          validationSchema={schema}
          onSubmit={onSubmitHandle}
          initialValues={appContext.editPayUserDetails[0]}
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


              <Form.Row>
                <Form.Group as={Col} md="12" controlId="validationFormik04">
                  <Form.Label>Name11</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Name"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.name && errors.name}
                    isValid={touched.name && !errors.name}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.name}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} md="12" controlId="validationFormik04">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Phone"
                    name="phone"
                    value={values.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.phone && errors.phone}
                    isValid={touched.phone && !errors.phone}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.phone}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} md="12" controlId="validationFormik04">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Address"
                    name="address"
                    value={values.address}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.address && errors.address}
                    isValid={touched.address && !errors.address}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.address}
                  </Form.Control.Feedback>
                </Form.Group>


              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} md="6" controlId="validationFormik01">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    placeholder="City"
                    type="text"
                    name="city"
                    value={values.city}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.city && errors.city}
                    isValid={touched.city && !errors.city}
                  />

                  <Form.Control.Feedback type="invalid">
                    {errors.city}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} md="6" controlId="formGridState">
                  <Form.Label>
                    Province{" "}
                  </Form.Label>
                  <Form.Control
                    as="select"
                    placeholder="Province"
                    type="select"
                    name="province"
                    value={values.province}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={
                      touched.province &&
                      errors.province
                    }
                    isValid={
                      touched.province &&
                      !errors.province
                    }
                  >
                    <option></option>
                    <option value="Western">
                      1.Western{" "}
                    </option>
                    <option value="Eastern">
                      2.Eastern{" "}
                    </option>
                    <option value="North Central">
                      3.North Central{" "}
                    </option>
                    <option value="Northern">
                      4.Northern{" "}
                    </option>
                    <option value="North Western">
                      5.North Western{" "}
                    </option>
                    <option value="Sabaragamuwa">
                      6.Sabaragamuwa{" "}
                    </option>
                    <option value=" Southern">
                      7. Southern{" "}
                    </option>
                    <option value=" Uva">
                      8. Uva{" "}
                    </option>
                    <option value="Central">
                      9.Central{" "}
                    </option>

                  </Form.Control>
                  <Form.Control.Feedback type="invalid">
                    {errors.province}
                  </Form.Control.Feedback>
                </Form.Group>


              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} md="12" controlId="validationFormik04">
                  <Form.Control
                    type="checkbox"
                    name="isSave"
                    value={values.isSave}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.isSave && errors.isSave}
                    isValid={touched.isSave && !errors.isSave}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.isSave}
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

              <Link to="/">
                <Button
                  type="reset"
                  disabled={isSubmitting}
                  style={{marginTop: "5px", marginRight: "5px"}}
                >
                  Cancel
                </Button>
              </Link>

            </Form>
          )}
        </Formik>
      </div>
    </React.Fragment>

  );
};

export default EditPayUserDetails;
