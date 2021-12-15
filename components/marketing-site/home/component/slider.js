import React from 'react';
import {Carousel} from "react-bootstrap";

const Slider = () => {
  return (
    <div className="slider">
      <Carousel fade indicators={false}>
        <Carousel.Item>
          <div className="flex-div">
            <img
              className="d-block w-100 home-slider-img blur-image"
              src="/images/slider-6.jpeg"
              alt="First slide"
            />
            <img
              className="d-block home-slider-img main-image"
              src="/images/slider-6.jpeg"
              alt="First slide"
            />
          </div>
          <Carousel.Caption>
            <div className="slider-caption">
              <h3>Residential Solar</h3>
              <p>Industry Leading Equipment and Materials
              Ensure The Highest Quality Installation Possible</p>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <div className="flex-div">
            <img
              className="d-block w-100 home-slider-img blur-image"
              src="/images/slider-1.jfif"
              alt="Second slide"
            />
            <img
              className="d-block home-slider-img main-image"
              src="/images/slider-1.jfif"
              alt="Second slide"
            />
          </div>
          <Carousel.Caption>
            <div className="slider-caption">
              <h3>Ground Mounted Solar</h3>
              <p>Ground Mounted Solar For Areas Where
              the Roof Of The Home Isn't The Ideal Location</p>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <div className="flex-div">
            <img
              className="d-block w-100 home-slider-img blur-image"
              src="/images/slider-3.jpg"
              alt="Third slide"
            />
            <img
              className="d-block home-slider-img main-image"
              src="/images/slider-3.jpg"
              alt="Third slide"
            />
          </div>
          <Carousel.Caption>
            <div className="slider-caption">
              <h3>Electrical Services</h3>
              <p>Wide Array Of Electrical Services To Cover Your Needs</p>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export {Slider};