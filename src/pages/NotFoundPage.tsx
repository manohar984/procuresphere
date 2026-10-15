import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/not-found.css';

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  const handleGoBack = () => {
    // Safe browser history check with homepage fallback
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  return (
    <div className="notfound-container">
      {/* Background Blend */}
      <div className="notfound-bg-blend" aria-hidden="true" />

      {/* Discrete Brand Link Top-Left */}
      <button
        type="button"
        onClick={handleGoHome}
        className="notfound-brand-anchor"
        aria-label="ProcureSphere 360 Home"
      >
        <svg viewBox="0 0 32 32" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: '#2456D6' }}>
          <circle cx="16" cy="16" r="12" />
          <ellipse cx="16" cy="16" rx="12" ry="5.5" />
          <path d="M4.5 16h23" />
          <path d="M16 4v24" />
          <circle cx="24.8" cy="11" r="2.1" fill="currentColor" />
          <circle cx="9.5" cy="21.5" r="2.1" fill="currentColor" />
        </svg>
        <span>
          ProcureSphere<em>360</em>
        </span>
      </button>

      {/* Stage centering the canvas */}
      <div className="notfound-exact-stage">
        <div className="notfound-canvas">
          {/* Subtle Warm Golden Glow behind cracked 0 */}
          <div className="notfound-glow-overlay" aria-hidden="true" />

          {/* The Exact Pristine 16:9 Original 3D Illustration */}
          <img
            src="/404-full.png"
            alt="404 Page Not Found - Sleek 3D Illustration"
            className="notfound-exact-img"
          />

          {/* Animated Flying Paper Airplane / Rocket (NO dotted trail lines) */}
          <div className="notfound-paper-plane" aria-hidden="true">
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
              <path
                d="M22 2L15 22L11 13L2 9L22 2Z"
                fill="#FFFFFF"
                stroke="#1E293B"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M11 13L15 22L22 2"
                fill="rgba(30, 41, 59, 0.12)"
              />
              <path
                d="M22 2L11 13"
                stroke="#2456D6"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Real Live Frontend Elements: Selectable & Copyable Typography */}
          <h1 className="notfound-copyable-heading">
            Oops! Page Not Found
          </h1>

          <p className="notfound-copyable-desc">
            The page you’re looking for doesn’t exist or has been moved.
            <br />
            Let’s get you back on track.
          </p>

          {/* Real Interactive Action Buttons (Hotspots mapped 1:1 on the image buttons) */}
          <button
            type="button"
            onClick={handleGoHome}
            className="notfound-hotspot-btn notfound-hotspot-home"
            aria-label="Go to Home"
            title="Go to Home"
          />

          <button
            type="button"
            onClick={handleGoBack}
            className="notfound-hotspot-btn notfound-hotspot-back"
            aria-label="Go Back"
            title="Go Back"
          />
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
