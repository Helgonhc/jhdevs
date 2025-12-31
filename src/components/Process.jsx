import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { MessageSquare, Layout, Code, Rocket, CheckCircle2 } from 'lucide-react';

const Process = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end center"]
    });

    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

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
        <section id="process" className="py-24 bg-dark relative overflow-hidden">
            <div className="container mx-auto px-6" ref={containerRef}>
                <div className="text-center mb-32">
                    <h2 className="text-primary font-bold tracking-widest uppercase text-sm mb-4">Como funciona</h2>
                    <h3 className="text-4xl md:text-5xl font-display font-black">
                        DO BRIEFING AO <span className="text-primary italic">SUCESSO</span>
                    </h3>
                    <p className="text-white/40 mt-4 max-w-2xl mx-auto">
                        Um processo claro, sem burocracia e focado no seu resultado final.
                    </p>
                </div>

                <div className="relative">
                    {/* Living Beam (Desktop) - The Neon Line */}
                    <div className="hidden lg:block absolute top-[2.5rem] left-0 w-full h-1 bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                            style={{ scaleX, transformOrigin: "left" }}
                            className="w-full h-full bg-gradient-to-r from-primary via-white to-primary shadow-[0_0_20px_rgba(166,206,57,0.8)]"
                        />
                    </div>

                    {/* Mobile Vertical Beam */}
                    <div className="lg:hidden absolute top-0 left-1/2 -translate-x-1/2 w-1 h-full bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                            style={{ scaleY: scaleX, transformOrigin: "top" }}
                            className="w-full h-full bg-gradient-to-b from-primary via-white to-primary shadow-[0_0_20px_rgba(166,206,57,0.8)]"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 relative z-10">
                        {steps.map((step, i) => (
                            <motion.div
                                key={step.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ margin: "-50px" }}
                                transition={{ delay: i * 0.2 }}
                                className="flex flex-col items-center text-center group"
                            >
                                <div className="relative mb-8">
                                    <div className={`w-20 h-20 ${step.color} rounded-full flex items-center justify-center relative z-20 group-hover:scale-110 transition-transform duration-500 border border-white/5 shadow-[0_0_30px_rgba(0,0,0,0.5)]`}>
                                        <step.icon size={32} />
                                    </div>

                                    {/* Glowing Node Halo */}
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-primary/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-dark border border-white/10 rounded-full flex items-center justify-center text-sm font-black text-white/40 z-30">
                                        0{i + 1}
                                    </div>
                                </div>

                                <h4 className="text-xl font-bold mb-4">{step.title}</h4>
                                <p className="text-white/40 text-sm leading-relaxed px-4">
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
