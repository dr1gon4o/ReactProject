import React, { useState } from 'react';

export default function AichatWidget() {
  const [messages, setMessages] = useState([
    { role: 'model', content: 'Hello! I am your AI Coach. How can I help you today?' },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setError(null);

    const endpoint = `http://localhost:3030/ai`; 

    const requestBody = {
      message: input, 
    };

    try {
      const response = await fetch(endpoint, { 
        method: "POST", 
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`API call failed with status: ${response.status}`);
      }

      const data = await response.json();
      
      const aiText = data.replyText || "Sorry, I couldn't get a response.";
      
      const aiMessage = { role: 'model', content: aiText };
      setMessages((prev) => [...prev, aiMessage]);

    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '100%', margin: 'auto' }}>
      <div style={{ height: '300px', overflowY: 'auto', marginBottom: '10px' }}>
        {messages.map((msg, index) => (
          <div key={index} style={{ marginBottom: '5px', color: msg.role === 'user' ? 'blue' : 'green' }}>
            <strong>{msg.role === 'user' ? 'You' : 'AI'}:</strong> {msg.content}
          </div>
        ))}
        {isLoading && <div style={{ color: 'gray' }}>AI is typing...</div>}
        {error && <div style={{ color: 'red' }}>Error: {error}</div>}
      </div>
      <form onSubmit={sendMessage} style={{ display: 'flex' }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          disabled={isLoading}
          style={{ flexGrow: 1, padding: '10px' }}
        />
        <button type="submit" disabled={isLoading} style={{ padding: '10px', marginLeft: '10px' }}>Send</button>
      </form>
    </div>
  );
}
