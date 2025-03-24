import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SearchFlights from './pages/SearchFlights';
import CancelFlight from './pages/CancelFlight';  // Import CancelFlight component
import CheckTicket from './pages/CheckTicket';  // Import CheckTicket component

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/flights" element={<SearchFlights />} />
        <Route path="/cancel-flight" element={<CancelFlight />} />  {/* Route for canceling a flight */}
        <Route path="/check-ticket" element={<CheckTicket />} />  {/* Route for checking the ticket */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
