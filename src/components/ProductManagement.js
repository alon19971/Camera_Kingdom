import React, { useState, useEffect } from "react";
import { db } from "../firebase/firestore";
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";
import { Table, Button, Form } from "react-bootstrap";



const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    brand: "",
    category: "",
    image1: "",
    model: "",
    price: "",
    type: ""
  });

  useEffect(() => {
    // Fetch all products from Firestore
    const fetchProducts = async () => {
      const productCollection = await getDocs(collection(db, "products"));
      setProducts(productCollection.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };

    fetchProducts();
  }, []);

  // Handle input change for new product
  const handleInputChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  // Handle adding a new product
  const handleAddProduct = async () => {
    try {
      // Ensure all fields are filled
      if (!newProduct.brand || !newProduct.category || !newProduct.image1 || !newProduct.model || !newProduct.price || !newProduct.type) {
        alert("Please fill all the fields.");
        return;
      }

      // Validate and format the product details
      const productToAdd = {
        brand: newProduct.brand.charAt(0).toUpperCase() + newProduct.brand.slice(1), // Capitalize the first letter
        category: newProduct.category.toLowerCase(), // Lowercase
        image1: newProduct.image1,
        model: newProduct.model,
        price: parseFloat(newProduct.price), // Ensure price is a number
        type: newProduct.type.charAt(0).toUpperCase() + newProduct.type.slice(1) // Capitalize first letter
      };

      // Add the product to Firestore
      await addDoc(collection(db, "products"), productToAdd);

      // Update local state with the new product
      setProducts([...products, productToAdd]);

      // Clear the form
      setNewProduct({ brand: "", category: "", image1: "", model: "", price: "", type: "" });
      alert("Product added successfully!");
    } catch (error) {
      console.error("Error adding product: ", error);
    }
  };


  // Handle deleting a product
  const handleDeleteProduct = async (productId) => {
    try {
      await deleteDoc(doc(db, "products", productId));
      setProducts(products.filter((product) => product.id !== productId)); // Update UI
    } catch (error) {
      console.error("Error deleting product: ", error);
    }
  };

  return (
    <div>
      <h3>Product Management</h3>

      {/* Add Product Form */}
      <Form>
        <Form.Group controlId="productBrand">
          <Form.Label>Brand</Form.Label>
          <Form.Control
            type="text"
            name="brand"
            value={newProduct.brand}
            onChange={handleInputChange}
            placeholder="Enter brand (Company name)"
          />
        </Form.Group>

        <Form.Group controlId="productCategory">
          <Form.Label>Category</Form.Label>
          <Form.Control
            type="text"
            name="category"
            value={newProduct.category}
            onChange={handleInputChange}
            placeholder="Enter category (Lowercase)"
          />
        </Form.Group>

        <Form.Group controlId="productImage1">
          <Form.Label>Image URL</Form.Label>
          <Form.Control
            type="text"
            name="image1"
            value={newProduct.image1}
            onChange={handleInputChange}
            placeholder="Enter image URL"
          />
        </Form.Group>

        <Form.Group controlId="productModel">
          <Form.Label>Model</Form.Label>
          <Form.Control
            type="text"
            name="model"
            value={newProduct.model}
            onChange={handleInputChange}
            placeholder="Enter model name"
          />
        </Form.Group>

        <Form.Group controlId="productPrice">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            name="price"
            value={newProduct.price}
            onChange={handleInputChange}
            placeholder="Enter price"
          />
        </Form.Group>

        <Form.Group controlId="productType">
          <Form.Label>Type</Form.Label>
          <Form.Control
            type="text"
            name="type"
            value={newProduct.type}
            onChange={handleInputChange}
            placeholder="Enter type (First letter capital)"
          />
        </Form.Group>

        <Button className="mt-3" onClick={handleAddProduct}>
          Add Product
        </Button>
      </Form>

      {/* Product List */}
      <Table striped bordered hover className="mt-4">
        <thead>
          <tr>
            <th>Brand</th>
            <th>Model</th>
            <th>Price</th>
            <th>Category</th>
            <th>Image</th>
            <th>Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.brand}</td>
              <td>{product.model}</td>
              <td>{product.price}</td>
              <td>{product.category}</td>
              <td>
              <img 
                  src={product.image1} 
                  alt={product.name} 
                  style={{ width: "100px", height: "auto", display: "block", margin: "0 auto" }} 
                />
              </td>
              <td>{product.type}</td>
              <td>
                <Button variant="warning">Edit</Button>
                <Button variant="danger" className="ms-2" onClick={() => handleDeleteProduct(product.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ProductManagement;
