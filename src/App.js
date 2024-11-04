<<<<<<< HEAD
import React, { useEffect } from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom"; 
import { AuthProvider } from "./contexts/AuthContext";
import { ProductProvider } from "./contexts/ProductContext";
import Header from "./components/layouts/Header";
import HomePage from "./pages/HomePage";
import CategoriesPage from "./pages/CategoriesPage";
import ContactUsPage from "./pages/ContactUsPage";
import CartPage from "./pages/CartPage";
=======
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
} from "react-router-dom";
import { ValidationProvider } from "./contexts/ValidationContext";
import { AuthProvider } from "./contexts/AuthContext";
import { ProductProvider } from "./contexts/ProductContext";
import { CartProvider } from "./contexts/CartContext";
import { PurchaseProvider } from "./contexts/PurchaseContext";
import { ToastContainer, Bounce, Slide } from "react-toastify";
import Header from "./components/layouts/Header";
import ScrollToTop from "./components/utility/ScrollToTop";
import Footer from "./components/layouts/Footer";
import HomePage from "./pages/HomePage";
import CategoriesPage from "./pages/CategoriesPage";
import CategoryProductsPage from "./pages/CategoryProductsPage";
import ContactUsPage from "./pages/ContactUsPage";
import CartPage from "./pages/CartPage";
import PurchasePage from "./pages/PurchasePage";
>>>>>>> 893f93c (Added new sorting and search features for category pages)
import LoginRegisterPage from "./pages/LoginRegisterPage";
import WishlistPage from "./pages/WishlistPage";
import ProfilePage from "./pages/ProfilePage";
import OrdersPage from "./pages/OrdersPage";
<<<<<<< HEAD
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
=======
import ProductDetailsPage from "./pages/ProductDetailsPage";
import ManagerDashboard from "./pages/ManagerDashboard";
import UserManagement from "./components/UserManagement";
import ProductManagement from "./components/ProductManagement";
import OrderManagement from "./components/OrderManagement";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

// Layout Component to contain all layour components
const Layout = () => (
  <>
    <Header />
    <ScrollToTop />
    <Outlet />
    <Footer />
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      pauseOnHover
      draggable
      theme="light"
      transition={Slide}
    />
  </>
);
>>>>>>> 893f93c (Added new sorting and search features for category pages)

function App() {
  return (
    <div className="App">
<<<<<<< HEAD
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
=======
      <ValidationProvider>
        <AuthProvider>
          <ProductProvider>
            <CartProvider>
              <PurchaseProvider>
                <Router>
                  <Routes>
                    <Route path="/" element={<Layout />}>
                      <Route index element={<HomePage />} />
                      <Route path="categories" element={<CategoriesPage />} />
                      <Route
                        path="categories/:category"
                        element={<CategoryProductsPage />}
                      />
                      <Route path="contactus" element={<ContactUsPage />} />
                      <Route path="cart" element={<CartPage />} />
                      <Route path="purchase" element={<PurchasePage />} />
                      <Route path="login" element={<LoginRegisterPage />} />
                      <Route path="wishlist" element={<WishlistPage />} />
                      <Route path="profile" element={<ProfilePage />} />
                      <Route path="orders" element={<OrdersPage />} />
                      <Route
                        path="product/:id"
                        element={<ProductDetailsPage />}
                      />
                      <Route path="/manager" element={<ManagerDashboard />} />
                      <Route
                        path="/manager/users"
                        element={<UserManagement />}
                      />
                      <Route
                        path="/manager/products"
                        element={<ProductManagement />}
                      />
                      <Route
                        path="/manager/orders"
                        element={<OrderManagement />}
                      />
                    </Route>
                  </Routes>
                </Router>
              </PurchaseProvider>
            </CartProvider>
          </ProductProvider>
        </AuthProvider>
      </ValidationProvider>
>>>>>>> 893f93c (Added new sorting and search features for category pages)
    </div>
  );
}

export default App;
