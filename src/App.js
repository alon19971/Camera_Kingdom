import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
  Navigate,
} from "react-router-dom";
import { ValidationProvider } from "./contexts/ValidationContext";
import { AuthProvider, useAuthContext } from "./contexts/AuthContext";
import { ProductProvider } from "./contexts/ProductContext";
import { CartProvider } from "./contexts/CartContext";
import { PurchaseProvider } from "./contexts/PurchaseContext";
import { ToastContainer, Slide } from "react-toastify";
import Header from "./components/layouts/Header";
import ScrollToTop from "./components/utility/ScrollToTop";
import Footer from "./components/layouts/Footer";
import HomePage from "./pages/HomePage";
import CategoriesPage from "./pages/CategoriesPage";
import CategoryProductsPage from "./pages/CategoryProductsPage";
import CartPage from "./pages/CartPage";
import PurchasePage from "./pages/PurchasePage";
import LoginRegisterPage from "./pages/LoginRegisterPage";
import WishlistPage from "./pages/WishlistPage";
import ProfilePage from "./pages/ProfilePage";
import OrdersPage from "./pages/OrdersPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import ManagerDashboard from "./pages/ManagerDashboard";
import UserManagement from "./components/UserManagement";
import ProductManagement from "./components/ProductManagement";
import OrderManagement from "./components/OrderManagement";
import NotFound from "./pages/NotFound";
import ContactUsPage from "./pages/ContactUsPage";
import AdminMessages from "./pages/AdminMessages";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

// Layout Component for header, footer, and other components
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

const ProtectedRoute = ({ children, redirectTo = "/" }) => {
  const { currentUser, userData } = useAuthContext();
  return currentUser && userData?.isAdmin ? children : <Navigate to={redirectTo} />;
};

function App() {
  return (
    <div className="App">
      <ValidationProvider>
        <AuthProvider> {/* Make sure AuthProvider wraps the whole app */}
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
                      <Route path="*" element={<NotFound />} />

                      {/* Protected route for admin messages */}
                      <Route
                        path="admin/messages"
                        element={
                          <ProtectedRoute>
                            <AdminMessages />
                          </ProtectedRoute>
                        }
                      />

                      <Route
                        path="product/:id"
                        element={<ProductDetailsPage />}
                      />
                      <Route path="/manager" element={<ManagerDashboard />} />
                      <Route path="/manager/users" element={<UserManagement />} />
                      <Route path="/manager/products" element={<ProductManagement />} />
                      <Route path="/manager/orders" element={<OrderManagement />} />
                    </Route>
                  </Routes>
                </Router>
              </PurchaseProvider>
            </CartProvider>
          </ProductProvider>
        </AuthProvider>
      </ValidationProvider>
    </div>
  );
}

export default App;
