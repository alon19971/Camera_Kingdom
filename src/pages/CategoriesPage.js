import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import cameraLogo from "../assets/Camera logo.png";   
import lensesLogo from "../assets/Lenses logo.jpeg";
import accessoriesLogo from "../assets/Accessories logo.png";
import bagLogo from "../assets/Bag logo.png";         
import lightingLogo from "../assets/Lighting logo.png";
import tripodsLogo from "../assets/Tripods logo.png";

const CategoriesPage = () => {
  return (
    <Container className="mt-4">
      <Row className="text-center mb-4">
        <Col>
          <h1>Categories</h1>
        </Col>
      </Row>
      <Row className="text-center">
        <Col md={4}>
          <Link to="/categories/cameras">
            <img src={cameraLogo} alt="Cameras" style={{ height: "100px" }} />
            <h4>Cameras</h4>
          </Link>
        </Col>
        <Col md={4}>
          <Link to="/categories/lenses">
            <img src={lensesLogo} alt="Lenses" style={{ height: "100px" }} />
            <h4>Lenses</h4>
          </Link>
        </Col>
        <Col md={4}>
          <Link to="/categories/accessories">
            <img src={accessoriesLogo} alt="Accessories" style={{ height: "100px" }} />
            <h4>Accessories</h4>
          </Link>
        </Col>
      </Row>
      <Row className="text-center mt-4">
        <Col md={4}>
          <Link to="/categories/bags">
            <img src={bagLogo} alt="Bags" style={{ height: "100px" }} />
            <h4>Bags</h4>
          </Link>
        </Col>
        <Col md={4}>
          <Link to="/categories/lighting">
            <img src={lightingLogo} alt="Lighting" style={{ height: "100px" }} />
            <h4>Lighting</h4>
          </Link>
        </Col>
        <Col md={4}>
          <Link to="/categories/tripods">
            <img src={tripodsLogo} alt="Tripods" style={{ height: "100px" }} />
            <h4>Tripods</h4>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default CategoriesPage;
