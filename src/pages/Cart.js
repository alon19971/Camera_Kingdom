// src/pages/Cart.js
import React, { useContext } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { CartContext } from '../contexts/CartContext';

const Cart = () => {
  const { cart, removeFromCart } = useContext(CartContext);

  return (
    <Container>
      <Row>
        <Col>
          <h2>Your Cart</h2>
          {cart.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            cart.map((product, index) => (
              <Row key={index} className="mb-3">
                <Col md={2}>
                  <img src={product.image} alt={product.name} width="100%" />
                </Col>
                <Col md={8}>
                  <h4>{product.name}</h4>
                  <p>{product.description}</p>
                  <p>${product.price}</p>
                </Col>
                <Col md={2}>
                  <Button variant="danger" onClick={() => removeFromCart(product.id)}>Remove</Button>
                </Col>
              </Row>
            ))
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Cart;
