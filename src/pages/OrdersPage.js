import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Spinner } from "react-bootstrap";
import { useAuthContext } from "../contexts/AuthContext";
import { db } from "../firebase/firestore";
import { collection, query, where, getDocs } from "firebase/firestore";

const OrdersPage = () => {
  const { currentUser } = useAuthContext();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!currentUser) return;
      setLoading(true);
      try {
        const ordersRef = collection(db, "orders");
        const q = query(ordersRef, where("userId", "==", currentUser.uid));
        const querySnapshot = await getDocs(q);

        const fetchedOrders = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setOrders(fetchedOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [currentUser]);

  if (!currentUser) {
    return (
      <Container>
        <Row className="mt-4">
          <Col>
            <p className="text-center">Please log in to view your orders.</p>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">Your Orders</h2>
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" />
          <p>Loading your orders...</p>
        </div>
      ) : orders.length === 0 ? (
        <p className="text-center">You haven't completed any orders yet.</p>
      ) : (
        <Row className="g-4">
          {orders.map((order) => (
            <Col md={6} key={order.id}>
              <Card className="shadow-sm">
                <Card.Body>
                  <h5 className="card-title">Order #{order.id}</h5>
                  <p>
                    <strong>Date:</strong>{" "}
                    {new Date(order.date).toLocaleDateString()}{" "}
                    {new Date(order.date).toLocaleTimeString()}
                  </p>
                  <p>
                    <strong>Status:</strong>{" "}
                    <span
                      style={{
                        color:
                          order.status === "Delivered"
                            ? "green"
                            : order.status === "Pending"
                            ? "orange"
                            : "red",
                      }}
                    >
                      {order.status}
                    </span>
                  </p>
                  <p>
                    <strong>Total:</strong> ₪{order.totalPrice}
                  </p>
                  <hr />
                  <h6>Items:</h6>
                  <ul>
                    {order.items.map((item, index) => (
                      <li key={index}>
                        {item.name} - {item.quantity} × ₪{item.price}
                      </li>
                    ))}
                  </ul>
                </Card.Body>
                <Card.Footer className="d-flex justify-content-between">
                  <Button variant="info" size="sm">
                    Track Order
                  </Button>
                  {order.status === "Pending" && (
                    <Button variant="danger" size="sm">
                      Cancel Order
                    </Button>
                  )}
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default OrdersPage;
