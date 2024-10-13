import React, { useState } from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { useProductContext } from "../contexts/ProductContext";
import { Link } from "react-router-dom";

const LensesPage = () => {
  const { allProducts } = useProductContext();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredLenses = allProducts.filter(
    (product) =>
      product.category === "lenses" &&
      (product.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const applyDiscount = (price, discount) => {
    return (price * (1 - discount / 100)).toFixed(2);
  };

  const universalDiscount = 20;

  return (
    <Container>
      <h2 className="text-center mt-4 mb-4">Lenses</h2>
      <Form.Control
        type="text"
        placeholder="Search for products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4"
      />

      <Row md={4}>
        {filteredLenses.map((product) => (
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

export default LensesPage;
