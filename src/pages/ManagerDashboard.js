import React from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext"; 
import { Container, Card, Button } from "react-bootstrap";

const ManagerDashboard = () => {
  const { currentUser, isManager } = useAuthContext();

  if (!isManager) {
    return null; // Don't render if not a manager
  }

  return (
    <Container className="d-flex justify-content-center mt-5">
      <Card style={{ width: "50%" }} className="text-center">
        <Card.Body>
          <Card.Title>Manager Dashboard</Card.Title>
          <Card.Text>Welcome, {currentUser?.email}! You have manager access.</Card.Text>
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
