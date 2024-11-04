import React, { useState } from "react";
import Loader from "../components/utility/Loader";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { useAuthContext } from "../contexts/AuthContext";
import { useCartContext } from "../contexts/CartContext";
import { usePurchaseContext } from "../contexts/PurchaseContext";
import { useValidationContext } from "../contexts/ValidationContext";
import { useNavigate } from "react-router-dom";
import CartProductCard from "../components/cart/CartProductCard";

const PurchasePage = () => {
  const { currentUser, userLoading } = useAuthContext();
  const { cart, cartLoading } = useCartContext();
  const { shippingPrice, orderTotalPrice, orderPayment, completeOrder } =
    usePurchaseContext();
  const { formatPrice } = useValidationContext();
  // Payment details
  const [cardHolderName, setCardHolderName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [cvc, setCvc] = useState("");
  const [numberOfPayments, setNumberOfPayments] = useState("1");
  // Shipment details
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [streetName, setStreetName] = useState("");
  const [houseNumber, setHouseNumber] = useState("");
  const [city, setCity] = useState("");
  const [deliveryOption, setDeliveryOption] = useState("none");
  const [deliveryInfo, setDeliveryInfo] = useState("");
  // Details confirmation
  const [confirm, setConfirm] = useState(false);
  // useNavigate
  const navigate = useNavigate();

  // Error texts
  const [nameError, setNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [streetError, setStreetError] = useState("");
  const [houseError, setHouseError] = useState("");
  const [cityError, setCityError] = useState("");
  const [deliveryError, setDeliveryError] = useState("");
  const [cardholderError, setCardholderError] = useState("");
  const [cardNumberError, setCardNumberError] = useState("");
  const [expirationError, setExpirationError] = useState("");
  const [cvcError, setCvcError] = useState("");
  const [confirmError, setConfirmError] = useState("");

  // Method to reset the errors
  // Used every time a complete order is clicked
  const resetErrors = () => {
    setNameError("");
    setPhoneError("");
    setEmailError("");
    setStreetError("");
    setHouseError("");
    setCityError("");
    setDeliveryError("");
    setCardholderError("");
    setCardNumberError("");
    setExpirationError("");
    setCvcError("");
    setConfirmError("");
  };

  // Method to set the needed error text
  const updateErrorMessage = (error) => {
    const errorMessage = error.message.toLowerCase();
    if (errorMessage.includes("your name")) {
      setNameError(error.message);
      window.scrollTo(0, 480);
    } else if (errorMessage.includes("phone")) {
      setPhoneError(error.message);
      window.scrollTo(0, 480);
    } else if (errorMessage.includes("email")) {
      setEmailError(error.message);
      window.scrollTo(0, 480);
    } else if (errorMessage.includes("street")) {
      setStreetError(error.message);
      window.scrollTo(0, 480);
    } else if (errorMessage.includes("house")) {
      setHouseError(error.message);
      window.scrollTo(0, 480);
    } else if (errorMessage.includes("city")) {
      setCityError(error.message);
      window.scrollTo(0, 480);
    } else if (errorMessage.includes("delivery")) {
      setDeliveryError(error.message);
      window.scrollTo(0, 480);
    } else if (errorMessage.includes("cardholder")) {
      setCardholderError(error.message);
      window.scrollTo(0, 1100);
    } else if (errorMessage.includes("card number")) {
      setCardNumberError(error.message);
      window.scrollTo(0, 1100);
    } else if (errorMessage.includes("expiration")) {
      setExpirationError(error.message);
      window.scrollTo(0, 1100);
    } else if (errorMessage.includes("cvc")) {
      setCvcError(error.message);
      window.scrollTo(0, 1100);
    } else if (errorMessage.includes("confirm")) {
      setConfirmError(error.message);
      window.scrollTo(0, 1100);
    } else {
      alert(error.message);
    }
  };

  // useEffect(() => {
  //   if (currentUser) {
  //     setFullName(currentUser.displayName || "");
  //     setEmail(currentUser.email || "");
  //   }
  // }, [currentUser]);

  // Const for total price with shipping
  const totalPricePlusShipping =
    orderTotalPrice() + shippingPrice(deliveryOption);

  const handleContinueShopping = () => {
    navigate("/categories");
  };

  const handleCompleteOrder = (e) => {
    e.preventDefault();
    resetErrors();

    const orderDetails = {
      shipping: {
        fullName,
        phoneNumber,
        email,
        streetName,
        houseNumber,
        city,
        deliveryOption,
        deliveryInfo,
      },
      payment: {
        cardHolderName,
        cardNumber,
        expirationDate,
        cvc,
        numberOfPayments,
      },
    };

    completeOrder(orderDetails, confirm)
      .then(() => {
        alert("Order completed successfully!");
        navigate("/");
      })
      .catch((error) => {
        updateErrorMessage(error);
      });
  };

  if (userLoading || cartLoading) {
    return <Loader />;
  }

  return (
    <Container className="custom-container mt-4 mb-5">
      <Row className="m-4">
        <h2>Checkout</h2>
      </Row>
      {cart.length === 0 ? (
        <>
          <h5>You have not added any products to purchase</h5>
          <Button
            variant="success"
            size="lg"
            className="m-4"
            onClick={() => navigate("/categories")}
          >
            Start shopping
          </Button>
          <br />
          <Button className="m-2" onClick={() => navigate(-1)}>
            Go back
          </Button>
          <Button className="m-2" onClick={() => navigate("/")}>
            Home
          </Button>
        </>
      ) : (
        <>
          <Row>
            <Col>
              <Card className="order-container">
                <Card.Header className="mb-3">
                  <h5 className="m-3">Order items</h5>
                </Card.Header>
                {/* <Container> */}
                {/* <ListGroup> */}
                <>
                  {cart.map((product) => (
                    <CartProductCard key={product.id} product={product} />
                    // <ListGroup.Item className="d-flex align-items-center mb-3">
                    //   {/* Product Image */}
                    //   <Image
                    //     src={product.image1}
                    //     alt={product.model}
                    //     rounded
                    //     style={{ width: "80px", height: "80px", objectFit: "cover" }}
                    //     className="me-3"
                    //   />

                    //   {/* Product Details */}
                    //   <div className="flex-grow-1">
                    //     <h6>{product.model}</h6>
                    //     <p className="text-muted small">Price: ₪ {product.price}</p>
                    //   </div>

                    //   {/* Quantity Selector */}
                    //   <Form.Control
                    //     type="number"
                    //     min="1"
                    //     value={product.quantity}
                    //     onChange={(newQuantity) =>
                    //       handleQuantityChange(product.id, newQuantity)
                    //     }
                    //     style={{ width: "80px" }}
                    //     className="me-3"
                    //   />

                    //   {/* Total Price for Product */}
                    //   <p className="mb-0 me-3">
                    //     ₪ {product.price * product.quantity}
                    //   </p>

                    //   {/* Remove Button */}
                    //   <Button
                    //     variant="danger"
                    //     size="sm"
                    //     onClick={() =>removeFromCart(product)}
                    //   >
                    //     Remove
                    //   </Button>
                    // </ListGroup.Item>
                  ))}
                </>

                {/* </ListGroup> */}
              </Card>
            </Col>
          </Row>

          <Row className="mt-5 d-flex justify-content-center">
            <Col md={8}>
              <Card className="order-container">
                <Card.Header>
                  <h5 className="m-3">Shipment details</h5>
                  <p>Please fill in the shipping information</p>
                  {/* <Container className="mt-4 d-flex justify-content-center"> */}
                </Card.Header>
                <Card.Body>
                  <Form>
                    <Row>
                      <Col md={6}>
                        <p>
                          <b>Personal details:</b>
                        </p>
                        <Form.Group
                          className="mb-3 text-start custom-form-group"
                          controlId="formBasicName"
                        >
                          <Form.Label>Full name:</Form.Label>
                          <Form.Control
                            className="form-controls"
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            isInvalid={!!nameError}
                            // placeholder="Enter your name"
                          />
                          <Form.Control.Feedback type="invalid">
                            <b>{nameError}</b>
                          </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group
                          className="mb-3 text-start custom-form-group"
                          controlId="formBasicPhone"
                        >
                          <Form.Label>Phone number:</Form.Label>
                          <Form.Control
                            className="form-controls"
                            type="text"
                            maxLength={10}
                            value={phoneNumber}
                            // onInput={(e) => {
                            //   // Do not allow non-numeric characters
                            //   const value = e.target.value.replace(/\D/g, "");

                            //   // Set the modified value
                            //   e.target.value = value;
                            //   setPhoneNumber(e.target.value);
                            // }}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            isInvalid={!!phoneError}
                            // placeholder="Enter your name"
                          />
                          <Form.Control.Feedback type="invalid">
                            <b>{phoneError}</b>
                          </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group
                          className="mb-3 text-start custom-form-group"
                          controlId="formBasicEmail"
                        >
                          <Form.Label>Email address:</Form.Label>
                          <Form.Control
                            className="form-controls"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            isInvalid={!!emailError}
                            // placeholder="Enter email"
                          />
                          <Form.Control.Feedback type="invalid">
                            <b>{emailError}</b>
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>

                      <Col md={6}>
                        <p>
                          <b>Address details:</b>
                        </p>
                        <Form.Group
                          className="mb-3 text-start custom-form-group"
                          controlId="formStreet"
                        >
                          <Form.Label>Street name:</Form.Label>
                          <Form.Control
                            className="form-controls"
                            type="text"
                            value={streetName}
                            onChange={(e) => setStreetName(e.target.value)}
                            isInvalid={!!streetError}
                          />
                          <Form.Control.Feedback type="invalid">
                            <b>{streetError}</b>
                          </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group
                          className="mb-3 text-start custom-form-group"
                          controlId="formHouse"
                        >
                          <Form.Label>House number:</Form.Label>
                          <Form.Control
                            className="form-controls"
                            type="text"
                            value={houseNumber}
                            onChange={(e) => setHouseNumber(e.target.value)}
                            isInvalid={!!houseError}
                          />
                          <Form.Control.Feedback type="invalid">
                            <b>{houseError}</b>
                          </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group
                          className="mb-3 text-start custom-form-group"
                          controlId="formCity"
                        >
                          <Form.Label>City:</Form.Label>
                          <Form.Control
                            className="form-controls"
                            type="text"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            isInvalid={!!cityError}
                          />
                          <Form.Control.Feedback type="invalid">
                            <b>{cityError}</b>
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                    </Row>

                    {/* Delivery Method Combo Box */}
                    <Form.Group
                      className="mb-3 text-start custom-form-group"
                      controlId="deliveryMethod"
                    >
                      <Form.Label>Delivery option:</Form.Label>
                      <Form.Select
                        className="form-controls"
                        value={deliveryOption}
                        onChange={(e) => setDeliveryOption(e.target.value)}
                        isInvalid={!!deliveryError}
                      >
                        <option value="none">
                          Please choose a delivery option
                        </option>
                        <option value="standard">
                          Standard delivery (7-14 business days) - ₪ 0
                        </option>
                        <option value="express">
                          Express delivery (3-5 business days - Free for orders
                          over ₪ 500)
                          {orderTotalPrice() > 500 ? " - ₪ 0" : " - ₪ 60"}
                        </option>
                        {/* <option value="pickup">Pickup from Store</option> */}
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        <b>{deliveryError}</b>
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mt-4" controlId="formBasicMessage">
                      <Form.Label>Additional delivery information:</Form.Label>
                      <Form.Control
                        className="form-controls"
                        as="textarea"
                        rows={3}
                        value={deliveryInfo}
                        onChange={(e) => setDeliveryInfo(e.target.value)}
                      />
                    </Form.Group>
                  </Form>
                </Card.Body>
              </Card>
              {/* </Container> */}
            </Col>
          </Row>

          <Row className="mt-5">
            <Col md={8}>
              <Card className="order-container">
                <Card.Header>
                  <h5 className="m-3">Payment details</h5>
                </Card.Header>
                <Card.Body>
                  <Form>
                    <Form.Group
                      className="mb-3 text-start custom-form-group"
                      controlId="formCardName"
                    >
                      <Form.Label>Cardholder name:</Form.Label>
                      <Form.Control
                        className="form-controls"
                        type="text"
                        value={cardHolderName}
                        onChange={(e) => setCardHolderName(e.target.value)}
                        isInvalid={!!cardholderError}
                        // placeholder="Enter cardholder's name"
                      />
                      <Form.Control.Feedback type="invalid">
                        <b>{cardholderError}</b>
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group
                      className="mb-3 text-start custom-form-group"
                      controlId="formCardNumber"
                    >
                      <Form.Label>Card number:</Form.Label>
                      <Form.Control
                        className="form-controls"
                        type="text"
                        pattern="[0-9]*"
                        maxLength={19}
                        value={cardNumber}
                        placeholder="1234 5678 9012 3456"
                        onChange={(e) => {
                          // Add spaces after every 4 characters
                          if (e.target.value.length > 4) {
                            e.target.value = e.target.value.replace(
                              /(\d{4})(?=\d)/g,
                              "$1 "
                            );
                          }

                          // Set the modified value
                          setCardNumber(e.target.value);
                        }}
                        isInvalid={!!cardNumberError}
                      />
                      <Form.Control.Feedback type="invalid">
                        <b>{cardNumberError}</b>
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Row>
                      <Col md={6}>
                        <Form.Group
                          className="mb-3 text-start custom-form-group"
                          controlId="formExpirationDate"
                        >
                          <Form.Label>Expiration date:</Form.Label>
                          <Form.Control
                            className="form-controls"
                            type="text"
                            pattern="(0[1-9]|1[0-2])\/[0-9]{2}"
                            maxLength={5}
                            value={expirationDate}
                            placeholder="MM/YY"
                            onChange={(e) => {
                              let value = e.target.value;

                              // Add slash automatically after two digits
                              if (value.length === 2 && !value.includes("/")) {
                                value += `/`;
                              }

                              // Set the modified value
                              setExpirationDate(value);
                            }}
                            isInvalid={!!expirationError}
                          />
                          <Form.Control.Feedback type="invalid">
                            <b>{expirationError}</b>
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group
                          className="mb-3 text-start custom-form-group"
                          controlId="formCVC"
                        >
                          <Form.Label>CVC:</Form.Label>
                          <Form.Control
                            className="form-controls"
                            type="text"
                            maxLength={3}
                            value={cvc}
                            placeholder="3-digit security number"
                            // onInput={(e) => {
                            //   // Do not allow non-numeric characters
                            //   const value = e.target.value.replace(/\D/g, "");

                            //   // Set the modified value
                            //   e.target.value = value;
                            //   setCvc(e.target.value);
                            // }}
                            onChange={(e) => setCvc(e.target.value)}
                            isInvalid={!!cvcError}
                          />
                          <Form.Control.Feedback type="invalid">
                            <b>{cvcError}</b>
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                    </Row>
                    {/* Payment Option Combo Box */}
                    <Form.Group
                      className="text-start"
                      controlId="paymentOption"
                    >
                      <Form.Label>Number of payments:</Form.Label>
                      <Form.Select
                        className="form-controls"
                        value={numberOfPayments}
                        onChange={(e) => setNumberOfPayments(e.target.value)}
                      >
                        <option value="1">
                          1 Payment (1 × {formatPrice(totalPricePlusShipping)})
                        </option>
                        <option value="2">
                          2 Payments (2 ×{" "}
                          {orderPayment(totalPricePlusShipping, 2)})
                        </option>
                        <option value="3">
                          3 Payments (3 ×{" "}
                          {orderPayment(totalPricePlusShipping, 3)})
                        </option>
                        <option value="4">
                          4 Payments (4 ×{" "}
                          {orderPayment(totalPricePlusShipping, 4)})
                        </option>
                        <option value="5">
                          5 Payments (5 ×{" "}
                          {orderPayment(totalPricePlusShipping, 5)})
                        </option>
                        <option value="6">
                          6 Payments (6 ×{" "}
                          {orderPayment(totalPricePlusShipping, 6)})
                        </option>
                        <option value="7">
                          7 Payments (7 ×{" "}
                          {orderPayment(totalPricePlusShipping, 7)})
                        </option>
                        <option value="8">
                          8 Payments (8 ×{" "}
                          {orderPayment(totalPricePlusShipping, 8)})
                        </option>
                        <option value="9">
                          9 Payments (9 ×{" "}
                          {orderPayment(totalPricePlusShipping, 9)})
                        </option>
                        <option value="10">
                          10 Payments (10 ×{" "}
                          {orderPayment(totalPricePlusShipping, 10)})
                        </option>
                        <option value="11">
                          11 Payments (11 ×{" "}
                          {orderPayment(totalPricePlusShipping, 11)})
                        </option>
                        <option value="12">
                          12 Payments (12 ×{" "}
                          {orderPayment(totalPricePlusShipping, 12)})
                        </option>
                      </Form.Select>
                    </Form.Group>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="order-container">
                <Card.Header>
                  <h5 className="m-3">Order summary</h5>
                </Card.Header>
                <Card.Body className="text-start">
                  {/* <h6>Total products: {cart.length}</h6> */}
                  {cart.map((product) => (
                    <Row key={product.id} className="mb-2">
                      <Col>
                        <p>
                          <b>
                            {product.brand} {product.model}
                          </b>{" "}
                          × {product.quantity}
                        </p>
                      </Col>
                      <Col className="text-end">
                        {formatPrice(product.price * product.quantity)}
                      </Col>
                    </Row>
                  ))}

                  <hr />
                  <Row className="mt-3">
                    <Col>
                      <h6>Shipping:</h6>
                      <h6>Total price:</h6>
                    </Col>
                    <Col md={7} className="text-end">
                      <h6>
                        <b>₪ {shippingPrice(deliveryOption)}</b>
                      </h6>
                      <h6>
                        {orderPayment(totalPricePlusShipping, numberOfPayments)}{" "}
                        × {numberOfPayments} ={" "}
                        <b>{formatPrice(totalPricePlusShipping)}</b>
                      </h6>
                    </Col>
                  </Row>

                  <Form.Group
                    className="mt-3 text-start"
                    controlId="formConfirm"
                  >
                    <Form.Check
                      className="custom-checkbox"
                      type="checkbox"
                      label="I confirm all the details are correct"
                      checked={confirm}
                      onChange={() => setConfirm(!confirm)}
                      isInvalid={!!confirmError}
                    />
                    {confirmError && (
                      <div className="invalid-feedback d-block">
                        <b>{confirmError}</b>
                      </div>
                    )}
                  </Form.Group>
                </Card.Body>
              </Card>

              {/* Action Buttons */}
              {/* <div className="mt-4">
            <Button
              variant="secondary"
              onClick={handleContinueShopping}
              className="w-100 mb-3"
            >
              Continue Shopping
            </Button>
            <Button
              variant="primary"
              className="w-100"
              // onClick={handleCheckout}
            >
              Complete Order
            </Button>
          </div> */}
              <Row className="cart-buttons-container">
                <Col className="d-flex justify-content-center">
                  <Button
                    variant="secondary"
                    size="md"
                    onClick={handleContinueShopping}
                    className="cart-buttons me-3"
                  >
                    Continue shopping
                  </Button>
                  <Button
                    variant="primary"
                    size="md"
                    onClick={handleCompleteOrder}
                    className="cart-buttons"
                  >
                    Complete order
                  </Button>
                </Col>
              </Row>
            </Col>
            {/* <Card className="cart-card mt-5 mb-3 w-25 ms-auto">
          <Card.Body className="p-2 mt-3">
            <Row>
              <Col className="d-flex">
                <p className="small text-muted ms-4 me-5">Order total:</p>
                <h6>
                  <b>₪ {orderTotal}</b>
                </h6>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        <Row className="cart-buttons-container">
          <Col className="d-flex justify-content-end">
            <Button
              variant="secondary"
              onClick={handleContinueShopping}
              className="cart-buttons btn-lg me-3"
            >
              Continue shopping
            </Button>
            <Button
              variant="primary"
              className="cart-buttons btn-lg"
              // onClick={handleCheckout}
            >
              Complete order
            </Button>
          </Col>
        </Row> */}
          </Row>
        </>
      )}
    </Container>
    // </Container>
  );
};

export default PurchasePage;
