const mongoose = require('mongoose');
const fs = require('fs');
const csv = require('csv-parser');
const moment = require('moment');

// Import the Flight model
const Flight = require('/Users/tannutiwari/aerobook/backend/models/flightModel.js');

// Connect to MongoDB (Updated connection without deprecated options)
mongoose.connect('mongodb://localhost:27017/aerobook')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB', err));

function convertToDate(dateString) {
    return moment(dateString, 'YYYY-MM-DD', true).toDate();
}

function convertToTime(timeString) {
    const today = new Date();
    const [hours, minutes] = timeString.split(':');
    today.setHours(hours, minutes, 0, 0);
    return today;
}

function convertToPrice(priceString) {
    // Remove commas and ensure it's a valid number
    const price = parseInt(priceString.replace(',', ''), 10);

    // Check if the parsed price is a valid number, if not, return a fallback value (e.g., 0)
    if (isNaN(price)) {
        console.error(`Invalid price: ${priceString}`);
        return 0; // Or return null depending on how you want to handle invalid prices
    }
    
    return price;
}

function processFlightData() {
    const flights = [];

    fs.createReadStream('flights.csv')
        .pipe(csv())
        .on('data', (row) => {
            const price = convertToPrice(row['Flight Price']);
            if (price === 0) {  // Skip invalid rows
                console.error(`Skipping row due to invalid price: ${row['Flight Price']}`);
                return;
            }

            const flight = {
                origin: row.Origin,
                destination: row.Destination,
                company: row.Company,
                departureTime: convertToTime(row['Departure Time']),
                arrivalTime: convertToTime(row['Arrival Time']),
                durationTime: row['Duration Time'],
                flightPrice: price,
                date: convertToDate(row['Date']),
                cabinClass: row['Cabin Class']
            };

            flights.push(flight);
        })
        .on('end', () => {
            Flight.insertMany(flights)
                .then(() => {
                    console.log('Data inserted successfully');
                    mongoose.connection.close();
                })
                .catch((err) => {
                    console.error('Error inserting data:', err);
                    mongoose.connection.close();
                });
        });
}
