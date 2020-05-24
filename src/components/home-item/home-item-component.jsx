import React, {useContext, useEffect} from "react";
import {Button, Card} from "react-bootstrap";
import {FaCartArrowDown, FaHeart, FaRegHeart} from "react-icons/fa";
import {AppContext} from "../../Context/app-context";
import "./home-item-styles.scss";
import Aos from "aos";
import {Link} from "react-router-dom";
import "aos/dist/aos.css";

const HomeItem = ({item}) => {
  const appContext = useContext(AppContext);
  const urls = item.productImage;
  var titlez = item.title;
  var linkToss = `/singleProduct/${titlez}`;
  var templinkz = "https://i.ibb.co/0s3pdnc/adidas-nmd.png";
  useEffect(() => {
    // void reset();
    Aos.init({duration: 1000});
  }, []);

  console.log(appContext);
  console.log(appContext.payUserConfirmed);
  console.log(appContext.payCardConfirmed);
  return (
    <Card
      id="homeitemComponentCard"
      className="col-3"
      style={{
        alignItems: "center",
        maxWidth: "23%",
        margin: "10px 8px",
        border: "2px solid #007bff",
        borderRadius: "6px",
      }}
    >
      <Link to={linkToss}>
        <Card.Img
          variant="top"
          style={{width: "215px", height: "238px", margin: "10px"}}
          // src={require("../../assets/img1.jpg")}
          src={item.image}
        />
      </Link>
      <Card.Title
        style={{
          textAlign: "center",
          margin: "10px",
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <span
          data-aos="zoom-in-left"
          data-aos-duration="600"
          data-aos-delay="500"
          style={{fontFamily: "Roboto Slab"}}
        >
          {item.title}
        </span>
        <span
          data-aos="zoom-in-right"
          data-aos-duration="600"
          data-aos-delay="1000"
          style={{fontFamily: "Roboto Slab", fontWeight: "700"}}
        >
          ${item.price}
        </span>
        {appContext.checkCustomer ? (
          <div>
            {item.wishList ? (
              <span
                data-aos="zoom-in-right"
                data-aos-duration="600"
                data-aos-delay="1000"
              >
                <FaHeart
                  // onClick={() => appContext.addToWishList(item)}
                  style={{
                    marginRight: "6px",
                    marginLeft: "6px",
                    marginBottom: "3px",
                    color: "rgb(0, 123, 255)",
                  }}
                />
              </span>
            ) : (
              <span
                data-aos="zoom-in-right"
                data-aos-duration="600"
                data-aos-delay="1000"
              >
                <FaRegHeart
                  onClick={() => appContext.addToWishList(item.title)}
                  style={{
                    marginRight: "6px",
                    marginLeft: "6px",
                    marginBottom: "3px",
                    color: "rgb(0, 123, 255)",
                  }}
                />
              </span>
            )}
          </div>
        ) : null}
      </Card.Title>

      <Card.Footer style={{textAlign: "center", backgroundColor: "white"}}>
        <Button
          data-aos="flip-up"
          data-aos-duration="600"
          data-aos-delay="1000"
          onClick={() => appContext.addItemToCart(item)}
          variant="dark"
          style={{
            margin: "0px auto",
            width: "100%",
            fontWeight: "700",
            // fontFamily: "Roboto Slab",
          }}
        >
          Add to Cart{" "}
          <FaCartArrowDown
            style={{
              marginRight: "6px",
              marginLeft: "6px",
              marginBottom: "3px",
            }}
          />
        </Button>
      </Card.Footer>
    </Card>
  );
};

export default HomeItem;
