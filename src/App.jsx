import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './utils/ProtectedRoute';
import NotFoundPage from './pages/NotFoundPage';
import Homepage from './pages/Homepage';
import FlightTicketPage from './pages/FligthTicketPage';
import PaymentPage from './pages/PaymentPage';
import PaymentLastPage from './pages/PaymentLastPage';
import RegisterPage from './pages/RegisterPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import OrderHistoryPage from './pages/OrderHistoryPage';
import LoginPage from './pages/LoginPage';
import AccountPage from './pages/AccountPage';
import OtpPage from './pages/OtpPage';
import OtpPasswordPage from './pages/OtpPasswordPage';
import NotificationPage from './pages/NotificationPage';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/flight-ticket" element={<FlightTicketPage />} />
          <Route
            path="/checkout/:departureId"
            element={
              <ProtectedRoute>
                <PaymentPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/checkout/:departureId/:returnId"
            element={
              <ProtectedRoute>
                <PaymentPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/payment/:id"
            element={
              <ProtectedRoute>
                <PaymentLastPage />
              </ProtectedRoute>
            }
          />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/otp" element={<OtpPage />} />
          <Route path="/otp-password" element={<OtpPasswordPage />} />
          <Route
            path="/orderhistory"
            element={
              <ProtectedRoute>
                <OrderHistoryPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/notification"
            element={
              <ProtectedRoute>
                <NotificationPage />
              </ProtectedRoute>
            }
          />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route
            path="/account/:id"
            element={
              <ProtectedRoute>
                <AccountPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
