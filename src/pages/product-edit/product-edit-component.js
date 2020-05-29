import React from "react";
import EditProduct from "../../components/edit-product-from/edit-product-form-component";

const ProductEdit = (props) => {
  return (
    <div className="container" style={{marginTop: "5%"}}>
      <h1 style={{textAlign: "center"}}>Edit Product</h1>
      <EditProduct pId={props.match.params.pId}/>
    </div>
  );
};

export default ProductEdit;
