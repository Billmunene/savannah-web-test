import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div style={styles.landing}>
      <div style={styles.landingContent}>
        <h1 style={styles.landingTitle}>Welcome to the JSON Placeholder App</h1>
        <p style={styles.landingDescription}>
          This app displays a list of users, albums, and photos fetched from JSONPlaceholder. Explore the data and enjoy!
        </p>
        <Link to="/login" style={styles.landingButton}>Login</Link>
      </div>
      
    </div>
  );
};

const styles = {
  landing: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: '100vh',
    background: 'linear-gradient(to right, #6a11cb, #2575fc)', // Beautiful gradient background
    color: 'white',
    padding: '0 0px',
    fontFamily: "'Arial', sans-serif",
  },
  landingContent: {
    flex: 1,
    maxWidth: '1000px',
    padding: '0px',
    textAlign: 'left',
    animation: 'fadeInLeft 1.5s ease-out',
  },
  landingTitle: {
    fontSize: '48px',
    fontWeight: 'bold',
    marginBottom: '20px',
    animation: 'slideUp 2s ease-out',
  },
  landingDescription: {
    fontSize: '20px',
    marginBottom: '30px',
    animation: 'fadeIn 1.5s ease-out',
  },
  landingButton: {
    display: 'inline-block',
    padding: '12px 20px',
    backgroundColor: '#ff6600',
    color: 'white',
    textDecoration: 'none',
    fontWeight: 'bold',
    borderRadius: '8px',
    fontSize: '18px',
    transition: 'background-color 0.3s',
    animation: 'fadeInUp 2s ease-out',
  },
  landingButtonHover: {
    backgroundColor: '#e65c00',
  },
  landingImage: {
    flex: 1,
    maxWidth: '600px',
    padding: '20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  landingPreviewImage: {
    maxWidth: '100%',
    borderRadius: '12px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
    animation: 'scaleUp 2s ease-out',
  },
};

export default Landing;
