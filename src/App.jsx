import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NotFoundPage from './pages/NotFoundPage';
import Homepage from './pages/Homepage';
import FlightTicketPage from './pages/FligthTicketPage';
import PaymentPage from './pages/PaymentPage';
import PaymentLastPage from './pages/PaymentLastPage';
import ExamplePages from './pages/ExamplePages';
import RegisterPage from './pages/RegisterPage';
import ResetPassword from './pages/ResetPassword';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/flight-ticket" element={<FlightTicketPage />} />
          <Route path="/checkout" element={<PaymentPage />} />
          <Route path="/payment" element={<PaymentLastPage />} />
          <Route path="/animation" element={<ExamplePages />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
