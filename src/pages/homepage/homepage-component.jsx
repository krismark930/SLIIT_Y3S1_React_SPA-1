import React, { useContext } from "react";
import { AppContext } from "../../Context/app-context";
import { Button } from "react-bootstrap";
import HomeCategory from "../../components/home-category/home-category-component";
import { wait } from "@testing-library/react";

const Homepage = () => {
  const appContext = useContext(AppContext);
  const categories = [
    {
      categoryTitle: "Hats",
    },
    {
      categoryTitle: "Men",
    },
    {
      categoryTitle: "Women",
    },
    {
      categoryTitle: "Shoes",
    },
  ];

  const products = [
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

  const chats = categories.map((item) => {
    return <HomeCategory category={item.categoryTitle} products={products} />;
  });

  return (
    <div className="homepageHead" style={{ marginTop: "5%" }}>
      {/* {appContext.products.map(cartItem => (
        <div key={cartItem.id}>
          <p>{cartItem.id}</p>
          <Button onClick={() => appContext.addItemToCart(cartItem)}>
            Add to cart
          </Button>
        </div>
      ))} */}
      {chats}
    </div>
  );
};

export default Homepage;
