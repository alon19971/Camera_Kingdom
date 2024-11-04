import React from "react";
<<<<<<< HEAD
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
=======
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useProductContext } from "../contexts/ProductContext";
import AdCarousel from "../components/design/AdCarousel";
import CategoryCard from "../components/product/CategoryCard";
import FeaturedCard from "../components/product/FeaturedCard";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const { getFeaturedProducts } = useProductContext();
  const featuredProducts = getFeaturedProducts();
  const navigate = useNavigate();

  return (
    <Container fluid className="p-0">
      <AdCarousel />
>>>>>>> 893f93c (Added new sorting and search features for category pages)

      <Container className="mt-4">
        {/* Welcome and Featured Products */}
        <Row className="mb-4">
          <Col>
<<<<<<< HEAD
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
=======
            <h1>Welcome to Camera Kingdom</h1>
            <h6>Your one-stop shop for all camera needs</h6>
          </Col>
        </Row>

        <Card className="order-container bg-light p-1 mb-5">
          <h5 className="mb-3">Quick access categories:</h5>
          <Row className="ms-4">
            <CategoryCard
              category={{ name: "cameras" }}
              variant={{ size: "sm" }}
            />
            <CategoryCard
              category={{ name: "lenses" }}
              variant={{ size: "sm" }}
            />
            <CategoryCard
              category={{ name: "accessories" }}
              variant={{ size: "sm" }}
            />
            <CategoryCard
              category={{ name: "bags" }}
              variant={{ size: "sm" }}
            />
            <CategoryCard
              category={{ name: "tripods" }}
              variant={{ size: "sm" }}
            />
            <CategoryCard
              category={{ name: "lighting" }}
              variant={{ size: "sm" }}
            />
          </Row>
        </Card>

        <Row className="justify-content-center">
          <h2 className="mb-3 text-center">Featured Products</h2>
          <Card className="order-container bg-light p-1 mb-5 w-75">
            <Row className="justify-content-center">
              {featuredProducts.map((product) => (
                <FeaturedCard key={product.id} product={product} />
              ))}
            </Row>
          </Card>
        </Row>
      </Container>

      <Container className="mt-0">
>>>>>>> 893f93c (Added new sorting and search features for category pages)
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
<<<<<<< HEAD
              Why Shop with Us?
            </h2>
            <p style={{ fontSize: "1.1rem", color: "#6c757d" }}>
              At Camera Kingdom, we offer the latest camera models, expert advice, 
              and exceptional customer service. Enjoy competitive pricing, fast shipping, 
              and a wide selection of accessories. Your satisfaction is our priority.
            </p>
=======
              Why Shop With Us?
            </h2>
            <p style={{ fontSize: "1.1rem", color: "#6c757d" }}>
              At Camera Kingdom, we offer the latest camera models, expert
              advice, and exceptional customer service. Enjoy competitive
              pricing, fast shipping, and a wide selection of accessories. Your
              satisfaction is our priority.
            </p>
            <Button
              variant="success"
              size="lg"
              className="m-4"
              onClick={() => navigate("/categories")}
            >
              Start shopping!
            </Button>
>>>>>>> 893f93c (Added new sorting and search features for category pages)
          </Col>
        </Row>
      </Container>

      {/* Customer Reviews */}
<<<<<<< HEAD
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
=======
      <Container className="mt-3 mb-5">
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
>>>>>>> 893f93c (Added new sorting and search features for category pages)
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default HomePage;
