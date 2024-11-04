import React, { useState } from "react";
import { Container, Row, Col, Button, Dropdown, Badge, Form } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { useProductContext } from "../contexts/ProductContext";
import Loader from "../components/utility/Loader";
import ProductCard from "../components/product/ProductCard";

const CategoryProductsPage = () => {
  const { category } = useParams();
  const { productsLoading, allProducts } = useProductContext();
  const navigate = useNavigate();

  // State for search, sorting, and grouping
  const [sortOption, setSortOption] = useState("newest");
  const [searchTerm, setSearchTerm] = useState("");

  // Filter products based on category and search term
  const filteredProducts = allProducts
    .filter(
      (product) =>
        product.category.toLowerCase() === category &&
        (product.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
         product.brand.toLowerCase().includes(searchTerm.toLowerCase()))
    );

  // Sorting and grouping logic
  const sortedProducts = sortOption === "type"
    ? filteredProducts.reduce((grouped, product) => {
        // Group products by type
        (grouped[product.type] = grouped[product.type] || []).push(product);
        return grouped;
      }, {})
    : filteredProducts.sort((a, b) => {
        switch (sortOption) {
          case "priceLowToHigh":
            return a.price - b.price;
          case "priceHighToLow":
            return b.price - a.price;
          case "averageReviews":
            return (b.averageReviews || 0) - (a.averageReviews || 0);
          case "newest":
            return new Date(b.createdAt) - new Date(a.createdAt);
          case "bestSellers":
            return (b.salesCount || 0) - (a.salesCount || 0);
          default:
            return 0;
        }
      });

  const categoryUpperCaseLetter =
    category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();

  if (productsLoading) {
    return <Loader />;
  }

  // Mapping sort options to user-friendly labels
  const sortOptionsLabels = {
    priceLowToHigh: "Price: Low to High",
    priceHighToLow: "Price: High to Low",
    averageReviews: "Average Customer Reviews",
    newest: "Newest Products",
    bestSellers: "Best Sellers",
    type: "Type"
  };

  return (
    <Container className="custom-container mt-4">
      <Row>
        <h2>{categoryUpperCaseLetter}</h2>
      </Row>
      
      {/* Sorting and Search Controls */}
      <Row className="mb-3 align-items-center">
        <Col md={6}>
          <Form.Control
            type="text"
            placeholder="Search products by name or brand..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Col>
        
        <Col md={3}>
          <Dropdown onSelect={(option) => setSortOption(option)}>
            <Dropdown.Toggle variant="primary" id="sort-dropdown">
              Sort By
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item eventKey="priceLowToHigh">Price: Low to High</Dropdown.Item>
              <Dropdown.Item eventKey="priceHighToLow">Price: High to Low</Dropdown.Item>
              <Dropdown.Item eventKey="averageReviews">Average Customer Reviews</Dropdown.Item>
              <Dropdown.Item eventKey="newest">Newest Products</Dropdown.Item>
              <Dropdown.Item eventKey="bestSellers">Best Sellers</Dropdown.Item>
              <Dropdown.Item eventKey="type">Type</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>

        <Col md={3}>
          <span>
            Current Sort: <Badge bg="secondary">{sortOptionsLabels[sortOption]}</Badge>
          </span>
        </Col>
      </Row>

      {/* Display Products */}
      {filteredProducts.length === 0 ? (
        <Row className="m-4">
          <Col>
            <p>No products found for "{searchTerm}" in {categoryUpperCaseLetter}.</p>
          </Col>
        </Row>
      ) : sortOption === "type" ? (
        // Render grouped by type
        Object.entries(sortedProducts).map(([type, products]) => (
          <React.Fragment key={type}>
            <Row className="mt-4">
              <h4>{type}</h4>
            </Row>
            <Row className="m-3">
              {products.map((product) => (
                <Col key={product.id} xs={6} sm={5} md={4} lg={3} className="mb-3">
                  <ProductCard product={product} />
                </Col>
              ))}
            </Row>
          </React.Fragment>
        ))
      ) : (
        <Row className="m-3">
          {sortedProducts.map((product) => (
            <Col key={product.id} xs={6} sm={5} md={4} lg={3} className="mb-3">
              <ProductCard product={product} />
            </Col>
          ))}
        </Row>
      )}

      {/* Navigation Buttons */}
      <Row className="custom-centered-buttons-container">
        <Button
          className="m-2 custom-centered-buttons"
          onClick={() => navigate(-1)}
        >
          Go back
        </Button>
        <Button
          className="m-2 custom-centered-buttons"
          onClick={() => navigate("/")}
        >
          Home
        </Button>
      </Row>
    </Container>
  );
};

export default CategoryProductsPage;
