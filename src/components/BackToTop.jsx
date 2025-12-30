import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { ChevronUp } from 'lucide-react';

const BackToTop = () => {
    const [isVisible, setIsVisible] = useState(false);
    const { scrollYProgress } = useScroll();

    // Smooth spring for the circle progress
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <div className={`fixed bottom-24 right-5 md:bottom-8 md:right-8 z-[90] transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-50 pointer-events-none'}`}>
            <button
                onClick={scrollToTop}
                className="relative w-14 h-14 bg-dark-card border border-white/10 rounded-full flex items-center justify-center text-primary shadow-2xl hover:bg-primary hover:text-dark transition-all group"
            >
                {/* Progress Ring */}
                <svg className="absolute inset-0 w-full h-full -rotate-90">
                    <motion.circle
                        cx="28"
                        cy="28"
                        r="26"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="transparent"
                        style={{ pathLength: scrollYProgress }}
                        className="text-primary opacity-20"
                    />
                    <motion.circle
                        cx="28"
                        cy="28"
                        r="26"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="transparent"
                        style={{ pathLength: scrollYProgress }}
                        className="text-primary"
                    />
                </svg>
                <ChevronUp className="relative z-10 group-hover:-translate-y-1 transition-transform" />
            </button>
        </div>
    );
};

export default BackToTop;
