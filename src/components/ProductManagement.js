import React, { useState, useEffect } from "react";
import { db } from "../firebase/firestore";
import { collection, addDoc, getDocs, deleteDoc, updateDoc, doc } from "firebase/firestore";
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
  const [isEditing, setIsEditing] = useState(false);
  const [currentProductId, setCurrentProductId] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const productCollection = await getDocs(collection(db, "products"));
      setProducts(productCollection.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };
    fetchProducts();
  }, []);

  const handleInputChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleAddProduct = async () => {
    try {
      if (!newProduct.brand || !newProduct.category || !newProduct.image1 || !newProduct.model || !newProduct.price || !newProduct.type) {
        alert("Please fill all the fields.");
        return;
      }

      const productToAdd = {
        brand: newProduct.brand.charAt(0).toUpperCase() + newProduct.brand.slice(1),
        category: newProduct.category.toLowerCase(),
        image1: newProduct.image1,
        model: newProduct.model,
        price: parseFloat(newProduct.price),
        type: newProduct.type.charAt(0).toUpperCase() + newProduct.type.slice(1)
      };

      await addDoc(collection(db, "products"), productToAdd);
      setProducts([...products, productToAdd]);
      setNewProduct({ brand: "", category: "", image1: "", model: "", price: "", type: "" });
      alert("Product added successfully!");
    } catch (error) {
      console.error("Error adding product: ", error);
    }
  };

  const handleEditProduct = (product) => {
    setIsEditing(true);
    setCurrentProductId(product.id);
    setNewProduct({
      brand: product.brand,
      category: product.category,
      image1: product.image1,
      model: product.model,
      price: product.price,
      type: product.type
    });
  };

  const handleUpdateProduct = async () => {
    try {
      const productRef = doc(db, "products", currentProductId);
      await updateDoc(productRef, {
        brand: newProduct.brand.charAt(0).toUpperCase() + newProduct.brand.slice(1),
        category: newProduct.category.toLowerCase(),
        image1: newProduct.image1,
        model: newProduct.model,
        price: parseFloat(newProduct.price),
        type: newProduct.type.charAt(0).toUpperCase() + newProduct.type.slice(1)
      });

      const updatedProducts = products.map((product) =>
        product.id === currentProductId ? { ...product, ...newProduct } : product
      );
      setProducts(updatedProducts);
      setNewProduct({ brand: "", category: "", image1: "", model: "", price: "", type: "" });
      setIsEditing(false);
      setCurrentProductId(null);
      alert("Product updated successfully!");
    } catch (error) {
      console.error("Error updating product: ", error);
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await deleteDoc(doc(db, "products", productId));
      setProducts(products.filter((product) => product.id !== productId));
    } catch (error) {
      console.error("Error deleting product: ", error);
    }
  };

  return (
    <div>
      <h3>Product Management</h3>

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

        <Button className="mt-3" onClick={isEditing ? handleUpdateProduct : handleAddProduct}>
          {isEditing ? "Update Product" : "Add Product"}
        </Button>
      </Form>

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
                <Button variant="warning" onClick={() => handleEditProduct(product)}>Edit</Button>
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
