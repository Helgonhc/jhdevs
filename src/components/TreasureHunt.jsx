import React, { createContext, useState, useContext, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Coins, Gift, X } from 'lucide-react';
import canvasConfetti from 'canvas-confetti';

const TreasureHuntContext = createContext();

export const useTreasureHunt = () => useContext(TreasureHuntContext);

export const TreasureHuntProvider = ({ children }) => {
    const [coinsFound, setCoinsFound] = useState(0);
    const [showReward, setShowReward] = useState(false);
    const TOTAL_COINS = 3;

    const findCoin = () => {
        if (coinsFound < TOTAL_COINS) {
            const newCount = coinsFound + 1;
            setCoinsFound(newCount);

            // Play coin sound
            // const audio = new Audio('/coin.mp3'); 
            // audio.play().catch(e => {});

            if (newCount === TOTAL_COINS) {
                setTimeout(() => {
                    handleWin();
                }, 500);
            }
        }
    };

    const handleWin = () => {
        setShowReward(true);
        canvasConfetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#A6CE39', '#FFFFFF', '#FFD700']
        });
    };

    return (
        <TreasureHuntContext.Provider value={{ coinsFound, findCoin, TOTAL_COINS }}>
            {children}

            {/* Progress Toast */}
            <AnimatePresence>
                {coinsFound > 0 && coinsFound < TOTAL_COINS && (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-dark/90 backdrop-blur-md border border-yellow-500/30 text-yellow-400 px-6 py-3 rounded-full shadow-2xl z-50 flex items-center gap-3"
                    >
                        <Coins size={20} className="animate-bounce" />
                        <span className="font-bold text-sm">
                            Moeda Encontrada! ({coinsFound}/{TOTAL_COINS})
                        </span>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Reward Modal */}
            <AnimatePresence>
                {showReward && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="bg-white rounded-2xl p-8 max-w-sm w-full relative text-center"
                        >
                            <button
                                onClick={() => setShowReward(false)}
                                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
                            >
                                <X size={20} />
                            </button>

                            <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Gift size={40} className="text-yellow-600" />
                            </div>

                            <h2 className="text-2xl font-black text-slate-900 mb-2">PARABÉNS, EXPLORADOR! 🏆</h2>
                            <p className="text-slate-600 mb-6">
                                Você encontrou todas as moedas escondidas. Aqui está sua recompensa exclusiva:
                            </p>

                            <div className="bg-slate-100 border-2 border-dashed border-slate-300 p-4 rounded-xl mb-6">
                                <span className="block text-xs uppercase font-bold text-slate-400 mb-1">Cupom de Desconto</span>
                                <span className="text-2xl font-black text-primary tracking-widest">HUNTER20</span>
                            </div>

                            <button
                                onClick={() => window.location.href = '#contact'}
                                className="w-full btn-primary"
                            >
                                Reivindicar Agora
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </TreasureHuntContext.Provider>
    );
};
