import React, { useState } from 'react';
import { Product } from '../types';
import { 
  X, 
  Bot, 
  Send, 
  Sparkles, 
  Box, 
  ShoppingCart, 
  ArrowRight, 
  User 
} from 'lucide-react';

interface AIAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onOpen3DView: (productId: string) => void;
  onAddToCart: (product: Product) => void;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  suggestedProductIds?: string[];
}

export const AIAssistantModal: React.FC<AIAssistantModalProps> = ({
  isOpen,
  onClose,
  products,
  onOpen3DView,
  onAddToCart
}) => {
  const [inputQuery, setInputQuery] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: 'Hello! I am TECHVERSE AI, your interactive hardware advisor. Ask me anything about laptop specs, smartphone cameras, GPU architectures, or request a recommendation!',
      suggestedProductIds: ['macbook-air-m4', 'galaxy-s25-ultra']
    }
  ]);

  if (!isOpen) return null;

  const quickPrompts = [
    'Best laptop for coding & battery life',
    'Flagship phone with 200MP camera',
    'Graphics card for 4K Ray Tracing',
    'How does the Exploded 3D view work?'
  ];

  const formatINR = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  const generateAIResponse = (userPrompt: string): { reply: string; pIds?: string[] } => {
    const q = userPrompt.toLowerCase();

    if (q.includes('exploded') || q.includes('3d') || q.includes('how does')) {
      return {
        reply: 'The Exploded 3D View disassembles the product along mathematically calculated component vectors (e.g. separates the screen, keyboard base, GPU heat-pipes, or phone optic modules) using Three.js mesh transforms. Click the "Explode View" toggle in our 3D Lab to try it!',
        pIds: ['macbook-air-m4', 'rtx-5090']
      };
    }

    if (q.includes('laptop') || q.includes('coding') || q.includes('macbook') || q.includes('dell')) {
      return {
        reply: 'For premium development and day-long battery life, I highly recommend the Apple MacBook Air 15" with M4 chip or the Dell XPS 16 with Intel Core Ultra 9. Both feature incredible displays and whisper-quiet operation.',
        pIds: ['macbook-air-m4', 'dell-xps-16']
      };
    }

    if (q.includes('phone') || q.includes('camera') || q.includes('samsung') || q.includes('smartphone') || q.includes('pixel')) {
      return {
        reply: 'For photography and display excellence, the Samsung Galaxy S25 Ultra (with 200MP Quad-Telephoto) and Google Pixel 9 Pro (with Gemini AI Tensor G4) are top tier picks in our catalog.',
        pIds: ['galaxy-s25-ultra', 'pixel-9-pro']
      };
    }

    if (q.includes('gpu') || q.includes('graphics') || q.includes('gaming') || q.includes('rtx') || q.includes('4k')) {
      return {
        reply: 'For ultra 4K ray tracing and high-FPS gaming, the NVIDIA GeForce RTX 5090 with 32GB GDDR7 and ROG Zephyrus G16 represent the pinnacle of current hardware performance.',
        pIds: ['rtx-5090', 'rog-zephyrus-g16']
      };
    }

    // Default general recommendation
    return {
      reply: `Based on current popularity and top benchmark ratings, here are two highly evaluated electronics from our catalog:`,
      pIds: [products[0]?.id || 'macbook-air-m4', products[1]?.id || 'galaxy-s25-ultra']
    };
  };

  const handleSend = (textToSend?: string) => {
    const query = textToSend || inputQuery;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: query
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');

    // Simulate AI response delay
    setTimeout(() => {
      const response = generateAIResponse(query);
      const assistantMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: response.reply,
        suggestedProductIds: response.pIds
      };
      setMessages((prev) => [...prev, assistantMsg]);
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div 
        id="ai-assistant-modal-container"
        className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-gradient-to-tr from-cyan-500 to-purple-500 text-slate-950 shadow-md">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white font-heading">
                  TECHVERSE AI Assistant
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  Hardware Advisor
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Natural language product search and 3D recommendation engine
              </p>
            </div>
          </div>

          <button
            id="btn-close-ai"
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat History */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex gap-3 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {m.sender === 'assistant' && (
                <div className="w-8 h-8 rounded-full bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div className={`max-w-[80%] space-y-2.5 ${
                m.sender === 'user'
                  ? 'bg-cyan-500 text-slate-950 font-medium rounded-2xl rounded-tr-sm p-3.5 text-xs shadow-md'
                  : 'bg-slate-950/80 border border-slate-800 text-slate-200 rounded-2xl rounded-tl-sm p-4 text-xs'
              }`}>
                <p className="leading-relaxed">{m.text}</p>

                {/* Product Suggestions in Assistant Reply */}
                {m.suggestedProductIds && m.suggestedProductIds.length > 0 && (
                  <div className="pt-2 border-t border-slate-800 space-y-2">
                    <span className="text-[10px] font-mono uppercase text-cyan-400 block font-semibold">
                      Recommended Hardware:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {m.suggestedProductIds.map((pid) => {
                        const prod = products.find((p) => p.id === pid);
                        if (!prod) return null;
                        return (
                          <div
                            key={prod.id}
                            className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex flex-col justify-between gap-2"
                          >
                            <div className="flex gap-2">
                              <img
                                src={prod.image}
                                alt={prod.name}
                                className="w-12 h-12 rounded-lg object-cover bg-slate-950 shrink-0"
                              />
                              <div className="min-w-0">
                                <div className="font-bold text-white text-[11px] truncate">
                                  {prod.name}
                                </div>
                                <div className="text-cyan-400 font-mono font-bold text-xs mt-0.5">
                                  {formatINR(prod.price)}
                                </div>
                              </div>
                            </div>

                            <div className="flex gap-1.5 pt-1">
                              <button
                                type="button"
                                onClick={() => {
                                  onClose();
                                  onOpen3DView(prod.id);
                                }}
                                className="flex-1 py-1 px-2 rounded-lg bg-purple-500/20 text-purple-300 border border-purple-500/30 text-[10px] font-bold flex items-center justify-center gap-1 hover:bg-purple-500/30"
                              >
                                <Box className="w-3 h-3" />
                                <span>3D View</span>
                              </button>
                              <button
                                type="button"
                                onClick={() => onAddToCart(prod)}
                                className="p-1 px-2 rounded-lg bg-cyan-500 text-slate-950 font-bold text-[10px] hover:bg-cyan-400 flex items-center justify-center"
                              >
                                <ShoppingCart className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {m.sender === 'user' && (
                <div className="w-8 h-8 rounded-full bg-slate-800 text-slate-300 flex items-center justify-center shrink-0">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Quick Prompt Chips */}
        <div className="px-6 py-2 border-t border-slate-800/80 bg-slate-950/40 flex items-center gap-2 overflow-x-auto">
          {quickPrompts.map((qp, i) => (
            <button
              key={i}
              type="button"
              onClick={() => handleSend(qp)}
              className="text-[11px] text-slate-400 hover:text-cyan-300 bg-slate-900 border border-slate-800 hover:border-cyan-500/40 rounded-full px-3 py-1 whitespace-nowrap transition-colors"
            >
              {qp}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/80">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder="Ask TECHVERSE AI about laptops, phones, 3D models..."
              className="flex-1 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs sm:text-sm text-white focus:outline-none focus:border-cyan-500"
            />
            <button
              type="submit"
              disabled={!inputQuery.trim()}
              className="p-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold disabled:opacity-40 hover:brightness-110 transition-all"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};
