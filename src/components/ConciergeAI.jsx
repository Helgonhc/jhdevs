import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, ChevronRight, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ConciergeAI = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [isTyping, setIsTyping] = useState(false);
    const [showOptions, setShowOptions] = useState(false);
    const hasOpenedRef = useRef(false);

    // Initial Auto-Open Logic
    useEffect(() => {
        const timer = setTimeout(() => {
            if (!hasOpenedRef.current) {
                setIsOpen(true);
                playTypingSequence();
                hasOpenedRef.current = true;
            }
        }, 4000); // Open after 4 seconds

        return () => clearTimeout(timer);
    }, []);

    const playTypingSequence = async () => {
        setIsTyping(true);
        await new Promise(r => setTimeout(r, 1500)); // Fake "thinking" time

        setMessages(prev => [...prev, {
            type: 'bot',
            text: "Olá! Notei que você está buscando excelência digital."
        }]);

        await new Promise(r => setTimeout(r, 1000));

        setMessages(prev => [...prev, {
            type: 'bot',
            text: "Sou o assistente virtual da JH DEV'S. Como possob elevar seu negócio hoje?"
        }]);

        setIsTyping(false);
        setShowOptions(true);
    };

    const handleOptionClick = async (option) => {
        setShowOptions(false);
        setMessages(prev => [...prev, { type: 'user', text: option.label }]);

        setIsTyping(true);
        await new Promise(r => setTimeout(r, 1000));
        setIsTyping(false);

        setMessages(prev => [...prev, { type: 'bot', text: option.response }]);

        if (option.action) {
            setTimeout(() => {
                const element = document.querySelector(option.action);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                    setIsOpen(false); // Close after navigating
                }
            }, 1000);
        }
    };

    const options = [
        {
            label: "Ver Portfólio Premium",
            response: "Excelente escolha. Prepare-se para ver o que há de mais moderno.",
            action: "#portfolio"
        },
        {
            label: "Solicitar Orçamento",
            response: "Direto ao ponto. Vou te levar para nossa área de contato VIP.",
            action: "#contact"
        },
        {
            label: "Só estou olhando",
            response: "Fique à vontade! Se precisar de algo, estarei por aqui.",
            action: null
        }
    ];

    return (
        <div className="fixed bottom-6 right-24 z-50 flex flex-col items-end pointer-events-none">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        className="bg-white/10 backdrop-blur-xl border border-white/20 p-4 rounded-2xl shadow-2xl w-80 mb-4 pointer-events-auto overflow-hidden"
                    >
                        {/* Header */}
                        <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-2">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                <span className="text-xs font-bold uppercase tracking-wider text-white">J.A.R.V.I.S. Lite</span>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="text-white/50 hover:text-white">
                                <X size={14} />
                            </button>
                        </div>

                        {/* Chat Area */}
                        <div className="space-y-3 max-h-60 overflow-y-auto mb-4 scrollbar-hide">
                            {messages.map((msg, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: msg.type === 'bot' ? -10 : 10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div className={`max-w-[85%] p-3 rounded-lg text-sm ${msg.type === 'user'
                                        ? 'bg-primary text-black font-medium rounded-tr-none'
                                        : 'bg-white/5 text-white/90 rounded-tl-none border border-white/10'
                                        }`}>
                                        {msg.text}
                                    </div>
                                </motion.div>
                            ))}
                            {isTyping && (
                                <div className="flex gap-1 pl-2">
                                    <span className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                    <span className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                    <span className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                </div>
                            )}
                        </div>

                        {/* Options */}
                        <AnimatePresence>
                            {showOptions && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="space-y-2"
                                >
                                    {options.map((opt, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => handleOptionClick(opt)}
                                            className="w-full text-left p-2 px-3 rounded-lg bg-white/5 hover:bg-primary/20 border border-white/10 hover:border-primary/50 text-xs text-white transition-all group flex items-center justify-between"
                                        >
                                            {opt.label}
                                            <ChevronRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity text-primary" />
                                        </button>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Toggle Button */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="w-14 h-14 bg-gradient-to-br from-primary to-green-600 rounded-full flex items-center justify-center shadow-lg shadow-primary/20 pointer-events-auto relative group"
            >
                {isOpen ? <X size={24} className="text-black" /> : <Sparkles size={24} className="text-black" />}

                {!isOpen && (
                    <span className="absolute -top-1 -right-1 flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                    </span>
                )}
            </motion.button>
        </div>
    );
};

export default ConciergeAI;
