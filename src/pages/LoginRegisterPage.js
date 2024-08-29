import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";

const LoginRegisterPage = () => {
  const { login, googleLogin, register } = useAuthContext();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLogin) {
      // Login
      try {
        await login(email, password);
        alert("Logged in successfully");
        navigate("/");
      } catch (error) {
        alert(error.message);
      }
    } else {
      // Register
      try {
        await register(name, email, password);
        alert("Registered successfully");
        navigate("/");
      } catch (error) {
        alert("Failed to register", error.message);
      }
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await googleLogin();
      alert("Signed in with Google");
      navigate("/");
    } catch (error) {
      alert("Failed to sign in with google", error.message);
    }
  };

  return (
    <Container className="mt-4">
      <Row>
        <Col>
          <h2 className="mb-4">{isLogin ? "Login" : "Register"}</h2>
          <Form onSubmit={handleSubmit}>
            {!isLogin && (
              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  className="form-controls"
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>
            )}
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                className="form-controls"
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-4" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                className="form-controls"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              {isLogin ? "Login" : "Register"}
            </Button>
          </Form>
          <Button
            className="google-signin-btn mt-3"
            onClick={handleGoogleSignIn}
          >
            Sign in with Google
          </Button>
        </Col>
        <Button
          variant="link"
          onClick={() => {
            setIsLogin(!isLogin);
          }}
        >
          {isLogin ? (
            <b>Need an account?<br />Click here to register!</b>
          ) : (
            <b>Already have an account?<br />Click here to login!</b>
          )}
        </Button>
      </Row>
    </Container>
  );
};

export default LoginRegisterPage;
