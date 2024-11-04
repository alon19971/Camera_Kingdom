import React, { useState } from "react";
import { Container, Row, Col, Form, Card, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useProductContext } from "../contexts/ProductContext";
import ProductCard from "../components/product/ProductCard";
import CategoryCard from "../components/product/CategoryCard";

const CategoriesPage = () => {
  const { allProducts } = useProductContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const navigate = useNavigate();

  const clearInputs = () => {
    setSearchTerm("");
    setSelectedCategory("all");
  };

  const filteredProducts = allProducts.filter(
    (product) =>
      (product.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.type.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedCategory === "all" || product.category === selectedCategory)
  );

  const applyDiscount = (price, discount) => {
    return (price * (1 - discount / 100)).toFixed(2);
  };

  // 20% discount Temporarily applied for all product
  const universalDiscount = 20;

  return (
    <Container className="custom-container mt-4">
      <Row className="m-4">
        <h2>Categories</h2>
      </Row>
      <Row className="d-flex justify-content-center">
        <CategoryCard category={{ name: "cameras" }} variant={{size: "lg"}} />
        <CategoryCard category={{ name: "lenses" }} variant={{size: "lg"}} />
        <CategoryCard category={{ name: "accessories" }} variant={{size: "lg"}} />
        <CategoryCard category={{ name: "bags" }} variant={{size: "lg"}} />
        <CategoryCard category={{ name: "tripods" }} variant={{size: "lg"}} />
        <CategoryCard category={{ name: "lighting" }} variant={{size: "lg"}} />
      </Row>
      <Row className="custom-centered-buttons-container">
        <Button className="m-2" onClick={() => navigate(-1)}>
          Go back
        </Button>
        <Button className="m-2" onClick={() => navigate("/")}>
          Home
        </Button>
      </Row>
      {/* <Row className="mt-4 mb-4">
        <Col md={6}>
          <Form.Control
            className="form-controls"
            type="text"
            placeholder="Search for products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Col>
        <Col md={6}>
          <Form.Select
            className="form-controls"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="all">All Categories</option>
            <option value="cameras">Cameras</option>
            <option value="lenses">Lenses</option>
            <option value="filters">Filters</option>
            <option value="accessories">Accessories</option>
          </Form.Select>
        </Col>
      </Row>
      {filteredProducts.length === 0 ? (
        <Container>
          <h6>No {selectedCategory} found for <b>"{searchTerm}"</b></h6>
          <Button
            variant="success"
            size="lg"
            className="m-4"
            onClick={() => clearInputs()}
          >
            Clear search
          </Button>
          <br />
          <Button className="m-2" onClick={() => navigate(-1)}>
            Go back
          </Button>
          <Button className="m-2" onClick={() => navigate("/")}>
            Home
          </Button>
        </Container>
      ) : (
        <Container>
          <Row lg={4}>
            {filteredProducts.map((product) => (
              <Col key={product.id} className="mb-4">
                <ProductCard product={product} />
              </Col>
            ))}
          </Row>
        </Container>
      )} */}
    </Container>
  );
};

export default CategoriesPage;