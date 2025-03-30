(function() {
  // Configuration
  const config = {
    apiEndpoint: 'https://bmv-ai-service.vercel.app/chat',
    containerStyles: {
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      zIndex: '10000'
    }
  };

  // Create chat widget container
  const createChatWidget = () => {
    const container = document.createElement('div');
    Object.assign(container.style, config.containerStyles);
    container.id = 'bmv-chat-widget-container';
    
    // Create iframe to load the chat widget
    const iframe = document.createElement('iframe');
    iframe.src = 'https://bmv-interactive-module.vercel.app';
    iframe.style.width = '350px';
    iframe.style.height = '600px';
    iframe.style.border = 'none';
    iframe.style.borderRadius = '10px';
    iframe.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    
    container.appendChild(iframe);
    document.body.appendChild(container);
    
    return container;
  };

  // Initialize when DOM is ready
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    createChatWidget();
  } else {
    document.addEventListener('DOMContentLoaded', createChatWidget);
  }
})();
