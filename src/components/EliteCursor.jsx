import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const EliteCursor = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isPointer, setIsPointer] = useState(false);

    useEffect(() => {
        const mouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });

            const target = e.target;
            const isClickable = window.getComputedStyle(target).cursor === 'pointer' ||
                target.tagName === 'BUTTON' ||
                target.tagName === 'A';
            setIsPointer(isClickable);
        };

        window.addEventListener('mousemove', mouseMove);
        return () => window.removeEventListener('mousemove', mouseMove);
    }, []);

    return (
        <motion.div
            className="fixed top-0 left-0 w-8 h-8 rounded-full border border-primary pointer-events-none z-[9999] hidden md:block"
            animate={{
                x: mousePosition.x - 16,
                y: mousePosition.y - 16,
                scale: isPointer ? 1.5 : 1,
                backgroundColor: isPointer ? 'rgba(166, 206, 57, 0.1)' : 'rgba(166, 206, 57, 0)'
            }}
            transition={{ type: 'spring', damping: 25, stiffness: 250, mass: 0.5 }}
        />
    );
};

export default EliteCursor;
