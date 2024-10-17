import React, { useState } from "react";
import { Container, Row, Col, Form, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useProductContext } from "../contexts/ProductContext";

const CamerasPage = () => {
  const { allProducts } = useProductContext();
  const [searchTerm, setSearchTerm] = useState("");

  // Filter only camera products
  const filteredCameras = allProducts.filter(
    (product) =>
      product.category === "cameras" &&
      (product.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const applyDiscount = (price, discount) => {
    return (price * (1 - discount / 100)).toFixed(2);
  };

  const universalDiscount = 20; // Applying a flat 20% discount to all products

  return (
    <Container>
      <h2 className="text-center mt-4 mb-4">Cameras</h2>
      <Form.Control
        type="text"
        placeholder="Search for cameras..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4"
      />
      <Row md={4}>
        {filteredCameras.map((product) => (
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
                <Card.Text>{product.model}</Card.Text>
                {/* Display the discounted price here */}
                <div>
                  <span style={{ textDecoration: "line-through", color: "#dc3545", marginRight: "10px" }}>
                    {product.price}₪
                  </span>
                  <span style={{ color: "#28a745", fontWeight: "bold", fontSize: "1.6em" }}>
                    {applyDiscount(product.price, universalDiscount)}₪
                  </span>
                </div>
                <Link to={`/product/${product.id}`}>
                  <Button variant="primary" className="mt-2">
                    View Product
                  </Button>
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
