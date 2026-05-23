import { Navigate, Route, Routes } from "react-router-dom";
import DashboardLayout from "./components/layout/DashboardLayout";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";
import AIChatPage from "./pages/dashboard/AIChatPage";
import DashboardPage from "./pages/dashboard/DashboardPage";
import OrdersPage from "./pages/dashboard/OrdersPage";
import ProfilePage from "./pages/dashboard/ProfilePage";
import NotificationsPage from "./pages/dashboard/NotificationsPage";
import SettingsPage from "./pages/dashboard/SettingsPage";
import SuppliersPage from "./pages/dashboard/SuppliersPage";
import StockManagementPage from "./pages/dashboard/StockManagementPage";
import { ToastProvider } from "./components/ui/Toast";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";

export default function App() {
  return (
    <AuthProvider>
      <ToastProvider>
          <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      <Route path="/owner" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
        <Route index element={<DashboardPage />} />
        <Route path="inventory" element={<StockManagementPage />} />
        <Route path="suppliers" element={<SuppliersPage />} />
        <Route path="orders" element={<OrdersPage />} />
        <Route path="ai-chat" element={<AIChatPage />} />
        <Route path="notifications" element={<NotificationsPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </ToastProvider>
    </AuthProvider>
  );
}
