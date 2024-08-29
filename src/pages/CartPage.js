import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useAuthContext } from "../contexts/AuthContext";

const CartPage = () => {
  const { currentUser } = useAuthContext();
  const cart = [];

  if (!currentUser) {
    return (
      <Container>
        <Row className="mt-4">
          <Col>
            <p>Please log in to view your cart.</p>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container>
      <Row>
        <Col className="mt-4">
          <h2 className="mb-4">Your Cart</h2>
          {cart.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            <Row>{/* Need to complete */}</Row>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default CartPage;
