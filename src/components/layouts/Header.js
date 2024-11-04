import React from "react";
import { Navbar, Nav, Dropdown, Image } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import logo from "../../assets/logo_small.png";
import userImage from "../../assets/user-nobgnew.png";
import { useAuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { userLoading, currentUser, userData, logout } = useAuthContext();
  const navigate = useNavigate();
  // console.log(userData);

  const handleLogout = () => {
    logout()
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        alert(
          "An error occured while attempting to log out. Please contact support"
        );
        console.error("Logout failed:", error);
      });
  };

  return (
    <Navbar
      bg="light"
      expand="sm"
      className="border-bottom border-5 border-dark"
    >
      <Navbar.Brand>
        <LinkContainer to="/" className="header-logo-container">
          <Image src={logo} roundedCircle width={100} height={100} />
        </LinkContainer>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <LinkContainer to="/">
            <Nav.Link>
              <h5>Home</h5>
            </Nav.Link>
          </LinkContainer>
          <LinkContainer to="/categories">
            <Nav.Link>
              <h5>Categories</h5>
            </Nav.Link>
          </LinkContainer>
          <LinkContainer to="/contactus">
            <Nav.Link>
              <h5>Contact Us</h5>
            </Nav.Link>
          </LinkContainer>
          <LinkContainer to="/cart">
            <Nav.Link>
              <h5>Cart</h5>
            </Nav.Link>
          </LinkContainer>
          {currentUser && (
            <LinkContainer to="/wishlist">
              <Nav.Link>
                <h5>Wishlist</h5>
              </Nav.Link>
            </LinkContainer>
          )}
        </Nav>
        <Nav className="ml-auto">
          {!userLoading && currentUser ? (
            <>
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
                    <Image
                      src={userImage}
                      roundedCircle
                      width={35}
                      height={35}
                    />
                  )}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <LinkContainer to="/profile">
                    <Dropdown.Item>Profile</Dropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/orders">
                    <Dropdown.Item>Orders</Dropdown.Item>
                  </LinkContainer>
                  {userData.isAdmin && (
                    <LinkContainer to="/manager">
                      <Dropdown.Item className="admin-dashboard-text">
                        Admin Dashboard
                      </Dropdown.Item>
                    </LinkContainer>
                  )}
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={handleLogout} className="text-danger">
                    Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              {/* {userData.role === "admin" && (
                <LinkContainer to="/manager">
                  <Nav.Link>
                    <h5>Admin Dashboard</h5>
                  </Nav.Link>
                </LinkContainer>
              )} */}
            </>
          ) : (
            <LinkContainer to="/login">
              <Nav.Link>
                <h5>Login/Register</h5>
              </Nav.Link>
            </LinkContainer>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;