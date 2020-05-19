import React, { useContext } from "react";
import { AppContext } from "../../Context/app-context";
import { Button } from "react-bootstrap";
import HomeCategory from "../../components/home-category/home-category-component";
import { wait } from "@testing-library/react";
import HomePageCarousle from "../../components/homepage-carousle/homepage-carousle-component";
import "./homepage-styles.scss";

const Homepage = () => {
  const appContext = useContext(AppContext);

  const chats = appContext.categories.map((item) => {
    return (
      <HomeCategory
        category={item.categoryTitle}
        products={appContext.products}
      />
    );
  });

  return (
    <div className="homepageHead">
      {/* {appContext.products.map(cartItem => (
        <div key={cartItem.id}>
          <p>{cartItem.id}</p>
          <Button onClick={() => appContext.addItemToCart(cartItem)}>
            Add to cart
          </Button>
        </div>
      ))} */}
      <HomePageCarousle />
      {chats}
    </div>
  );
};

export default Homepage;
