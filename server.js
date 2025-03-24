import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import axios from "axios";
import cron from "node-cron";
import dotenv from "dotenv";
import Flight from "./models/flightModel.js";
import Airport from "./models/airportModel.js";

// Load environment variables
dotenv.config();
console.log("🔹 MongoDB URI:", process.env.MONGODB_URI);

const app = express();
app.use(cors());
app.use(express.json()); // Middleware to handle JSON

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((error) => console.error("❌ MongoDB Connection Error:", error));

const API_KEY = process.env.AVIATIONSTACK_API_KEY;
if (!API_KEY) {
  console.error("❌ Missing API Key in .env file");
}

// 🔹 Fetch airport data from API
const fetchAirports = async () => {
  try {
    console.log("🔄 Fetching airport data...");
    console.log("🛠 API Key:", API_KEY ? "✔ Available" : "❌ MISSING");

    const response = await axios.get(`http://api.aviationstack.com/v1/airports?access_key=${API_KEY}`);
    console.log("✅ Raw API Response:", response.data);

    if (!response.data || !response.data.data) {
      throw new Error("Invalid API response format: " + JSON.stringify(response.data));
    }

    const airports = response.data.data;

    // ✅ Fix: Use the correct field names
    const filteredAirports = airports.filter(
      airport => airport.iata_code && airport.airport_name && airport.country_name
    );

    console.log(`✅ Filtered Airports: ${filteredAirports.length}`);
    return filteredAirports;
  } catch (error) {
    console.error("❌ Error fetching airport data:", error.response?.data || error.message);
    throw error;
  }
};


// ✅ Sync airport data and store in MongoDB
// ✅ Sync airport data and store in MongoDB
app.get('/api/airports/sync', async (req, res) => {
  try {
    const airports = await fetchAirports();
    console.log('✅ Fetched Airports:', airports.length);

    await Airport.deleteMany({}); // Clear existing airports

    // 🔥 Replace this part with the corrected code!
    await Airport.insertMany(
      airports.map(airport => ({
        code: airport.iata_code,          // IATA Code
        name: airport.airport_name,       // Corrected Airport Name
        city: airport.city_iata_code,     // City IATA Code
        country: airport.country_name,    // Country Name
        latitude: airport.latitude,       // Latitude
        longitude: airport.longitude,     // Longitude
        timezone: airport.timezone        // Timezone
      }))
    );

    console.log('✅ Airports inserted into MongoDB');
    res.json({ message: 'Airports synced successfully', count: airports.length });

  } catch (error) {
    console.error('❌ Error syncing airports:', error);
    res.status(500).json({ message: 'Failed to sync airports', error: error.toString() });
  }
});


// ✅ Get all stored airports
app.get("/api/airports", async (req, res) => {
  try {
    const airports = await Airport.find();
    res.json(airports);
  } catch (error) {
    console.error("❌ Error fetching airports:", error);
    res.status(500).json({ message: "Failed to fetch airports" });
  }
});

// 🔹 Fetch flight data from API
const fetchFlights = async () => {
  try {
    const response = await axios.get(
      `http://api.aviationstack.com/v1/flights?access_key=${API_KEY}`
    );

    console.log("✅ Raw Flight API Response:", JSON.stringify(response.data, null, 2));
    if (!response.data || !Array.isArray(response.data.data)) {
      throw new Error("Invalid API Response: " + JSON.stringify(response.data));
    }

    return response.data.data;
  } catch (error) {
    console.error("❌ Error fetching flight data:", error.message);
    return [];
  }
};

// ✅ Sync flights and store in MongoDB
app.get("/api/flights/sync", async (req, res) => {
  try {
    const flights = await fetchFlights();
    console.log("✅ Fetched Flights:", flights.length);

    if (flights.length === 0) {
      return res.status(500).json({ message: "Failed to fetch flights from API." });
    }

    await Flight.deleteMany({});
    await Flight.insertMany(
      flights.map((flight) => ({
        flight_iata: flight.flight?.iata || "N/A",
        airline_name: flight.airline?.name || "Unknown",
        departure_airport: flight.departure?.airport || "Unknown",
        arrival_airport: flight.arrival?.airport || "Unknown",
        departure_time: flight.departure?.scheduled || "N/A",
        arrival_time: flight.arrival?.scheduled || "N/A",
        flight_status: flight.flight_status || "Unknown",
      }))
    );

    console.log("✅ Flights inserted into MongoDB");
    res.json({ message: "Flights synced successfully", count: flights.length });
  } catch (error) {
    console.error("❌ Error syncing flights:", error);
    res.status(500).json({ message: "Failed to sync flights" });
  }
});

app.get("/api/flights", async (req, res) => {
  try {
    const { origin, destination, date } = req.query;
    let query = {};

    if (origin) query.departure_airport = origin;
    if (destination) query.arrival_airport = destination;
    if (date) {
      const startDate = new Date(date);
      const endDate = new Date(date);
      endDate.setHours(23, 59, 59, 999);
      query.departure_time = { $gte: startDate, $lt: endDate };
    }

    console.log("🔍 Querying flights with:", query);
    const flights = await Flight.find(query);
    console.log("✅ Flights Found:", flights.length);
    
    res.json(flights);
  } catch (error) {
    console.error("❌ Error fetching flights:", error);
    res.status(500).json({ message: error.message });
  }
});


// 🕒 Auto-sync flights & airports every 12 hours
cron.schedule("0 */12 * * *", async () => {
  console.log("🔄 Syncing flights and airports...");
  try {
    const flights = await fetchFlights();
    const airports = await fetchAirports();
    console.log(`✅ Auto-sync successful: ${flights.length} flights, ${airports.length} airports`);
  } catch (error) {
    console.error("❌ Auto-sync error:", error);
  }
});

// ✅ Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
