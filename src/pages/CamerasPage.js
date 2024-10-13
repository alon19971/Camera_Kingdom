import React, { useState } from "react";
import { Container, Row, Col, Form, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useProductContext } from "../contexts/ProductContext";

const CamerasPage = () => {
  const { allProducts } = useProductContext();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = allProducts.filter(
    (product) =>
      product.category === "cameras" &&
      (product.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <Container>
      <h2 className="text-center mt-4">Cameras</h2>
      <Form.Control
        type="text"
        placeholder="Search for cameras..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4"
      />
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

export default CamerasPage;
