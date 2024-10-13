import React from "react";
import { Container, Row, Col, Carousel, Button } from "react-bootstrap";
import { useProductContext } from "../contexts/ProductContext";
import { Link } from "react-router-dom";
import { FaQuoteLeft } from "react-icons/fa";  // Importing icon for quotes

const HomePage = () => {
  const { allProducts } = useProductContext();
  const featuredProducts = allProducts.slice(0, 5); // Display first 5 products

  return (
    <Container fluid className="p-0">
      {/* Image Carousel */}
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={require("../assets/Nikon-Z6.jpg")}
            alt="Nikon Z6III"
            style={{ height: "400px", objectFit: "cover" }}
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={require("../assets/Nikon-Z8.jpg")}
            alt="Nikon Z8"
            style={{ height: "400px", objectFit: "cover" }}
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={require("../assets/Leica-Q3.jpg")}
            alt="Leica Q3"
            style={{ height: "400px", objectFit: "cover" }}
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
        <Row className="justify-content-center">
          {featuredProducts.map((product) => (
            <Col key={product.id} md={2} className="mb-4">
              <div className="card text-center">
                <img
                  src={product.image1}
                  className="card-img-top"
                  alt={product.model}
                  style={{ height: "150px", objectFit: "contain" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{product.model}</h5>
                  <p className="card-text">{product.brand}</p>
                  <p>{product.price}₪ ILS</p>
                  <div className="d-flex flex-column">
                    <Link to={`/product/${product.id}`}>
                      <Button variant="primary" className="mb-2">
                        View Details
                      </Button>
                    </Link>
                    <Button variant="success">Add to Cart</Button>
                  </div>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Our Brands */}
      <Container className="mt-4">
        <h2 className="text-center mb-3">Our Brands</h2>
        <Row className="justify-content-center align-items-center">
          {["GoPro", "Canon", "Fujifilm", "Sony", "Insta360", "Leica"].map((brand) => (
            <Col key={brand} xs={6} sm={4} md={3} lg={2} className="text-center mb-4">
              <img
                src={require(`../assets/${brand}.png`)}
                alt={brand}
                style={{ width: "100px", height: "100px", objectFit: "contain" }}
              />
            </Col>
          ))}
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
            <div className="card p-3 mb-3">
              <FaQuoteLeft size={30} className="mb-3" color="#6c757d"/>
              <p className="mb-0">"Great service and amazing products!"</p>
              <footer className="blockquote-footer mt-2">John Doe</footer>
            </div>
          </Col>
          <Col md={4} className="text-center">
            <div className="card p-3 mb-3">
              <FaQuoteLeft size={30} className="mb-3" color="#6c757d"/>
              <p className="mb-0">"Highly recommend Camera Kingdom!"</p>
              <footer className="blockquote-footer mt-2">Jane Smith</footer>
            </div>
          </Col>
          <Col md={4} className="text-center">
            <div className="card p-3 mb-3">
              <FaQuoteLeft size={30} className="mb-3" color="#6c757d"/>
              <p className="mb-0">"My go-to place for all camera needs."</p>
              <footer className="blockquote-footer mt-2">Mike Johnson</footer>
            </div>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default HomePage;
