// src/styles/theme.js
export const theme = {
  colors: {
    primary: '#CB3727', // BM Vallá red
    secondary: '#333333', // Dark gray for footer
    text: '#333333',
    lightText: '#666666',
    background: '#FFFFFF',
    footerBg: '#333333',
    lightGray: '#F5F5F5',
    border: '#DDDDDD',
    success: '#4CAF50',
    error: '#F44336',
    warning: '#FFC107'
  },
  fonts: {
    body: "'Open Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    heading: "'Open Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
  },
  fontSizes: {
    small: '0.875rem',
    body: '1rem',
    large: '1.125rem',
    heading: '1.5rem',
    hero: '2.5rem'
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    xxl: '3rem'
  },
  breakpoints: {
    xs: '480px',
    sm: '768px',
    md: '992px',
    lg: '1200px'
  },
  shadows: {
    small: '0 2px 4px rgba(0, 0, 0, 0.1)',
    medium: '0 4px 8px rgba(0, 0, 0, 0.1)',
    large: '0 8px 16px rgba(0, 0, 0, 0.1)'
  },
  borderRadius: {
    small: '4px',
    medium: '8px',
    large: '16px',
    round: '50%'
  },
  transitions: {
    fast: '0.2s ease',
    normal: '0.3s ease',
    slow: '0.5s ease'
  }
};