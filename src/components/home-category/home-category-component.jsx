import React from "react";
import { CardDeck } from "react-bootstrap";
import HomeItem from "../home-item/home-item-component";

const HomeCategory = ({ category, products }) => {
  var filtered = products.filter((item) => item.category == category);

  return (
    <div className="home-category wrapper container">
      <div className="row">
        <h3 style={{ padding: "10px", marginLeft: "10px ", marginTop: "3%" }}>
          {category}
        </h3>
        <CardDeck className="col-12" style={{}}>
          {filtered.slice(0, 3).map((item) => {
            return <HomeItem item={item} />;
          })}
        </CardDeck>
      </div>
    </div>
  );
};

export default HomeCategory;
