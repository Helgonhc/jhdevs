import React from 'react';
import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';

const Testimonials = () => {
    const testimonials = [
        {
            name: 'Dr. Ricardo Almeida',
            role: 'Médico Cardiologista',
            content: 'A JH DEV transformou minha presença online. Minha agenda de consultas particulares dobrou após o lançamento da nova Landing Page.',
            avatar: 'https://i.pravatar.cc/150?u=doc'
        },
        {
            name: 'Dr. Mariana Lima',
            role: 'Advogada',
            content: 'Trabalho impecável. O site passa exatamente a autoridade e seriedade que minha profissão exige. Recomendo muito!',
            avatar: 'https://i.pravatar.cc/150?u=law'
        },
        {
            name: 'Marcos Silva',
            role: 'Proprietário de Oficina',
            content: 'O sistema de agendamento que eles criaram para minha oficina economizou horas do meu dia. Meus clientes adoraram a facilidade.',
            avatar: 'https://i.pravatar.cc/150?u=mech'
        }
    ];

    return (
        <section id="testimonials" className="py-24 bg-dark-surface/30 relative">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-primary font-bold tracking-widest uppercase text-sm mb-4">Depoimentos</h2>
                    <h3 className="text-4xl md:text-5xl font-display font-black">
                        QUEM CONFIA NA <span className="text-primary italic">JH DEV</span>
                    </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((t, i) => (
                        <motion.div
                            key={t.name}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="p-8 bg-dark-card border border-white/5 rounded-3xl relative group hover:border-primary/30 transition-all shadow-2xl"
                        >
                            <Quote className="absolute top-6 right-6 text-primary/10 group-hover:text-primary transition-colors" size={40} />

                            <div className="flex gap-1 mb-6">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={14} className="fill-primary text-primary" />
                                ))}
                            </div>

                            <p className="text-lg text-white/80 italic mb-8 leading-relaxed">
                                "{t.content}"
                            </p>

                            <div className="flex items-center gap-4">
                                <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full border border-primary/20" />
                                <div>
                                    <div className="font-bold">{t.name}</div>
                                    <div className="text-xs text-white/40 uppercase tracking-widest">{t.role}</div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
