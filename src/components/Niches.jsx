import React from 'react';
import { motion } from 'framer-motion';
import { Scale, HeartPulse, UserCircle, Car, Zap, Droplets, Dumbbell, ShoppingBag } from 'lucide-react';

const Niches = () => {
    const niches = [
        {
            name: 'Advogados',
            icon: Scale,
            desc: 'Expertise jurídica com presença digital de autoridade.'
        },
        {
            name: 'Saúde & Bem-estar',
            icon: HeartPulse,
            desc: 'Médicos, dentistas e psicólogos aproximando cuidados.'
        },
        {
            name: 'Especialistas',
            icon: UserCircle,
            desc: 'Corretores e personal trainers vendendo sua marca.'
        },
        {
            name: 'Oficinas & Mecânicas',
            icon: Car,
            desc: 'Agendamentos online para quem não para.'
        },
        {
            name: 'Eletricistas & Encanadores',
            icon: Zap,
            desc: 'Rapidez na conversão quando o cliente precisa.'
        },
        {
            name: 'Fitness & Academias',
            icon: Dumbbell,
            desc: 'Retenção e venda de planos de forma automatizada.'
        },
        {
            name: 'Comércio Local',
            icon: ShoppingBag,
            desc: 'Sua vitrine aberta 24h para o mundo.'
        },
    ];

    return (
        <section id="niches" className="py-24 bg-dark-surface/50">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-primary font-bold tracking-widest uppercase text-sm mb-4">Para quem trabalhamos</h2>
                    <h3 className="text-4xl md:text-5xl font-display font-black">
                        SOLUÇÕES PARA <span className="text-primary italic">VOCÊ</span>
                    </h3>
                    <p className="text-white/40 mt-4 max-w-2xl mx-auto">
                        Não importa o seu ramo, criamos uma presença digital que passa confiança e profissionalismo para o seu cliente final.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {niches.map((niche, i) => (
                        <motion.div
                            key={niche.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            whileHover={{ y: -10 }}
                            className="p-8 bg-dark-card border border-white/5 rounded-3xl group hover:border-primary/40 transition-all duration-500 cursor-default relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-10 transition-opacity">
                                <niche.icon size={80} className="text-primary rotate-12" />
                            </div>

                            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:scale-110 transition-all duration-500">
                                <niche.icon size={24} className="text-primary group-hover:text-dark transition-colors" />
                            </div>

                            <h4 className="text-xl font-bold mb-3">{niche.name}</h4>
                            <p className="text-white/40 text-sm leading-relaxed">
                                {niche.desc}
                            </p>

                            <div className="mt-6 pt-4 border-t border-white/5 opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0 flex items-center gap-2 text-[10px] font-bold text-primary uppercase tracking-tighter">
                                Estrutura sob medida para {niche.name}
                            </div>
                        </motion.div>
                    ))}

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="p-8 bg-primary rounded-[2rem] flex flex-col justify-center items-center text-center text-dark relative overflow-hidden group"
                    >
                        <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />

                        <div className="relative z-10">
                            <h4 className="text-2xl font-black mb-4 leading-tight">SEU NEGÓCIO <br />MERECE ISSO?</h4>
                            <p className="text-dark/70 text-sm font-bold mb-6">Criamos projetos personalizados para qualquer setor.</p>
                            <a
                                href="https://wa.me/5531993338026"
                                target="_blank"
                                className="px-6 py-3 bg-dark text-white rounded-full font-bold text-sm hover:scale-105 transition-transform inline-block"
                            >
                                Consulte-nos agora
                            </a>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Niches;
