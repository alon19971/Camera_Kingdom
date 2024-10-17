import React, { useEffect, useState } from "react";
import { db } from "../firebase/firestore";
import { collection, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore";
import { Table, Button, Form } from "react-bootstrap";



const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    category: "",
    imageUrl: "",
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
    if (!newProduct.name || !newProduct.price || !newProduct.category || !newProduct.imageUrl) {
      alert("Please fill all the fields.");
      return;
    }

    // Parse the price to ensure it's a number
    const productToAdd = {
      ...newProduct,
      price: parseFloat(newProduct.price),  // Ensure price is a float
    };

    // Add the product to Firestore
    await addDoc(collection(db, "products"), productToAdd);

    // Update local state with the new product
    setProducts([...products, productToAdd]);

    // Clear the form
    setNewProduct({ name: "", price: "", category: "", imageUrl: "" });
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
        <Form.Group controlId="productName">
          <Form.Label>Product Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={newProduct.name}
            onChange={handleInputChange}
            placeholder="Enter product name"
          />
        </Form.Group>

        <Form.Group controlId="productPrice">
          <Form.Label>Product Price</Form.Label>
          <Form.Control
            type="text"
            name="price"
            value={newProduct.price}
            onChange={handleInputChange}
            placeholder="Enter product price"
          />
        </Form.Group>

        <Form.Group controlId="productCategory">
          <Form.Label>Category</Form.Label>
          <Form.Control
            type="text"
            name="category"
            value={newProduct.category}
            onChange={handleInputChange}
            placeholder="Enter category"
          />
        </Form.Group>

        <Form.Group controlId="imageUrl">
          <Form.Label>Image URL</Form.Label>
          <Form.Control
            type="text"
            name="imageUrl"
            value={newProduct.imageUrl}
            onChange={handleInputChange}
            placeholder="Enter image URL"
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
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.category}</td>
              <td>
                <img src={product.imageUrl} alt={product.name} style={{ width: "100px" }} />
              </td>
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
