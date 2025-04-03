import React, { useState, useEffect, useCallback, useRef } from 'react';
import MessageFormatter from './MessageFormatter';
import { theme } from '../styles/theme';

// Constants for session management
const SESSION_ID_KEY = 'bmvallaChatSessionId';
const SESSION_LAST_ACTIVITY_KEY = 'bmvallaChatLastActivity';
const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes in milliseconds

const ChatWidget = ({ 
  webhookUrl = 'https://bmv-ai-service.vercel.app/chat', 
  apiKey = 'bmv-2025-7f8a91d3e5c6b2', 
  language = 'is', 
  isEmbedded = false 
}) => {
  const messagesEndRef = useRef(null);
  const [isMinimized, setIsMinimized] = useState(true);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [sessionId, setSessionId] = useState('');
  // Add state for tracking message feedback
  const [messageFeedback, setMessageFeedback] = useState({});
  // Add state to track PostgreSQL IDs for messages
  const [messagePostgresqlIds, setMessagePostgresqlIds] = useState({});
  // Add window width tracking for responsive design
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  // Add window resize listener for responsive design
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Functions for session management
  const generateSessionId = useCallback(() => {
    return `session_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`;
  }, []);
  
  const checkSessionTimeout = useCallback(() => {
    const lastActivity = localStorage.getItem(SESSION_LAST_ACTIVITY_KEY);
    
    if (lastActivity && Date.now() - parseInt(lastActivity) > SESSION_TIMEOUT) {
      console.log('Session timed out, generating new session ID');
      const newSessionId = generateSessionId();
      localStorage.setItem(SESSION_ID_KEY, newSessionId);
      setSessionId(newSessionId);
    }
    
    // Update last activity time
    localStorage.setItem(SESSION_LAST_ACTIVITY_KEY, Date.now().toString());
  }, [generateSessionId]);
  
  const initializeSession = useCallback(() => {
    // Check if there's an existing session ID
    let existingSessionId = localStorage.getItem(SESSION_ID_KEY);
    
    if (!existingSessionId) {
      // Generate a new session ID if none exists
      existingSessionId = generateSessionId();
      localStorage.setItem(SESSION_ID_KEY, existingSessionId);
      console.log('Generated new session ID:', existingSessionId);
    } else {
      console.log('Using existing session ID:', existingSessionId);
    }
    
    // Check for session timeout
    const lastActivity = localStorage.getItem(SESSION_LAST_ACTIVITY_KEY);
    if (lastActivity && Date.now() - parseInt(lastActivity) > SESSION_TIMEOUT) {
      console.log('Session timed out, generating new session ID');
      existingSessionId = generateSessionId();
      localStorage.setItem(SESSION_ID_KEY, existingSessionId);
    }
    
    // Set the session ID in state
    setSessionId(existingSessionId);
    
    // Update last activity timestamp
    localStorage.setItem(SESSION_LAST_ACTIVITY_KEY, Date.now().toString());
  }, [generateSessionId]);

  // Initialize session on component mount
  useEffect(() => {
    initializeSession();
    
    // Periodically check for session timeout (every minute)
    const intervalId = setInterval(checkSessionTimeout, 60000);
    
    return () => {
      clearInterval(intervalId);
    };
  }, [initializeSession, checkSessionTimeout]);

  // Auto-scroll to the latest message
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initial welcome message
  useEffect(() => {
    const welcomeMessage = "Hæ! Ég er gervigreindarfulltrúi hjá BM Vallá. Hvernig get ég aðstoðað þig í dag?";
    
    setMessages([{
      type: 'bot',
      content: welcomeMessage,
      id: 'welcome-msg-' + Date.now()
    }]);
  }, []);

  // Function to determine if a message should show feedback options
  const shouldShowFeedback = (message) => {
    // Skip feedback for welcome messages
    if (
      message.content.includes("Hæ! Ég er gervigreindar") || 
      message.content.includes("Hvernig get ég aðstoðað þig") ||
      message.id === 'welcome-msg-' + Date.now().toString().slice(0, -3) // Approximate ID match for welcome
    ) {
      return false;
    }
    
    // Skip feedback for error messages
    if (
      message.content.includes("Því miður kom upp villa") || 
      message.content.includes("reyndu aftur síðar")
    ) {
      return false;
    }
    
    // Skip feedback for very short responses (less than 100 characters)
    if (message.content.length < 100) {
      return false;
    }
    
    // Skip feedback for first message of conversation
    if (message.id.includes('welcome-msg')) {
      return false;
    }
    
    // Show feedback for all other substantive responses
    return true;
  };

  // Handle message feedback
  const handleMessageFeedback = async (messageId, isPositive) => {
    // Prevent multiple submissions for the same message
    if (messageFeedback[messageId]) return;
    
    console.log('Starting feedback submission for message:', messageId);
    
    // Update local state first for immediate UI feedback
    setMessageFeedback(prev => ({
      ...prev,
      [messageId]: { isPositive, submitted: true }
    }));
    
    try {
      // Find the message content
      const message = messages.find(msg => msg.id === messageId);
      const messageContent = message ? message.content : '';
      
      // Get PostgreSQL ID if we have one stored
      const postgresqlId = messagePostgresqlIds[messageId];
      
      // Send to backend
      const feedbackUrl = webhookUrl.replace('/chat', '') + '/feedback';
      
      const response = await fetch(feedbackUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey
        },
        body: JSON.stringify({
          messageId,
          postgresqlId,
          isPositive,
          messageContent,
          timestamp: new Date().toISOString(),
          sessionId: sessionId
        })
      });
      
      if (!response.ok) {
        console.error('Failed to send feedback:', await response.json());
      } else {
        console.log('Successfully sent feedback to backend');
      }
    } catch (error) {
      console.error('Error sending feedback:', error);
    }
  };

  // Handle message sending
  const handleSend = async () => {
    if (!inputValue.trim() || isTyping) return;
    
    const messageText = inputValue.trim();
    setInputValue('');
    
    // Add user message to the chat
    setMessages(prev => [...prev, {
      type: 'user',
      content: messageText,
      id: 'user-msg-' + Date.now()
    }]);
    
    setIsTyping(true);
    
    // Check for session timeout before sending
    checkSessionTimeout();
    
    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey
        },
        body: JSON.stringify({ 
          message: messageText,
          sessionId: sessionId
        })
      });   
    
      const data = await response.json();
      setIsTyping(false);
      
      // Normal bot response handling with unique ID for feedback tracking
      const botMessageId = 'bot-msg-' + Date.now();
      setMessages(prev => [...prev, {
        type: 'bot',
        content: data.message,
        id: botMessageId
      }]);

      // Store PostgreSQL ID if provided in response
      if (data.postgresqlMessageId) {
        setMessagePostgresqlIds(prev => ({
          ...prev,
          [botMessageId]: data.postgresqlMessageId
        }));
      }
      
      // If there's calculation result, you could handle it here
      if (data.calculationResult) {
        console.log('Calculation result:', data.calculationResult);
      }
    } catch (error) {
      console.error('Error:', error);
      setIsTyping(false);
      setMessages(prev => [...prev, {
        type: 'bot',
        content: "Því miður kom upp villa. Vinsamlegast reyndu aftur síðar.",
        id: 'bot-error-' + Date.now()
      }]);
    }
  };

  // Typing indicator component
  const TypingIndicator = () => (
    <div style={{
      display: 'flex',
      justifyContent: 'flex-start',
      marginBottom: '16px',
      alignItems: 'flex-start',
      gap: '8px'
    }}>
      <div style={{
        width: '30px',
        height: '30px',
        borderRadius: '50%',
        marginTop: '4px',
        backgroundColor: theme.colors.primary,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontWeight: 'bold',
        fontSize: '12px',
      }}>
        BV
      </div>
      <div style={{
        padding: '12px 16px',
        borderRadius: '16px',
        backgroundColor: '#f0f0f0',
        display: 'flex',
        gap: '4px',
        alignItems: 'center',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        border: '1px solid rgba(0, 0, 0, 0.05)'
      }}>
        <span style={{
          height: '8px',
          width: '8px',
          backgroundColor: '#93918f',
          borderRadius: '50%',
          opacity: 0.4,
          animation: 'bm-valla-chat-typing 1s infinite'
        }}/>
        <span style={{
          height: '8px',
          width: '8px',
          backgroundColor: '#93918f',
          borderRadius: '50%',
          opacity: 0.4,
          animation: 'bm-valla-chat-typing 1s infinite',
          animationDelay: '0.2s'
        }}/>
        <span style={{
          height: '8px',
          width: '8px',
          backgroundColor: '#93918f',
          borderRadius: '50%',
          opacity: 0.4,
          animation: 'bm-valla-chat-typing 1s infinite',
          animationDelay: '0.4s'
        }}/>
      </div>
    </div>
  );

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      width: isMinimized ? (windowWidth <= 768 ? '60px' : '70px') : '400px',
      height: isMinimized ? (windowWidth <= 768 ? '60px' : '70px') : 'auto',
      maxHeight: isMinimized ? 'auto' : 'calc(100vh - 40px)',
      backgroundColor: isMinimized ? 'rgba(203, 55, 39, 0.95)' : 'rgba(203, 55, 39, 1)',
      borderRadius: isMinimized ? '50%' : '16px',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2), 0 0 15px rgba(255, 255, 255, 0.1)',
      border: 'none',
      fontFamily: theme.fonts.body,
      overflow: 'hidden',
      transformOrigin: 'bottom right',
      transition: 'all 0.3s ease',
      backdropFilter: 'blur(8px)',
      zIndex: 9999,
      maxWidth: isMinimized ? 'auto' : '90vw'
    }}>
      {/* Header */}
      <div 
        onClick={() => setIsMinimized(!isMinimized)}
        style={{
          padding: isMinimized ? '0' : '20px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: isMinimized ? 'center' : 'flex-start',
          cursor: 'pointer',
          gap: '12px',
          backgroundColor: 'rgba(203, 55, 39, 1)',
          width: '100%',
          height: isMinimized ? '100%' : 'auto',
          boxSizing: 'border-box',
          flexDirection: isMinimized ? 'row' : 'column',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
        }}
      >
        <div style={{ 
          height: isMinimized ? (windowWidth <= 768 ? '40px' : '50px') : '60px',
          width: isMinimized ? (windowWidth <= 768 ? '40px' : '50px') : '60px',
          borderRadius: '50%',
          overflow: 'hidden',
          boxShadow: isMinimized ? '0 1px 3px rgba(0, 0, 0, 0.1)' : '0 2px 4px rgba(0, 0, 0, 0.1)'
        }}>
          <img 
          src="/logo.png" 
          alt="BM Vallá" 
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover'
           }}
          />
        </div>
        {!isMinimized && (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '4px'
          }}>
            <span style={{ 
              color: 'white',
              fontSize: '16px',
              fontWeight: '500',
              textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)'
            }}>
              BM Vallá
            </span>
            <span style={{ 
              color: '#e0e0e0',
              fontSize: '14px',
              textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)'
            }}>
              Gervigreindarfulltrúi
            </span>
          </div>
        )}
        {!isMinimized && (
          <span style={{ 
            color: 'white',
            fontSize: '12px',
            position: 'absolute',
            right: '16px',
            top: '16px',
            textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)'
          }}>
            ▽
          </span>
        )}
      </div>

      {/* Chat area */}
      {!isMinimized && (
        <div style={{
          height: '400px',
          backgroundColor: 'white',
          overflowY: 'auto',
          padding: '16px'
        }}>
          {messages.map((msg, index) => (
            <div key={index} style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: msg.type === 'user' ? 'flex-end' : 'flex-start',
              marginBottom: msg.type === 'bot' ? '16px' : '12px',
            }}>
              <div style={{
                display: 'flex',
                justifyContent: msg.type === 'user' ? 'flex-end' : 'flex-start',
                alignItems: 'flex-start',
                width: '100%',
                gap: '8px'
              }}>
                {msg.type === 'bot' && (
                  <div style={{
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                    marginTop: '4px',
                    overflow: 'hidden',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                  }}>
                    <img 
                    src="/logo.png" 
                    alt="BM Vallá" 
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                    }}
                    />
                  </div>
                )}
                <div style={{
                  maxWidth: '70%',
                  padding: '12px 16px',
                  borderRadius: '16px',
                  backgroundColor: msg.type === 'user' ? theme.colors.primary : '#f0f0f0',
                  color: msg.type === 'user' ? 'white' : '#333333',
                  fontSize: '14px',
                  lineHeight: '1.5',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                  border: msg.type === 'user' ? 
                    '1px solid rgba(255, 255, 255, 0.1)' : 
                    '1px solid rgba(0, 0, 0, 0.05)'
                }}>
                  {msg.type === 'bot' ? (
                    <MessageFormatter message={msg.content} />
                  ) : (
                    msg.content
                  )}
                </div>
              </div>
              
              {/* Feedback buttons - only shown for bot messages that pass the filter */}
              {msg.type === 'bot' && shouldShowFeedback(msg) && (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginTop: '4px',
                  marginLeft: '38px',
                  gap: '12px'
                }}>
                  {messageFeedback[msg.id] ? (
                    <div style={{
                      fontSize: '12px',
                      color: theme.colors.primary,
                      fontStyle: 'italic',
                      opacity: 0.8,
                      padding: '4px 8px',
                      borderRadius: '12px',
                      backgroundColor: `rgba(203, 55, 39, 0.08)`
                    }}>
                      Takk fyrir endurgjöfina!
                    </div>
                  ) : (
                    <>
                      <button 
                        onClick={() => handleMessageFeedback(msg.id, true)}
                        style={{
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          color: theme.colors.primary,
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                          fontSize: '12px',
                          padding: '4px 8px',
                          borderRadius: '12px',
                          transition: 'all 0.2s ease',
                          opacity: 0.8
                        }}
                        onMouseOver={(e) => {
                          e.currentTarget.style.backgroundColor = `rgba(203, 55, 39, 0.1)`;
                          e.currentTarget.style.opacity = '1';
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent';
                          e.currentTarget.style.opacity = '0.8';
                        }}
                        aria-label='Hjálplegt'
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M7 22H4C3.46957 22 2.96086 21.7893 2.58579 21.4142C2.21071 21.0391 2 20.5304 2 20V13C2 12.4696 2.21071 11.9609 2.58579 11.5858C2.96086 11.2107 3.46957 11 4 11H7M14 9V5C14 4.20435 13.6839 3.44129 13.1213 2.87868C12.5587 2.31607 11.7956 2 11 2L7 11V22H18.28C18.7623 22.0055 19.2304 21.8364 19.5979 21.524C19.9654 21.2116 20.2077 20.7769 20.28 20.3L21.66 11.3C21.7035 11.0134 21.6842 10.7207 21.6033 10.4423C21.5225 10.1638 21.3821 9.90629 21.1919 9.68751C21.0016 9.46873 20.7661 9.29393 20.5016 9.17522C20.2371 9.0565 19.9499 8.99672 19.66 9H14Z" stroke="#CB3727" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span>Hjálplegt</span>
                      </button>
                      
                      <button 
                        onClick={() => handleMessageFeedback(msg.id, false)}
                        style={{
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          color: theme.colors.primary,
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                          fontSize: '12px',
                          padding: '4px 8px',
                          borderRadius: '12px',
                          transition: 'all 0.2s ease',
                          opacity: 0.8
                        }}
                        onMouseOver={(e) => {
                          e.currentTarget.style.backgroundColor = `rgba(203, 55, 39, 0.1)`;
                          e.currentTarget.style.opacity = '1';
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent';
                          e.currentTarget.style.opacity = '0.8';
                        }}
                        aria-label='Ekki hjálplegt'
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M17 2H20C20.5304 2 21.0391 2.21071 21.4142 2.58579C21.7893 2.96086 22 3.46957 22 4V11C22 11.5304 21.7893 12.0391 21.4142 12.4142C21.0391 12.7893 20.5304 13 20 13H17M10 15V19C10 19.7956 10.3161 20.5587 10.8787 21.1213C11.4413 21.6839 12.2044 22 13 22L17 13V2H5.72C5.23964 1.99453 4.77175 2.16359 4.40125 2.47599C4.03075 2.78839 3.78958 3.22309 3.72 3.7L2.34 12.7C2.29651 12.9866 2.31583 13.2793 2.39666 13.5577C2.4775 13.8362 2.61788 14.0937 2.80812 14.3125C2.99836 14.5313 3.23395 14.7061 3.49843 14.8248C3.76291 14.9435 4.05009 15.0033 4.34 15H10Z" stroke="#CB3727" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span>Ekki hjálplegt</span>
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          ))}

          {isTyping && <TypingIndicator />}
          <div ref={messagesEndRef} />
        </div>
      )}

      {/* Input area */}
      {!isMinimized && (
        <div style={{
          padding: '12px 16px',
          backgroundColor: 'white',
          borderTop: '1px solid #eee',
          display: 'flex',
          gap: '8px'
        }}>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && !isTyping && handleSend()}
            placeholder="Sláðu inn skilaboð..."
            style={{
              flex: 1,
              padding: '8px 16px',
              borderRadius: '20px',
              border: '1px solid #ddd',
              outline: 'none',
              fontSize: '14px',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
            }}
          />
          <button
            onClick={handleSend}
            disabled={isTyping}
            style={{
              backgroundColor: isTyping ? '#a0a0a0' : theme.colors.primary,
              color: 'white',
              border: 'none',
              padding: '8px 20px',
              borderRadius: '20px',
              cursor: isTyping ? 'default' : 'pointer',
              fontSize: '14px',
              fontWeight: '500',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              opacity: isTyping ? 0.7 : 1,
              transition: 'all 0.3s ease'
            }}
          >
            Senda
          </button>
        </div>
      )}

      {/* Add keyframes for typing animation */}
      <style jsx>{`
        @keyframes bm-valla-chat-typing {
          0% {
              opacity: 0.4;
          }
          50% {
              opacity: 1;
          }
          100% {
              opacity: 0.4;
          }
        }
        
        @media (max-width: 768px) {
          .bm-valla-chat-widget input, 
          .bm-valla-chat-widget button {
              font-size: 16px !important; /* Prevent zoom on mobile */
          }
        }
      `}</style>
    </div>
  );
};

export default ChatWidget;