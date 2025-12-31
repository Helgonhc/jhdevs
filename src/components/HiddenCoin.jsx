import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Coins } from 'lucide-react';
import { useTreasureHunt } from './TreasureHunt';

const HiddenCoin = ({ className }) => {
    const { findCoin } = useTreasureHunt();
    const [collected, setCollected] = useState(false);

    const handleClick = () => {
        if (!collected) {
            setCollected(true);
            findCoin();
        }
    };

    if (collected) return null;

    return (
        <motion.button
            whileHover={{ scale: 1.2, rotate: 180 }}
            onClick={handleClick}
            className={`absolute z-40 opacity-30 hover:opacity-100 transition-opacity cursor-pointer ${className}`}
            title="Clique para coletar!"
        >
            <div className="w-8 h-8 rounded-full bg-yellow-400 border-2 border-yellow-200 shadow-[0_0_15px_rgba(255,215,0,0.6)] flex items-center justify-center text-yellow-700">
                <Coins size={16} />
            </div>
        </motion.button>
    );
};

export default HiddenCoin;
