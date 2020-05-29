import React, {useContext, useEffect, useState} from "react";
import {Formik} from "formik";
import {Button, Col, Form} from "react-bootstrap";
import * as yup from "yup";
import {AppContext} from "../../Context/app-context";
import {proxy} from "../../conf";
import "./add-comment-styles.scss";

const schema = yup.object().shape({
  comment: yup
    .string()
    .min(2, "comment must have at least 2 characters")
    .required("Enter the comment"),
});

const AddComment = (props) => {
  const appContext = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [commentDetails, setCommentDetails] = useState({
    product_id: "",
    user_email: "",
    user_firstName: "",
    user_lastName: "",
    comment: "",
  });

  const resvalues = {
    product_id: "",
    user_email: "",
    user_firstName: "",
    user_lastName: "",
    comment: "",
  };
  var productComment;

  var productID = props.pid;
  console.log("product id eka  " + productID);
  var currentFirstName;
  var currentLastName;
  var currentEmail;

  useEffect(() => {
    //console.log(payUserDetails);
    //payUser = payUserDetails;
  }, [commentDetails]);

  const onSubmitHandle = async (values, {setSubmitting, resetForm}) => {
    console.log("Ane manda");
    console.log(values);
    setLoading(true);

    appContext.currentUser.forEach((user) => {
      currentEmail = user.email;
      console.log(currentEmail);
      // setPayUserDetails({...values, email: currentEmail});
    });

    try {
      const response = await fetch(`${proxy}/users/current-user`);

      const responseData = await response.json();

      responseData.map((user) => {
        if (user.email === currentEmail) {
          //setPayUserDetails(payUser);
          //appContext.addEditPayUserDetails(payUser);
          currentFirstName = user.firstName;
          currentLastName = user.lastName;
        }
      });

      console.log(responseData);
      //console.log(payUserDetails);
    } catch (errorss) {
      console.log(errorss);
    }

    productComment = {
      ...values,
      user_email: currentEmail,
      user_firstName: currentFirstName,
      user_lastName: currentLastName,
      product_id: productID,
    };

    console.log("Ane manda Bn");
    console.log(currentEmail);
    console.log(productComment);

    setCommentDetails({
      ...values,
      user_email: currentEmail,
      user_firstName: currentFirstName,
      user_lastName: currentLastName,
      product_id: productID,
    });

    //pay userwa context ekata daganna
    //appContext.addPayUserDetails(payUser);

    //appContext.setTruePayUserConfirmed();

    try {
      //appContext.addPayUserDetails(payUser);

      const response = await fetch(`${proxy}/comments/product-comment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productComment),
      });

      const responseData = await response.json();
      console.log(responseData);
      if (!responseData.save) {
        setError("lol");

        throw new Error(responseData.message);
      }

      //appContext.setTruePayUserConfirmed();
      //appContext.login();
      setLoading(false);
      console.log(responseData);
    } catch (errorss) {
      //console.log(errorss);
      setLoading(false);
      setError(errorss.message || "Something went wrong, try again later");
    }

    try {
      resetForm({values: resvalues});
      console.log("me reset eke values thama");
      console.log(values);
    } catch (error) {
      console.log(error);
    }

    //document.getElementById("exampleForm").reset();
  };

  return (
    <React.Fragment>
      <div className="addPayUserDetailsFormHead">
        <Formik
          validationSchema={schema}
          onSubmit={onSubmitHandle}
          initialValues={commentDetails}
        >
          {({
              handleSubmit,
              handleReset,
              isSubmitting,
              handleChange,
              handleBlur,
              values,
              touched,
              isValid,
              errors,
            }) => (
            <Form noValidate onSubmit={handleSubmit} id="exampleForm">
              <Form.Row>
                <Form.Group as={Col} md="12" controlId="validationFormik04">
                  <Form.Label>Add Your Comment</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Your Comment"
                    name="comment"
                    value={values.comment}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.comment && errors.comment}
                    isValid={touched.comment && !errors.comment}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.comment}
                  </Form.Control.Feedback>
                </Form.Group>
              </Form.Row>

              <Button
                type="submit"
                disabled={isSubmitting}
                style={{marginLeft: "30px", marginRight: "30px"}}
              >
                Add
              </Button>

              <Button
                type="button"
                className="outline"
                onClick={handleReset}
                disabled={isSubmitting}
                style={{marginLeft: "30px", marginRight: "30px"}}
              >
                Cancel
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </React.Fragment>
  );
};

export default AddComment;
