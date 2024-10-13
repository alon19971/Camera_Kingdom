import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const CategoriesPage = () => {
  return (
    <Container>
      <Row className="text-center mt-4">
        <Col md={4}>
          <Link to="/categories/cameras">
            <img src={require('../assets/Camera logo.png')} alt="Cameras" style={{ width: "150px", height: "150px" }} />
            <h3>Cameras</h3>
          </Link>
        </Col>
        <Col md={4}>
          <Link to="/categories/lenses">
            <img src={require('../assets/Lenses logo.jpeg')} alt="Lenses" style={{ width: "150px", height: "150px" }} />
            <h3>Lenses</h3>
          </Link>
        </Col>
        <Col md={4}>
          <Link to="/categories/accessories">
            <img src={require('../assets/Accessories logo.png')} alt="Accessories" style={{ width: "150px", height: "150px" }} />
            <h3>Accessories</h3>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default CategoriesPage;
