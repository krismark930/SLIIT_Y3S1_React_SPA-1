import React from 'react';
import ProductAddForm from "../../components/product-form/product-form-component";

import "./product-add-styles.scss";

const ProductAdd = () => {

  return (
    <div>
      <div style = {{ marginTop : "5%"}}>
        <h1 style = {{ textAlign: "center"}}>Add Product</h1>
        <ProductAddForm/>
      </div>
    </div>
  );
}

export default ProductAdd;