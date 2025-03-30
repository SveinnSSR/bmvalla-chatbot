import React from 'react';

const MessageFormatter = ({ message }) => {
    // Split the message by double line breaks to handle paragraphs
    const paragraphs = message.split('\n\n');
    
    return (
        <div className="message-formatter">
            {paragraphs.map((paragraph, index) => {
                // Check if the paragraph is a list item
                if (paragraph.trim().match(/^[•*-]/)) {
                    const listItems = paragraph.split('\n').map(item => item.trim().replace(/^[•*-]\s*/, ''));
                    return (
                        <ul key={index} className="list-disc ml-5 mb-2">
                            {listItems.map((item, i) => (
                                <li key={i}>{item}</li>
                            ))}
                        </ul>
                    );
                }
                
                // Regular paragraph
                return <p key={index} className="mb-2">{paragraph}</p>;
            })}
        </div>
    );
};

export default MessageFormatter;
