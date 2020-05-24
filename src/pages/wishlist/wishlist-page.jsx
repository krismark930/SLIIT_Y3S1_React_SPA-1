import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../Context/app-context";
import WishListItem from "../../components/wishlist-item/wishlist-item-component";
import { Button } from "react-bootstrap";
import "./wishlist-styles.scss";
import { FaCartArrowDown, FaRegHourglass } from "react-icons/fa";
import "aos/dist/aos.css";
import Aos from "aos";
import { proxy } from "../../conf";

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
    Aos.init({ duration: 1000 });
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
      const response = await fetch(`${proxy}/users/deleteWishList/${mail}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(),
      });

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

  const removeWishItem = async (product) => {
    let responseData = 0;
    const mail = appContext.currentUser[0].email;
    var responseError = "";
    let titles = product.title;
    try {
      const response = await fetch(
        `${proxy}/users/deleteFromWishList/${mail}/${titles}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(),
        }
      );

      let tempChnage = { ...product, wishList: 0 };

      console.log(tempChnage);

      appContext.setChangeWishListProduct(tempChnage);

      responseData = await response.json();
      appContext.setWishListmethod(appContext.currentUser[0].email);
      console.log(responseData.message);
      console.log(appContext);
    } catch (err) {
      console.log(err.message);
    }

    let arr = wishList.filter((pitem) => pitem.title != product.title);
    setWishList(arr);
  };
  return (
    <div className="wishlistHead">
      <div className="wishlist-page">
        {wishList.length ? (
          <h2
            data-aos="fade-up"
            data-aos-duration="600"
            data-aos-delay="500"
            style={{
              padding: "10px",
              marginLeft: "10px",
              fontSize: "35px",
              marginTop: "5%",
              fontFamily: "Roboto Slab",
              fontWeight: "700",
              textAlign: "center",
              marginBottom: "20px",
            }}
          >
            Wish List
          </h2>
        ) : (
          <div
            data-aos="fade-up"
            data-aos-duration="600"
            data-aos-delay="500"
            style={{ textAlign: "center" }}
          >
            <p
              style={{
                marginTop: "100px",
                fontSize: "25px",
                color: "rgb(0, 123, 255)",
                fontWeight: "600",
                fontFamily: "Lemonada",
              }}
            >
              There's nothing in the Wish List
            </p>

            <FaRegHourglass
              style={{
                marginRight: "10px",
                marginBottom: "3px",
                fontSize: "123px",
                color: "rgb(0, 123, 255)",
              }}
            />
          </div>
        )}
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
        {wishList.length ? (
          <Button
            data-aos="flip-right"
            data-aos-duration="600"
            data-aos-delay="500"
            className="buyNowBtn"
            type="submit"
            style={{ float: "right", marginBottom: "40px" }}
            onClick={() => moveWishListToCart()}
          >
            Add to Cart
            <FaCartArrowDown
              style={{
                marginLeft: "8px",
                marginBottom: "3px",
                fontSize: "18px",
                // color: "rgb(0, 123, 255)",
              }}
            />
          </Button>
        ) : null}
      </div>
    </div>
  );
};

export default WishListPage;
