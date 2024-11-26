import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NotFoundPage from './pages/NotFoundPage';
import Homepage from './pages/Homepage';
import FlightTicketPage from './pages/FligthTicketPage';
import PaymentPage from './pages/PaymentPage';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/fligth-ticket" element={<FlightTicketPage />} />
          <Route path="/checkout" element={<PaymentPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
