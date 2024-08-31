import React from "react";
import { Container, Row, Col, Carousel } from "react-bootstrap";
import { useProductContext } from "../contexts/ProductContext";

const HomePage = () => {
  const { allProducts } = useProductContext();

  return (
    <Container fluid className="p-0">
      {/* Image Carousel */}
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={require("../assets/Nikon-Z6.jpg")}
            alt="Nikon Z6III"
            style={{ height: "500px", objectFit: "cover" }}
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={require("../assets/Nikon-Z8.jpg")}
            alt="Nikon Z8"
            style={{ height: "500px", objectFit: "cover" }}
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={require("../assets/Leica-Q3.jpg")}
            alt="Leica Q3"
            style={{ height: "500px", objectFit: "cover" }}
          />
        </Carousel.Item>
      </Carousel>

      <Container className="mt-4">
        {/* Welcome and Featured Products */}
        <Row className="mb-4">
          <Col>
            <div className="promo-banner text-center">
              <h1>Welcome to Camera Kingdom</h1>
              <p>Your one-stop shop for all camera needs</p>
            </div>
          </Col>
        </Row>
        <h2 className="mb-3 text-center">Featured Products</h2>
        <Row>
          <Col>
            <Carousel className="featured-carousel">
              {allProducts.map((product) => (
                <Carousel.Item key={product.id} interval={3000}>
                  <img src={product.image1} height={200} alt={product.model} />
                  <Carousel.Caption
                    style={{
                      position: "static",
                      paddingTop: "10px",
                      color: "black",
                    }}
                  >
                    <h3>{product.model}</h3>
                    <p>{product.brand}</p>
                  </Carousel.Caption>
                </Carousel.Item>
              ))}
            </Carousel>
          </Col>
        </Row>
      </Container>

      {/* Why Shop With Us? */}
      <Container className="mt-4">
        <Row className="justify-content-center">
          <Col
            md={8}
            className="text-center"
            style={{
              backgroundColor: "#f8f9fa",
              padding: "20px",
              borderRadius: "10px",
              boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
              marginTop: "20px",
            }}
          >
            <h2 style={{ fontWeight: "bold", marginBottom: "15px" }}>
              Why Shop with Us?
            </h2>
            <p style={{ fontSize: "1.1rem", color: "#6c757d" }}>
              At Camera Kingdom, we offer the latest camera models, expert advice, 
              and exceptional customer service. Enjoy competitive pricing, fast shipping, 
              and a wide selection of accessories. Your satisfaction is our priority.
            </p>
          </Col>
        </Row>
      </Container>

      {/* Customer Reviews */}
      <Container className="mt-4">
        <h2 className="mb-3 text-center">What Our Customers Say</h2>
        <Row className="justify-content-center">
          <Col md={4} className="text-center">
            <p>"Great service and amazing products!" - John Doe</p>
          </Col>
          <Col md={4} className="text-center">
            <p>"Highly recommend Camera Kingdom!" - Jane Smith</p>
          </Col>
          <Col md={4} className="text-center">
            <p>"My go-to place for all camera needs." - Mike Johnson</p>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default HomePage;
