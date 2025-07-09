import React from 'react';
import './authbg.css';

const AuthBackground = ({ theme = 'light' }) => {
  return (
    <div className={`auth-animated-bg ${theme === 'dark' ? 'dark-theme' : ''}`}>
      {/* Floating shapes */}
      <div className="floating-shape"></div>
      <div className="floating-shape"></div>
      <div className="floating-shape"></div>
      <div className="floating-shape"></div>
      <div className="floating-shape"></div>
      
      {/* Geometric patterns */}
      <div className="geometric-pattern"></div>
      <div className="geometric-pattern"></div>
      
      {/* Particle effects */}
      <div className="particle"></div>
      <div className="particle"></div>
      <div className="particle"></div>
      <div className="particle"></div>
      <div className="particle"></div>
      
      {/* Wave effect */}
      <div className="wave-effect"></div>
    </div>
  );
};

export default AuthBackground;
