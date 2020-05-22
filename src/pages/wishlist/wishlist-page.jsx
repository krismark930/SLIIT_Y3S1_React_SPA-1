import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../Context/app-context";
import WishListItem from "../../components/wishlist-item/wishlist-item-component";
import { Button } from "react-bootstrap";
import "./wishlist-styles.scss";

const WishListPage = (props) => {
  const appContext = useContext(AppContext);
  const [filteredProducts, setfilteredProducts] = useState([]);
  const [wishList, setWishList] = useState([]);
  var filtered;
  var filteredAll = [];
  //   let lists = appContext.wishList;

  //   console.log("-----------");
  //   console.log(lists);
  //   console.log(Object.values(lists[0]));
  //   setWishList(appContext.);

  useEffect(() => {
    let responseData = 0;

    setWishList(appContext.wishList);
  }, []);

  console.log(wishList);
  console.log("------");
  console.log(appContext);

  const moveWishListToCart = async () => {
    let responseData = 0;
    const mail = appContext.currentUser[0].email;
    var responseError = "";
    try {
      const response = await fetch(
        `http://localhost:5000/users/deleteWishList/${mail}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(),
        }
      );

      wishList.forEach((item) => {
        appContext.addItemToCart(item);
      });

      responseData = await response.json();
      appContext.setWishListmethod(appContext.currentUser[0].email);
      console.log(responseData.message);
    } catch (err) {
      console.log(err.message);
    }

    setWishList([]);
  };

  const removeWishItem = async (title) => {
    let responseData = 0;
    const mail = appContext.currentUser[0].email;
    var responseError = "";
    try {
      const response = await fetch(
        `http://localhost:5000/users/deleteFromWishList/${mail}/${title}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(),
        }
      );

      responseData = await response.json();
      appContext.setWishListmethod(appContext.currentUser[0].email);
      console.log(responseData.message);
      console.log(appContext);
    } catch (err) {
      console.log(err.message);
    }

    let arr = wishList.filter((pitem) => pitem.title != title);
    setWishList(arr);
  };
  return (
    <div className="wishlist-page">
      <h2>Wish List</h2>
      {/* <div className="checkout-header">
        <div className="header-block">
          <span>Product</span>
        </div>
        <div className="header-block">
          <span>Description</span>
        </div>

        <div className="header-block">
          <span>Price</span>
        </div>
        <div className="header-block">
          <span>Remove</span>
        </div>
      </div> */}

      {wishList.map((item) => (
        <WishListItem
          key={item.id}
          product={item}
          removeWishItem={removeWishItem}
        />
      ))}
      {/* <div className="total">TOTAL: ${total}</div> */}

      <Button
        className="buyNowBtn"
        type="submit"
        style={{ float: "right" }}
        onClick={() => moveWishListToCart()}
      >
        Add to Cart
      </Button>
    </div>
  );
};

export default WishListPage;
