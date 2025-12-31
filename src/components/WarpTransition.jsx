import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const WarpTransition = () => {
    const [isWarping, setIsWarping] = useState(false);

    useEffect(() => {
        // Intercept all internal anchor clicks
        const handleAnchorClick = (e) => {
            const target = e.target.closest('a[href^="#"]');
            if (target) {
                e.preventDefault();
                const id = target.getAttribute('href');
                const element = document.querySelector(id);

                if (element) {
                    triggerWarp(element);
                }
            }
        };

        const triggerWarp = (element) => {
            setIsWarping(true);

            // Wait for warp-in animation, then scroll, then warp-out
            setTimeout(() => {
                element.scrollIntoView({ behavior: 'auto' }); // Instant jump during blur

                // Small delay to ensure scroll happened
                setTimeout(() => {
                    setIsWarping(false);
                }, 100);
            }, 400); // 400ms warp in duration matches animation
        };

        document.addEventListener('click', handleAnchorClick);
        return () => document.removeEventListener('click', handleAnchorClick);
    }, []);

    return (
        <AnimatePresence>
            {isWarping && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[99999] pointer-events-none flex items-center justify-center overflow-hidden"
                >
                    {/* Star streaks / Warp lines */}
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

                    <motion.div
                        initial={{ scale: 1, opacity: 0 }}
                        animate={{ scale: 30, opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5, ease: "easeIn" }}
                        className="w-[200vw] h-[200vh] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent absolute"
                        style={{ backgroundSize: '100% 100%', transformOrigin: 'center' }}
                    />

                    {/* Speed lines */}
                    {[...Array(20)].map((_, i) => (
                        <motion.div
                            key={i}
                            initial={{
                                x: 0,
                                y: 0,
                                opacity: 0,
                                scale: 0.5,
                                rotate: Math.random() * 360
                            }}
                            animate={{
                                opacity: [0, 1, 0],
                                scale: [0.5, 5],
                                x: (Math.random() - 0.5) * 2000,
                                y: (Math.random() - 0.5) * 2000,
                            }}
                            transition={{ duration: 0.4, delay: Math.random() * 0.1 }}
                            className="absolute w-1 h-40 bg-white/50 rounded-full"
                        />
                    ))}
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default WarpTransition;
