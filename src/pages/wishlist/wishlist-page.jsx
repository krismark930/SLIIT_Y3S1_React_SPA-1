import React, { useContext } from "react";
import { AppContext } from "../../Context/app-context";

const WishListPage = (props) => {
  const appContetext = useContext(AppContext);
  console.log(appContetext);
  return <div className="container">WishList</div>;
};

export default WishListPage;
