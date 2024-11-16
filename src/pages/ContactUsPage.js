import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; // For redirection
import { db } from "../firebase/firestore";
import { collection, addDoc } from "firebase/firestore";
import { useAuthContext } from "../contexts/AuthContext"; // To check user authentication

const ContactUsPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const { currentUser } = useAuthContext(); // Check if the user is logged in
  const navigate = useNavigate();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Email validation regex

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the user is logged in
    if (!currentUser) {
      setError("You need to log in to send a message.");
      setTimeout(() => navigate("/login"), 2000); // Redirect to login after 2 seconds
      return;
    }

    // Validate inputs
    if (!formData.name || !formData.email || !formData.message) {
      setError("All fields are required.");
      return;
    }

    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    // Add message to the Firestore collection
    try {
      await addDoc(collection(db, "messages"), {
        ...formData,
        userId: currentUser.uid, // Associate message with the current user
        createdAt: new Date(),
      });
      setSubmitted(true);
      setError(null);
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      console.error("Error sending message:", err);
      setError("Failed to send message. Please try again later.");
    }
  };

  return (
    <Container>
      <Row>
        <Col className="mt-4">
          <h2 className="mb-4">Contact Us</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {submitted && <Alert variant="success">Message sent successfully!</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                className="form-controls"
                type="text"
                placeholder="Enter your name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                className="form-controls"
                type="email"
                placeholder="Enter email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicMessage">
              <Form.Label>Message</Form.Label>
              <Form.Control
                className="form-controls"
                as="textarea"
                rows={3}
                name="message"
                value={formData.message}
                onChange={handleChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Send
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ContactUsPage;
