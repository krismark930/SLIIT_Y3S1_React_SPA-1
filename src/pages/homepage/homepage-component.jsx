import React, {useContext, useEffect} from "react";
import {AppContext} from "../../Context/app-context";
import HomeCategory from "../../components/home-category/home-category-component";
import HomePageCarousle from "../../components/homepage-carousle/homepage-carousle-component";
import "./homepage-styles.scss";
import Aos from "aos";

const Homepage = () => {
  useEffect(() => {
    // void reset();
    Aos.init({duration: 1000});
  }, []);

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
      <HomePageCarousle/>
      <div id="categoriesss">{chats}</div>
    </div>
  );
};

export default Homepage;
