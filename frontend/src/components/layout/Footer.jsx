// src/components/layout/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>BREIÐHÖFÐI 3 | 110 REYKJAVÍK</h3>
            <div className="contact-item">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 16.92V19.92C22.0011 20.1985 21.9441 20.4741 21.8325 20.7293C21.7209 20.9845 21.5573 21.2136 21.3521 21.4018C21.1468 21.5901 20.9046 21.7335 20.6407 21.8227C20.3769 21.9119 20.0974 21.9451 19.82 21.92C16.7428 21.5856 13.787 20.5341 11.19 18.85C8.77383 17.3147 6.72534 15.2662 5.19 12.85C3.49998 10.2412 2.44824 7.27097 2.12 4.18C2.09501 3.90347 2.12788 3.62476 2.2165 3.36162C2.30513 3.09849 2.44757 2.85669 2.63477 2.65172C2.82196 2.44675 3.04981 2.28281 3.30379 2.17062C3.55778 2.05843 3.83221 2.0004 4.11 2H7.11C7.59531 1.99522 8.06579 2.16708 8.43376 2.48353C8.80173 2.79999 9.04208 3.23945 9.11 3.72C9.23662 4.68007 9.47144 5.62273 9.81 6.53C9.94454 6.88792 9.97366 7.27691 9.8939 7.65088C9.81415 8.02485 9.62886 8.36811 9.36 8.64L8.09 9.91C9.51356 12.4135 11.5865 14.4864 14.09 15.91L15.36 14.64C15.6319 14.3711 15.9751 14.1858 16.3491 14.1061C16.7231 14.0263 17.1121 14.0555 17.47 14.19C18.3773 14.5286 19.3199 14.7634 20.28 14.89C20.7658 14.9585 21.2094 15.2032 21.5265 15.5775C21.8437 15.9518 22.0122 16.4296 22 16.92Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>412 5000</span>
            </div>
            <div className="contact-item">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C16.4183 22 20 18.4183 20 14C20 9.58172 16.4183 6 12 6C7.58172 6 4 9.58172 4 14C4 18.4183 7.58172 22 12 22Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 10V14L15 16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 2V6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M4 6L2 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M20 6L22 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Mán - fös: 8-17 | Lau: Lokað</span>
            </div>
          </div>
          
          <div className="footer-section">
            <h3>HAFÐU SAMBAND</h3>
            <Link to="/hafdu-samband" className="contact-item">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 13V6C22 5.46957 21.7893 4.96086 21.4142 4.58579C21.0391 4.21071 20.5304 4 20 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V18C2 18.5304 2.21071 19.0391 2.58579 19.4142C2.96086 19.7893 3.46957 20 4 20H13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M22 7L13.03 12.7C12.7213 12.8934 12.3643 13.0001 12 13.0001C11.6357 13.0001 11.2787 12.8934 10.97 12.7L2 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16 19H22" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M19 16V22" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Almenn fyrirspurn | vefform</span>
            </Link>
            <a href="mailto:sala@bmvalla.is" className="contact-item">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M22 6L12 13L2 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>sala@bmvalla.is</span>
            </a>
            <a href="mailto:bokhald@bmvalla.is" className="contact-item">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M22 6L12 13L2 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>bokhald@bmvalla.is</span>
            </a>
          </div>
          
          <div className="footer-section">
            <h3>SJAFNARGÖTU 3 | 603 AKUREYRI</h3>
            <div className="contact-item">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 16.92V19.92C22.0011 20.1985 21.9441 20.4741 21.8325 20.7293C21.7209 20.9845 21.5573 21.2136 21.3521 21.4018C21.1468 21.5901 20.9046 21.7335 20.6407 21.8227C20.3769 21.9119 20.0974 21.9451 19.82 21.92C16.7428 21.5856 13.787 20.5341 11.19 18.85C8.77383 17.3147 6.72534 15.2662 5.19 12.85C3.49998 10.2412 2.44824 7.27097 2.12 4.18C2.09501 3.90347 2.12788 3.62476 2.2165 3.36162C2.30513 3.09849 2.44757 2.85669 2.63477 2.65172C2.82196 2.44675 3.04981 2.28281 3.30379 2.17062C3.55778 2.05843 3.83221 2.0004 4.11 2H7.11C7.59531 1.99522 8.06579 2.16708 8.43376 2.48353C8.80173 2.79999 9.04208 3.23945 9.11 3.72C9.23662 4.68007 9.47144 5.62273 9.81 6.53C9.94454 6.88792 9.97366 7.27691 9.8939 7.65088C9.81415 8.02485 9.62886 8.36811 9.36 8.64L8.09 9.91C9.51356 12.4135 11.5865 14.4864 14.09 15.91L15.36 14.64C15.6319 14.3711 15.9751 14.1858 16.3491 14.1061C16.7231 14.0263 17.1121 14.0555 17.47 14.19C18.3773 14.5286 19.3199 14.7634 20.28 14.89C20.7658 14.9585 21.2094 15.2032 21.5265 15.5775C21.8437 15.9518 22.0122 16.4296 22 16.92Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>412 5200</span>
            </div>
            <div className="contact-item">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C16.4183 22 20 18.4183 20 14C20 9.58172 16.4183 6 12 6C7.58172 6 4 9.58172 4 14C4 18.4183 7.58172 22 12 22Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 10V14L15 16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 2V6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M4 6L2 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M20 6L22 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Mán - fös: 8 - 17 | Lau: Lokað</span>
            </div>
          </div>
          
          <div className="footer-section">
            <h3>STARFSSTÖÐVAR</h3>
            <Link to="/um-okkur/starfsstodvar" className="footer-link">Staðsetningar og opnunartími</Link>
          </div>
          
          <div className="footer-section">
            <h3>FLÝTILEIÐIR</h3>
            <Link to="/stefnur-og-vottanir" className="footer-link">Stefnur og vottanir</Link>
            <Link to="/skipurit" className="footer-link">Skipurit</Link>
            <Link to="/minar-sidur" className="footer-link">Mínar síður</Link>
            <Link to="/sjalfbaerniskyrsla" className="footer-link">Sjálfbærniskýrsla</Link>
            <Link to="/uppljostrungatt-speakup" className="footer-link">Uppljóstrunargátt - SpeakUp</Link>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="social-media">
            <h4>Fylgdu okkur á samfélagsmiðlum</h4>
            <div className="social-icons">
              <a href="https://www.facebook.com/bmvalla" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 2H15C13.6739 2 12.4021 2.52678 11.4645 3.46447C10.5268 4.40215 10 5.67392 10 7V10H7V14H10V22H14V14H17L18 10H14V7C14 6.73478 14.1054 6.48043 14.2929 6.29289C14.4804 6.10536 14.7348 6 15 6H18V2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              <a href="https://www.instagram.com/bmvalla" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17 2H7C4.23858 2 2 4.23858 2 7V17C2 19.7614 4.23858 22 7 22H17C19.7614 22 22 19.7614 22 17V7C22 4.23858 19.7614 2 17 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 11.3701C16.1234 12.2023 15.9813 13.0523 15.5938 13.7991C15.2063 14.5459 14.5932 15.1515 13.8416 15.5297C13.0901 15.908 12.2385 16.0397 11.4078 15.906C10.5771 15.7723 9.80977 15.3801 9.21485 14.7852C8.61993 14.1903 8.22774 13.4229 8.09408 12.5923C7.96042 11.7616 8.09208 10.91 8.47034 10.1584C8.8486 9.40691 9.4542 8.7938 10.201 8.4063C10.9478 8.0188 11.7978 7.87665 12.63 8.00006C13.4789 8.12594 14.2649 8.52152 14.8717 9.12836C15.4785 9.73521 15.8741 10.5211 16 11.3701Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M17.5 6.5H17.51" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              <a href="https://www.linkedin.com/company/bm-valla" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 8C17.5913 8 19.1174 8.63214 20.2426 9.75736C21.3679 10.8826 22 12.4087 22 14V21H18V14C18 13.4696 17.7893 12.9609 17.4142 12.5858C17.0391 12.2107 16.5304 12 16 12C15.4696 12 14.9609 12.2107 14.5858 12.5858C14.2107 12.9609 14 13.4696 14 14V21H10V14C10 12.4087 10.6321 10.8826 11.7574 9.75736C12.8826 8.63214 14.4087 8 16 8V8Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M6 9H2V21H6V9Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M4 6C5.10457 6 6 5.10457 6 4C6 2.89543 5.10457 2 4 2C2.89543 2 2 2.89543 2 4C2 5.10457 2.89543 6 4 6Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              <a href="https://www.youtube.com/channel/UC-example" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.5401 6.42C22.4213 5.94541 22.1794 5.51057 21.8387 5.15941C21.4981 4.80824 21.0708 4.55318 20.6001 4.42C18.8801 4 12.0001 4 12.0001 4C12.0001 4 5.12008 4 3.40008 4.46C2.92933 4.59318 2.50206 4.84824 2.16143 5.19941C1.8208 5.55057 1.57887 5.98541 1.46008 6.46C1.14524 8.20556 0.991768 9.97631 1.00008 11.75C0.988361 13.537 1.14196 15.3213 1.46008 17.08C1.59104 17.5398 1.83797 17.9581 2.17724 18.2945C2.51652 18.6308 2.93898 18.8738 3.40008 19C5.12008 19.46 12.0001 19.46 12.0001 19.46C12.0001 19.46 18.8801 19.46 20.6001 19C21.0708 18.8668 21.4981 18.6118 21.8387 18.2606C22.1794 17.9094 22.4213 17.4746 22.5401 17C22.8524 15.2676 23.0058 13.5103 23.0001 11.75C23.0118 9.96295 22.8582 8.1787 22.5401 6.42V6.42Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9.75 15.02L15.5 11.75L9.75 8.48001V15.02Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>
          </div>
          
          <div className="certifications">
            <div className="certification-images">
              <img src="/certifications/certification-1.png" alt="Umhverfisvottun" />
              <img src="/certifications/certification-2.png" alt="Framúrskarandi fyrirtæki" />
              <img src="/certifications/certification-3.png" alt="EPD" />
              <img src="/certifications/certification-4.png" alt="Jafnlaunavottun" />
              <img src="/certifications/certification-5.png" alt="ISO 9001" />
            </div>
          </div>
        </div>
        
        <div className="copyright">
          <p>&copy; {new Date().getFullYear()} BM Vallá. Allur réttur áskilinn.</p>
        </div>
      </div>
      
      <style jsx>{`
        .footer {
          background-color: var(--secondary);
          color: white;
          padding-top: 3rem;
        }
        
        .footer-content {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 2rem;
          padding-bottom: 3rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .footer-section h3 {
          font-size: 1rem;
          font-weight: 600;
          margin-bottom: 1.5rem;
          color: white;
        }
        
        .contact-item {
          display: flex;
          align-items: center;
          margin-bottom: 1rem;
          color: rgba(255, 255, 255, 0.8);
        }
        
        .contact-item svg {
          margin-right: 0.75rem;
          min-width: 24px;
        }
        
        .footer-link {
          display: block;
          color: rgba(255, 255, 255, 0.8);
          margin-bottom: 0.75rem;
          transition: color 0.3s ease;
        }
        
        .footer-link:hover {
          color: white;
          text-decoration: none;
        }
        
        .footer-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 2rem 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .social-media h4 {
          font-size: 1rem;
          font-weight: 600;
          margin-bottom: 1rem;
        }
        
        .social-icons {
          display: flex;
          gap: 1rem;
        }
        
        .social-icons a {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0.1);
          transition: background-color 0.3s ease;
        }
        
        .social-icons a:hover {
          background-color: var(--primary);
        }
        
        .certification-images {
          display: flex;
          gap: 1.5rem;
          align-items: center;
        }
        
        .certification-images img {
          height: 50px;
          object-fit: contain;
        }
        
        .copyright {
          padding: 1.5rem 0;
          text-align: center;
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.875rem;
        }
        
        @media (max-width: 1200px) {
          .footer-content {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        
        @media (max-width: 992px) {
          .footer-bottom {
            flex-direction: column;
            gap: 2rem;
          }
          
          .certification-images {
            flex-wrap: wrap;
            justify-content: center;
          }
        }
        
        @media (max-width: 768px) {
          .footer-content {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        
        @media (max-width: 576px) {
          .footer-content {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;