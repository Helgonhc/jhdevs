import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, CheckCircle2, ArrowRight } from 'lucide-react';

const BudgetCalculator = () => {
    const services = [
        { id: 'lp', label: 'Landing Page Premium', price: 1200 },
        { id: 'site', label: 'Site Institucional', price: 2500 },
        { id: 'app', label: 'Aplicativo Mobile', price: 5000 },
        { id: 'ads', label: 'Gestão de Tráfego (Google/Meta)', price: 800 },
        { id: 'seo', label: 'SEO & Otimização', price: 1000 },
        { id: 'copy', label: 'Copywriting Profissional', price: 500 },
    ];

    const [selected, setSelected] = useState([]);

    const toggleService = (id) => {
        if (selected.includes(id)) {
            setSelected(selected.filter(item => item !== id));
        } else {
            setSelected([...selected, id]);
        }
    };

    const total = selected.reduce((acc, id) => {
        const service = services.find(s => s.id === id);
        return acc + (service ? service.price : 0);
    }, 0);

    return (
        <section id="calculator" className="py-24 bg-dark">
            <div className="container mx-auto px-6">
                <div className="max-w-5xl mx-auto bg-dark-card border border-white/5 rounded-[3rem] overflow-hidden flex flex-col md:flex-row">
                    {/* Left Side: Inputs */}
                    <div className="flex-1 p-8 md:p-12 border-b md:border-b-0 md:border-r border-white/5">
                        <div className="flex items-center gap-3 text-primary mb-6">
                            <Calculator size={24} />
                            <span className="font-bold uppercase tracking-widest text-sm">Simulador de Investimento</span>
                        </div>
                        <h3 className="text-3xl font-display font-black mb-8">Monte seu <span className="text-primary italic">Plano de Sucesso</span></h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                            {services.map((service) => (
                                <button
                                    key={service.id}
                                    onClick={() => toggleService(service.id)}
                                    className={`p-3 md:p-4 rounded-2xl border text-left transition-all flex items-center justify-between group ${selected.includes(service.id) ? 'bg-primary border-primary text-dark' : 'bg-white/2 border-white/5 hover:border-primary/50'}`}
                                >
                                    <span className="text-xs md:text-sm font-bold leading-tight">{service.label}</span>
                                    {selected.includes(service.id) && <CheckCircle2 size={16} className="text-dark shrink-0 ml-2" />}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Right Side: Result */}
                    <div className="w-full md:w-1/3 p-8 md:p-12 bg-primary/5 flex flex-col justify-center items-center text-center">
                        <div className="text-white/40 text-sm font-bold uppercase mb-4 tracking-tighter">Investimento Estimado</div>
                        <motion.div
                            key={total}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="text-5xl font-display font-black text-primary mb-2"
                        >
                            R$ {total.toLocaleString('pt-BR')}
                        </motion.div>
                        <p className="text-white/40 text-xs mb-8 max-w-[200px]">
                            *Este é um valor base estimado. O orçamento final depende da complexidade do projeto.
                        </p>

                        <a
                            href={`https://wa.me/5531993338026?text=Olá! Fiz uma simulação no site e gostaria de um orçamento para: ${selected.map(id => services.find(s => s.id === id).label).join(', ')}. Total estimado: R$ ${total}`}
                            target="_blank"
                            className="btn-primary w-full group"
                        >
                            Garantir esta oferta
                            <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BudgetCalculator;
