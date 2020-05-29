import React, {useContext, useState} from "react";
import {Formik} from "formik";
import {Button, Col, Form, Spinner} from "react-bootstrap";
import * as yup from "yup";
import {FaSignInAlt} from "react-icons/fa";
import {AppContext} from "../../Context/app-context";
import {proxy} from "../../conf";

import "./product-form.scss";

const schema = yup.object().shape({
  title: yup
    .string()
    .min(2, "title must have at least 2 characters")
    .required("Enter the title"),
  brand: yup
    .string()
    .min(2, "brand must have at least 2 characters")
    .required("Enter the brand"),
  price: yup.string().required("Enter the price"),
  discount: yup.string(),
  // .required("Enter the discount"),
  colour: yup.string().required("Select a category"),
  discription: yup
    .string()
    .min(10, "add proper discription")
    .required("add discription"),
  category: yup.string().required("Select a category"),
  image: yup.string().required("add image"),
});

var errorss = "";

const ProductAddForm = (props) => {
  const appContext = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [productData, setProductData] = useState({
    title: "",
    brand: "",
    price: "",
    discount: "",
    colour: "",
    discription: "",
    category: "",
    image: "",
  });
  let categories;

  console.log(
    "-------------------------------------------------------------------------------------"
  );
  console.log(appContext.categories);

  const getCategories = async () => {
    try {
      const response = await fetch(`${proxy}/admin/category`);
      const responseData = await response.json();
      categories = responseData;
      console.log("-------------------------------------");
      console.log(responseData[0].categoryTitle);
    } catch (errors) {
      console.log(errors);
    }
  };

  getCategories();

  const onSubmitHand = async (values, {setSubmitting}) => {
    setLoading(true);

    console.log(values);
    setProductData(values);

    try {
      const response = await fetch(`${proxy}/storemanager/product`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const responseData = await response.json();
      console.log(responseData);
      if (!responseData.added) {
        setError("lol");
        errorss = responseData.message;
        throw new Error(responseData.message);
      }

      setLoading(false);
      console.log(responseData);
    } catch (errorss) {
      console.log(errorss);
      setLoading(false);
      setError(errorss.message || "Something went wrong, try again later");
    }

    console.log(errorss + " errosdfdfdf");
  };

  return (
    <React.Fragment>
      <div className="productFormHead">
        <Formik
          validationSchema={schema}
          onSubmit={onSubmitHand}
          initialValues={productData}
        >
          {({
              handleSubmit,
              isSubmitting,
              handleChange,
              handleBlur,
              values,
              touched,
              isValid,
              errors,
            }) => (
            <Form noValidate onSubmit={handleSubmit} classname="addForm">
              <Form.Row>
                <Form.Group as={Col} md="6" controlId="validationFormik01">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    placeholder="Enter Title"
                    type="text"
                    name="title"
                    value={values.title}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.title && errors.title}
                    isValid={touched.title && !errors.title}
                  />

                  <Form.Control.Feedback type="invalid">
                    {errors.title}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="6" controlId="validationFormik02">
                  <Form.Label>brand</Form.Label>
                  <Form.Control
                    placeholder="Enter Brand"
                    type="text"
                    name="brand"
                    value={values.brand}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.brand && errors.brand}
                    isValid={touched.brand && !errors.brand}
                  />

                  <Form.Control.Feedback type="invalid">
                    {errors.brand}
                  </Form.Control.Feedback>
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} controlId="formGridState">
                  <Form.Label>Select a Category </Form.Label>
                  <Form.Control
                    as="select"
                    placeholder="category"
                    type="select"
                    name="category"
                    value={values.category}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.category && errors.category}
                    isValid={touched.category && !errors.category}
                  >
                    <option></option>
                    <option value="Hat">Hat</option>
                    <option value="Women">Women</option>
                    <option value="Men">Men</option>
                    <option value="Shoes">Shoes</option>
                  </Form.Control>
                  <Form.Control.Feedback type="invalid">
                    {errors.category}
                  </Form.Control.Feedback>
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} md="12" controlId="validationFormik04">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Price"
                    name="price"
                    value={values.price}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.price && errors.price}
                    isValid={touched.price && !errors.price}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.price}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} md="12" controlId="validationFormik03">
                  <Form.Label>iscount</Form.Label>
                  <Form.Control
                    placeholder="Enter Discount"
                    type="text"
                    name="discount"
                    value={values.discount}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.discount && errors.discount}
                    isValid={touched.discount && !errors.discount}
                  />

                  <Form.Control.Feedback type="invalid">
                    {errors.discount}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridState">
                  <Form.Label>Select a Colour </Form.Label>
                  <Form.Control
                    as="select"
                    placeholder="Colour"
                    type="select"
                    name="colour"
                    value={values.colour}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.colour && errors.colour}
                    isValid={touched.colour && !errors.colour}
                  >
                    <option></option>
                    <option value="Red">Red</option>
                    <option value="Blue">Blue</option>
                    <option value="Black">Black</option>
                    <option value="White">White</option>
                  </Form.Control>
                  <Form.Control.Feedback type="invalid">
                    {errors.colour}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} md="12" controlId="validationFormik05">
                  <Form.Label>Discription</Form.Label>
                  <Form.Control
                    placeholder="Enter Discription"
                    type="text"
                    name="discription"
                    value={values.discription}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.discription && errors.discription}
                    isValid={touched.discription && !errors.discription}
                  />
                  {loading && (
                    <Spinner
                      animation="border"
                      style={{textAlign: "center", marginLeft: "49%"}}
                    />
                  )}

                  <Form.Control.Feedback type="invalid">
                    {errors.discription}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} md="12" controlId="validationFormik05">
                  <Form.Label>Image</Form.Label>
                  <Form.Control
                    placeholder="Add Image"
                    type="text"
                    name="image"
                    value={values.image}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.image && errors.image}
                    isValid={touched.image && !errors.image}
                  />

                  <Form.Control.Feedback type="invalid">
                    {errors.image}
                  </Form.Control.Feedback>
                </Form.Group>
              </Form.Row>

              <Button
                type="submit"
                disabled={isSubmitting}
                style={{marginTop: "5px"}}
              >
                <FaSignInAlt
                  style={{
                    marginRight: "10px",
                    marginBottom: "3px",
                    transform: "rotate(270deg)",
                  }}
                />
                Add
              </Button>
              {errorss && <div id="loginServerError">{errorss}</div>}
            </Form>
          )}
        </Formik>
      </div>
    </React.Fragment>
  );
};

export default ProductAddForm;
