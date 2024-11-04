import React from "react";
import { useValidationContext } from "../../contexts/ValidationContext";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { logoMap } from "../../assets/LogoMap";

const FeaturedCard = ({ product }) => {
  const logo = logoMap[product.brand] || null;
  const { formatPrice, smallSquareLogoStyle } = useValidationContext();

  return (
    <Card className="featured-card">
      <Link to={`/product/${product.id}`} className="black-link-text">
        <Card.Img
          variant="top"
          src={product.image1}
          className="featured-product-image"
        />
        <Card.Img
          variant="top"
          src={logo}
          className="featured-product-brand-logo"
          style={smallSquareLogoStyle(product.brand)}
        />
      </Link>
      <Card.Body>
        <Card.Title className="featured-product-title">
          <b>
            {product.brand} {product.model}
          </b>
        </Card.Title>
        <Card.Text className="small-price-text">
          {formatPrice(product.price)}
        </Card.Text>
      </Card.Body>
      <Link to={`/product/${product.id}`}>
        <Button variant="primary" size="sm" className="featured-product-button">
          More details
        </Button>
      </Link>
    </Card>
  );
};

export default FeaturedCard;
