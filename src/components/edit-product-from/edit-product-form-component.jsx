import React, {useContext, useState} from "react";
import {Formik} from "formik";
import {Button, Col, Form, Spinner} from "react-bootstrap";
import * as yup from "yup";
import {AppContext} from "../../Context/app-context";
import "bootstrap/dist/css/bootstrap.min.css";
import {proxy} from "../../conf";

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

const EditProduct = (props) => {
  var product;

  const appContext = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [productData, setproductData] = useState({
    title: "",
    brand: "",
    price: "",
    discount: "",
    colour: "",
    discription: "",
    category: "",
    image: "",
  });

  console.log(props.pId);
  let productFiltered = appContext.products.filter(
    (item) => item.title == props.pId
  );

  // let brand = productFiltered1[0].brand;
  // let category = productFiltered1[0].category;
  // let colour = productFiltered1[0].colour;
  // let discount = productFiltered1[0].discount;
  // let discription = productFiltered1[0].discription;
  // let image = productFiltered1[0].image;
  // let price = productFiltered1[0].price;
  // let title = productFiltered1[0].title;

  // let productFiltered = {
  //   title: title,
  //   brand: brand,
  //   price: price,
  //   discount: discount,
  //   colour: colour,
  //   discription: discription,
  //   category: category,
  //   image: image,
  // };

  console.log("+*+**+*+*+*+*+*+*+*");
  console.log(productFiltered);

  const onSubmitHandle = async (values, {setSubmitting}) => {
    product = {...values};
    console.log(values);
    try {
      const response = await fetch(
        // `${proxy}/storemanager/product/${props.pId}`,
        `${proxy}/storemanager/product/${props.pId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(product),
        }
      );

      const responseData = await response.json();
      console.log(responseData);

      //appContext.login();
      setLoading(false);
      //console.log(responseData);
    } catch (errorss) {
      console.log(errorss);
      setLoading(false);
      setError(errorss.message || "Something went wrong, try again later");
    }
  };

  const removeItem = async () => {
    let responseData = 0;
    var responseError = "";
    console.log("eeeeeeeeeeeeeeeeeeeeeeeeee");

    try {
      const response = await fetch(
        `${proxy}/storemanager/product/${props.pId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(),
        }
      );

      responseData = await response.json();

      console.log(responseData.message);
      console.log(appContext);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <React.Fragment>
      <div className="productEditFormHead">
        <Formik
          validationSchema={schema}
          onSubmit={onSubmitHandle}
          initialValues={productFiltered[0]}
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
            <Form noValidate onSubmit={handleSubmit}>
              <Form.Row>
                <Form.Group as={Col} md="6" controlId="validationFormik01">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    placeholder="Title"
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
                    placeholder="brand"
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
                    <option>{values.category}</option>
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
                    placeholder="Price"
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
                  <Form.Label>Discount</Form.Label>
                  <Form.Control
                    placeholder="Discount"
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
                  <Form.Label>Select a colour </Form.Label>
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
                    <option>{values.color}</option>
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
                    placeholder="Discription"
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
                  <Form.Label>Add Image</Form.Label>
                  <Form.Control
                    placeholder="Image"
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

              <div
                className="row"
                style={{
                  marginBottom: "4%",
                  textAlign: "center",
                  marginTop: "4%",
                }}
              >
                <div className="col-4">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    style={{
                      marginTop: "5px",
                      marginRight: "5px",
                      width: "169px",
                    }}
                  >
                    Update
                  </Button>
                </div>
                <div className="col-4">
                  <Button
                    type="button"
                    variant="danger"
                    onClick={removeItem}
                    style={{
                      marginTop: "5px",
                      marginRight: "5px",
                      width: "169px",
                    }}
                  >
                    Delete
                  </Button>
                </div>
                <div className="col-4">
                  <Button
                    type="button"
                    variant="warning"
                    onClick={handleReset}
                    disabled={isSubmitting}
                    style={{
                      marginTop: "5px",
                      marginRight: "5px",
                      width: "169px",
                    }}
                  >
                    Reset to Saved Data
                  </Button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </React.Fragment>
  );
};

export default EditProduct;
