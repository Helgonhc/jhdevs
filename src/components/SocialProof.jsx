import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, User, CheckCircle } from 'lucide-react';

const SocialProof = () => {
    const proofs = [
        { name: 'Ricardo S.', city: 'Belo Horizonte', action: 'solicitou um orçamento' },
        { name: 'Dra. Amanda', city: 'São Paulo', action: 'iniciou um projeto de Site Médico' },
        { name: 'Lucas Tech', city: 'Curitiba', action: 'otimizou o Google Ads' },
        { name: 'Marina G.', city: 'Rio de Janeiro', action: 'acabou de fechar uma Landing Page' },
    ];

    const [current, setCurrent] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setIsVisible(false);
            setTimeout(() => {
                setCurrent((prev) => (prev + 1) % proofs.length);
                setIsVisible(true);
            }, 5000); // Interval between notifications
        }, 12000); // Life time of each notification cycle

        // First appearance
        setTimeout(() => setIsVisible(true), 3000);

        return () => clearInterval(interval);
    }, []);

    const proof = proofs[current];

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, x: -50, scale: 0.8 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -50, scale: 0.8 }}
                    className="fixed bottom-8 left-8 z-[100] hidden sm:flex items-center gap-4 p-4 bg-dark-card/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl max-w-[300px]"
                >
                    <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-dark shrink-0">
                        <User size={20} />
                    </div>
                    <div>
                        <div className="text-xs font-bold text-white/40 uppercase tracking-tighter mb-1">Recent Activity</div>
                        <div className="text-[13px] leading-tight">
                            <span className="font-bold text-primary">{proof.name}</span> em <span className="font-medium text-white/80">{proof.city}</span> {proof.action}.
                        </div>
                    </div>
                    <button
                        onClick={() => setIsVisible(false)}
                        className="absolute -top-2 -right-2 w-5 h-5 bg-white/10 rounded-full flex items-center justify-center text-[10px] hover:bg-white/20"
                    >
                        ✕
                    </button>

                    {/* Activity pulse */}
                    <div className="absolute top-4 left-4 w-2 h-2 bg-primary rounded-full animate-ping"></div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default SocialProof;
