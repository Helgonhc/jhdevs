import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, ArrowRight, Zap, Target, TrendingUp } from 'lucide-react';

const BlogExpress = () => {
    const tips = [
        {
            title: 'O erro nº 1 no WhatsApp',
            desc: 'Demorar mais de 5 minutos para responder um novo lead mata 80% das suas chances de venda. Automatize o primeiro contato.',
            icon: Zap,
            tag: 'Vendas'
        },
        {
            title: 'Design que passa Confiança',
            desc: 'Cores inconsistentes e fontes difíceis de ler fazem seu cliente achar que sua empresa é amadora. Menos é mais.',
            icon: Target,
            tag: 'Design'
        },
        {
            title: 'Google ou Instagram?',
            desc: 'Se o seu cliente busca por você, vá para o Google. Se você precisa "aparecer" para ele, vá para o Instagram.',
            icon: TrendingUp,
            tag: 'Tráfego'
        }
    ];

    return (
        <section id="tips" className="py-24 bg-dark-surface/30">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
                    <div className="max-w-xl">
                        <h2 className="text-primary font-bold tracking-widest uppercase text-sm mb-4">Dicas de Especialista</h2>
                        <h3 className="text-4xl font-display font-black leading-tight">
                            CONHECIMENTO QUE <span className="text-primary italic">GERA LUCRO</span>
                        </h3>
                    </div>
                    <p className="text-white/40 text-sm max-w-xs border-l border-primary/20 pl-6">
                        Curadoria rápida de estratégias digitais para donos de pequenos negócios.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {tips.map((tip, i) => (
                        <motion.div
                            key={tip.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="group p-8 bg-dark-card border border-white/5 rounded-[2rem] hover:border-primary/30 transition-all duration-500"
                        >
                            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary transition-all duration-500">
                                <tip.icon size={24} className="text-primary group-hover:text-dark transition-colors" />
                            </div>
                            <span className="px-3 py-1 bg-white/5 rounded-full text-[10px] font-bold text-white/40 uppercase tracking-widest mb-4 inline-block">
                                {tip.tag}
                            </span>
                            <h4 className="text-xl font-bold mb-4 group-hover:text-primary transition-colors">{tip.title}</h4>
                            <p className="text-white/40 text-sm leading-relaxed mb-8">
                                {tip.desc}
                            </p>
                            <a href="https://wa.me/5531993338026" className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wider">
                                Saber mais <ArrowRight size={14} />
                            </a>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BlogExpress;
