import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, CheckCircle2, Download } from 'lucide-react';

const LeadMagnet = () => {
    const [email, setEmail] = useState('');
    const [sent, setSent] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSent(true);
    };

    return (
        <section className="py-24 relative">
            <div className="container mx-auto px-6">
                <div className="bg-gradient-to-br from-primary/20 via-primary/5 to-transparent border border-primary/20 rounded-[40px] p-8 md:p-16 relative overflow-hidden">
                    {/* Decorative elements */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[120px] -z-1" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/10 blur-[100px] -z-1" />

                    <div className="flex flex-col lg:flex-row items-center gap-12">
                        <div className="flex-1 space-y-6 text-center lg:text-left">
                            <span className="text-primary font-bold text-xs uppercase tracking-[0.3em]">Recurso Gratuito • 2026 Edition</span>
                            <h2 className="text-4xl md:text-5xl font-display font-black text-white leading-tight">
                                Checklist: 7 Elementos Capazes de <span className="text-primary">Dobrar Suas Vendas</span> em 2026.
                            </h2>
                            <p className="text-white/60 text-lg">
                                O mercado digital muda todo dia. Descubra as tecnologias e gatilhos que serão obrigatórios para converter visitantes em clientes nos próximos anos.
                            </p>

                            <ul className="space-y-4 inline-block text-left">
                                {[
                                    "A nova era do SEO Preditivo",
                                    "Micro-conversões por voz",
                                    "Interfaces hiper-personalizadas por IA"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-white/80">
                                        <CheckCircle2 className="text-primary" size={20} />
                                        <span className="text-sm font-medium">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="w-full lg:w-[450px]">
                            <div className="bg-dark/40 backdrop-blur-xl border border-white/10 p-8 rounded-[32px] shadow-2xl">
                                {!sent ? (
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="space-y-2">
                                            <p className="text-white font-bold text-center">Para onde enviamos o PDF?</p>
                                            <div className="relative">
                                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                                                <input
                                                    type="email"
                                                    required
                                                    placeholder="Seu e-mail principal"
                                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-white focus:outline-none focus:border-primary transition-all"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <button className="w-full bg-primary text-dark font-black py-5 rounded-2xl flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-primary/30">
                                            <Download size={20} />
                                            BAIXAR CHECKLIST GRATUITO
                                        </button>
                                        <p className="text-[10px] text-white/20 text-center uppercase font-bold tracking-widest">
                                            Prometemos: Zero Spam. Apenas Conteúdo de Elite.
                                        </p>
                                    </form>
                                ) : (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="text-center py-8 space-y-4"
                                    >
                                        <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto shadow-lg shadow-primary/20">
                                            <CheckCircle2 className="text-dark" size={32} />
                                        </div>
                                        <h3 className="text-2xl font-bold text-white">Pronto! Verifique seu E-mail.</h3>
                                        <p className="text-white/40 text-sm">Em menos de 2 minutos você receberá o guia completo de performance 2026.</p>
                                    </motion.div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LeadMagnet;
