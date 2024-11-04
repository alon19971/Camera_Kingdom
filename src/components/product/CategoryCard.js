import React from "react";
import { Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import camerasLogo from "../../assets/camerasLogo.png";
import bagsLogo from "../../assets/bagsLogo.png";
import accessoriesLogo from "../../assets/accessoriesLogo.png";
import lensesLogo from "../../assets/lensesLogo.png";
import lightingLogo from "../../assets/lightingLogo.png";
import tripodsLogo from "../../assets/tripodsLogo.png";

const CategoryCard = ({ category, variant }) => {
  const logo =
    category.name === "cameras"
      ? camerasLogo
      : category.name === "bags"
      ? bagsLogo
      : category.name === "accessories"
      ? accessoriesLogo
      : category.name === "lenses"
      ? lensesLogo
      : category.name === "lighting"
      ? lightingLogo
      : tripodsLogo;

  const categoryUpperCaseLetter =
    category.name.charAt(0).toUpperCase() +
    category.name.slice(1).toLowerCase();

  const size = variant.size;

  return (
    <Col md={size === "sm" ? 2 : 3} className={size === "sm" ? "mb-2" : "mb-4"}>
      <Card className={size === "sm" ? "small-category-card" : "category-card"}>
        <Link to={`/categories/${category.name}`} className="black-link-text">
          <Card.Img
            src={logo}
            alt={category.name}
            className={
              size === "sm" ? "small-category-card-img" : "category-card-img"
            }
          />
          <strong
            className={size === "sm" ? "mt-2 h6 d-block" : "mt-2 h3 d-block"}
          >
            <b>{categoryUpperCaseLetter}</b>
          </strong>
        </Link>
      </Card>
    </Col>
  );
};

export default CategoryCard;
