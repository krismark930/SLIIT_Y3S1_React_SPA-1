import React, {useContext, useEffect, useState} from "react";
import {AppContext} from "../../Context/app-context";
import "./wishlist-item-styles.scss";
import {Button, Modal} from "react-bootstrap";
import "aos/dist/aos.css";
import Aos from "aos";

const WishListItem = ({product, removeWishItem}) => {
  const appContext = useContext(AppContext);
  const [show, setShow] = useState(false);

  useEffect(() => {
    // void reset();
    Aos.init({duration: 1000});
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div
      data-aos="fade-up"
      data-aos-duration="600"
      data-aos-delay="500"
      className="wishlist-item"
      style={{alignItems: "center"}}
    >
      <div className="image-container">
        <img src={require("../../assets/img1.jpg")} alt="item"/>
      </div>
      <span className="name" style={{fontFamily: "Roboto Slab"}}>
        {product.title}
      </span>

      <span className="price" style={{fontWeight: "700"}}>
        {" "}
        ${product.price}{" "}
      </span>
      <div className="remove-button" onClick={handleShow}>
        &#10005;
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title
            style={{
              textAlign: "center",
              margin: "auto",
              width: "100%",
              fontWeight: "700",
              fontStyle: "italic",
            }}
          >
            Confirm Delete
          </Modal.Title>
        </Modal.Header>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={() => removeWishItem(product)}>
            Confirm Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default WishListItem;
