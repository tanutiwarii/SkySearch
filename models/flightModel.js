import mongoose from "mongoose";

const flightSchema = new mongoose.Schema({
  flight_iata: String,
  airline_name: String,
  departure_airport: String,
  arrival_airport: String,
  departure_time: String,
  arrival_time: String,
  flight_status: String,
});

export default mongoose.model("Flight", flightSchema);
