// src/components/MessageFormatter.jsx
import React from 'react';
import { theme } from '../styles/theme';

const MessageFormatter = ({ message }) => {
  if (!message) return null;

  // Function to detect URLs and convert them to links
  const formatLinks = (text) => {
    // URL regex pattern
    const urlPattern = /(https?:\/\/[^\s]+)/g;
    
    // Split by URLs
    const parts = text.split(urlPattern);
    
    // Find all URLs
    const urls = text.match(urlPattern) || [];
    
    // Build the result with links
    const result = [];
    parts.forEach((part, i) => {
      // Add text part
      result.push(<span key={`text-${i}`}>{part}</span>);
      
      // Add URL if there is one
      if (urls[i]) {
        result.push(
          <a 
            key={`link-${i}`} 
            href={urls[i]} 
            target="_blank" 
            rel="noopener noreferrer"
            style={{
              color: theme.colors.primary,
              textDecoration: 'underline',
              wordBreak: 'break-all'
            }}
          >
            {urls[i]}
          </a>
        );
      }
    });
    
    return result;
  };

  // Function to convert markdown-style headers
  const formatHeaders = (text) => {
    // Replace ## headers
    text = text.replace(/## (.*?)($|\n)/g, '<h2>$1</h2>');
    
    // Replace # headers
    text = text.replace(/# (.*?)($|\n)/g, '<h1>$1</h1>');
    
    return text;
  };

  // Function to convert markdown-style lists
  const formatLists = (text) => {
    // Split into lines
    const lines = text.split('\n');
    
    let inList = false;
    let listType = '';
    let formattedLines = [];
    
    lines.forEach((line, index) => {
      // Check if line is an unordered list item
      if (line.trim().match(/^[\*\-] (.*)/)) {
        const content = line.trim().replace(/^[\*\-] (.*)/, '$1');
        
        if (!inList || listType !== 'ul') {
          // Start a new list
          if (inList) {
            formattedLines.push('</ul>');
          }
          formattedLines.push('<ul>');
          inList = true;
          listType = 'ul';
        }
        
        formattedLines.push(`<li>${content}</li>`);
      } 
      // Check if line is an ordered list item
      else if (line.trim().match(/^\d+\. (.*)/)) {
        const content = line.trim().replace(/^\d+\. (.*)/, '$1');
        
        if (!inList || listType !== 'ol') {
          // Start a new list
          if (inList) {
            formattedLines.push(`</${listType}>`);
          }
          formattedLines.push('<ol>');
          inList = true;
          listType = 'ol';
        }
        
        formattedLines.push(`<li>${content}</li>`);
      } 
      // Regular text line
      else {
        if (inList) {
          // Close the list
          formattedLines.push(`</${listType}>`);
          inList = false;
        }
        
        formattedLines.push(line);
      }
    });
    
    // Close any open list
    if (inList) {
      formattedLines.push(`</${listType}>`);
    }
    
    return formattedLines.join('\n');
  };

  // Function to convert markdown-style bold and italic
  const formatEmphasis = (text) => {
    // Bold: **text** or __text__
    text = text.replace(/(\*\*|__)(.*?)\1/g, '<strong>$2</strong>');
    
    // Italic: *text* or _text_
    text = text.replace(/(\*|_)(.*?)\1/g, '<em>$2</em>');
    
    return text;
  };

  // Function to convert line breaks to <br> and handle paragraphs
  const formatLineBreaks = (text) => {
    // Replace double line breaks with paragraph tags
    text = text.replace(/\n\s*\n/g, '</p><p>');
    
    // Replace single line breaks with <br>
    text = text.replace(/\n/g, '<br />');
    
    // Wrap in paragraph tags if not already
    if (!text.startsWith('<p>')) {
      text = `<p>${text}</p>`;
    }
    
    return text;
  };

  // Format message: handle markdown-style formatting
  let formattedMessage = message;
  formattedMessage = formatHeaders(formattedMessage);
  formattedMessage = formatLists(formattedMessage);
  formattedMessage = formatEmphasis(formattedMessage);
  formattedMessage = formatLineBreaks(formattedMessage);

  // Special handling for calculation results
  if (formattedMessage.includes('útreikningi') || formattedMessage.includes('niðurstöð')) {
    formattedMessage = formattedMessage.replace(
      /(\d+(?:[,.]\d+)?)/g, 
      '<span style="color: #CB3727; font-weight: 500;">$1</span>'
    );
  }

  return (
    <div 
      className="message-content"
      dangerouslySetInnerHTML={{ __html: formattedMessage }}
      style={{
        lineHeight: '1.5',
        '& a': {
          color: theme.colors.primary,
          textDecoration: 'underline'
        },
        '& h1': {
          fontSize: '1.2em',
          fontWeight: 'bold',
          margin: '0.5em 0'
        },
        '& h2': {
          fontSize: '1.1em',
          fontWeight: 'bold',
          margin: '0.5em 0'
        },
        '& p': {
          margin: '0 0 0.5em 0'
        },
        '& ul, & ol': {
          marginLeft: '1.5em',
          marginBottom: '0.5em'
        },
        '& li': {
          margin: '0.25em 0'
        }
      }}
    />
  );
};

export default MessageFormatter;