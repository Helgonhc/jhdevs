import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Share2, Mail, ExternalLink, ArrowUp, Copy, Check } from 'lucide-react';

const CustomContextMenu = () => {
    const [visible, setVisible] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [copied, setCopied] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        const handleContextMenu = (e) => {
            e.preventDefault();
            setVisible(true);
            setPosition({ x: e.clientX, y: e.clientY });
            setCopied(false);
        };

        const handleClick = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setVisible(false);
            }
        };

        const handleScroll = () => {
            if (visible) setVisible(false);
        };

        document.addEventListener('contextmenu', handleContextMenu);
        document.addEventListener('click', handleClick);
        window.addEventListener('scroll', handleScroll);

        return () => {
            document.removeEventListener('contextmenu', handleContextMenu);
            document.removeEventListener('click', handleClick);
            window.removeEventListener('scroll', handleScroll);
        };
    }, [visible]);

    const handleCopy = () => {
        navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => {
            setVisible(false);
            setCopied(false);
        }, 800);
    };

    const handleToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setVisible(false);
    };

    const handleWhatsApp = () => {
        window.open('https://wa.me/5511999999999', '_blank'); // Replace with actual number if available, using placeholder logic for now
        setVisible(false);
    };

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    ref={menuRef}
                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 10 }}
                    transition={{ duration: 0.15 }}
                    style={{ top: position.y, left: position.x }}
                    className="fixed z-[9999] min-w-[220px] bg-dark-card/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl p-2 overflow-hidden"
                >
                    <div className="px-3 py-2 border-b border-white/5 mb-2">
                        <span className="text-xs font-bold text-white/40 uppercase tracking-widest">JH DEV'S</span>
                    </div>

                    <button
                        onClick={handleCopy}
                        className="w-full flex items-center gap-3 px-3 py-2 text-sm text-white/80 hover:bg-primary/20 hover:text-primary rounded-lg transition-colors text-left"
                    >
                        {copied ? <Check size={16} /> : <Copy size={16} />}
                        {copied ? 'Link Copiado!' : 'Copiar Link'}
                    </button>

                    <button
                        onClick={handleWhatsApp}
                        className="w-full flex items-center gap-3 px-3 py-2 text-sm text-white/80 hover:bg-primary/20 hover:text-primary rounded-lg transition-colors text-left"
                    >
                        <Share2 size={16} />
                        Falar no WhatsApp
                    </button>

                    <div className="my-2 border-t border-white/5"></div>

                    <button
                        onClick={handleToTop}
                        className="w-full flex items-center gap-3 px-3 py-2 text-sm text-white/80 hover:bg-primary/20 hover:text-primary rounded-lg transition-colors text-left"
                    >
                        <ArrowUp size={16} />
                        Voltar ao Topo
                    </button>

                    <div className="mt-2 text-[10px] text-center text-white/20 pt-2 border-t border-white/5">
                        © 2025 JH DEV'S
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default CustomContextMenu;
