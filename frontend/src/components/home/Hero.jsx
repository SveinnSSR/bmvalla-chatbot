// src/components/home/Hero.jsx
import React from 'react';

const Hero = () => {
  return (
    <section className="hero">
      <div className="container">
        <h1 className="hero-title">BYGGJUM VISTVÆNNI FRAMTÍÐ</h1>
        
        <div className="hero-content">
          <p className="hero-text">
            BM Vallá framleiðir hágæða byggingarvörur fyrir mannvirkjagerð, þ.m.t. steinsteypu, forsteyptar húseiningar, hellur og múr- og flotefi. Mikil áhersla er lögð á vistvænni steypu, sjálfbærni og hringrásarhugsun.
          </p>
          
          <p className="hero-text">
            Framleiðslan byggir á sjötíu ára reynslu, þekkingu og gæðum sem standast ströngustu kröfur við íslenskar aðstæður. BM Vallá er eini íslenski steypuframleiðandinn með vottað ISO 9001 gæðastjórnunarkerfi.
          </p>
        </div>
      </div>
      
      <style jsx>{`
        .hero {
          padding: 4rem 0;
          background-color: #f9f9f9;
        }
        
        .hero-title {
          color: var(--primary);
          text-align: center;
          font-weight: 700;
          font-size: 2.5rem;
          margin-bottom: 2rem;
        }
        
        .hero-content {
          max-width: 800px;
          margin: 0 auto;
          text-align: center;
        }
        
        .hero-text {
          font-size: 1.1rem;
          line-height: 1.6;
          margin-bottom: 1.5rem;
        }
        
        @media (max-width: 768px) {
          .hero {
            padding: 3rem 0;
          }
          
          .hero-title {
            font-size: 2rem;
          }
          
          .hero-text {
            font-size: 1rem;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;