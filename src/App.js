import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ProductProvider } from "./contexts/ProductContext";
import Header from "./components/layouts/Header";
import HomePage from "./pages/HomePage";
import CategoriesPage from "./pages/CategoriesPage";
import ContactUsPage from "./pages/ContactUsPage";
import CartPage from "./pages/CartPage";
import LoginRegisterPage from "./pages/LoginRegisterPage";
import WishlistPage from "./pages/WishlistPage";
import ProfilePage from "./pages/ProfilePage";
import OrdersPage from "./pages/OrdersPage";
import ProductDetails from "./pages/ProductDetails"; // Import the new ProductDetails page
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <ProductProvider>
          <Router>
            <Header />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/categories" element={<CategoriesPage />} />
              <Route path="/contactus" element={<ContactUsPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/login" element={<LoginRegisterPage />} />
              <Route path="/wishlist" element={<WishlistPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/orders" element={<OrdersPage />} />
              <Route path="/product/:id" element={<ProductDetails />} /> {/* Add this line */}
            </Routes>
          </Router>
        </ProductProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
