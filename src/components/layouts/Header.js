import React from "react";
import { Navbar, Nav, Dropdown, Image } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import logo from "../../assets/logo_small.png";
import { useAuthContext } from "../../contexts/AuthContext";

const Header = () => {
  const { currentUser, logout } = useAuthContext();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <Navbar bg="light" expand="sm" className="border-bottom border-5 border-dark">
      <LinkContainer to="/" className="header-logo">
        <Navbar.Brand>
          <Image src={logo} roundedCircle width={100} height={100} />
        </Navbar.Brand>
      </LinkContainer>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <LinkContainer to="/">
            <Nav.Link><h5>Home</h5></Nav.Link>
          </LinkContainer>
          <LinkContainer to="/categories">
            <Nav.Link><h5>Categories</h5></Nav.Link>
          </LinkContainer>
          <LinkContainer to="/contactus">
            <Nav.Link><h5>Contact Us</h5></Nav.Link>
          </LinkContainer>
          <LinkContainer to="/cart">
            <Nav.Link><h5>Cart</h5></Nav.Link>
          </LinkContainer>
          {currentUser && (
            <LinkContainer to="/wishlist">
              <Nav.Link><h5>Wishlist</h5></Nav.Link>
            </LinkContainer>
          )}
          {currentUser ? (
            <Dropdown align="end">
              <Dropdown.Toggle variant="light" id="dropdown-basic">
                <h6 className="d-inline">{currentUser.displayName} </h6>
                {currentUser.photoURL ? (
                  <Image
                  src={currentUser.photoURL}
                  roundedCircle
                  width={30}
                  height={30}
                  />
                ) : (
                  currentUser.displayName
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
            <LinkContainer to="/login">
              <Nav.Link><h5>Login/Register</h5></Nav.Link>
            </LinkContainer>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
