import { useState } from "react";

function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    const res = await fetch("https://api-inference.huggingface.co/models/microsoft/DialoGPT-small", {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + import.meta.env.VITE_HF_TOKEN,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ inputs: input })
    });

    const data = await res.json();
    const reply = Array.isArray(data) ? data[0].generated_text : "Sorry, no reply.";

    setMessages([...messages, { role: "user", text: input }, { role: "ai", text: reply }]);
    setInput("");
  };

  return (
    <div>
      <h1>Your Street Fit AI Coach</h1>
      <div className="chat-window">
        {messages.map((m, i) => (
          <p key={i} className={m.role}>{m.text}</p>
        ))}
      </div>
      <input value={input} onChange={e => setInput(e.target.value)} />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default ChatPage;