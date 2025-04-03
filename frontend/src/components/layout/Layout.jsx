// src/components/layout/Layout.jsx
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import ChatWidget from "../ChatWidget";

const Layout = ({ children }) => {
  // API key should be stored in environment variables
  const apiKey = import.meta.env.VITE_API_KEY || "bmv-2025-7f8a91d3e5c6b2";

  return (
    <div className="layout">
      <Header />
      <main className="main-content">
        {children}
      </main>
      <Footer />
      <ChatWidget 
        webhookUrl="https://bmv-ai-service.vercel.app/chat"
        apiKey={apiKey}
        language="is"
      />
      
      <style jsx>{`
        .layout {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
        }
        
        .main-content {
          flex: 1;
        }
      `}</style>
    </div>
  );
};

export default Layout;