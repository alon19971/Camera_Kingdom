import React, { useEffect } from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom"; 
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
import ProductDetails from "./pages/ProductDetails";
import CamerasPage from "./pages/CamerasPage";   
import LensesPage from "./pages/LensesPage";     
import AccessoriesPage from "./pages/AccessoriesPage"; 
import BagsPage from "./pages/BagsPage";           
import LightingPage from "./pages/LightingPage";
import TripodsPage from "./pages/TripodsPage";
import ManagerDashboard from './pages/ManagerDashboard';
import UserManagement from "./components/UserManagement";
import ProductManagement from "./components/ProductManagement";
import OrderManagement from "./components/OrderManagement";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function ScrollToTop() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return null;
}

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <ProductProvider>
          <Router> {/* Use HashRouter to handle page refresh issue */}
            <ScrollToTop />
            <Header />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/categories" element={<CategoriesPage />} />
              <Route path="/categories/cameras" element={<CamerasPage />} />
              <Route path="/categories/lenses" element={<LensesPage />} />
              <Route path="/categories/accessories" element={<AccessoriesPage />} />
              <Route path="/categories/bags" element={<BagsPage />} />
              <Route path="/categories/lighting" element={<LightingPage />} />
              <Route path="/categories/tripods" element={<TripodsPage />} />
              <Route path="/contactus" element={<ContactUsPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/login" element={<LoginRegisterPage />} />
              <Route path="/wishlist" element={<WishlistPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/orders" element={<OrdersPage />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/manager" element={<ManagerDashboard />} />
              <Route path="/manager/users" element={<UserManagement />} />
              <Route path="/manager/products" element={<ProductManagement />} />
              <Route path="/manager/orders" element={<OrderManagement />} />
            </Routes>
          </Router>
        </ProductProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
