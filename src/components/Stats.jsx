import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Counter = ({ value, duration = 2 }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let start = 0;
        const end = parseInt(value.substring(0, value.length - (isNaN(value.slice(-1)) ? 1 : 0)));
        if (start === end) return;

        let timer = setInterval(() => {
            start += 1;
            setCount(start);
            if (start === end) clearInterval(timer);
        }, (duration * 1000) / end);

        return () => clearInterval(timer);
    }, [value, duration]);

    return <span>{count}{value.slice(-1) === '+' ? '+' : value.slice(-1) === '%' ? '%' : ''}</span>;
};

const Stats = () => {
    const stats = [
        { label: 'Projetos Entregues', value: '50+' },
        { label: 'Anos de Experiência', value: '5+' },
        { label: 'Satisfação Clientes', value: '100%' },
        { label: 'Tráfego Gerado', value: '250k+' }
    ];

    return (
        <section className="py-20 bg-dark-surface/50 border-y border-white/5">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="text-center"
                        >
                            <div className="text-4xl md:text-5xl font-display font-black text-primary mb-2">
                                <Counter value={stat.value} />
                            </div>
                            <div className="text-white/40 text-xs font-bold uppercase tracking-widest">
                                {stat.label}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Stats;
