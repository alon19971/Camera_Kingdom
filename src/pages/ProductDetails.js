import React from "react";
import { Button, Container, Row, Col, Image, ListGroup, Card } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useProductContext } from "../contexts/ProductContext";

const ProductDetails = () => {
  const { id } = useParams();
  const { getProduct, getRelatedProducts } = useProductContext();
  const product = getProduct(id);
  const relatedProducts = getRelatedProducts(product.category);

  return (
    <Container className="mt-4">
      <Row>
        <Col md={6}>
          <Image 
            src={product.image1} 
            fluid 
            style={{ maxHeight: "350px", objectFit: "contain", marginBottom: "20px" }} 
          />
        </Col>
        <Col md={6}>
          <h2>{product.brand} {product.model}</h2>
          <h4>{product.price}₪ ILS</h4>
          <Button variant="success" className="me-2">Buy now</Button>
          <Button variant="primary" className="me-2">Add to cart</Button>
          <Button variant="outline-secondary">Add to Wishlist</Button>
          <hr />
          <ListGroup variant="flush">
            <ListGroup.Item><strong>Category:</strong> {product.category}</ListGroup.Item>
            <ListGroup.Item><strong>Type:</strong> {product.type}</ListGroup.Item>
            <ListGroup.Item><strong>Dimensions:</strong> 8.2 x 7.2 x 6.2 cm</ListGroup.Item>
            <ListGroup.Item><strong>Weight:</strong> 350g</ListGroup.Item>
            <ListGroup.Item><strong>Brand:</strong> {product.brand}</ListGroup.Item>
            <ListGroup.Item><strong>Lens Type:</strong> Prime</ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
      <hr />
      <Row>
        <Col md={6}>
          <h4>Customer Reviews</h4>
          <ListGroup variant="flush" className="mb-4">
            <ListGroup.Item>"Amazing quality, highly recommended!" - John Doe</ListGroup.Item>
            <ListGroup.Item>"A bit pricey, but worth every penny." - Jane Smith</ListGroup.Item>
            <ListGroup.Item>"Very satisfied with the purchase." - Mike Johnson</ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={6}>
          <h4>Related Products</h4>
          <Row>
            {relatedProducts.map((relatedProduct) => (
              <Col key={relatedProduct.id} md={4} className="mb-3">
                <Card>
                  <Card.Img 
                    variant="top" 
                    src={relatedProduct.image1} 
                    height={150} 
                    style={{ objectFit: "cover" }} 
                  />
                  <Card.Body>
                    <Card.Title>{relatedProduct.brand} {relatedProduct.model}</Card.Title>
                    <Card.Text>{relatedProduct.price}₪ ILS</Card.Text>
                    <Button variant="primary" href={`/product/${relatedProduct.id}`}>View Product</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetails;
