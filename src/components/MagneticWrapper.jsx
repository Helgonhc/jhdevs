import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

const MagneticWrapper = ({ children, strength = 0.8 }) => { // Increased strength default
    const ref = useRef(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const { width, height, left, top } = ref.current.getBoundingClientRect();

        const centerX = left + width / 2;
        const centerY = top + height / 2;

        // Calculate distance from center
        const distanceX = clientX - centerX;
        const distanceY = clientY - centerY;

        // Apply stronger magnetic pull
        setPosition({ x: distanceX * strength, y: distanceY * strength });
    };

    const handleMouseLeave = () => {
        setPosition({ x: 0, y: 0 });
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            animate={{ x: position.x, y: position.y }}
            transition={{ type: 'spring', stiffness: 100, damping: 10, mass: 0.5 }} // Bouncier spring
            className="inline-block p-4 -m-4 cursor-pointer" // Added padding to increase hit area
            style={{ touchAction: 'none' }}
        >
            <div className="pointer-events-none">
                {children}
            </div>
        </motion.div>
    );
};

export default MagneticWrapper;
