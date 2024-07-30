// src/pages/ProductDetails.js
import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Image, Button, Form } from 'react-bootstrap';
import { getProduct } from '../services/ProductService';
import { addReview, getReviews } from '../services/ReviewService';
import { addToWishlist } from '../services/WishlistService';
import { auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { CartContext } from '../contexts/CartContext';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const { addToCart } = useContext(CartContext);
  const [user] = useAuthState(auth);

  useEffect(() => {
    const fetchProduct = async () => {
      const product = await getProduct(id);
      setProduct(product);
    };
    const fetchReviews = async () => {
      const reviews = await getReviews(id);
      setReviews(reviews);
    };
    fetchProduct();
    fetchReviews();
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product);
  };

  const handleAddReview = async (e) => {
    e.preventDefault();
    if (user) {
      await addReview(id, user.uid, rating, comment);
      setRating(0);
      setComment('');
      const reviews = await getReviews(id);
      setReviews(reviews);
    } else {
      alert('Please log in to leave a review');
    }
  };

  const handleAddToWishlist = async () => {
    if (user) {
      await addToWishlist(user.uid, id);
      alert('Added to wishlist');
    } else {
      alert('Please log in to add to wishlist');
    }
  };

  if (!product) return <p>Loading...</p>;

  return (
    <Container>
      <Row>
        <Col md={6}>
          <Image src={product.imageUrl} fluid />
        </Col>
        <Col md={6}>
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <h4>${product.price}</h4>
          <Button variant="primary" onClick={handleAddToCart}>Add to Cart</Button>
          <Button variant="secondary" onClick={handleAddToWishlist} className="ml-2">Add to Wishlist</Button>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <h3>Reviews</h3>
          {reviews.map((review) => (
            <div key={review.id}>
              <strong>{review.userId}</strong>
              <p>Rating: {review.rating}</p>
              <p>{review.comment}</p>
            </div>
          ))}
        </Col>
        <Col md={6}>
          <h3>Leave a Review</h3>
          <Form onSubmit={handleAddReview}>
            <Form.Group className="mb-3" controlId="formRating">
              <Form.Label>Rating</Form.Label>
              <Form.Control
                type="number"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                min="1"
                max="5"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formComment">
              <Form.Label>Comment</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit">Submit Review</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetails;
