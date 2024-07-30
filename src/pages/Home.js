// src/pages/Home.js
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { getRecommendedProducts } from '../services/RecommendationService';

const Home = () => {
  const [recommendedProducts, setRecommendedProducts] = useState([]);

  useEffect(() => {
    const fetchRecommendedProducts = async () => {
      try {
        const products = await getRecommendedProducts();
        console.log("Fetched recommended products:", products); // Log fetched products
        setRecommendedProducts(products);
      } catch (error) {
        console.error("Error fetching recommended products:", error);
      }
    };
    fetchRecommendedProducts();
  }, []);

  return (
    <Container>
      <Row className="mb-4">
        <Col>
          <div className="promo-banner">
            <h1>Welcome to Camera Kingdom</h1>
            <p>Your one-stop shop for all camera needs</p>
          </div>
        </Col>
      </Row>
      <h2>Featured Products</h2>
      <Row>
        {recommendedProducts.map((product) => (
          <Col key={product.id} md={4}>
            <Card>
              <Card.Img variant="top" src={product.imageUrl} />
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>{product.description}</Card.Text>
                <Card.Text>${product.price}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Home;
