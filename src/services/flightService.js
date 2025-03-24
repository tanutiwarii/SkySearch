// src/services/flightService.js
import axios from 'axios';

// Define the base URL for your API (e.g., if using a proxy for development, this will handle the API calls correctly)
const API_URL = '/api'; // Proxy will handle the base URL

// Function to get flight data from the API
export const getFlights = async () => {
  try {
    // Make a GET request to the `/flights` endpoint
    const response = await axios.get(`${API_URL}/flights`);
    return response.data; // Return the data from the response
  } catch (error) {
    // Log error and rethrow it
    console.error('Error fetching flights:', error);
    throw error; // Throw the error to be handled in the calling component or page
  }
};
