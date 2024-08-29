// src/pages/Wishlist.js
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useAuthContext } from "../contexts/AuthContext";

const WishlistPage = () => {
  const { currentUser } = useAuthContext();
  const [wishlist, setWishlist] = useState([]);

  if (!currentUser) {
    return (
      <Container>
        <Row className="mt-4">
          <Col>
            <p>Please log in to view your wishlist.</p>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Your Wishlist</h2>
      {wishlist.length === 0 ? (
        <p>You haven't saved any products yet</p>
      ) : (
        <Row>{/* Need to complete */}</Row>
      )}
    </Container>
  );
};

export default WishlistPage;
