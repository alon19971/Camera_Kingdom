import React from "react";
<<<<<<< HEAD
import { Link } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext"; 
import { Container, Card, Button } from "react-bootstrap";

const ManagerDashboard = () => {
  const { currentUser, isManager } = useAuthContext();

  if (!isManager) {
    return null; // Don't render if not a manager
=======
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

const ManagerDashboard = () => {
  const { currentUser, userData } = useAuthContext();
  const navigate = useNavigate();

  if (!userData.isAdmin) {
    return (
      <Container>
        <Row className="mt-4">
          <Col>
            <p>You do not have admin privileges</p>
            <Button className="m-2" onClick={() => navigate(-1)}>
              Go back
            </Button>
            <Button className="m-2" onClick={() => navigate("/")}>
              Home
            </Button>
          </Col>
        </Row>
      </Container>
    );
>>>>>>> 893f93c (Added new sorting and search features for category pages)
  }

  return (
    <Container className="d-flex justify-content-center mt-5">
      <Card style={{ width: "50%" }} className="text-center">
        <Card.Body>
          <Card.Title>Manager Dashboard</Card.Title>
<<<<<<< HEAD
          <Card.Text>Welcome, {currentUser?.email}! You have manager access.</Card.Text>
=======
          <Card.Text>
            Welcome, {currentUser?.displayName}! You have manager access.
          </Card.Text>
>>>>>>> 893f93c (Added new sorting and search features for category pages)
          <div className="d-grid gap-3">
            <Link to="/manager/users">
              <Button variant="primary">User Management</Button>
            </Link>
            <Link to="/manager/products">
              <Button variant="success">Product Management</Button>
            </Link>
            <Link to="/manager/orders">
              <Button variant="warning">Order Management</Button>
            </Link>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ManagerDashboard;
