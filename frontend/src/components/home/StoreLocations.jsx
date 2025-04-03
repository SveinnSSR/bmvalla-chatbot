// src/components/home/StoreLocations.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const StoreLocations = () => {
  const locations = [
    {
      id: 'reykjavik',
      name: 'Múr- og fagverslun',
      address: 'Breiðhöfði 3 | 110 Reykjavík',
      image: '/store-locations/reykjavik-store.jpg',
      url: '/um-okkur/starfsstodvar/reykjavik'
    },
    {
      id: 'soluskriftofa',
      name: 'Söluskriftstofa og sýningarsvæði',
      address: 'Breiðhöfði 3 | 110 Reykjavík',
      image: '/store-locations/soluskrifstofa.jpg',
      url: '/um-okkur/starfsstodvar/soluskriftofa'
    },
    {
      id: 'akureyri',
      name: 'Múr- og fagverslun',
      address: 'Sjafnargötu 3 | 603 Akureyri',
      image: '/store-locations/akureyri-store.jpg',
      url: '/um-okkur/starfsstodvar/akureyri'
    }
  ];

  return (
    <section className="store-locations">
      <div className="container">
        <h2 className="section-title">RENNDU Í HLAÐ</h2>
        
        <p className="section-description">
          Verið velkomin í múr- og fagverslarnir okkar í Reykjavík eða á Akureyri þar sem þú færð allt það besta í múrverkið, steypuframkvæmdir, hellulagnir og finnur úrval steyptra vara til að fegra garðinn. Sérfræðingar BM Vallár veita góð ráð um vörurnar og framkvæmdirnar við húsið þitt.
        </p>
        
        <p className="section-description">
          Einnig erum við með söluskrifstofur og sýningarsvæði með hellum og garðeiningum á Breiðhöfða 3.
        </p>
        
        <div className="locations-grid">
          {locations.map((location) => (
            <Link to={location.url} key={location.id} className="location-card">
              <div className="location-image">
                <img src={location.image} alt={location.name} />
              </div>
              <div className="location-info">
                <h3 className="location-name">{location.name}</h3>
                <p className="location-address">{location.address}</p>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="view-all-link">
          <Link to="/um-okkur/starfsstodvar">
            STARFSSTÖÐVAR
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
      </div>
      
      <style jsx>{`
        .store-locations {
          padding: 4rem 0;
          background-color: #f9f9f9;
        }
        
        .section-title {
          color: var(--primary);
          text-align: center;
          font-weight: 700;
          font-size: 2rem;
          margin-bottom: 1.5rem;
        }
        
        .section-description {
          text-align: center;
          max-width: 800px;
          margin: 0 auto 2rem;
          font-size: 1.1rem;
          line-height: 1.6;
        }
        
        .locations-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
          margin: 3rem 0;
        }
        
        .location-card {
          background-color: white;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
        }
        
        .location-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
          text-decoration: none;
        }
        
        .location-image {
          height: 200px;
          overflow: hidden;
        }
        
        .location-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }
        
        .location-card:hover .location-image img {
          transform: scale(1.05);
        }
        
        .location-info {
          padding: 1.5rem;
        }
        
        .location-name {
          color: var(--text);
          font-size: 1.25rem;
          font-weight: 600;
          margin: 0 0 0.5rem;
        }
        
        .location-address {
          color: var(--primary);
          margin: 0;
        }
        
        .view-all-link {
          text-align: center;
          margin-top: 2rem;
        }
        
        .view-all-link a {
          display: inline-flex;
          align-items: center;
          color: var(--primary);
          font-weight: 600;
          font-size: 1.1rem;
          transition: color 0.3s ease;
        }
        
        .view-all-link a:hover {
          color: #b02e1e;
          text-decoration: none;
        }
        
        .view-all-link svg {
          margin-left: 0.5rem;
          transition: transform 0.3s ease;
        }
        
        .view-all-link a:hover svg {
          transform: translateX(4px);
        }
        
        @media (max-width: 992px) {
          .locations-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        
        @media (max-width: 576px) {
          .locations-grid {
            grid-template-columns: 1fr;
          }
          
          .section-title {
            font-size: 1.75rem;
          }
          
          .section-description {
            font-size: 1rem;
          }
        }
      `}</style>
    </section>
  );
};

export default StoreLocations;