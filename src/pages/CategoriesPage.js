import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Form } from "react-bootstrap";
import { useProductContext } from "../contexts/ProductContext";
import ProductCard from "../components/product/ProductCard";

const CategoriesPage = () => {
  const { allProducts } = useProductContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredProducts = allProducts.filter(
    (product) =>
      (product.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.type.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedCategory === "all" || product.category === selectedCategory)
  );

  return (
    <Container>
      <Row className="mt-4 mb-4">
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
      <Row>
        {filteredProducts.map((product) => (
          <Col className="d-flex justify-content-center" key={product.id}>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default CategoriesPage;
