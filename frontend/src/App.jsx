// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Hero from './components/home/Hero';
import ProductCategories from './components/home/ProductCategories';
import StoreLocations from './components/home/StoreLocations';
import './styles/globals.css';

const HomePage = () => (
  <>
    <Hero />
    <ProductCategories />
    <StoreLocations />
  </>
);

// Placeholder for other pages
const PlaceholderPage = ({ title }) => (
  <div style={{ padding: '4rem 0', textAlign: 'center' }}>
    <div className="container">
      <h1>{title}</h1>
      <p>Síða í vinnslu</p>
    </div>
  </div>
);

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/vefverslun/*" element={<PlaceholderPage title="Vefverslun" />} />
          <Route path="/vorur/*" element={<PlaceholderPage title="Vörur" />} />
          <Route path="/innblastur/*" element={<PlaceholderPage title="Innblástur" />} />
          <Route path="/um-okkur/*" element={<PlaceholderPage title="Um okkur" />} />
          <Route path="/teikniforrit" element={<PlaceholderPage title="Teikniforrit" />} />
          <Route path="*" element={<PlaceholderPage title="Síða fannst ekki" />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;