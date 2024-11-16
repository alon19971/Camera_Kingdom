import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import { db } from "../firebase/firestore";
import { collection, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { Container, Row, Col, Card, Button, Badge, Modal, ListGroup } from "react-bootstrap";

const ManagerDashboard = () => {
  const { currentUser, userData } = useAuthContext();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showMessagesModal, setShowMessagesModal] = useState(false);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const messagesSnapshot = await getDocs(collection(db, "messages"));
        const messagesData = messagesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMessages(messagesData);
        setUnreadCount(
          messagesData.filter(
            (msg) => !msg.seenBy || !msg.seenBy.includes(currentUser.email)
          ).length
        );
      } catch (error) {
        console.error("Error fetching messages: ", error);
      }
    };
    fetchMessages();
  }, [currentUser.email]);

  const handleMarkAsSeen = async (messageId) => {
    try {
      const messageRef = doc(db, "messages", messageId);
      const message = messages.find((msg) => msg.id === messageId);

      const updatedSeenBy = message.seenBy
        ? [...message.seenBy, currentUser.email]
        : [currentUser.email];

      await updateDoc(messageRef, {
        seenBy: updatedSeenBy,
      });

      setMessages(
        messages.map((msg) =>
          msg.id === messageId ? { ...msg, seenBy: updatedSeenBy } : msg
        )
      );
      setUnreadCount((prev) => prev - 1);
    } catch (error) {
      console.error("Error updating message status: ", error);
    }
  };

  const handleDeleteMessage = async (messageId) => {
    try {
      await deleteDoc(doc(db, "messages", messageId));
      setMessages(messages.filter((msg) => msg.id !== messageId));
    } catch (error) {
      console.error("Error deleting message: ", error);
    }
  };

  const toggleMessagesModal = () => setShowMessagesModal(!showMessagesModal);

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
  }

  return (
    <Container className="d-flex justify-content-center mt-5">
      <Card style={{ width: "50%" }} className="text-center">
        <Card.Body>
          <Card.Title>Manager Dashboard</Card.Title>
          <Card.Text>
            Welcome, {currentUser?.displayName}! You have manager access.
          </Card.Text>
          <div className="d-grid gap-3">
            <Link to="/manager/users">
              <Button variant="primary" className="w-50">
                User Management
              </Button>
            </Link>
            <Link to="/manager/products">
              <Button variant="success" className="w-50">
                Product Management
              </Button>
            </Link>
            <Link to="/manager/orders">
              <Button variant="warning" className="w-50">
                Order Management
              </Button>
            </Link>
            <Button
              variant="info"
              style={{ width: "50%", margin: "0 auto" }} // Adjusted width for consistency
              onClick={toggleMessagesModal}
            >
              Messages{" "}
              {unreadCount > 0 && (
                <Badge bg="danger" className="ms-2">
                  {unreadCount}
                </Badge>
              )}
            </Button>
          </div>
        </Card.Body>
      </Card>

      {/* Modal to display all messages */}
      <Modal show={showMessagesModal} onHide={toggleMessagesModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Messages</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ListGroup>
            {messages.map((msg) => (
              <ListGroup.Item
                key={msg.id}
                className="d-flex justify-content-between align-items-center"
              >
                <div>
                  <strong>Name:</strong> {msg.name}
                  <br />
                  <strong>Email:</strong> {msg.email}
                  <br />
                  <strong>Message:</strong> {msg.message}
                  <br />
                  <strong>Sent At:</strong>{" "}
                  {msg.createdAt
                    ? new Date(msg.createdAt.seconds * 1000).toLocaleString()
                    : "Unknown"}
                  <br />
                  <small className="text-muted">
                    {msg.seenBy && msg.seenBy.includes(currentUser.email)
                      ? `Seen by you`
                      : "Not yet seen by you"}
                  </small>
                </div>
                <div>
                  {!msg.seenBy || !msg.seenBy.includes(currentUser.email) ? (
                    <Button
                      variant="outline-success"
                      size="sm"
                      className="me-2"
                      onClick={() => handleMarkAsSeen(msg.id)}
                    >
                      Mark as Seen
                    </Button>
                  ) : (
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleDeleteMessage(msg.id)}
                    >
                      Delete
                    </Button>
                  )}
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={toggleMessagesModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ManagerDashboard;
