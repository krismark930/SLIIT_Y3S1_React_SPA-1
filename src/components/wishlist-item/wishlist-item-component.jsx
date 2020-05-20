import React, { useContext } from "react";
import { AppContext } from "../../Context/app-context";
import "./wishlist-item-styles.scss";

const WishListItem = ({ product }) => {
  const appContext = useContext(AppContext);

  return (
    <div className="wishlist-item" style={{ alignItems: "center" }}>
      <div className="image-container">
        <img src={product.imageUrl} alt="item" />
      </div>
      <span className="name">{product.title}</span>

      <span className="price">{product.price}</span>
      <div
        className="remove-button"
        // onClick={() => appContext.removeCompletelyItemFromCart(productID)}
      >
        &#10005;
      </div>
    </div>
  );
};

export default WishListItem;
