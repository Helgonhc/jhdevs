import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';

const ThemeToggle = () => {
    const [isLight, setIsLight] = useState(false);

    useEffect(() => {
        if (isLight) {
            document.documentElement.classList.add('light');
        } else {
            document.documentElement.classList.remove('light');
        }
    }, [isLight]);

    return (
        <button
            onClick={() => setIsLight(!isLight)}
            className="w-10 h-10 bg-white/5 border border-white/10 rounded-full flex items-center justify-center hover:bg-primary hover:text-dark transition-all group overflow-hidden relative"
            title={isLight ? 'Mudar para Dark Mode' : 'Mudar para Light Mode'}
        >
            <motion.div
                initial={false}
                animate={{ y: isLight ? -40 : 0 }}
                className="absolute inset-0 flex flex-col items-center justify-center gap-6"
            >
                <Moon size={20} />
                <Sun size={20} />
            </motion.div>
        </button>
    );
};

export default ThemeToggle;
