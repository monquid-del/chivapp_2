import React, { useState } from 'react';
import { X, Send, ShieldCheck, Car } from 'lucide-react';
import { Driver } from '../../types';

interface ChatModalProps {
  driver: Driver;
  onClose: () => void;
}

interface Message {
  id: string;
  sender: 'user' | 'driver';
  text: string;
  time: string;
}

export const ChatModal: React.FC<ChatModalProps> = ({ driver, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm1',
      sender: 'driver',
      text: 'Olá! I am on my way with the white Toyota Corolla (XX-12-AB).',
      time: '5:32 PM',
    },
    {
      id: 'm2',
      sender: 'driver',
      text: 'Traffic is light near Alfama, see you at the pickup point in 3 mins!',
      time: '5:33 PM',
    },
  ]);
  const [inputText, setInputText] = useState('');

  const quickReplies = [
    'I am at the pickup point!',
    'Running 2 mins late',
    'Wearing a yellow jacket',
    'Standing next to the fountain',
  ];

  const handleSend = (textToSend?: string) => {
    const text = textToSend ?? inputText;
    if (!text.trim()) return;

    const newMsg: Message = {
      id: `m-${Date.now()}`,
      sender: 'user',
      text: text.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, newMsg]);
    if (!textToSend) setInputText('');

    // Driver reply after 1s
    setTimeout(() => {
      const driverReplies = [
        'Perfeito! See you shortly!',
        'Got it, hazards are on.',
        'Great, just pulling up now!',
      ];
      const randomReply = driverReplies[Math.floor(Math.random() * driverReplies.length)];
      setMessages((prev) => [
        ...prev,
        {
          id: `driver-${Date.now()}`,
          sender: 'driver',
          text: randomReply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }, 1200);
  };

  return (
    <div className="absolute inset-0 z-50 bg-[#FAF9F5] text-slate-800 flex flex-col animate-fade-in">
      {/* Top Bar */}
      <div className="px-4 py-3 bg-white border-b border-slate-200/80 flex items-center justify-between shadow-2xs">
        <div className="flex items-center gap-2.5">
          <img
            src={driver.avatar}
            alt={driver.name}
            referrerPolicy="no-referrer"
            className="w-9 h-9 rounded-full object-cover border border-[#154331]"
          />
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-slate-900">{driver.name}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            </div>
            <p className="text-[10px] text-slate-500 font-mono">Toyota Corolla • {driver.licensePlate}</p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Trust Notice */}
      <div className="px-4 py-1.5 bg-emerald-50 border-b border-emerald-100 flex items-center justify-center gap-1.5 text-[10px] text-emerald-800 font-medium">
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
        <span>Verified CHIVA carpool conversation</span>
      </div>

      {/* Messages Feed */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`max-w-[78%] px-3.5 py-2 rounded-2xl text-xs leading-relaxed shadow-2xs ${
                m.sender === 'user'
                  ? 'bg-[#154331] text-white rounded-br-xs'
                  : 'bg-white text-slate-800 border border-slate-200/80 rounded-bl-xs'
              }`}
            >
              {m.text}
            </div>
            <span className="text-[9px] text-slate-400 mt-1 px-1 font-mono">{m.time}</span>
          </div>
        ))}
      </div>

      {/* Quick Reply Chips */}
      <div className="px-3 py-1.5 bg-white/70 border-t border-slate-100 flex gap-1.5 overflow-x-auto no-scrollbar">
        {quickReplies.map((qr) => (
          <button
            key={qr}
            onClick={() => handleSend(qr)}
            className="text-[10px] font-medium bg-white hover:bg-slate-100 border border-slate-200/90 text-slate-700 py-1 px-2.5 rounded-full whitespace-nowrap active:scale-95 transition"
          >
            {qr}
          </button>
        ))}
      </div>

      {/* Input Form */}
      <div className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSend();
          }}
          placeholder="Message driver..."
          className="flex-1 py-2 px-3.5 rounded-full bg-slate-100 border border-transparent focus:border-[#154331] focus:bg-white text-xs text-slate-800 outline-none transition"
        />
        <button
          onClick={() => handleSend()}
          disabled={!inputText.trim()}
          className="w-9 h-9 rounded-full bg-[#154331] disabled:opacity-40 text-white flex items-center justify-center transition active:scale-95 cursor-pointer shrink-0"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
