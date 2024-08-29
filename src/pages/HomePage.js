import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Carousel } from "react-bootstrap";
import { useProductContext } from "../contexts/ProductContext";

const HomePage = () => {
  const { allProducts } = useProductContext();

  return (
    <Container className="mt-4">
      <Row className="mb-4">
        <Col>
          <div className="promo-banner">
            <h1>Welcome to Camera Kingdom</h1>
            <p>Your one-stop shop for all camera needs</p>
          </div>
        </Col>
      </Row>
      <h2 className="mb-3">Featured Products</h2>
      <Row>
        <Col>
          <Carousel className="featured-carousel">
            {allProducts.map((product) => (
              <Carousel.Item key={product.id} interval={3000}>
                <img src={product.image1} height={200} alt={product.model} />
                <Carousel.Caption
                  style={{
                    position: "static",
                    paddingtop: "10px",
                    color: "black",
                  }}
                >
                  <h3>{product.model}</h3>
                  <p>{product.brand}</p>
                </Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel>
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
