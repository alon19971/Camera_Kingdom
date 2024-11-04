import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import { sendEmailVerification } from "firebase/auth";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";

const LoginRegisterPage = () => {
  const { login, googleLogin, register, logout } = useAuthContext();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  // Error texts
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [repeatPasswordError, setRepeatPasswordError] = useState("");

  // Paswword visability
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  // Functions to toggle password visibility
  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
  const toggleRepeatPasswordVisibility = () =>
    setShowRepeatPassword((prev) => !prev);

  // Method to reset the errors
  // Used every time a form is submitted and when changing between login and register
  const resetErrors = () => {
    setNameError("");
    setEmailError("");
    setPasswordError("");
    setRepeatPasswordError("");
  };

  // Method to clear input fields
  // Used when changing between login and register
  const clearFields = () => {
    setName("");
    setEmail("");
    setPassword("");
    setRepeatPassword("");
  };

  // Method to set the needed error text
  const updateErrorMessage = (error) => {
    const errorMessage = error.message.toLowerCase();
    if (errorMessage.includes("verification")) {
      toast.error(error.message);
    } else if (errorMessage.includes("name")) {
      setNameError(error.message);
    } else if (errorMessage.includes("email")) {
      setEmailError(error.message);
    } else if (errorMessage.includes("password")) {
      setPasswordError(error.message);
    } else {
      toast.error(error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    resetErrors();

    if (isLogin) {
      // Login
      // await login(email, password);
      login(email, password)
        // .then(async (userCredentals) => {
        //   const user = userCredentals.user;
        //   console.log(user);
        //   if (email === "ckadmin@camerakingdom.com" || user.emailVerified) {
        //     alert("Logged in successfully!");
        //     navigate("/");
        //   } else {
        //     alert("Email verification is required.");

        //     // Check when the last email was sent
        //     const metadata = user.metadata;
        //     const lastSignInTime = new Date(metadata.lastSignInTime).getTime();
        //     const now = new Date().getTime();

        //     // Allow resending after 5 minutes
        //     const oneMinute = 60 * 5000;

        //     if (now - lastSignInTime > oneMinute) {
        //       try {
        //         await sendEmailVerification(user);
        //         alert("Verification email sent. Please check your inbox.");
        //       } catch (error) {
        //         if (error.code === "auth/too-many-requests") {
        //           alert(
        //             "Too many verification requests. Please try again later."
        //           );
        //         } else {
        //           alert("An error occurred while sending verification email.");
        //         }
        //       }
        //     } else {
        //       alert(
        //         "A verification email has already been sent. Please check your inbox."
        //       );
        //     }
        //     logout();
        //     navigate("/login");
        //   }
        // })
        .then((userCredentials) => {
          toast(`Welcome ${userCredentials.user.displayName}!`);
          navigate("/");
        })
        .catch((error) => {
          logout();
          clearFields();
          updateErrorMessage(error);
        });
    } else {
      // Register
      // Validate repeat password input:
      // If repeat password is empty
      if (repeatPassword === "") {
        setRepeatPasswordError("Please repeat your password");
        return;
      }
      // Check if passwords match
      if (password !== repeatPassword) {
        setRepeatPasswordError("Passwords do not match");
        return;
      }

      register(name, email, password)
        .then((userCredentials) => {
          const user = userCredentials.user;
          toast.success(
            "Registered successfully!\nVerification email sent. Please verify your email"
          );
          sendEmailVerification(user);
          logout();
          // Force refresh to move to login page
          window.location.reload();
        })
        .catch((error) => {
          updateErrorMessage(error);
        });
    }
  };

  const handleGoogleSignIn = () => {
    googleLogin()
      .then((userCredentials) => {
        toast(`Welcome ${userCredentials.user.displayName}!`);
        navigate("/");
      })
      .catch((error) => {
        toast.error("Failed to sign in with google");
        console.log("Error while signing in with google: ", error);
      });
  };

  // return (
  //   <Container className="mt-4">
  //     <Row className="justify-content-center">
  //       <Col md={6}>
  //         <h2 className="mb-4 text-center">{isLogin ? "Login" : "Register"}</h2>
  //         <Form onSubmit={handleSubmit}>
  //           {!isLogin && (
  //             <Form.Group className="mb-3" controlId="formBasicName">
  //               <Form.Label>Name</Form.Label>
  //               <Form.Control
  //                 type="text"
  //                 placeholder="Enter your name"
  //                 value={name}
  //                 onChange={(e) => setName(e.target.value)}
  //               />
  //             </Form.Group>
  //           )}
  //           <Form.Group className="mb-3" controlId="formBasicEmail">
  //             <Form.Label>Email address</Form.Label>
  //             <Form.Control
  //               type="email"
  //               placeholder="Enter email"
  //               value={email}
  //               onChange={(e) => setEmail(e.target.value)}
  //             />
  //           </Form.Group>
  //           <Form.Group className="mb-4" controlId="formBasicPassword">
  //             <Form.Label>Password</Form.Label>
  //             <Form.Control
  //               type="password"
  //               placeholder="Password"
  //               value={password}
  //               onChange={(e) => setPassword(e.target.value)}
  //             />
  //           </Form.Group>
  //           <div className="d-grid">
  //             <Button variant="primary" type="submit">
  //               {isLogin ? "Login" : "Register"}
  //             </Button>
  //           </div>
  //         </Form>
  //         <div className="d-grid mt-3">
  //           <Button
  //             className="google-signin-btn"
  //             onClick={handleGoogleSignIn}
  //             variant="outline-dark"
  //           >
  //             Sign in with Google
  //           </Button>
  //         </div>
  //         <div className="text-center mt-4">
  //           <Button
  //             variant="link"
  //             onClick={() => setIsLogin(!isLogin)}
  //           >
  //             {isLogin ? (
  //               <b>Need an account?<br />Click here to register!</b>
  //             ) : (
  //               <b>Already have an account?<br />Click here to login!</b>
  //             )}
  //           </Button>
  //         </div>
  //       </Col>
  //     </Row>
  //   </Container>
  // );

  return (
    <Container className="mt-4 d-flex justify-content-center">
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
                  isInvalid={!!nameError}
                />
                <Form.Control.Feedback type="invalid">
                  <b>{nameError}</b>
                </Form.Control.Feedback>
              </Form.Group>
            )}
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                className="form-controls"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                isInvalid={!!emailError}
              />
              <Form.Control.Feedback type="invalid">
                <b>{emailError}</b>
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-4" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Container className="password-container">
                <Form.Control
                  className="form-controls"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  isInvalid={!!passwordError}
                />
                <Button
                  variant="none"
                  onClick={togglePasswordVisibility}
                  className="show-hide-button"
                >
                  {showPassword ? (
                    <FaRegEyeSlash color="gray" />
                  ) : (
                    <FaRegEye color="gray" />
                  )}
                </Button>
              </Container>
              <Form.Control.Feedback
                type="invalid"
                style={{ display: "block" }}
              >
                <b>{passwordError}</b>
              </Form.Control.Feedback>
            </Form.Group>
            {!isLogin && (
              <Form.Group className="mb-4" controlId="formRepeatPassword">
                <Form.Label>Repeat password</Form.Label>
                <Container className="password-container">
                  <Form.Control
                    className="form-controls"
                    type={showRepeatPassword ? "text" : "password"}
                    placeholder="Repeat the password"
                    value={repeatPassword}
                    onChange={(e) => setRepeatPassword(e.target.value)}
                    isInvalid={!!repeatPasswordError}
                  />
                  <Button
                    variant="none"
                    onClick={toggleRepeatPasswordVisibility}
                    className="show-hide-button"
                  >
                    {showRepeatPassword ? (
                      <FaRegEyeSlash color="gray" />
                    ) : (
                      <FaRegEye color="gray" />
                    )}
                  </Button>
                </Container>
                <Form.Control.Feedback
                  type="invalid"
                  style={{ display: "block" }}
                >
                  <b>{repeatPasswordError}</b>
                </Form.Control.Feedback>
              </Form.Group>
            )}
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
            clearFields();
            resetErrors();
            setIsLogin(!isLogin);
          }}
        >
          {isLogin ? (
            <b>
              Need an account?
              <br />
              Click here to register!
            </b>
          ) : (
            <b>
              Already have an account?
              <br />
              Click here to login!
            </b>
          )}
        </Button>
      </Row>
    </Container>
  );
};

export default LoginRegisterPage;