import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage';
import FlightTicket from './pages/FligthTicket';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/fligth-ticket" element={<FlightTicket />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
