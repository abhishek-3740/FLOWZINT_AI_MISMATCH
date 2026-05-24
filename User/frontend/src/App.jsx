import React from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import PublicNavbar from './components/public/PublicNavbar';
import PublicFooter from './components/public/PublicFooter';
import AutoReplenishToast from './components/ui/AutoReplenishToast';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import AIConcierge from './pages/AIConcierge';
import CartPage from './pages/CartPage';
import CategoriesPage from './pages/CategoriesPage';
import CheckoutPage from './pages/CheckoutPage';
import Home from './pages/Home';
import LoginPage from './pages/auth/LoginPage';
import OrdersPage from './pages/OrdersPage';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';
import SignupPage from './pages/auth/SignupPage';
import PackageTrackingPage from './pages/PackageTrackingPage';
import ShopPage from './pages/ShopPage';
import ProductDetailPage from './pages/ProductDetailPage';

function AppShell() {
  const location = useLocation();
  const { replenishToastOpen, acceptReplenishToast, dismissReplenishToast } = useAuth();
  const hideShell = location.pathname.startsWith('/auth');

  return (
    <div className="min-h-screen">
      {!hideShell && <PublicNavbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/concierge" element={<AIConcierge />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/track/:orderId" element={<PackageTrackingPage />} />
        <Route path="/product/:productId" element={<ProductDetailPage />} />
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/signup" element={<SignupPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {!hideShell && <PublicFooter />}

      <AutoReplenishToast
        open={replenishToastOpen}
        onAdd={acceptReplenishToast}
        onDismiss={dismissReplenishToast}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <AppShell />
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}