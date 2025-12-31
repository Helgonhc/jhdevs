import React, { useState, useEffect } from 'react';
import { Mic, MicOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const VoiceControl = () => {
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [supported, setSupported] = useState(true);
    const [recognition, setRecognition] = useState(null);

    useEffect(() => {
        if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
            setSupported(false);
            return;
        }

        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recog = new SpeechRecognition();

        recog.continuous = false;
        recog.interimResults = false;
        recog.lang = 'pt-BR';

        recog.onstart = () => setIsListening(true);
        recog.onend = () => {
            setIsListening(false);
            // Optional: Auto-restart logic could go here if continuous listening was desired
        };

        recog.onresult = (event) => {
            const last = event.results.length - 1;
            const text = event.results[last][0].transcript.toLowerCase();
            setTranscript(text);
            handleCommand(text);
        };

        setRecognition(recog);
    }, []);

    const toggleListening = () => {
        if (!recognition) return;
        if (isListening) {
            recognition.stop();
        } else {
            recognition.start();
        }
    };

    const handleCommand = (text) => {
        console.log("Comando de voz:", text);

        const commands = {
            'início': '#home',
            'home': '#home',
            'topo': '#home',
            'portfólio': '#portfolio',
            'projetos': '#portfolio',
            'modelos': '#portfolio',
            'preços': '#pricing',
            'planos': '#pricing',
            'contato': '#contact',
            'fale conosco': '#contact',
            'processo': '#process',
            'como funciona': '#process'
        };

        // Scroll Actions
        if (text.includes('baixo') || text.includes('descer')) {
            window.scrollBy({ top: 500, behavior: 'smooth' });
            return;
        }
        if (text.includes('cima') || text.includes('subir')) {
            window.scrollBy({ top: -500, behavior: 'smooth' });
            return;
        }

        // Section Navigation
        for (const [key, selector] of Object.entries(commands)) {
            if (text.includes(key)) {
                const element = document.querySelector(selector);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                    speak(`Indo para ${key}`);
                }
                return;
            }
        }
    };

    const speak = (text) => {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'pt-BR';
            window.speechSynthesis.speak(utterance);
        }
    };

    if (!supported) return null;

    return (
        <div className="fixed bottom-24 left-6 z-50">
            <AnimatePresence>
                {transcript && isListening && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, x: 20 }}
                        animate={{ opacity: 1, y: 0, x: 0 }}
                        exit={{ opacity: 0 }}
                        className="absolute bottom-full mb-4 left-0 bg-dark/90 backdrop-blur-md border border-white/20 p-2 px-4 rounded-lg text-xs font-mono text-primary whitespace-nowrap shadow-xl"
                    >
                        "{transcript}"
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleListening}
                className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg border transition-all ${isListening
                        ? 'bg-red-500 border-red-400 text-white shadow-red-500/30 animate-pulse'
                        : 'bg-dark-surface border-white/10 text-white/50 hover:text-white hover:border-primary/50'
                    }`}
            >
                {isListening ? <Mic size={20} /> : <MicOff size={20} />}
            </motion.button>

            {/* Tooltip hint */}
            <div className="absolute top-1/2 -translate-y-1/2 left-full ml-3 bg-white/10 px-2 py-1 rounded text-[10px] text-white/60 whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">
                Comando de Voz
            </div>
        </div>
    );
};

export default VoiceControl;
