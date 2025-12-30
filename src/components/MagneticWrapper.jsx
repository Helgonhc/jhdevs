import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

const MagneticWrapper = ({ children, strength = 2.0 }) => { // Ultra strong pull
    const ref = useRef(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const { width, height, left, top } = ref.current.getBoundingClientRect();

        const centerX = left + width / 2;
        const centerY = top + height / 2;

        const distanceX = clientX - centerX;
        const distanceY = clientY - centerY;

        // Apply intense magnetic pull
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
            transition={{ type: 'spring', stiffness: 300, damping: 20, mass: 0.2 }}
            className="inline-block p-12 -m-12 cursor-pointer z-50 relative" // Massive hit area
            style={{ touchAction: 'none' }}
        >
            <div className="pointer-events-none">
                {children}
            </div>
        </motion.div>
    );
};

export default MagneticWrapper;
