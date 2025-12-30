import React from 'react';
import { motion } from 'framer-motion';

const TechBar = () => {
    const techs = [
        { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
        { name: 'Tailwind', icon: 'https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg' },
        { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
        { name: 'Google Ads', icon: 'https://www.vectorlogo.zone/logos/google_ads/google_ads-icon.svg' },
        { name: 'Framer Motion', icon: 'https://www.vectorlogo.zone/logos/framer/framer-icon.svg' },
        { name: 'Vite', icon: 'https://www.vectorlogo.zone/logos/vitejs/vitejs-icon.svg' },
    ];

    return (
        <div className="py-12 border-y border-white/5 bg-white/2 overflow-hidden">
            <div className="container mx-auto px-6">
                <p className="text-center text-white/20 text-xs font-bold uppercase tracking-widest mb-8">
                    Tecnologias de Ponta para Resultados Reais
                </p>
                <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
                    {techs.map((tech) => (
                        <div key={tech.name} className="flex items-center gap-3">
                            <img src={tech.icon} alt={tech.name} className="w-8 h-8 object-contain" />
                            <span className="text-sm font-bold text-white/40">{tech.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TechBar;
