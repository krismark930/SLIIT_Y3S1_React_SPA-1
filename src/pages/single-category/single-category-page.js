import React, { useContext } from "react";
import HomeItem from "../../components/home-item/home-item-component";
import { AppContext } from "../../Context/app-context";
import "./single-category-styles.scss";

const SingleCategory = (props) => {
  const appContext = useContext(AppContext);
  console.log(props.match.params.category);

  var filtered = appContext.products.filter(
    (item) => item.category == props.match.params.category
  );

  return (
    <div className="singleCategoryTop">
      <div
        className="home-category-wrapperss container cardDeckHome"
        style={{ paddingBottom: "5%" }}
      >
        <h3
          style={{
            padding: "10px",
            marginLeft: "10px ",
            fontSize: "35px",
            marginTop: "3%",
            fontFamily: "Roboto Slab",
            fontWeight: "700",
            textAlign: "center",
            marginBottom: "20px",
          }}
        >
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
    </div>
  );
};

export default SingleCategory;
