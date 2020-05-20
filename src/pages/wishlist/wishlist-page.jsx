import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../../Context/app-context";
import WishListItem from "../../components/wishlist-item/wishlist-item-component";
import { Link } from "react-router-dom";
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

  useEffect(async () => {
    let responseData = 0;
    const mail = appContext.currentUser[0].email;
    var responseError = "";
    try {
      const response = await fetch(
        `http://localhost:5000/users/getWishList/${mail}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(),
        }
      );

      responseData = await response.json();
      console.log(responseData.wishList);

      responseError = responseData.message;
      console.log(responseData);
    } catch (err) {
      console.log(err.message);
    }

    responseData.wishList.forEach(async (item) => {
      filtered = appContext.products.filter(
        (pitem) => pitem.title == item.productID
      );

      var fill = filtered.concat(filteredAll);

      filteredAll = fill;
    });
    // appContext.setWishListmethod(responseData.wishList);
    setWishList(filteredAll);
  }, []);

  //   var filtered = products.filter((item) => item.category == category);
  console.log(wishList);
  console.log("------");
  console.log(appContext);

  //   wishList.forEach(async (item) => {
  //     filtered = appContext.products.filter(
  //       (pitem) => pitem.title == item.productID
  //     );

  //     var fill = filtered.concat(filteredAll);

  //     filteredAll = fill;
  //   });

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

      console.log(responseData.message);
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
      <Link to="/pay-user">
        <Button className="buyNowBtn" type="submit" style={{ float: "right" }}>
          Add to Cart
        </Button>
      </Link>
    </div>
  );
};

export default WishListPage;
