import React from 'react';
import { motion } from 'framer-motion';
import { XCircle, CheckCircle2, AlertTriangle, Zap } from 'lucide-react';

const BeforeAfter = () => {
    return (
        <section id="comparison" className="py-24 bg-dark relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(166,206,57,0.03),transparent_70%)] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-primary font-bold tracking-widest uppercase text-sm mb-4">Realidade vs Expectativa</h2>
                    <h3 className="text-3xl md:text-5xl font-display font-black leading-tight text-white">
                        POR QUE SEU SITE <br />
                        <span className="text-white/20">NÃO VENDE?</span>
                    </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {/* The "Amateur" Side */}
                    <div className="relative p-8 rounded-3xl bg-white/5 border border-white/5 opacity-80 hover:opacity-100 transition-opacity">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <AlertTriangle size={120} />
                        </div>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center text-red-500">
                                <XCircle size={24} />
                            </div>
                            <div>
                                <h4 className="text-xl font-bold text-white">Site "Baratinho"</h4>
                                <p className="text-sm text-red-400">O famoso "primo que faz site"</p>
                            </div>
                        </div>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 text-white/50">
                                <XCircle size={18} className="text-red-500/50 mt-1 shrink-0" />
                                <span>Lento e pesado (demora a carregar)</span>
                            </li>
                            <li className="flex items-start gap-3 text-white/50">
                                <XCircle size={18} className="text-red-500/50 mt-1 shrink-0" />
                                <span>Design genérico (template pronto)</span>
                            </li>
                            <li className="flex items-start gap-3 text-white/50">
                                <XCircle size={18} className="text-red-500/50 mt-1 shrink-0" />
                                <span>Sem estratégia de vendas</span>
                            </li>
                            <li className="flex items-start gap-3 text-white/50">
                                <XCircle size={18} className="text-red-500/50 mt-1 shrink-0" />
                                <span>Não aparece no Google</span>
                            </li>
                        </ul>
                    </div>

                    {/* The "Elite" Side */}
                    <div className="relative p-8 rounded-3xl bg-dark-card border border-primary/20 shadow-2xl overflow-hidden group">
                        <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="absolute top-0 right-0 p-4 opacity-10 text-primary">
                            <Zap size={120} />
                        </div>

                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                                    <CheckCircle2 size={24} />
                                </div>
                                <div>
                                    <h4 className="text-xl font-bold text-white">Padrão JH DEV'S</h4>
                                    <p className="text-sm text-primary">Máquina de Vendas</p>
                                </div>
                            </div>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3 text-white">
                                    <CheckCircle2 size={18} className="text-primary mt-1 shrink-0" />
                                    <span className="font-medium">Carregamento Instantâneo</span>
                                </li>
                                <li className="flex items-start gap-3 text-white">
                                    <CheckCircle2 size={18} className="text-primary mt-1 shrink-0" />
                                    <span className="font-medium">Design Exclusivo e Premium</span>
                                </li>
                                <li className="flex items-start gap-3 text-white">
                                    <CheckCircle2 size={18} className="text-primary mt-1 shrink-0" />
                                    <span className="font-medium">Focado em Conversão (Vendas)</span>
                                </li>
                                <li className="flex items-start gap-3 text-white">
                                    <CheckCircle2 size={18} className="text-primary mt-1 shrink-0" />
                                    <span className="font-medium">Otimizado para o Google (SEO)</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BeforeAfter;
