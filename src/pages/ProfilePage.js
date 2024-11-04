import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button, Image } from "react-bootstrap";
import { useAuthContext } from "../contexts/AuthContext";
<<<<<<< HEAD
=======
import user from "../assets/user-nobgnew.png";
>>>>>>> 893f93c (Added new sorting and search features for category pages)

const ProfilePage = () => {
  const { currentUser, update } = useAuthContext();
  //   const [user, setUser] = useState(null);
  const [displayName, setDisplayName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (currentUser) {
      setDisplayName(currentUser.displayName || "");
      setPhotoURL(currentUser.photoURL || "");
      setEmail(currentUser.email || "");
    }
  }, [currentUser]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      await update(currentUser, { displayName, photoURL, email });
      alert("Profile updated successfully");
<<<<<<< HEAD
      alert(currentUser.displayName + " " + currentUser.email + " " + currentUser.photoURL);
=======
      // alert(currentUser.displayName + " " + currentUser.email + " " + currentUser.photoURL);
>>>>>>> 893f93c (Added new sorting and search features for category pages)
    } catch (error) {
      alert(error.message);
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
      <h2 className="mb-3">Profile</h2>
      <Row>
        <Col md={6}>
          <h4 className="mb-3">Update your profile:</h4>
          <Form onSubmit={handleUpdateProfile}>
            <Form.Group className="mb-3" controlId="formDisplayName">
              <Form.Label>Display Name</Form.Label>
              <Form.Control
                className="form-controls"
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                className="form-controls"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
<<<<<<< HEAD
            <Form.Group className="mb-3" controlId="formPhotoURL">
=======
            <Form.Group className="mb-4" controlId="formPhotoURL">
>>>>>>> 893f93c (Added new sorting and search features for category pages)
              <Form.Label>Photo URL</Form.Label>
              <Form.Control
                className="form-controls"
                type="text"
                value={photoURL}
                onChange={(e) => setPhotoURL(e.target.value)}
              />
            </Form.Group>
<<<<<<< HEAD
            <Button variant="primary" type="submit">
=======
            <Button variant="primary" type="submit" className="mb-4">
>>>>>>> 893f93c (Added new sorting and search features for category pages)
              Update Profile
            </Button>
          </Form>
        </Col>
        <Col>
          <h4 className="mb-5">Profile Picture</h4>
<<<<<<< HEAD
          <Image src={currentUser.photoURL} className="profile-picture" />
=======
          {currentUser.photoURL ? (
            <Image src={currentUser.photoURL} className="profile-picture" />
          ) : (
            <Image src={user} className="profile-picture" />
          )}
>>>>>>> 893f93c (Added new sorting and search features for category pages)
        </Col>
      </Row>
    </Container>
  );
};

export default ProfilePage;
