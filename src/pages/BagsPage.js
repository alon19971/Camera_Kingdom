import React, { useState } from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { useProductContext } from "../contexts/ProductContext";

const BagsPage = () => {
  const { allProducts } = useProductContext();
  const [searchTerm, setSearchTerm] = useState("");
  const filteredBags = allProducts.filter(
    (product) =>
      product.category === "Bags" &&
      (product.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const applyDiscount = (price, discount) => {
    return (price * (1 - discount / 100)).toFixed(2);
  };

  const universalDiscount = 20; // Applying 20% discount to all products

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">Bags</h2>
      <Form.Control
        type="text"
        placeholder="Search for bags..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4"
      />
      <Row>
        {filteredBags.map((product) => (
          <Col key={product.id} md={4} className="mb-4">
            <Card>
              <Card.Img variant="top" src={product.image1} />
              <Card.Body>
                <Card.Title>{product.model}</Card.Title>
                <Card.Text>
                  <span className="text-muted text-decoration-line-through">
                    {product.price}₪
                  </span>{" "}
                  <span className="text-danger fw-bold">
                    {applyDiscount(product.price, universalDiscount)}₪
                  </span>
                </Card.Text>
                <Button variant="primary">View Product</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default BagsPage;
