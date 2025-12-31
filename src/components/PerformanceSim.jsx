import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Globe, ShieldCheck, Zap, Monitor, Smartphone, Layout } from 'lucide-react';

const PerformanceSim = () => {
    const [url, setUrl] = useState('');
    const [isScanning, setIsScanning] = useState(false);
    const [progress, setProgress] = useState(0);
    const [results, setResults] = useState(null);

    const handleScan = (e) => {
        e.preventDefault();
        if (!url) return;

        setIsScanning(true);
        setResults(null);
        setProgress(0);

        let cur = 0;
        const interval = setInterval(() => {
            cur += Math.random() * 15;
            if (cur >= 100) {
                cur = 100;
                clearInterval(interval);
                setTimeout(() => {
                    setIsScanning(false);
                    setResults({
                        speed: 42,
                        seo: 65,
                        ux: 58,
                        mobile: 30
                    });
                }, 1000);
            }
            setProgress(cur);
        }, 300);
    };

    return (
        <section className="py-24 bg-dark relative overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <span className="text-primary text-xs font-bold uppercase tracking-widest bg-primary/10 px-4 py-1.5 rounded-full inline-block mb-4">
                            SISTEMA DE AUDITORIA 2026
                        </span>
                        <h2 className="text-4xl font-display font-black text-white mb-6">
                            Seu site atual está te fazendo <span className="text-red-500">PERDER DINHEIRO?</span>
                        </h2>
                        <p className="text-white/40 max-w-xl mx-auto">
                            Nossa IA analisa os 4 pilares críticos de conversão e mostra onde estão os gargalos do seu negócio.
                        </p>
                    </div>

                    <div className="bg-dark-surface border border-white/5 rounded-[40px] p-8 md:p-12 shadow-2xl relative">
                        <form onSubmit={handleScan} className="flex flex-col md:flex-row gap-4 mb-8">
                            <div className="flex-1 relative group">
                                < Globe className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-primary transition-colors" size={20} />
                                <input
                                    type="text"
                                    placeholder="https://seu-site.com.br"
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-14 py-5 text-white focus:outline-none focus:border-primary transition-all"
                                    value={url}
                                    onChange={(e) => setUrl(e.target.value)}
                                    disabled={isScanning}
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={isScanning}
                                className="bg-primary text-dark font-bold px-10 py-5 rounded-2xl hover:scale-105 transition-transform flex items-center justify-center gap-3 disabled:opacity-50"
                            >
                                {isScanning ? (
                                    <div className="w-5 h-5 border-2 border-dark/20 border-t-dark rounded-full animate-spin" />
                                ) : (
                                    <Search size={20} />
                                )}
                                ANALISAR AGORA
                            </button>
                        </form>

                        <AnimatePresence>
                            {isScanning && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    className="space-y-6"
                                >
                                    <div className="flex justify-between text-xs font-bold text-primary tracking-widest mb-2 uppercase">
                                        <span>Escaneando Camadas de Performance...</span>
                                        <span>{Math.floor(progress)}%</span>
                                    </div>
                                    <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                                        <motion.div
                                            className="h-full bg-primary"
                                            initial={{ width: 0 }}
                                            animate={{ width: `${progress}%` }}
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        {[
                                            { label: 'SEO Meta', icon: <Search size={16} /> },
                                            { label: 'LCP Speed', icon: <Zap size={16} /> },
                                            { label: 'Responsive', icon: <Smartphone size={16} /> },
                                            { label: 'Clarity', icon: <Monitor size={16} /> }
                                        ].map((step, i) => (
                                            <div key={i} className="flex items-center gap-2 text-[10px] text-white/20 font-bold uppercase">
                                                <div className={`w-2 h-2 rounded-full ${progress > (i + 1) * 25 ? 'bg-primary' : 'bg-white/10'}`} />
                                                {step.label}
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {results && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="grid md:grid-cols-2 gap-8 mt-4 pt-8 border-t border-white/5"
                                >
                                    <div className="space-y-6">
                                        <h4 className="text-xl font-bold text-white flex items-center gap-2">
                                            <ShieldCheck className="text-red-500" /> Relatório de Alerta
                                        </h4>
                                        <div className="space-y-4">
                                            {[
                                                { label: 'Velocidade de Carregamento', value: results.speed, color: 'red' },
                                                { label: 'Otimização SEO', value: results.seo, color: 'yellow' },
                                                { label: 'Experiência do Usuário (UX)', value: results.ux, color: 'yellow' },
                                                { label: 'Responsividade Mobile', value: results.mobile, color: 'red' }
                                            ].map((r, i) => (
                                                <div key={i} className="space-y-2">
                                                    <div className="flex justify-between text-xs font-bold">
                                                        <span className="text-white/40">{r.label}</span>
                                                        <span className={r.value < 50 ? 'text-red-500' : 'text-yellow-500'}>{r.value} / 100</span>
                                                    </div>
                                                    <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                                                        <div className={`h-full ${r.value < 50 ? 'bg-red-500' : 'bg-yellow-500'}`} style={{ width: `${r.value}%` }} />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="bg-primary/5 rounded-3xl p-6 border border-primary/20 flex flex-col justify-between">
                                        <div>
                                            <p className="text-primary font-bold text-lg mb-2">Veredito da JH DEV'S:</p>
                                            <p className="text-white/70 text-sm leading-relaxed">
                                                Seu site está com problemas críticos de retenção. Você está perdendo aproximadamente <span className="text-white font-bold">65% dos seus visitantes</span> por lentidão e falhas no mobile.
                                            </p>
                                        </div>
                                        <button className="bg-primary text-dark font-black py-4 rounded-xl w-full mt-6 hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-primary/20">
                                            CORRIGIR MEU SITE AGORA
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PerformanceSim;
