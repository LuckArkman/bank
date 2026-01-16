
import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, X, MessageSquare, Loader2, Maximize2, Minimize2 } from 'lucide-react';
import { getArchitectAdviceStream } from '../services/geminiService';
import { ChatMessage } from '../types';

const AIChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setLoading(true);

    let currentResponse = '';
    setMessages(prev => [...prev, { role: 'model', text: '' }]);

    const stream = getArchitectAdviceStream(userMsg);
    
    for await (const chunk of stream) {
      currentResponse += chunk;
      setMessages(prev => {
        const newMessages = [...prev];
        newMessages[newMessages.length - 1].text = currentResponse;
        return newMessages;
      });
    }

    setLoading(false);
  };

  return (
    <>
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 p-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full shadow-2xl transition-all hover:scale-110 flex items-center justify-center z-50 group"
        >
          <div className="absolute -top-12 right-0 bg-slate-800 text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-slate-700">
            Arquiteto D-AI
          </div>
          <MessageSquare className="w-6 h-6" />
        </button>
      )}

      {isOpen && (
        <div className={`fixed bottom-6 right-6 ${isExpanded ? 'w-[600px] h-[800px]' : 'w-96 h-[500px]'} max-w-[calc(100vw-3rem)] max-h-[calc(100vh-6rem)] bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden transition-all duration-300`}>
          <div className="p-4 bg-slate-800 border-b border-slate-700 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Bot className="text-indigo-400 w-5 h-5" />
              <div className="flex flex-col">
                <span className="font-bold text-slate-200 text-xs tracking-wide uppercase">D-AI ARCHITECT</span>
                <span className="text-[10px] text-emerald-500 font-medium">Core Banking Expert</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setIsExpanded(!isExpanded)} 
                className="text-slate-400 hover:text-white p-1"
              >
                {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
              <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white p-1">
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]">
            {messages.length === 0 && (
              <div className="text-center mt-10 p-6 bg-slate-800/50 rounded-xl border border-slate-700 mx-4">
                <Bot className="w-12 h-12 text-indigo-400 mx-auto mb-3" />
                <h4 className="text-slate-200 font-bold mb-2">Suporte Técnico D-AI</h4>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Pergunte-me sobre os padrões de engenharia adotados no D-AI bank.
                </p>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  {['Ledger Imutável', 'Saga Pattern', 'MongoDB OCC', 'LGPD'].map(tag => (
                    <button 
                      key={tag}
                      onClick={() => setInput(tag)}
                      className="text-[10px] bg-slate-700 hover:bg-slate-600 text-slate-300 px-2 py-1 rounded transition-colors"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-2xl text-sm shadow-lg ${
                  m.role === 'user' ? 'bg-indigo-600 text-white rounded-tr-none' : 'bg-slate-800 text-slate-200 border border-slate-700 rounded-tl-none'
                }`}>
                   <p className="whitespace-pre-wrap leading-relaxed">{m.text}</p>
                   {!m.text && m.role === 'model' && <Loader2 className="w-4 h-4 animate-spin text-indigo-400" />}
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 bg-slate-800 border-t border-slate-700 flex gap-2">
            <input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Digite sua dúvida sobre o D-AI bank..."
              className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-indigo-500 text-slate-200"
            />
            <button 
              onClick={handleSend}
              disabled={loading || !input.trim()}
              className="p-2.5 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-white disabled:opacity-50 transition-all flex items-center justify-center"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AIChatbot;
