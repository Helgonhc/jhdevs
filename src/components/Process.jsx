import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Layout, Code, Rocket, CheckCircle2 } from 'lucide-react';

const Process = () => {
    const steps = [
        {
            title: 'Briefing & Estratégia',
            icon: MessageSquare,
            desc: 'Entendemos seu negócio, público e objetivos para criar o plano perfeito.',
            color: 'bg-primary/20'
        },
        {
            title: 'Design Premium',
            icon: Layout,
            desc: 'Criamos um visual exclusivo que passa autoridade e profissionalismo.',
            color: 'bg-blue-500/20 text-blue-400'
        },
        {
            title: 'Desenvolvimento',
            icon: Code,
            desc: 'Codificamos tudo com as tecnologias mais modernas do mercado.',
            color: 'bg-purple-500/20 text-purple-400'
        },
        {
            title: 'Lançamento & Vendas',
            icon: Rocket,
            desc: 'Colocamos seu projeto no ar e otimizamos para converter visitantes.',
            color: 'bg-orange-500/20 text-orange-400'
        }
    ];

    return (
        <section id="process" className="py-24 bg-dark">
            <div className="container mx-auto px-6">
                <div className="text-center mb-20">
                    <h2 className="text-primary font-bold tracking-widest uppercase text-sm mb-4">Como funciona</h2>
                    <h3 className="text-4xl md:text-5xl font-display font-black">
                        DO BRIEFING AO <span className="text-primary italic">SUCESSO</span>
                    </h3>
                    <p className="text-white/40 mt-4 max-w-2xl mx-auto">
                        Um processo claro, sem burocracia e focado no seu resultado final.
                    </p>
                </div>

                <div className="relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden lg:block absolute top-1/2 left-0 w-full h-px bg-white/5 -translate-y-1/2" />

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
                        {steps.map((step, i) => (
                            <motion.div
                                key={step.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="flex flex-col items-center text-center group"
                            >
                                <div className={`w-20 h-20 ${step.color} rounded-[2rem] flex items-center justify-center mb-8 relative group-hover:scale-110 transition-transform duration-500`}>
                                    <step.icon size={32} />
                                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-dark border border-white/10 rounded-full flex items-center justify-center text-sm font-black text-white/40">
                                        0{i + 1}
                                    </div>
                                </div>
                                <h4 className="text-xl font-bold mb-4">{step.title}</h4>
                                <p className="text-white/40 text-sm leading-relaxed">
                                    {step.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <div className="mt-20 p-8 rounded-[2.5rem] bg-white/2 border border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-dark">
                            <CheckCircle2 size={24} />
                        </div>
                        <div>
                            <div className="font-bold text-lg">Garantia JH DEV'S</div>
                            <div className="text-white/40 text-sm">Transparência total em cada linha de código.</div>
                        </div>
                    </div>
                    <a href="https://wa.me/5531993338026" className="btn-primary">
                        Iniciar meu processo agora
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Process;
