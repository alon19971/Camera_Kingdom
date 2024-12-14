import React, { useEffect, useState, useCallback } from "react";
import { Container, Row, Col, Form, Button, Card, Image } from "react-bootstrap";
import { useAuthContext } from "../contexts/AuthContext";
import { db } from "../firebase/firestore";
import { getDocs, query, collection, where } from "firebase/firestore";
import userDefaultImg from "../assets/user-nobgnew.png";

const ProfilePage = () => {
  const { currentUser, update, updatePassword } = useAuthContext();
  const [displayName, setDisplayName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [emailVerified, setEmailVerified] = useState(false);
  const [userStats, setUserStats] = useState({
    totalPurchases: 0,
    wishlistCount: 0,
    lastLogin: "",
  });

  const fetchUserStats = useCallback(async () => {
    if (currentUser) {
      try {
        // Fetch total purchases
        const ordersSnapshot = await getDocs(
          query(collection(db, "orders"), where("userId", "==", currentUser.uid))
        );
        const totalPurchases = ordersSnapshot.docs.length;

        // Fetch wishlist count
        const wishlistSnapshot = await getDocs(
          query(collection(db, "wishlist"), where("userId", "==", currentUser.uid))
        );
        const wishlistCount = wishlistSnapshot.docs.length;

        setUserStats({
          totalPurchases,
          wishlistCount,
          lastLogin: new Date(currentUser.metadata.lastSignInTime).toLocaleString(),
        });
      } catch (error) {
        console.error("Error fetching user stats:", error);
      }
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentUser) {
      setDisplayName(currentUser.displayName || "");
      setPhotoURL(currentUser.photoURL || "");
      setEmailVerified(currentUser.emailVerified || false);
      fetchUserStats();
    }
  }, [currentUser, fetchUserStats]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      await update(currentUser, { displayName, photoURL });
      alert("Profile updated successfully!");
    } catch (error) {
      alert("Error updating profile: " + error.message);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      if (currentPassword && newPassword) {
        await updatePassword(currentPassword, newPassword);
        alert("Password updated successfully!");
        setCurrentPassword("");
        setNewPassword("");
      } else {
        alert("Please fill out both password fields.");
      }
    } catch (error) {
      alert("Error updating password: " + error.message);
    }
  };

  if (!currentUser) {
    return (
      <Container className="mt-4">
        <Row className="mt-4">
          <Col>
            <p>Please log in to view your profile.</p>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <div className="text-center mb-4">
        <h2
          className="text-white p-2"
          style={{
            backgroundColor: "blue",
            width: "400px",
            margin: "0 auto",
            borderRadius: "5px",
            fontSize: "1.8rem",
          }}
        >
          My Profile
        </h2>
      </div>
      <Row className="g-4">
        {/* Profile Information Section */}
        <Col md={4}>
          <Card className="p-3 shadow">
            <Card.Body className="text-center">
              <h5>Profile Picture</h5>
              <Image
                src={photoURL || userDefaultImg}
                roundedCircle
                width={120}
                height={120}
                className="mb-3"
              />
              <p className="mb-1">
                <strong>Email:</strong> {currentUser.email}
              </p>
              <p className="mb-1">
                <strong>Role:</strong> Manager
              </p>
              <p>
                <strong>Email Verified:</strong> {emailVerified ? "Yes" : "No"}
              </p>
            </Card.Body>
          </Card>
        </Col>

        {/* Update Profile Section */}
        <Col md={4}>
          <Card className="p-3 shadow">
            <Card.Body>
              <h5>Update Profile</h5>
              <Form onSubmit={handleUpdateProfile}>
                <Form.Group className="mb-3">
                  <Form.Label>Display Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Photo URL</Form.Label>
                  <Form.Control
                    type="text"
                    value={photoURL}
                    onChange={(e) => setPhotoURL(e.target.value)}
                  />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Save Changes
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        {/* Change Password Section */}
        <Col md={4}>
          <Card className="p-3 shadow">
            <Card.Body>
              <h5>Change Password</h5>
              <Form onSubmit={handleChangePassword}>
                <Form.Group className="mb-3">
                  <Form.Label>Current Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter current password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>New Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </Form.Group>
                <Button variant="success" type="submit">
                  Update Password
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="mt-4">
        {/* User Activity Section */}
        <Col>
          <Card className="p-3 shadow">
            <Card.Body>
              <h5>Activity</h5>
              <p>
                <strong>Total Purchases:</strong> {userStats.totalPurchases}
              </p>
              <p>
                <strong>Wishlist Count:</strong> {userStats.wishlistCount}
              </p>
              <p>
                <strong>Last Login:</strong> {userStats.lastLogin}
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfilePage;
