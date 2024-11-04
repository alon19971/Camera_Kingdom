import React from "react";
<<<<<<< HEAD
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { logoMap } from "../../assets/LogoMap";

const ProductCard = ({ product }) => {
  const logo = logoMap[product.brand] || null;

  const squareLogoStyle =
    ["Nikon", "Leica", "Zeiss", "DJI", "Insta360"].includes(product.brand)
      ? { width: "70px", height: "70px" }
      : {};

  return (
    <Card className="product-card">
      <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <Card.Title>
          {product.brand} {product.model}
        </Card.Title>
        <Card.Body>
          <Card.Img variant="top" src={product.image1} height={200} />
          <Card.Img
            src={logo}
            className="product-brand-logo mt-3 mb-3"
            style={squareLogoStyle}
          />
          <Card.Text>{product.price}₪ ILS</Card.Text>
        </Card.Body>
      </Link>
      <Button variant="success" className="product-buttons">
        Buy now
      </Button>
      <Button variant="success" className="product-buttons">
        Add to cart
      </Button>
=======
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
>>>>>>> 893f93c (Added new sorting and search features for category pages)
    </Card>
  );
};

export default ProductCard;
