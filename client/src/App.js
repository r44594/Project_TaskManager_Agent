import React, { useState } from 'react';

function App() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'היי! אני סוכן ה-Todo שלך. איך אפשר לעזור היום?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:8000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });
      const data = await response.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'אופס, נראה שיש בעיה בחיבור לשרת.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 font-sans text-right" dir="rtl">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col h-[80vh]">
        
        {/* Header */}
        <div className="bg-indigo-600 p-6 text-white text-center">
          <h1 className="text-2xl font-light tracking-wide">Todo Agent 🤖</h1>
          <p className="text-indigo-100 text-sm opacity-80">העוזר האישי החכם שלך</p>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-start' : 'justify-end'}`}>
              <div className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed ${
                msg.role === 'user' 
                ? 'bg-indigo-50 text-indigo-900 rounded-br-none' 
                : 'bg-gray-100 text-gray-800 rounded-bl-none'
              }`}>
                {msg.content}
              </div>
            </div>
          ))}
          {isLoading && <div className="text-gray-400 text-xs animate-pulse italic">הסוכן חושב...</div>}
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-gray-100 bg-gray-50 flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="כתבי כאן משימה..."
            className="flex-1 p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          />
          <button
            onClick={sendMessage}
            className="bg-indigo-600 text-white px-6 py-2 rounded-xl hover:bg-indigo-700 transition-colors font-medium shadow-md"
          >
            שלחי
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;