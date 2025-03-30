import React, { useState, useEffect, useRef } from 'react';
import MessageFormatter from './MessageFormatter';

const ChatWidget = ({ webhookUrl = 'https://bmv-ai-service.vercel.app/chat', apiKey, isEmbedded = false }) => {
    const messagesEndRef = useRef(null);
    const [isMinimized, setIsMinimized] = useState(true);
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [sessionId, setSessionId] = useState('');

    // Generate a unique session ID
    useEffect(() => {
        const newSessionId = `session_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`;
        setSessionId(newSessionId);
    }, []);

    // Initial welcome message
    useEffect(() => {
        setMessages([{
            type: 'bot',
            content: "Hæ! Ég er spjallrofi BM Vallá. Hvernig get ég aðstoðað þig í dag?",
            id: 'welcome-msg-' + Date.now()
        }]);
    }, []);

    // Auto-scroll to the latest message
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

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
            
            // Add bot response to the chat
            setMessages(prev => [...prev, {
                type: 'bot',
                content: data.message,
                id: 'bot-msg-' + Date.now()
            }]);
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
        <div className="flex justify-start mb-4 items-start gap-2">
            <div className="w-8 h-8 rounded-full bg-bmv-primary flex items-center justify-center text-white">
                BV
            </div>
            <div className="p-3 rounded-lg bg-gray-100 flex gap-1 items-center">
                <span className="h-2 w-2 bg-gray-400 rounded-full opacity-40 animate-pulse"></span>
                <span className="h-2 w-2 bg-gray-400 rounded-full opacity-40 animate-pulse delay-150"></span>
                <span className="h-2 w-2 bg-gray-400 rounded-full opacity-40 animate-pulse delay-300"></span>
            </div>
        </div>
    );

    return (
        <div className={`fixed bottom-5 right-5 ${isMinimized ? 'w-16 h-16' : 'w-96 h-[500px]'} 
                        bg-white rounded-lg shadow-xl overflow-hidden transition-all duration-300 flex flex-col`}
             style={{maxHeight: isMinimized ? 'auto' : 'calc(100vh - 40px)'}}>
            
            {/* Header */}
            <div 
                onClick={() => setIsMinimized(!isMinimized)}
                className={`bg-bmv-primary text-white p-4 flex items-center cursor-pointer ${isMinimized ? 'justify-center h-full' : 'justify-between'}`}
            >
                {isMinimized ? (
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-bmv-primary font-bold">
                        BV
                    </div>
                ) : (
                    <>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-bmv-primary font-bold">
                                BV
                            </div>
                            <span className="font-medium">BM Vallá Aðstoð</span>
                        </div>
                        <div className="text-lg">
                            {isMinimized ? '□' : '−'}
                        </div>
                    </>
                )}
            </div>

            {/* Chat Area */}
            {!isMinimized && (
                <>
                    <div className="flex-1 p-4 overflow-y-auto">
                        {messages.map((msg, index) => (
                            <div key={index} className={`flex mb-4 ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                                {msg.type === 'bot' && (
                                    <div className="w-8 h-8 rounded-full bg-bmv-primary flex items-center justify-center text-white mr-2">
                                        BV
                                    </div>
                                )}
                                <div className={`max-w-[80%] p-3 rounded-lg ${
                                    msg.type === 'user' 
                                        ? 'bg-bmv-primary text-white' 
                                        : 'bg-gray-100 text-gray-800'
                                }`}>
                                    {msg.content}
                                </div>
                            </div>
                        ))}
                        {isTyping && <TypingIndicator />}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <div className="border-t p-3 flex gap-2">
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && !isTyping && handleSend()}
                            placeholder="Sláðu inn skilaboð..."
                            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-bmv-primary"
                        />
                        <button
                            onClick={handleSend}
                            disabled={isTyping}
                            className={`px-4 py-2 rounded-lg bg-bmv-primary text-white ${isTyping ? 'opacity-50' : 'hover:bg-opacity-90'}`}
                        >
                            Senda
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default ChatWidget;
