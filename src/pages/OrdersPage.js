import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { useAuthContext } from "../contexts/AuthContext";

const OrdersPage = () => {
  const { currentUser } = useAuthContext();
  const [orders, setOrders] = useState([]);

  if (!currentUser) {
    return (
      <Container>
        <Row className="mt-4">
          <Col>
            <p>Please log in to view your orders.</p>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Your Orders</h2>
      {orders.length === 0 ? (
        <p>You haven't completed any orders yet</p>
      ) : (
        <Row>{/* Need to complete */}</Row>
      )}
    </Container>
  );
};

export default OrdersPage;
