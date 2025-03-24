import React from 'react'; 
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { motion } from 'framer-motion'; // Import motion for animations
import './HomePage.css'; // Import custom CSS for styling
import image1 from '../images/1.jpeg';  // Adjust the path if necessary
import destination1 from '../images/paris.jpg';  // Adjust path accordingly
import destination2 from '../images/japan.jpg'; // Path for Tokyo image
import destination3 from '../images/new_york.avif'; // Path for New York image

const HomePage = () => {
  const navigate = useNavigate();

  

  const handleCancelFlight = () => {
    navigate('/cancel-flight'); // Navigate to Cancel Flight page
  };

  const handleCheckTicket = () => {
    navigate('/check-ticket'); // Navigate to Check Ticket page
  };


  const handleSearch = () => {
    // Redirect to the Flights page with search parameters
    navigate(`/flights`);
  };

  return (
    <div className="home-container">
      {/* Hero Section */}
      <div className="hero-section">
        {/* SkySearch Title in the Top Left Corner - Not animated */}
        <h1 className="SkySearch-title">SkySearch</h1>

        
        <motion.h2
          className="hero-title"
          initial={{ opacity: 0, y: 50 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 1 }}
        >
          Find the Best Deals on Flights
        </motion.h2>
        
        <motion.p
          className="hero-subtitle"
          initial={{ opacity: 0, y: 50 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 1.2 }}
        >
          Compare prices from hundreds of airlines and travel agencies.
        </motion.p>
        
      </div>

       {/* Flight Functionalities Section */}
       <motion.div
        className="flight-functions"
        initial={{ opacity: 0, y: 100 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 1.2 }}
      >
        <h2>Manage Your Flights</h2>
        <div className="functions-grid">
        <button className="flight-button" onClick={handleSearch}>Search Flight</button>
          <button className="flight-button" onClick={handleCancelFlight}>Cancel Flight</button>
          <button className="flight-button" onClick={handleCheckTicket}>Check Your Flight Ticket</button>
        </div>
      </motion.div>
      
      {/* Image */}
      <motion.div
        className="image-container"
        initial={{ opacity: 0, y: 100 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 1 }}
      >
        <img src={image1} alt="SkySearch" className="homepage-image" />
      </motion.div>

      {/* Features Section */}
      <motion.div
        className="features-section"
        initial={{ opacity: 0, y: 100 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 1.2 }}
      >
        <h2>Why Choose SkySearch?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>✈️ Wide Range of Flights</h3>
            <p>Explore flights to over 100 destinations worldwide.</p>
          </div>
          <div className="feature-card">
            <h3>💰 Best Prices Guaranteed</h3>
            <p>Find the best deals and save on your next trip.</p>
          </div>
          <div className="feature-card">
            <h3>🛡️ Safe and Secure</h3>
            <p>Your data and payments are always protected.</p>
          </div>
        </div>
      </motion.div>

      {/* Popular Destinations Section */}
      <motion.div
        className="popular-destinations"
        initial={{ opacity: 0, y: 100 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 1.2 }}
      >
        <h2>Popular Destinations</h2>
        <div className="destinations-grid">
          <div className="destination-card">
            <img src={destination1} alt="Paris" />
            <h3>Paris</h3>
            <p>The city of light and romance.</p>
          </div>
          <div className="destination-card">
            <img src={destination2} alt="Tokyo" />
            <h3>Tokyo</h3>
            <p>Experience the vibrant culture of Japan.</p>
          </div>
          <div className="destination-card">
            <img src={destination3} alt="New York" />
            <h3>New York</h3>
            <p>The city that never sleeps, with endless opportunities.</p>
          </div>
        </div>
      </motion.div>
     

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 SkySearch. All rights reserved.</p>
        <div className="footer-links">
          <a href="/terms">Terms of Service</a>
          <a href="/privacy">Privacy Policy</a>
          <a href="/contact">Contact Us</a>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
