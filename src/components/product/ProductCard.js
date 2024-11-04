import React from "react";
import { useCartContext } from "../../contexts/CartContext";
import { Button, Card, Row, Col } from "react-bootstrap";
import { logoMap } from "../../assets/LogoMap";
import { Link, useNavigate } from "react-router-dom";
import { useValidationContext } from "../../contexts/ValidationContext";
import { toast } from "react-toastify";

const ProductCard = ({ product }) => {
  const { addToCart } = useCartContext();
  const { formatPrice, largeSquareLogoStyle } = useValidationContext();
  const logo = logoMap[product.brand] || null;
  const navigate = useNavigate();

  const handleAddToCart = () => {
    addToCart(product)
      .then(() => {
        toast.success(`${product.model} added to your cart`);
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  const handleBuyNow = async () => {
    await addToCart(product);
    navigate("/purchase");
  };

  return (
    <Card className="product-card">
      <Link to={`/product/${product.id}`} className="black-link-text">
        <Card.Img
          variant="top"
          src={product.image1}
          className="product-image"
        />
        <Card.Img
          src={logo}
          className="product-brand-logo"
          style={largeSquareLogoStyle(product.brand)}
        />
      </Link>

      <Card.Body>
        <div>
          <Card.Title className="mt-2">
            <b>{product.brand}</b> <br /> {product.model}
          </Card.Title>
          <Card.Text className="price-text">
            {formatPrice(product.price)}
          </Card.Text>
        </div>
      </Card.Body>

      <div className="mt-4">
        <Row>
          <Col className="p-1">
            <Button
              variant="primary"
              size="md"
              className="product-buttons"
              onClick={handleAddToCart}
            >
              Add to cart
            </Button>
          </Col>
          <Col className="p-1">
            <Link to={`/product/${product.id}`}>
              <Button variant="primary" size="md" className="product-buttons">
                More details
              </Button>
            </Link>
          </Col>
        </Row>
        <Row>
          <Col className="p-1">
            <Button
              variant="success"
              size="lg"
              className="product-buttons w-100 mt-2"
              onClick={handleBuyNow}
            >
              Buy now
            </Button>
          </Col>
        </Row>
      </div>
    </Card>
  );
};

export default ProductCard;
