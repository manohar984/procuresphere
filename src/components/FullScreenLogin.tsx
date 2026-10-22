import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FullScreenLoginProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess?: (username: string) => void;
}

const CHARACTER_STATES = [
  { id: 'normal', src: '/login-states/normal.webp', alt: 'ProcureSphere Assistant Ready' },
  { id: 'typing', src: '/login-states/password-typing.webp', alt: 'ProcureSphere Assistant Eyes Covered' },
  { id: 'failed', src: '/login-states/login-failed.webp', alt: 'ProcureSphere Assistant Verification Issue' },
  { id: 'success', src: '/login-states/login-success.webp', alt: 'ProcureSphere Assistant Authenticated' },
] as const;

// Eagerly preload all character state images into the browser cache
if (typeof window !== 'undefined') {
  CHARACTER_STATES.forEach(state => {
    const img = new Image();
    img.src = state.src;
  });
}

export const FullScreenLogin: React.FC<FullScreenLoginProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginState, setLoginState] = useState<'normal' | 'typing' | 'failed' | 'success'>('normal');
  const [errorMessage, setErrorMessage] = useState('');

  const passwordInputRef = useRef<HTMLInputElement>(null);

  // Ensure images are preloaded
  useEffect(() => {
    CHARACTER_STATES.forEach(state => {
      const img = new Image();
      img.src = state.src;
    });
  }, []);

  // Character state reaction: password typing vs normal
  useEffect(() => {
    if (loginState === 'success' || loginState === 'failed') return;

    if (isPasswordFocused || password.length > 0) {
      setLoginState('typing');
    } else {
      setLoginState('normal');
    }
  }, [isPasswordFocused, password, loginState]);

  // Reset states when login opens
  useEffect(() => {
    if (isOpen) {
      setLoginState('normal');
      setIsPasswordFocused(false);
      setErrorMessage('');
    }
  }, [isOpen]);

  // Handle ESC key to exit
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen && !isLoading && loginState !== 'success') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, isLoading, loginState, onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId.trim() || !password.trim()) {
      setLoginState('failed');
      setErrorMessage('Please enter both User ID and Password.');
      return;
    }

    setErrorMessage('');
    setIsLoading(true);

    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    setIsPasswordFocused(false);

    try {
      // Authenticate against directory / backend
      await new Promise(resolve => setTimeout(resolve, 1100));

      // Validation check: password >= 3 characters confirms authentication
      if (password.length < 3) {
        throw new Error('Invalid User ID or Password. Please try again.');
      }

      // Authentication confirmed
      setLoginState('success');
      setIsLoading(false);

      // Brief celebratory display, then transition to dashboard
      setTimeout(() => {
        if (onLoginSuccess) {
          onLoginSuccess(userId);
        }
        onClose();
      }, 1800);
    } catch (err: any) {
      setIsLoading(false);
      setLoginState('failed');
      setErrorMessage(err?.message || 'Invalid User ID or Password. Please try again.');
    }
  };

  const handleRetry = () => {
    setLoginState('normal');
    setErrorMessage('');
    if (passwordInputRef.current) {
      passwordInputRef.current.focus();
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div
        className="ps-login-overlay"
        style={{
          position: 'fixed',
          inset: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 99999,
          overflowY: 'auto',
          overflowX: 'hidden',
          backgroundColor: 'var(--canvas, #f6f8fb)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px 16px',
          boxSizing: 'border-box',
        }}
      >
        {/* Preload images cache */}
        <div style={{ display: 'none' }} aria-hidden="true">
          {CHARACTER_STATES.map(state => (
            <img key={state.src} src={state.src} alt="" loading="eager" decoding="async" />
          ))}
        </div>

        {/* Top-Right Clean Exit Button */}
        <button
          type="button"
          onClick={onClose}
          disabled={isLoading || loginState === 'success'}
          aria-label="Exit login"
          style={{
            position: 'fixed',
            top: '20px',
            right: '24px',
            zIndex: 100,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 18px',
            borderRadius: '999px',
            background: 'var(--surface, #ffffff)',
            border: '1px solid var(--line, #e1e7f0)',
            color: 'var(--ink, #101a2d)',
            fontSize: '13px',
            fontWeight: 600,
            letterSpacing: '0.01em',
            cursor: isLoading || loginState === 'success' ? 'not-allowed' : 'pointer',
            boxShadow: 'var(--shadow-soft, 0 8px 30px rgba(16, 26, 45, 0.04))',
            transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
          onMouseEnter={e => {
            if (!isLoading && loginState !== 'success') {
              e.currentTarget.style.background = 'var(--soft, #eef2f6)';
              e.currentTarget.style.borderColor = 'var(--muted-2, #8290a0)';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'var(--surface, #ffffff)';
            e.currentTarget.style.borderColor = 'var(--line, #e1e7f0)';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          <span>Exit</span>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Unified Master Modal Card */}
        <div
          className="ps-login-master-modal"
          style={{
            width: '100%',
            maxWidth: '1040px',
            minHeight: '580px',
            margin: 'auto',
            background: '#ffffff',
            borderRadius: '26px',
            border: '1px solid rgba(225, 231, 240, 0.95)',
            boxShadow: '0 50px 140px -15px rgba(16, 26, 45, 0.38), 0 25px 65px -10px rgba(16, 26, 45, 0.26), 0 12px 30px -5px rgba(16, 26, 45, 0.16), 0 0 0 1px rgba(16, 26, 45, 0.08)',
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.12fr) minmax(0, 1fr)',
            alignItems: 'stretch',
            overflow: 'hidden',
            boxSizing: 'border-box',
          }}
        >
          {/* COLUMN 1: Enterprise Brand Showcase & Interactive Character Stage */}
          <div
            className="ps-showcase-column"
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              background: 'linear-gradient(165deg, #f2f6fe 0%, #ebf2fd 60%, #e2ecf9 100%)',
              borderRight: '1px solid rgba(40, 88, 232, 0.1)',
              padding: 'clamp(32px, 3.5vw, 42px) clamp(26px, 3vw, 38px) 0',
              overflow: 'hidden',
              position: 'relative',
              boxSizing: 'border-box',
            }}
          >
            {/* Mobile Brand Pill (Only visible on mobile) */}
            <div className="ps-mobile-brand-bar">
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--blue, #2858e8)' }} />
              ProcureSphere 360 Portal
            </div>

            {/* Top Brand & Copy Area */}
            <div className="ps-showcase-copy" style={{ position: 'relative', zIndex: 5, marginBottom: '16px' }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '5px 14px',
                  borderRadius: '999px',
                  background: 'rgba(40, 88, 232, 0.08)',
                  border: '1px solid rgba(40, 88, 232, 0.18)',
                  color: 'var(--blue, #2858e8)',
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  marginBottom: '14px',
                  fontFamily: '"DM Mono", monospace',
                }}
              >
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--blue, #2858e8)' }} />
                ProcureSphere Portal
              </div>

              <h1
                style={{
                  fontSize: 'clamp(25px, 2.5vw, 33px)',
                  lineHeight: 1.25,
                  fontWeight: 700,
                  color: 'var(--navy, #101a2d)',
                  margin: '0 0 12px',
                  fontFamily: '"Playfair Display", "Georgia", serif',
                  letterSpacing: '-0.02em',
                }}
              >
                Enterprise Procurement, <br />
                <span style={{ color: 'var(--blue, #2858e8)' }}>
                  Unified & In Control.
                </span>
              </h1>

              <p
                style={{
                  fontSize: '14px',
                  lineHeight: 1.6,
                  color: 'var(--muted, #526784)',
                  margin: '0',
                  maxWidth: '430px',
                }}
              >
                Connecting every requisition, vendor negotiation, and payment into one seamless, automated source-to-pay workflow.
              </p>
            </div>

            {/* Character Stage - Anchored at Bottom, Unclipped Headroom */}
            <div
              className="ps-character-section"
              style={{
                position: 'relative',
                width: '100%',
                aspectRatio: '927 / 414',
                maxHeight: '400px',
                marginTop: 'auto',
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'center',
                overflow: 'visible',
                userSelect: 'none',
              }}
            >
              {CHARACTER_STATES.map(state => {
                const isVisible = loginState === state.id;
                return (
                  <img
                    key={state.id}
                    src={state.src}
                    alt={state.alt}
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: '50%',
                      transform: 'translateX(-50%) scale(1.15)',
                      transformOrigin: 'bottom center',
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      objectPosition: 'bottom center',
                      opacity: isVisible ? 1 : 0,
                      pointerEvents: 'none',
                      transition: 'opacity 0.25s ease-in-out',
                      willChange: 'opacity',
                    }}
                  />
                );
              })}
            </div>
          </div>

          {/* COLUMN 2: Functional Login Form */}
          <div
            className="ps-form-column"
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              padding: 'clamp(32px, 4vw, 48px) clamp(28px, 3.5vw, 44px)',
              background: '#ffffff',
              boxSizing: 'border-box',
            }}
          >
            <div
              className="ps-login-card"
              style={{
                width: '100%',
                maxWidth: '380px',
                margin: '0 auto',
                boxSizing: 'border-box',
              }}
            >
              {/* Header / Brand */}
              <div className="ps-form-header" style={{ textAlign: 'center', marginBottom: '24px' }}>
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '44px',
                    height: '44px',
                    borderRadius: '12px',
                    background: 'var(--blue-2, #e9efff)',
                    color: 'var(--blue, #2858e8)',
                    marginBottom: '12px',
                  }}
                >
                  <svg width="22" height="22" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4.5 16h23" />
                    <path d="M16 4v24" />
                    <circle cx="24.8" cy="11" r="2.1" />
                    <circle cx="9.5" cy="21.5" r="2.1" />
                  </svg>
                </div>

                <div
                  style={{
                    fontSize: '15px',
                    fontWeight: 700,
                    letterSpacing: '0.02em',
                    color: 'var(--ink, #101a2d)',
                    fontFamily: '"DM Mono", monospace',
                  }}
                >
                  ProcureSphere <span style={{ color: 'var(--blue, #2858e8)' }}>360</span>
                </div>

                <h2
                  style={{
                    margin: '6px 0 4px',
                    fontSize: '24px',
                    fontWeight: 700,
                    color: 'var(--navy, #101a2d)',
                    fontFamily: '"Playfair Display", "Georgia", serif',
                    letterSpacing: '-0.02em',
                  }}
                >
                  Welcome Back
                </h2>
                <p
                  style={{
                    margin: 0,
                    fontSize: '13.5px',
                    color: 'var(--muted, #526784)',
                  }}
                >
                  Sign in to your enterprise procurement portal
                </p>
              </div>

              {/* Fixed Alert Message Slot - Prevents Modal Resizing / Jumping */}
              <div
                className="ps-alert-slot"
                style={{
                  minHeight: '48px',
                  marginBottom: '14px',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <AnimatePresence mode="wait">
                  {loginState === 'failed' && (
                    <motion.div
                      key="failed"
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.15 }}
                      style={{
                        width: '100%',
                        background: 'var(--red-2, #fdecea)',
                        border: '1px solid rgba(182, 59, 49, 0.25)',
                        borderRadius: '10px',
                        padding: '9px 12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '8px',
                        color: 'var(--red, #b63b31)',
                        fontSize: '12.5px',
                        fontWeight: 500,
                        boxSizing: 'border-box',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                          <circle cx="12" cy="12" r="10" />
                          <line x1="12" y1="8" x2="12" y2="12" />
                          <line x1="12" y1="16" x2="12.01" y2="16" />
                        </svg>
                        <span>{errorMessage || 'Invalid User ID or Password. Please try again.'}</span>
                      </div>
                      <button
                        type="button"
                        onClick={handleRetry}
                        style={{
                          background: '#ffffff',
                          border: '1px solid rgba(182, 59, 49, 0.4)',
                          borderRadius: '6px',
                          color: 'var(--red, #b63b31)',
                          fontSize: '11px',
                          fontWeight: 600,
                          padding: '2px 8px',
                          cursor: 'pointer',
                        }}
                      >
                        Retry
                      </button>
                    </motion.div>
                  )}

                  {loginState === 'success' && (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.15 }}
                      style={{
                        width: '100%',
                        background: 'var(--green-2, #e7f5ef)',
                        border: '1px solid rgba(14, 138, 95, 0.3)',
                        borderRadius: '10px',
                        padding: '9px 12px',
                        textAlign: 'center',
                        color: 'var(--green, #0e8a5f)',
                        boxSizing: 'border-box',
                      }}
                    >
                      <div style={{ fontWeight: 700, fontSize: '13.5px' }}>Authentication Confirmed!</div>
                      <div style={{ fontSize: '11.5px', opacity: 0.85 }}>Navigating to your dashboard...</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Functional React Form */}
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {/* User ID Field */}
                <div>
                  <label
                    htmlFor="ps-login-user-id"
                    style={{
                      display: 'block',
                      fontSize: '12.5px',
                      fontWeight: 600,
                      color: 'var(--ink, #101a2d)',
                      marginBottom: '6px',
                    }}
                  >
                    User ID
                  </label>
                  <div style={{ position: 'relative' }}>
                    <span
                      style={{
                        position: 'absolute',
                        left: '14px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: 'var(--muted-2, #8290a0)',
                        display: 'flex',
                        pointerEvents: 'none',
                      }}
                    >
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                    </span>
                    <input
                      id="ps-login-user-id"
                      type="text"
                      required
                      disabled={isLoading || loginState === 'success'}
                      value={userId}
                      onChange={e => {
                        setUserId(e.target.value);
                        if (loginState === 'failed') setLoginState('normal');
                      }}
                      onFocus={() => {
                        if (loginState === 'failed') setLoginState('normal');
                      }}
                      placeholder="e.g. enterprise.admin"
                      aria-label="User ID"
                      style={{
                        width: '100%',
                        height: '46px',
                        padding: '0 16px 0 42px',
                        borderRadius: '11px',
                        border: '1px solid var(--line, #e1e7f0)',
                        background: '#ffffff',
                        color: 'var(--ink, #101a2d)',
                        fontSize: '14px',
                        outline: 'none',
                        boxSizing: 'border-box',
                        transition: 'border-color 0.2s, box-shadow 0.2s',
                      }}
                      onFocusCapture={e => {
                        e.target.style.borderColor = 'var(--blue, #2858e8)';
                        e.target.style.boxShadow = '0 0 0 3px rgba(40, 88, 232, 0.15)';
                      }}
                      onBlurCapture={e => {
                        e.target.style.borderColor = 'var(--line, #e1e7f0)';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <label
                    htmlFor="ps-login-password"
                    style={{
                      display: 'block',
                      fontSize: '12.5px',
                      fontWeight: 600,
                      color: 'var(--ink, #101a2d)',
                      marginBottom: '6px',
                    }}
                  >
                    Password
                  </label>
                  <div style={{ position: 'relative' }}>
                    <span
                      style={{
                        position: 'absolute',
                        left: '14px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: 'var(--muted-2, #8290a0)',
                        display: 'flex',
                        pointerEvents: 'none',
                      }}
                    >
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                      </svg>
                    </span>
                    <input
                      ref={passwordInputRef}
                      id="ps-login-password"
                      type={showPassword ? 'text' : 'password'}
                      required
                      disabled={isLoading || loginState === 'success'}
                      value={password}
                      onChange={e => {
                        setPassword(e.target.value);
                      }}
                      onFocus={() => {
                        setIsPasswordFocused(true);
                      }}
                      onBlur={() => {
                        setIsPasswordFocused(false);
                      }}
                      placeholder="••••••••••••"
                      aria-label="Password"
                      style={{
                        width: '100%',
                        height: '46px',
                        padding: '0 44px 0 42px',
                        borderRadius: '11px',
                        border: '1px solid var(--line, #e1e7f0)',
                        background: '#ffffff',
                        color: 'var(--ink, #101a2d)',
                        fontSize: '14px',
                        outline: 'none',
                        boxSizing: 'border-box',
                        transition: 'border-color 0.2s, box-shadow 0.2s',
                      }}
                      onFocusCapture={e => {
                        e.target.style.borderColor = 'var(--blue, #2858e8)';
                        e.target.style.boxShadow = '0 0 0 3px rgba(40, 88, 232, 0.15)';
                      }}
                      onBlurCapture={e => {
                        e.target.style.borderColor = 'var(--line, #e1e7f0)';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                    {/* Show/Hide Password Toggle */}
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                      style={{
                        position: 'absolute',
                        right: '12px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: 'var(--muted-2, #8290a0)',
                        padding: '6px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {showPassword ? (
                        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                          <line x1="1" y1="1" x2="23" y2="23" />
                        </svg>
                      ) : (
                        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                {/* Remember Me & Forgot Password */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: '12.5px',
                    color: 'var(--muted, #526784)',
                  }}
                >
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={e => setRememberMe(e.target.checked)}
                      style={{
                        cursor: 'pointer',
                        accentColor: 'var(--blue, #2858e8)',
                        width: '14px',
                        height: '14px',
                      }}
                    />
                    <span>Remember me</span>
                  </label>
                  <a
                    href="#contact"
                    onClick={e => {
                      e.preventDefault();
                      alert('Password reset instructions dispatched to your administrator email.');
                    }}
                    style={{
                      color: 'var(--blue, #2858e8)',
                      textDecoration: 'none',
                      fontWeight: 500,
                    }}
                  >
                    Forgot Password?
                  </a>
                </div>

                {/* Login Button with Loading Indicator */}
                <button
                  type="submit"
                  disabled={isLoading || loginState === 'success'}
                  style={{
                    height: '48px',
                    borderRadius: '11px',
                    background:
                      loginState === 'success'
                        ? 'var(--green, #0e8a5f)'
                        : 'var(--blue, #2858e8)',
                    color: '#ffffff',
                    border: 'none',
                    fontSize: '14.5px',
                    fontWeight: 700,
                    cursor: isLoading || loginState === 'success' ? 'not-allowed' : 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    boxShadow: '0 10px 24px rgba(40, 88, 232, 0.22)',
                    transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                    marginTop: '4px',
                  }}
                  onMouseEnter={e => {
                    if (!isLoading && loginState !== 'success') {
                      e.currentTarget.style.background = '#1b47cb';
                      e.currentTarget.style.transform = 'translateY(-1px)';
                      e.currentTarget.style.boxShadow = '0 14px 30px rgba(40, 88, 232, 0.3)';
                    }
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'var(--blue, #2858e8)';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 10px 24px rgba(40, 88, 232, 0.22)';
                  }}
                >
                  {isLoading ? (
                    <>
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{ animation: 'psSpin 0.9s linear infinite' }}
                      >
                        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                      </svg>
                      <span>Authenticating...</span>
                    </>
                  ) : loginState === 'success' ? (
                    <>
                      <span>Success</span>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </>
                  ) : (
                    <>
                      <span>Sign In</span>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Global Keyframe Spinner & Responsive Rules */}
        <style>{`
          @keyframes psSpin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          @media (max-width: 860px) {
            .ps-login-master-modal {
              grid-template-columns: 1fr !important;
              max-width: 480px !important;
            }
            .ps-showcase-column {
              border-right: none !important;
              border-bottom: 1px solid rgba(40, 88, 232, 0.1) !important;
              padding-bottom: 0 !important;
            }
          }
        `}</style>
      </div>
    </AnimatePresence>
  );
};
