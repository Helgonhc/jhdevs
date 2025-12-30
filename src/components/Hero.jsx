import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Sparkles } from 'lucide-react';
import MagneticWrapper from './MagneticWrapper';

const Hero = () => {
    return (
        <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
            {/* Background Glows */}
            <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/20 blur-[120px] rounded-full" />
            <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-primary/10 blur-[120px] rounded-full" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-medium mb-6"
                    >
                        <Sparkles size={16} />
                        <span>Sites e Aplicativos que Funcionam de Verdade</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-display font-black leading-[1.1] mb-8"
                    >
                        Seu <span className="text-primary">Negócio Online</span> <br />
                        sem Complicação.
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg md:text-xl text-white/60 mb-10 max-w-2xl leading-relaxed"
                    >
                        Desenvolvimento direto ao ponto para profissionais liberais e pequenos comércios. Criamos sua presença digital para você focar no que realmente importa: atender seus clientes.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="flex flex-col sm:flex-row items-center gap-4"
                    >
                        <MagneticWrapper strength={0.3}>
                            <button className="btn-primary w-full sm:w-auto flex items-center justify-center gap-2 group">
                                Quero meu Site Agora
                                <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </MagneticWrapper>
                        <MagneticWrapper strength={0.3}>
                            <a
                                href="#portfolio"
                                className="w-full sm:w-auto px-6 py-3 border border-white/10 rounded-full hover:bg-white/5 transition-colors text-center font-bold inline-block"
                            >
                                Ver Modelos
                            </a>
                        </MagneticWrapper>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="mt-16 flex items-center gap-8 border-t border-white/5 pt-8"
                    >
                        <div className="flex -space-x-4">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="w-10 h-10 rounded-full border-2 border-dark bg-dark-surface overflow-hidden">
                                    <img src={`https://i.pravatar.cc/100?u=${i}`} alt="Client" />
                                </div>
                            ))}
                        </div>
                        <div>
                            <div className="text-sm font-bold">+50 Projetos Entregues</div>
                            <div className="text-xs text-white/40">Garantia de Conversão & Performance</div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* JH DEV Logo Floating Element */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                animate={{ opacity: 0.15, scale: 1, rotate: 0 }}
                transition={{ duration: 1, delay: 0.4 }}
                className="absolute top-1/2 right-0 -translate-y-1/2 hidden lg:block select-none pointer-events-none"
            >
                <div className="text-[12rem] md:text-[20rem] font-black text-primary leading-none">
                    JH DEV'S
                </div>
            </motion.div>
        </section>
    );
};

export default Hero;
