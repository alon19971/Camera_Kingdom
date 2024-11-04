import React from "react";
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

      <Container className="mt-4">
        {/* Welcome and Featured Products */}
        <Row className="mb-4">
          <Col>
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
          </Col>
        </Row>
      </Container>

      {/* Customer Reviews */}
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
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default HomePage;