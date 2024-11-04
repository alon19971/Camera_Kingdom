import React from "react";
import { useCartContext } from "../../contexts/CartContext";
import { useValidationContext } from "../../contexts/ValidationContext";
import {
  ListGroup,
  Container,
  Row,
  Col,
  Card,
  Button,
  Image,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import QuantityInput from "../utility/QuantityInput";
import RemoveProductAlert from "../alerts/RemoveProductAlert";

const CartProductCard = ({ product }) => {
  const { removeFromCart, changeQuantity } = useCartContext();
  const { formatPrice } = useValidationContext();

  const handleQuantityChange = (newQuantity) => {
    changeQuantity(product.id, newQuantity)
      .then(() => {
        console.log(`Quantity change for ${product.model}: ${newQuantity}`);
      })
      .catch((error) => {
        // Show warning if invalid quantity or error if quantity change failed
        if (!error.message.includes("Failed")) {
          toast.warning(error.message);
        } else {
          toast.error(error.message);
        }
      });
  };

  const handleRemoveFromCart = () => {
    RemoveProductAlert(product.model)
      .then((isConfirmed) => {
        if (isConfirmed) {
          return removeFromCart(product);
        } else {
          throw new Error("canceled");
        }
      })
      .then(() => {
        toast.info(`${product.model} removed from your cart`);
      })
      .catch((error) => {
        if (error.message === "canceled") {
          console.log("Product removal canceled by the user");
        } else {
          toast.error(error.message);
        }
      });
  };

  return (
    <ListGroup.Item className="d-flex align-items-center">
      <Row className="cart-card w-100">
        {/* Product Image */}
        <Col
          xs={3}
          md={2}
          className="d-flex flex-column justify-content-between"
        >
          <Link to={`/product/${product.id}`}>
            <Image
              src={product.image1}
              alt={product.model}
              // fluid
              height={80}
              className="featured-product-image p-2"
            />
          </Link>
        </Col>

        {/* Product Name */}
        <Col
          xs={4}
          md={3}
          className="d-flex flex-column justify-content-between"
        >
          <small className="text-muted">Product</small>
          <h6>
            {product.brand} {product.model}
          </h6>
          <span />
        </Col>

        {/* Quantity Input */}
        <Col
          xs={3}
          md={2}
          className="d-flex flex-column justify-content-between"
        >
          <small className="text-muted">Quantity</small>
          <QuantityInput
            defaultValue={product.quantity}
            min={1}
            max={100}
            step={1}
            onChange={(_, newQuantity) => handleQuantityChange(newQuantity)}
          />
        </Col>

        {/* Unit Price */}
        <Col
          xs={3}
          md={2}
          className="d-flex flex-column justify-content-between"
        >
          <small className="text-muted">Unit Price</small>
          <h6>{formatPrice(product.price)}</h6>
          <span />
        </Col>

        {/* Total Price */}
        <Col
          xs={3}
          md={2}
          className="d-flex flex-column justify-content-between"
        >
          <small className="text-muted">Total</small>
          <h6>{formatPrice(product.price * product.quantity)}</h6>
          <span />
        </Col>

        {/* Remove Button */}
        <Col
          xs={1}
          className="d-flex align-items-center justify-content-center"
        >
          <Button
            variant="link"
            aria-label="Remove product"
            onClick={handleRemoveFromCart}
          >
            <FaTrash color="red" size={22} />
          </Button>
        </Col>
        <hr />
      </Row>
    </ListGroup.Item>
  );
};

export default CartProductCard;
