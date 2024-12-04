import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './utils/ProtectedRoute';
import NotFoundPage from './pages/NotFoundPage';
import Homepage from './pages/Homepage';
import FlightTicketPage from './pages/FligthTicketPage';
import PaymentPage from './pages/PaymentPage';
import PaymentLastPage from './pages/PaymentLastPage';
import ExamplePages from './pages/ExamplePages';
import RegisterPage from './pages/RegisterPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/flight-ticket" element={<FlightTicketPage />} />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <PaymentPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/payment"
            element={
              <ProtectedRoute>
                <PaymentLastPage />
              </ProtectedRoute>
            }
          />
          <Route path="/animation" element={<ExamplePages />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
