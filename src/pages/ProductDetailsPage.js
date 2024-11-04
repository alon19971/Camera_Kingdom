import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Form,
} from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { useProductContext } from "../contexts/ProductContext";
import { useAuthContext } from "../contexts/AuthContext";
import { db } from "../firebase/firestore";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  query,
  where,
} from "firebase/firestore";
import { FaTrash } from "react-icons/fa";
import Loader from "../components/utility/Loader";
import userImage from "../assets/user-nobgnew.png";
import { useValidationContext } from "../contexts/ValidationContext";

// const initialReviews = [
//   {
//     review: "Amazing quality, highly recommended!",
//     name: "John Doe",
//     date: "2024-09-15",
//   },
//   {
//     review: "A bit pricey, but worth every penny.",
//     name: "Jane Smith",
//     date: "2024-08-22",
//   },
//   {
//     review: "Very satisfied with the purchase.",
//     name: "Mike Johnson",
//     date: "2024-10-03",
//   },
//   {
//     review: "Top-notch service and product.",
//     name: "Sarah Connor",
//     date: "2024-07-19",
//   },
//   {
//     review: "Exceeded my expectations.",
//     name: "James Bond",
//     date: "2024-06-11",
//   },
//   {
//     review: "Best purchase I've made this year.",
//     name: "Bruce Wayne",
//     date: "2024-05-27",
//   },
// ];

const applyDiscount = (price) => price * 0.8;

const ProductDetails = () => {
  const { id } = useParams();
  const {
    getProduct,
    addReview,
    removeReview,
    getProductDocRef,
    getRelatedProducts,
  } = useProductContext();
  const { currentUser, userData } = useAuthContext();
  const { formatPrice } = useValidationContext();
  // const product = getProduct(id);
  // const relatedProducts = getRelatedProducts(product);
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");
  const navigate = useNavigate();

  // Error texts
  const [reviewError, setReviewError] = useState("");

  const resetError = () => {
    setReviewError("");
  };

  // Method to set the error text
  const updateErrorMessage = (error) => {
    setReviewError(error);
  };

  useEffect(() => {
    const fetchProductAndRelated = async () => {
      // Fetch the product
      const fetchedProduct = await getProduct(id);
      setProduct(fetchedProduct);

      if (fetchedProduct) {
        // Fetch related products
        const related = getRelatedProducts(fetchedProduct);
        setRelatedProducts(related);
      }
    };

    fetchProductAndRelated();
  }, [id, getProduct, getRelatedProducts]);

  // useEffect(() => {
  //   // Fetch the product when the product ID changes
  //   const product = getProduct(id);
  //   setProduct(product);
  //   const relatedProducts = getRelatedProducts(product);
  //   setRelatedProducts(relatedProducts);
  // }, [id, getProduct, getRelatedProducts, product]);

  // useEffect(() => {
  //   const fetchReviews = async () => {
  //     const reviewsCollection = collection(db, "reviews");
  //     const q = query(reviewsCollection, where("productId", "==", id));
  //     const querySnapshot = await getDocs(q);

  //     const fetchedReviews = querySnapshot.docs.map((doc) => ({
  //       ...doc.data(),
  //       id: doc.id,
  //     }));
  //     setReviews([...initialReviews, ...fetchedReviews]);
  //   };

  //   fetchReviews();
  // }, [id]);

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    resetError();

    const reviewToAdd = {
      message: newReview,
      user: userData,
      date: new Date().toDateString(),
    };

    addReview(id, reviewToAdd)
      .then(() => {
        setNewReview("");
        alert("Review added successfully!");
      })
      .catch((error) => {
        updateErrorMessage(error.message);
      });
  };

  const handleDeleteReview = (reviewIndex) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your review?"
    );

    if (confirmDelete) {
      removeReview(id, reviewIndex)
        .then(() => {
          alert("Review deleted");
        })
        .catch((error) => {
          alert(error);
        });
    }
  };

  if (!product) {
    return <Loader />;
  }

  return (
    <Container className="custom-container mt-4">
      <Card>
        <Row>
          <Col md={6} className="product-images-container">
            <Image
              className="mt-5"
              src={product.image1}
              fluid
              style={{ maxHeight: "300px", width: "auto" }}
            />
          </Col>
          <Col md={6} className="mt-4">
            <h2>
              <b>
                {product.brand} {product.model}
              </b>
            </h2>
            <h3>
              {/* <span
                style={{
                  textDecoration: "line-through",
                  color: "#8b8b8b",
                  marginRight: "10px",
                }}
              > */}
              {formatPrice(product.price)}
              {/* </span> */}
              {/* <span
                style={{
                  color: "#A70000",
                  fontWeight: "bold",
                  fontSize: "1.3em",
                }}
              >
                {applyDiscount(product.price).toFixed(2)}₪ ILS
              </span> */}
            </h3>
            <hr />
            <ListGroup variant="flush">
              <ListGroup.Item>
                <strong>Category:</strong> {product.category}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Type:</strong> {product.type}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Dimensions:</strong> 8.2 x 7.2 x 6.2 cm
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Weight:</strong> 350g
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Brand:</strong> {product.brand}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Lens Type:</strong> Prime
              </ListGroup.Item>
            </ListGroup>
            <hr />

            <div className="mt-0 mb-3">
              <Button variant="success" className="me-2">
                Buy now
              </Button>
              <Button variant="primary" className="me-2">
                Add to cart
              </Button>
              <Button variant="secondary">Add to Wishlist</Button>
            </div>
          </Col>
        </Row>
      </Card>
      <hr />
      <Row>
        <Col md={6} className="text-start">
          <h4>Customer Reviews</h4>
          <ListGroup variant="flush">
            {product.reviews.length === 0 ? (
              <p className="mt-2">No reviews submitted</p>
            ) : (
              product.reviews.map((review, index) => (
                <div key={index}>
                  <ListGroup.Item>
                    <p>"{review.message}"</p>
                    <Image
                      className="me-3"
                      src={review.user.photoURL || userImage}
                      alt={`${
                        review.user.displayName || "Anonymous"
                      }'s profile`}
                      roundedCircle
                      width={35}
                      height={35}
                    />
                    <small>
                      <b>{review.user.displayName || "Anonymous"}</b>
                    </small>
                    <small className="text-muted ms-3">
                      {new Date(review.date).toLocaleDateString()}
                    </small>
                    {currentUser?.displayName === review.user.displayName && (
                      <FaTrash
                        className="text-danger ms-3"
                        onClick={() => handleDeleteReview(index)}
                        style={{ cursor: "pointer" }}
                      />
                    )}
                  </ListGroup.Item>
                </div>
              ))
            )}
          </ListGroup>

          <Form onSubmit={handleReviewSubmit} className="mt-2">
            <Form.Group controlId="reviewInput">
              <Form.Label>Leave a Review:</Form.Label>
              <Form.Control
                className="form-controls"
                as="textarea"
                rows={3}
                placeholder="Write your review here"
                value={newReview}
                onChange={(e) => setNewReview(e.target.value)}
                isInvalid={!!reviewError}
              />
              <Form.Control.Feedback type="invalid">
                <b>{reviewError}</b>
              </Form.Control.Feedback>
            </Form.Group>
            <Button type="submit" variant="primary" className="mt-3">
              Submit Review
            </Button>
          </Form>
        </Col>
        <Col md={6}>
          <h4 className="text-center">Related Products</h4>
          <Row>
            {relatedProducts.map((relatedProduct) => (
              <Col key={relatedProduct.id} md={4} className="mb-4">
                <Card>
                  <Card.Img
                    variant="top"
                    src={relatedProduct.image1}
                    style={{
                      height: "150px",
                      width: "auto",
                      objectFit: "contain",
                    }}
                  />
                  <Card.Body>
                    <Card.Title>
                      {relatedProduct.brand} {relatedProduct.model}
                    </Card.Title>
                    <Card.Text>
                      <span
                        style={{
                          textDecoration: "line-through",
                          color: "#8b8b8b",
                          marginRight: "10px",
                        }}
                      >
                        {relatedProduct.price}₪
                      </span>
                      <span
                        style={{
                          color: "#A70000",
                          fontWeight: "bold",
                          fontSize: "1.3em",
                        }}
                      >
                        {applyDiscount(relatedProduct.price).toFixed(2)}₪ ILS
                      </span>
                    </Card.Text>
                    {/* On clicking 'View Product', navigate to the new product page */}
                    <Button
                      variant="primary"
                      onClick={() => navigate(`/product/${relatedProduct.id}`)}
                    >
                      View Product
                    </Button>
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
