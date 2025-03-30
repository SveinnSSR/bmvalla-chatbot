import React from 'react';
import ChatWidget from './components/ChatWidget';

const WidgetStandalone = () => {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <ChatWidget 
        webhookUrl="https://bmv-ai-service.vercel.app/chat"
        apiKey="bmv-2025-7f8a91d3e5c6b2"
        isEmbedded={true}
      />
    </div>
  );
};

export default WidgetStandalone;

