import { useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { FaPlaneDeparture, FaPlaneArrival, FaCalendarAlt } from "react-icons/fa";
import { Switch } from "../components/ui/switch";
import { motion } from "framer-motion";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./SearchFlights.css";

export default function SearchFlights() {
  const [airports, setAirports] = useState([]);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [departureDate, setDepartureDate] = useState(null);
  const [returnDate, setReturnDate] = useState(null);
  const [roundTrip, setRoundTrip] = useState(true);
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAirports = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/airports");
        if (!response.ok) throw new Error("Failed to fetch airports");
        const data = await response.json();
        setAirports(data);
      } catch (error) {
        console.error("❌ Error fetching airports:", error);
      }
    };

    fetchAirports();
  }, []);

  const searchFlights = async () => {
    setLoading(true);
    try {
      const formattedDate = departureDate ? departureDate.toISOString().split("T")[0] : "";
      const response = await fetch(`http://localhost:5001/api/flights?from=${from}&to=${to}&date=${formattedDate}`);
      if (!response.ok) throw new Error("Failed to fetch flights");
      const data = await response.json();
      setFlights(data);
    } catch (error) {
      console.error("❌ Error fetching flights:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-container">
      <h1 className="Sky-title">SkySearch</h1>

      <motion.div
        className="hero-title"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h2 className="search-heading">Easy Flight Booking <br />Relax Buddy!</h2>
        <p className="search-subtitle">Save up to <span className="font-bold">34%</span> on international flights</p>
      </motion.div>

      <Card className="search-card">
        <div className="search-grid">
          <div>
            <label className="search-label"><FaPlaneDeparture className="name" /> From</label>
            <select value={from} onChange={(e) => setFrom(e.target.value)} className="search-dropdown">
              <option value="">Select Origin</option>
              {airports.map((airport) => (
                <option key={airport.code} value={airport.code}>{airport.name} ({airport.code})</option>
              ))}
            </select>
          </div>
          <div>
            <label className="search-label"><FaPlaneArrival className="name" /> To</label>
            <select value={to} onChange={(e) => setTo(e.target.value)} className="search-dropdown">
              <option value="">Select Destination</option>
              {airports.map((airport) => (
                <option key={airport.code} value={airport.code}>{airport.name} ({airport.code})</option>
              ))}
            </select>
          </div>
        </div>

        <div className="date-picker-grid">
          <div className="date-picker-container">
            <label className="date-label"><FaCalendarAlt className="box" /> Departure Date</label>
            <DatePicker selected={departureDate} onChange={(date) => setDepartureDate(date)} dateFormat="dd/MM/yyyy" className="custom-datepicker" popperPlacement="bottom-start" />
          </div>
          {roundTrip && (
            <div className="date-picker-container">
              <label className="date-label"><FaCalendarAlt className="box" /> Return Date</label>
              <DatePicker selected={returnDate} onChange={(date) => setReturnDate(date)} dateFormat="dd/MM/yyyy" className="custom-datepicker" popperPlacement="bottom-start" />
            </div>
          )}
        </div>

        <div className="round-trip-container">
          <label className="round-trip-label">
            <Switch checked={roundTrip} onCheckedChange={setRoundTrip} className="mr-2" />
            {roundTrip ? "Round Trip" : "One Way"}
          </label>
        </div>

        <div className="search-button">
          <Button onClick={searchFlights}>➝ Search Flights</Button>
        </div>
      </Card>

      <div className="results-container">
        {loading ? (
          <p>Loading flights...</p>
        ) : flights.length > 0 ? (
          <ul className="flights-list">
            {flights.map((flight) => (
              <li key={flight.id} className="flight-item">
                <p><strong>{flight.airline}</strong> - {flight.flightNumber}</p>
                <p>Departure: {flight.departureTime} | Arrival: {flight.arrivalTime}</p>
                <p>Price: ${flight.price}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No flights found.</p>
        )}
      </div>
    </div>
  );
}