import React from 'react';
import ChatWidget from './components/ChatWidget';
import './App.css';

function App() {
  return (
    <div className="App">
      <ChatWidget 
        webhookUrl="https://bmv-ai-service.vercel.app/chat"
        apiKey="bmv-2025-7f8a91d3e5c6b2" // Use the same key from your backend .env
      />
    </div>
  );
}

export default App;
