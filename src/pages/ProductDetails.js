import React from "react";
import { Button, Container, Row, Col, Image, ListGroup, Card } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useProductContext } from "../contexts/ProductContext";

// Sample customer reviews to randomize from
const reviews = [
  { review: "Amazing quality, highly recommended!", name: "John Doe" },
  { review: "A bit pricey, but worth every penny.", name: "Jane Smith" },
  { review: "Very satisfied with the purchase.", name: "Mike Johnson" },
  { review: "Top-notch service and product.", name: "Sarah Connor" },
  { review: "Exceeded my expectations.", name: "James Bond" },
  { review: "Best purchase I've made this year.", name: "Bruce Wayne" },
  { review: "Highly recommend to anyone!", name: "Clark Kent" },
  { review: "Great value for the money.", name: "Diana Prince" },
  { review: "Will definitely buy again.", name: "Peter Parker" }
];

// Function to get random reviews
const getRandomReviews = (count) => {
  let shuffled = [...reviews].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

// Function to calculate a discount (20% in this case)
const applyDiscount = (price) => {
  return price * 0.8; // Apply a 20% discount
};

const ProductDetails = () => {
  const { id } = useParams();
  const { getProduct, getRelatedProducts } = useProductContext();
  const product = getProduct(id);
  const relatedProducts = getRelatedProducts(product.category);
  const randomReviews = getRandomReviews(5);  // Get 5 random reviews

  return (
    <Container className="mt-4">
      <Row>
        <Col md={6}>
          <Image src={product.image1} fluid style={{ maxHeight: "400px" }} />
        </Col>
        <Col md={6}>
          <h2>{product.brand} {product.model}</h2>
          <h4>
            <span style={{ textDecoration: 'line-through', color: '#8b8b8b', marginRight: '10px' }}>
              {product.price}₪
            </span>
            <span style={{ color: '#A70000', fontWeight: 'bold', fontSize: '1.3em' }}>  {/* Smaller font size */}
              {applyDiscount(product.price).toFixed(2)}₪ ILS
            </span>
          </h4>
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
        <Col md={6} className="text-start">
          <h4>Customer Reviews</h4>
          <ListGroup variant="flush">
            {randomReviews.map((review, index) => (
              <ListGroup.Item key={index}>
                "{review.review}" - {review.name}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
        <Col md={6}>
          <h4 className="text-center">Related Products</h4>  {/* Centered title */}
          <Row>
            {relatedProducts.map((relatedProduct) => (
              <Col key={relatedProduct.id} md={4} className="mb-4">
                <Card>
                  <Card.Img variant="top" src={relatedProduct.image1} style={{ height: "150px", width: "auto", objectFit: "contain" }} />
                  <Card.Body>
                    <Card.Title>{relatedProduct.brand} {relatedProduct.model}</Card.Title>
                    <Card.Text>
                      <span style={{ textDecoration: 'line-through', color: '#8b8b8b', marginRight: '10px' }}>
                        {relatedProduct.price}₪
                      </span>
                      <span style={{ color: '#A70000', fontWeight: 'bold', fontSize: '1.3em' }}>  {/* Smaller font size */}
                        {applyDiscount(relatedProduct.price).toFixed(2)}₪ ILS
                      </span>
                    </Card.Text>
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
