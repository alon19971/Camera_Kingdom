import React, { useEffect, useState } from "react";
import { Button, Container, Row, Col, Image, ListGroup, Card, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useProductContext } from "../contexts/ProductContext";
import { useAuthContext } from "../contexts/AuthContext";
import { db } from "../firebase/firestore";
import { collection, addDoc, getDocs, doc, deleteDoc, query, where } from "firebase/firestore";
import { FaTrashAlt } from 'react-icons/fa';  

// Sample reviews
const initialReviews = [
  { review: "Amazing quality, highly recommended!", name: "John Doe", date: "2024-09-15" },
  { review: "A bit pricey, but worth every penny.", name: "Jane Smith", date: "2024-08-22" },
  { review: "Very satisfied with the purchase.", name: "Mike Johnson", date: "2024-10-03" },
  { review: "Top-notch service and product.", name: "Sarah Connor", date: "2024-07-19" },
  { review: "Exceeded my expectations.", name: "James Bond", date: "2024-06-11" },
  { review: "Best purchase I've made this year.", name: "Bruce Wayne", date: "2024-05-27" },
];

const applyDiscount = (price) => price * 0.8;

const ProductDetails = () => {
  const { id } = useParams();
  const { getProduct, getRelatedProducts } = useProductContext();
  const { currentUser } = useAuthContext();
  const product = getProduct(id);
  const relatedProducts = getRelatedProducts(product.category);
  const [reviews, setReviews] = useState(initialReviews);  // State for storing reviews
  const [newReview, setNewReview] = useState("");

  // Fetch reviews from Firestore on component mount
  useEffect(() => {
    const fetchReviews = async () => {
      const reviewsCollection = collection(db, "reviews");
      const q = query(reviewsCollection, where("productId", "==", id));
      const querySnapshot = await getDocs(q);

      const fetchedReviews = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id, // Store document ID for deletion
      }));
      setReviews([...initialReviews, ...fetchedReviews]);  // Combine static and dynamic reviews
    };

    fetchReviews();
  }, [id]);

  // Handle adding a review
  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    if (!newReview.trim()) return;

    const reviewToAdd = {
      review: newReview,
      name: currentUser?.displayName || "Anonymous", // Use logged-in user's name or 'Anonymous'
      date: new Date().toISOString().split("T")[0],  // Current date in YYYY-MM-DD format
      productId: id,
    };

    try {
      const docRef = await addDoc(collection(db, "reviews"), reviewToAdd);
      setReviews([...reviews, { ...reviewToAdd, id: docRef.id }]);  // Update local state with new review
      setNewReview("");  // Clear the input box
    } catch (error) {
      console.error("Error adding review: ", error);
    }
  };

  // Handle deleting a review
  const handleDeleteReview = async (reviewId) => {
    try {
      await deleteDoc(doc(db, "reviews", reviewId));
      setReviews(reviews.filter((review) => review.id !== reviewId));  // Remove from local state
    } catch (error) {
      console.error("Error deleting review: ", error);
    }
  };

  return (
    <Container className="mt-4">
      <Row>
        <Col md={6}>
          <Image src={product.image1} fluid style={{ maxHeight: "300px", width: "auto" }} />
        </Col>
        <Col md={6}>
          <h2>{product.brand} {product.model}</h2>
          <h4>
            <span style={{ textDecoration: 'line-through', color: '#8b8b8b', marginRight: '10px' }}>
              {product.price}₪
            </span>
            <span style={{ color: '#A70000', fontWeight: 'bold', fontSize: '1.3em' }}>
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
            {reviews.map((review) => (
              <ListGroup.Item key={review.id || review.name}>
                <p>"{review.review}"</p>
                <p><strong>- {review.name}</strong></p>
                <small className="text-muted">{new Date(review.date).toLocaleDateString()}</small>
                {currentUser?.displayName === review.name && (
                  <FaTrashAlt
                    className="text-danger ms-3"
                    onClick={() => handleDeleteReview(review.id)}  // Delete only for user's own reviews
                    style={{ cursor: "pointer" }}
                  />
                )}
              </ListGroup.Item>
            ))}
          </ListGroup>

          {/* Review submission form */}
          <Form onSubmit={handleReviewSubmit} className="mt-4">
            <Form.Group controlId="reviewInput">
              <Form.Label>Leave a Review:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Write your review here..."
                value={newReview}
                onChange={(e) => setNewReview(e.target.value)}
              />
            </Form.Group>
            <Button type="submit" variant="primary" className="mt-3">Submit Review</Button>
          </Form>
        </Col>
        <Col md={6}>
          <h4 className="text-center">Related Products</h4>
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
                      <span style={{ color: '#A70000', fontWeight: 'bold', fontSize: '1.3em' }}>
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
