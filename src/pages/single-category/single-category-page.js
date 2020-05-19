import React from "react";
import { CardDeck } from "react-bootstrap";
import HomeItem from "../../components/home-item/home-item-component";

const SingleCategory = (props) => {
  const products = [
    {
      title: "Women",
      price: 123.0,
      category: "Women",
      productImage: "https://i.ibb.co/ZYW3VTp/brown-brim.png",
    },
    {
      title: "Women",
      price: 123.0,
      category: "Women",
      productImage: "https://i.ibb.co/ZYW3VTp/brown-brim.png",
    },
    {
      title: "Men",
      price: 123.0,
      category: "Men",
      productImage: "https://i.ibb.co/ZYW3VTp/brown-brim.png",
    },
    {
      title: "Men",
      price: 123.0,
      category: "Men",
      productImage: "https://i.ibb.co/ZYW3VTp/brown-brim.png",
    },
    {
      title: "Shoes",
      price: 123.0,
      category: "Shoes",
      productImage: "https://i.ibb.co/ZYW3VTp/brown-brim.png",
    },
    {
      title: "Women",
      price: 123.0,
      category: "Women",
      productImage: "https://i.ibb.co/ZYW3VTp/brown-brim.png",
    },
    {
      title: "Produt1",
      price: 123.0,
      category: "Women",
      productImage: "https://i.ibb.co/ZYW3VTp/brown-brim.png",
    },
    {
      title: "Produt1",
      price: 123.0,
      category: "Women",
      productImage: "https://i.ibb.co/ZYW3VTp/brown-brim.png",
    },
    {
      title: "Produt1",
      price: 123.0,
      category: "Hats",
      productImage: "https://i.ibb.co/ZYW3VTp/brown-brim.png",
    },
  ];

  console.log(props.match.params.category);

  var filtered = products.filter(
    (item) => item.category == props.match.params.category
  );

  return (
    <div className="home-category-wrapper container cardDeckHome">
      <h3 style={{ padding: "10px", marginLeft: "10px ", marginTop: "3%" }}>
        {props.match.params.category}
      </h3>
      <div className="row">
        <div className="col">
          <div className="row">
            {filtered.map((item) => {
              return <HomeItem item={item} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleCategory;
