import React, { useState } from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { useProductContext } from "../contexts/ProductContext";
import { Link } from "react-router-dom";

const AccessoriesPage = () => {
  const { allProducts } = useProductContext();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredAccessories = allProducts.filter(
    (product) =>
      product.category === "accessories" &&
      (product.model?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand?.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const applyDiscount = (price, discount) => {
    return (price * (1 - discount / 100)).toFixed(2);
  };

  const universalDiscount = 20;

  return (
    <Container>
      <h2 className="text-center mt-4 mb-4">Accessories</h2>
      <Form.Control
        type="text"
        placeholder="Search for products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4"
      />

      <Row md={4}>
        {filteredAccessories.map((product) => (
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
                <p>
                  <span style={{ textDecoration: 'line-through', color: '#dc3545', marginRight: '10px' }}>
                    {product.price}₪
                  </span>
                  <span style={{ color: '#28a745', fontWeight: 'bold', fontSize: '1.6em' }}>
                    {applyDiscount(product.price, universalDiscount)}₪
                  </span>
                </p>
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

export default AccessoriesPage;
