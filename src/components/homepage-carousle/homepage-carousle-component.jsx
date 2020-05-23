import React, {useState} from "react";
import {Carousel} from "react-bootstrap";
import "./homepage-carousle-style.scss";

const HomePageCarousle = (props) => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <div className="homepageCarousale">
      <Carousel activeIndex={index} onSelect={handleSelect}>
        <Carousel.Item>
          <div className="center-cropped1">
            <img
              className="d-block w-100"
              src={require("../../assets/img2.jpg")}
              alt="First slide"
            />
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div className="center-cropped2">
            <img
              className="d-block w-100"
              src={require("../../assets/img5.jpg")}
              alt="Second slide"
            />
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div className="center-cropped3">
            <img
              className="d-block w-100"
              src={require("../../assets/img4.jpg")}
              alt="Third slide"
            />
          </div>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default HomePageCarousle;
