// src/components/home/ProductCategories.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const ProductCategories = () => {
  const categories = [
    {
      id: 'steypa',
      name: 'Steypa',
      icon: (
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M62.5 40C62.5 43.75 60 45 57.5 45H22.5C20 45 17.5 43.75 17.5 40M62.5 40V30C62.5 26.25 60 25 57.5 25H22.5C20 25 17.5 26.25 17.5 30V40M62.5 40L65 60C65 63.75 62.5 65 60 65H20C17.5 65 15 63.75 15 60L17.5 40" stroke="#CB3727" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M25 25V17.5C25 15 26.25 12.5 30 12.5H50C53.75 12.5 55 15 55 17.5V25" stroke="#CB3727" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M17.5 45H62.5" stroke="#CB3727" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M22.5 57.5L57.5 57.5" stroke="#CB3727" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M22.5 32.5L57.5 32.5" stroke="#CB3727" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      url: '/vorur/steypa'
    },
    {
      id: 'hellur',
      name: 'Hellur',
      icon: (
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="15" y="15" width="22.5" height="22.5" stroke="#CB3727" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <rect x="42.5" y="15" width="22.5" height="22.5" stroke="#CB3727" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <rect x="15" y="42.5" width="22.5" height="22.5" stroke="#CB3727" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <rect x="42.5" y="42.5" width="22.5" height="22.5" stroke="#CB3727" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      url: '/vorur/hellur'
    },
    {
      id: 'huseiningar',
      name: 'Húseiningar',
      icon: (
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 31.6667L40 15L65 31.6667V65H15V31.6667Z" stroke="#CB3727" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M32.5 65V40H47.5V65" stroke="#CB3727" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      url: '/vorur/huseiningar'
    },
    {
      id: 'mur-og-flot',
      name: 'Múr og flot',
      icon: (
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="15" y="25" width="50" height="32.5" stroke="#CB3727" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M23.75 35L35 35" stroke="#CB3727" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M23.75 45L35 45" stroke="#CB3727" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M45 25V57.5" stroke="#CB3727" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M15 57.5L15 65L65 65L65 57.5" stroke="#CB3727" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M15 25L15 17.5L65 17.5L65 25" stroke="#CB3727" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M55 35L65 35" stroke="#CB3727" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M55 45L65 45" stroke="#CB3727" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      url: '/vorur/mur-og-flot'
    },
    {
      id: 'gardeiningar',
      name: 'Garðeiningar',
      icon: (
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="15" y="22.5" width="50" height="10" stroke="#CB3727" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <rect x="15" y="37.5" width="50" height="10" stroke="#CB3727" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <rect x="15" y="52.5" width="50" height="10" stroke="#CB3727" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <line x1="25" y1="22.5" x2="25" y2="62.5" stroke="#CB3727" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <line x1="40" y1="22.5" x2="40" y2="62.5" stroke="#CB3727" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <line x1="55" y1="22.5" x2="55" y2="62.5" stroke="#CB3727" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      url: '/vorur/gardeiningar'
    }
  ];

  return (
    <section className="product-categories">
      <div className="container">
        <div className="categories-grid">
          {categories.map((category) => (
            <Link to={category.url} key={category.id} className="category-card">
              <div className="category-icon">
                {category.icon}
              </div>
              <h3 className="category-name">{category.name}</h3>
            </Link>
          ))}
        </div>
      </div>
      
      <style jsx>{`
        .product-categories {
          padding: 4rem 0;
        }
        
        .categories-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 2rem;
          justify-content: center;
        }
        
        .category-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 1.5rem;
          border-radius: 8px;
          transition: all 0.3s ease;
        }
        
        .category-card:hover {
          transform: translateY(-5px);
          text-decoration: none;
        }
        
        .category-icon {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: 1rem;
        }
        
        .category-name {
          color: var(--text);
          font-size: 1.25rem;
          font-weight: 600;
          margin: 0;
        }
        
        @media (max-width: 992px) {
          .categories-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        
        @media (max-width: 576px) {
          .categories-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1rem;
          }
          
          .category-card {
            padding: 1rem;
          }
          
          .category-name {
            font-size: 1rem;
          }
        }
      `}</style>
    </section>
  );
};

export default ProductCategories;