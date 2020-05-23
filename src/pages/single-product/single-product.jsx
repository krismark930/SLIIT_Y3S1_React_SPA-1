import React from "react";

const SingleProductView = (props) => {
  console.log(props.match.params.product);

  return <div className="singleproductHeader"></div>;
};

export default SingleProductView;
