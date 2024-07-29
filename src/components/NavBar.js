// src/components/NavBar.js
import React from 'react';
import { Navbar, Nav, Dropdown, Image } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';

const NavBar = () => {
  const [user] = useAuthState(auth);

  const handleLogout = () => {
    auth.signOut();
  };

  return (
    <Navbar bg="light" expand="lg">
      <LinkContainer to="/">
        <Navbar.Brand>Camera Kingdom</Navbar.Brand>
      </LinkContainer>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <LinkContainer to="/">
            <Nav.Link>Home</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/categories">
            <Nav.Link>Categories</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/contact">
            <Nav.Link>Contact Us</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/cart">
            <Nav.Link>Cart</Nav.Link>
          </LinkContainer>
          {user && (
            <LinkContainer to="/wishlist">
              <Nav.Link>Wishlist</Nav.Link>
            </LinkContainer>
          )}
        </Nav>
        {user ? (
          <Dropdown align="end">
            <Dropdown.Toggle variant="light" id="dropdown-basic">
              {user.photoURL ? (
                <Image src={user.photoURL} roundedCircle width={30} height={30} />
              ) : (
                user.displayName
              )}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <LinkContainer to="/profile">
                <Dropdown.Item>Profile</Dropdown.Item>
              </LinkContainer>
              <LinkContainer to="/orders">
                <Dropdown.Item>Orders</Dropdown.Item>
              </LinkContainer>
              <Dropdown.Divider />
              <Dropdown.Item onClick={handleLogout} className="text-danger">
                Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        ) : (
          <LinkContainer to="/auth">
            <Nav.Link>Login/Register</Nav.Link>
          </LinkContainer>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
