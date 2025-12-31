
import React, { useState, useEffect, useRef } from 'react';
import { MOCK_FAQ } from '../constants';
import { MessageSquare, X, Send, Bot, User } from 'lucide-react';

const KelulutBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ type: 'bot' | 'user', text: string }[]>([
    { type: 'bot', text: 'Bzzz! Hello, I am the KelulutBot. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg = input.trim();
    setMessages(prev => [...prev, { type: 'user', text: userMsg }]);
    setInput('');

    // Keyword matching logic
    setTimeout(() => {
      const lowerInput = userMsg.toLowerCase();
      const foundFaq = MOCK_FAQ.find(faq => 
        faq.keywords.some(kw => lowerInput.includes(kw))
      );

      if (foundFaq) {
        setMessages(prev => [...prev, { type: 'bot', text: foundFaq.answer }]);
      } else {
        setMessages(prev => [...prev, { type: 'bot', text: "I'm sorry, I couldn't find a specific answer for that. Try asking about 'Kelulut', 'honey taste', or 'Bukit Kor'!" }]);
      }
    }, 600);
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-8 right-8 w-16 h-16 bg-yellow-400 text-black rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-all z-40 ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}
      >
        <MessageSquare size={28} />
      </button>

      <div className={`fixed bottom-8 right-8 w-96 h-[500px] bg-black border border-yellow-500/20 rounded-3xl flex flex-col shadow-2xl z-50 transition-all duration-300 transform ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'}`}>
        {/* Header */}
        <div className="p-4 border-b border-white/10 flex items-center justify-between bg-yellow-400/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-yellow-400 rounded-xl flex items-center justify-center text-black">
              <Bot size={24} />
            </div>
            <div>
              <h4 className="text-sm font-bold">KelulutBot</h4>
              <p className="text-[10px] text-yellow-400 uppercase font-bold tracking-widest">Active Assistant</p>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] p-4 rounded-2xl text-sm ${
                msg.type === 'user' 
                ? 'bg-yellow-400 text-black rounded-br-none font-medium' 
                : 'bg-white/5 text-gray-300 rounded-bl-none border border-white/5'
              }`}>
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="p-4 border-t border-white/10">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Ask me something..." 
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-4 pr-12 py-3 text-sm focus:outline-none focus:border-yellow-400/50"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <button 
              onClick={handleSend}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-yellow-400 text-black rounded-lg flex items-center justify-center hover:bg-yellow-300 transition-colors"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default KelulutBot;
