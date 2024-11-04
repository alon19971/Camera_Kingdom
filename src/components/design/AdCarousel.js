import React from "react";
import { Carousel } from "react-bootstrap";
import NikonZ6 from '../../assets/Nikon-Z6.jpg';
import NikonZ8 from '../../assets/Nikon-Z8.jpg';
import LeicaQ3 from '../../assets/Leica-Q3.jpg';


const AdCarousel = () => {
  return (
    <Carousel interval={3000} pause="none" indicators={true}>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={NikonZ6}
          alt="Nikon Z6III"
          style={{ height: "400px", objectFit: "cover" }}
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={NikonZ8}
          alt="Nikon Z8"
          style={{ height: "400px", objectFit: "cover" }}
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={LeicaQ3}
          alt="Leica Q3"
          style={{ height: "400px", objectFit: "cover" }}
        />
      </Carousel.Item>
    </Carousel>
  );
};

export default AdCarousel;
