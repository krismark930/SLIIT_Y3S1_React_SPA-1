import React from "react";
import {CardDeck} from "react-bootstrap";
import HomeItem from "../home-item/home-item-component";
import "./home-category-styles.scss";
import {Link} from "react-router-dom";

const HomeCategory = ({category, products}) => {
  var filtered = products.filter((item) => item.category == category);

  return (
    <div className="home-category-wrapper container cardDeckHome">
      <div className="row">
        <h3 style={{padding: "10px", marginLeft: "10px ", marginTop: "3%"}}>
          <Link to={`/product-category/${category}`} style={{color: "black"}}>
            {category}
          </Link>
        </h3>
        <CardDeck className="col-12 " style={{}}>
          {filtered.slice(0, 4).map((item) => {
            return <HomeItem item={item}/>;
          })}
        </CardDeck>
      </div>
    </div>
  );
};

export default HomeCategory;
