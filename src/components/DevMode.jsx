import React, { useState, useEffect } from 'react';
import { Terminal, Lock, Unlock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const DevMode = () => {
    const [enabled, setEnabled] = useState(false);
    const [inputBuffer, setInputBuffer] = useState('');
    const [showConsole, setShowConsole] = useState(false);
    const cheatCode = 'dev'; // Simple keyword for now

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (showConsole) {
                if (e.key === 'Escape') {
                    setShowConsole(false);
                    setEnabled(false);
                    document.documentElement.classList.remove('matrix-theme');
                }
                return;
            }

            // Append key to buffer
            const newBuffer = (inputBuffer + e.key).slice(-10); // keep last 10 chars
            setInputBuffer(newBuffer);

            if (newBuffer.includes(cheatCode)) {
                activateDevMode();
                setInputBuffer('');
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [inputBuffer, showConsole]);

    const activateDevMode = () => {
        playAccessSound();
        setEnabled(true);
        setShowConsole(true);
        document.documentElement.classList.add('matrix-theme');
    };

    const playAccessSound = () => {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return;

        const ctx = new AudioContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.connect(gain);
        gain.connect(ctx.destination);

        // Sequence: Low -> High (Power up effect)
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(220, ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(880, ctx.currentTime + 0.3); // Ramp up

        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.3);

        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.3);

        // Success Chime
        setTimeout(() => {
            const osc2 = ctx.createOscillator();
            const gain2 = ctx.createGain();
            osc2.connect(gain2);
            gain2.connect(ctx.destination);

            osc2.type = 'sine';
            osc2.frequency.setValueAtTime(880, ctx.currentTime);
            osc2.frequency.exponentialRampToValueAtTime(1760, ctx.currentTime + 0.1);

            gain2.gain.setValueAtTime(0.1, ctx.currentTime);
            gain2.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);

            osc2.start(ctx.currentTime);
            osc2.stop(ctx.currentTime + 0.5);
        }, 300);
    };

    return (
        <AnimatePresence>
            {showConsole && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="fixed inset-0 z-[100000] bg-black/95 font-mono text-green-500 p-8 overflow-hidden pointer-events-auto flex flex-col items-center justify-center font-bold"
                >
                    <div className="max-w-2xl w-full border border-green-500/30 bg-black p-6 rounded shadow-[0_0_50px_rgba(0,255,0,0.2)]">
                        <div className="flex justify-between items-center mb-6 border-b border-green-500/20 pb-4">
                            <div className="flex items-center gap-2">
                                <Terminal size={20} />
                                <span>JH_DEV_CONSOLE_V4.0</span>
                            </div>
                            <span className="animate-pulse text-red-500 flex items-center gap-2">
                                <Unlock size={16} /> ACESSO ADMINISTRATIVO CONCEDIDO
                            </span>
                        </div>

                        <div className="space-y-2 mb-8 text-sm">
                            <p className="typing-effect">Inicializando núcleo do sistema...</p>
                            <p className="typing-effect delay-1">Burlando protocolos de segurança...</p>
                            <p className="typing-effect delay-2">Acessando banco de dados principal...</p>
                            <p className="typing-effect delay-3 text-white">SUCESSO. Bem-vindo de volta, Criador.</p>
                        </div>

                        <div className="bg-green-900/10 p-4 border border-green-500/20 rounded mb-6">
                            <h3 className="text-xl font-bold mb-2">🎁 SEGREDO DESBLOQUEADO</h3>
                            <p className="mb-4">Use o código abaixo para ter <span className="text-white bg-green-900 px-1">15% DE DESCONTO</span> em qualquer projeto.</p>
                            <div className="text-center text-3xl tracking-[1em] text-white border-2 border-dashed border-green-500 py-4 select-all">
                                MATRIX15
                            </div>
                        </div>

                        <div className="text-center text-xs text-green-500/50 mt-8">
                            Pressione [ESC] para desconectar
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default DevMode;
