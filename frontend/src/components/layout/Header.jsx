// src/components/layout/Header.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <Link to="/">
              <img src={logo} alt="BM Vallá" />
            </Link>
          </div>
          
          <button 
            className="mobile-menu-toggle" 
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
          
          <nav className={`main-nav ${mobileMenuOpen ? 'open' : ''}`}>
            <ul>
              <li className="dropdown">
                <span>VEFVERSLUN</span>
                <div className="dropdown-content">
                  <Link to="/vefverslun/steypa">Steypa</Link>
                  <Link to="/vefverslun/hellur">Hellur</Link>
                  <Link to="/vefverslun/gardeingar">Garðeiningar</Link>
                </div>
              </li>
              <li className="dropdown">
                <span>VÖRUR</span>
                <div className="dropdown-content">
                  <Link to="/vorur/steypa">Steypa</Link>
                  <Link to="/vorur/hellur">Hellur</Link>
                  <Link to="/vorur/huseiningar">Húseiningar</Link>
                  <Link to="/vorur/mur-og-flot">Múr og flot</Link>
                  <Link to="/vorur/gardeingar">Garðeiningar</Link>
                </div>
              </li>
              <li className="dropdown">
                <span>INNBLÁSTUR</span>
                <div className="dropdown-content">
                  <Link to="/innblastur/myndir">Myndir</Link>
                  <Link to="/innblastur/verkefni">Verkefni</Link>
                </div>
              </li>
              <li className="dropdown">
                <span>UM OKKUR</span>
                <div className="dropdown-content">
                  <Link to="/um-okkur/fyrirtaekid">Fyrirtækið</Link>
                  <Link to="/um-okkur/starfsfolk">Starfsfólk</Link>
                  <Link to="/um-okkur/saga">Saga</Link>
                  <Link to="/um-okkur/starfsstodvar">Starfsstöðvar</Link>
                </div>
              </li>
              <li>
                <Link to="/teikniforrit">TEIKNIFORRIT</Link>
              </li>
            </ul>
          </nav>
          
          <div className="header-actions">
            <Link to="/search" className="search-icon" aria-label="Search">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </Link>
            <Link to="/account" className="account-icon" aria-label="My Account">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </Link>
            <Link to="/cart" className="cart-icon" aria-label="Shopping Cart">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
            </Link>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .header {
          background-color: var(--primary);
          color: white;
          position: sticky;
          top: 0;
          z-index: 1000;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        
        .header-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem 0;
        }
        
        .logo img {
          height: 40px;
        }
        
        .main-nav ul {
          display: flex;
          list-style: none;
          margin: 0;
          padding: 0;
        }
        
        .main-nav li {
          margin: 0 1rem;
          position: relative;
        }
        
        .main-nav span, 
        .main-nav a {
          color: white;
          font-weight: 600;
          padding: 0.5rem 0;
          display: block;
          cursor: pointer;
        }
        
        .dropdown-content {
          display: none;
          position: absolute;
          background-color: white;
          min-width: 200px;
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
          z-index: 1;
          border-radius: 4px;
          overflow: hidden;
        }
        
        .dropdown-content a {
          color: var(--text);
          padding: 0.75rem 1rem;
          border-bottom: 1px solid var(--border);
        }
        
        .dropdown-content a:last-child {
          border-bottom: none;
        }
        
        .dropdown-content a:hover {
          background-color: var(--light-gray);
          text-decoration: none;
        }
        
        .dropdown:hover .dropdown-content {
          display: block;
        }
        
        .header-actions {
          display: flex;
          align-items: center;
        }
        
        .header-actions a {
          color: white;
          margin-left: 1.5rem;
        }
        
        .mobile-menu-toggle {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.5rem;
        }
        
        .mobile-menu-toggle span {
          display: block;
          width: 25px;
          height: 3px;
          background-color: white;
          margin: 5px 0;
          border-radius: 3px;
          transition: all 0.3s ease;
        }
        
        @media (max-width: 992px) {
          .mobile-menu-toggle {
            display: block;
            z-index: 1001;
          }
          
          .main-nav {
            position: fixed;
            top: 0;
            right: -300px;
            width: 300px;
            height: 100vh;
            background-color: white;
            padding: 5rem 1.5rem 2rem;
            transition: right 0.3s ease;
            box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
            overflow-y: auto;
          }
          
          .main-nav.open {
            right: 0;
          }
          
          .main-nav ul {
            flex-direction: column;
          }
          
          .main-nav li {
            margin: 0 0 1rem;
          }
          
          .main-nav span, 
          .main-nav a {
            color: var(--text);
            padding: 0.75rem 0;
            border-bottom: 1px solid var(--border);
          }
          
          .dropdown-content {
            position: static;
            display: none;
            background-color: var(--light-gray);
            box-shadow: none;
            border-radius: 0;
            margin-top: 0.5rem;
          }
          
          .dropdown-content a {
            padding-left: 1.5rem;
            border-bottom: 1px solid var(--border);
          }
          
          .dropdown.open .dropdown-content {
            display: block;
          }
          
          .mobile-menu-toggle.open span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 6px);
          }
          
          .mobile-menu-toggle.open span:nth-child(2) {
            opacity: 0;
          }
          
          .mobile-menu-toggle.open span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -8px);
          }
        }
      `}</style>
    </header>
  );
};

export default Header;