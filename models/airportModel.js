import mongoose from "mongoose";

const airportSchema = new mongoose.Schema({
  code: String,
  name: String,
  city: String,
  country: String,
});

export default mongoose.model("Airport", airportSchema);
