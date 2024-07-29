// src/pages/Auth.js
import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { auth, googleProvider } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const toggleMode = () => {
    setIsLogin(!isLogin);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLogin) {
      // Login
      try {
        await signInWithEmailAndPassword(auth, email, password);
        alert('Logged in successfully');
        navigate('/');
      } catch (error) {
        alert(error.message);
      }
    } else {
      // Register
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        alert('Registered successfully');
        navigate('/');
      } catch (error) {
        alert(error.message);
      }
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      alert('Signed in with Google');
      navigate('/');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <h2>{isLogin ? 'Login' : 'Register'}</h2>
          <Form onSubmit={handleSubmit}>
            {!isLogin && (
              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Name</Form.Label>
                <Form.Control
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
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              {isLogin ? 'Login' : 'Register'}
            </Button>
            <Button variant="link" onClick={toggleMode}>
              {isLogin ? 'Need an account? Register' : 'Have an account? Login'}
            </Button>
          </Form>
          <Button className="google-signin-btn mt-3" onClick={handleGoogleSignIn}>
            Sign in with Google
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Auth;
