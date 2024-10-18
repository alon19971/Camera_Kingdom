import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase/firestore";

const CamerasPage = () => {
  const [cameras, setCameras] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Fetch cameras from Firestore based on category "cameras"
    const fetchCameras = async () => {
      const q = query(collection(db, "products"), where("category", "==", "cameras"));
      const querySnapshot = await getDocs(q);
      const camerasData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setCameras(camerasData);
    };

    fetchCameras();
  }, []);

  // Filter the products based on the search term
  const filteredCameras = cameras.filter(
    (product) =>
      product.model?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand?.toLowerCase().includes(searchTerm.toLowerCase())
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
  src={product.imageUrl ? product.imageUrl : "/path/to/defaultImage.jpg"} // Fallback image
  style={{ height: "150px", width: "auto", objectFit: "contain", margin: "0 auto" }}
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
