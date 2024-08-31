import React from "react";
import { Container, Row, Col, Form, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useProductContext } from "../contexts/ProductContext";

const CategoriesPage = () => {
  const { allProducts } = useProductContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredProducts = allProducts.filter((product) => {
    return (
      product.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchTerm.toLowerCase())
    ) && (selectedCategory === "all" || product.category === selectedCategory);
  });

  const applyDiscount = (price, discount) => {
    return (price * (1 - discount / 100)).toFixed(2);
  };

  const universalDiscount = 20; // Applying a flat 20% discount to all products

  return (
    <Container>
      <Row className="mt-4 mb-4">
        <Col md={5}>
          <Form.Control
            type="text"
            placeholder="Search for products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Col>
        <Col md={5}>
          <Form.Select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="all">All Categories</option>
            <option value="cameras">Cameras</option>
            <option value="lenses">Lenses</option>
            <option value="accessories">Accessories</option>
          </Form.Select>
        </Col>
      </Row>

      <Row md={4}>
        {filteredProducts.map((product) => (
          <Col key={product.id} md={4} className="mb-4">
            <Card>
              <Link to={`/product/${product.id}`}>
                <Card.Img
                  variant="top"
                  src={product.image1}
                  style={{ height: "150px", width: "auto", objectFit: "contain" }}
                />
              </Link>
              <Card.Body>
                <Card.Title>{product.brand}</Card.Title>
                <>
                  <span style={{ textDecoration: 'line-through', color: '#dc3545', marginRight: '10px' }}>
                    {product.price}₪
                  </span>
                  <span style={{ color: '#28a745', fontWeight: 'bold', fontSize: '1.6em' }}>
                    {applyDiscount(product.price, universalDiscount)}₪
                  </span>
                </>
                <Link to={`/product/${product.id}`}>
                  <Button variant="primary" className="mt-2">View Product</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default CategoriesPage;
