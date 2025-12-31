import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Target, Rocket, Zap, Mail } from 'lucide-react';

const steps = [
    {
        id: 1,
        question: "Qual o seu objetivo principal hoje?",
        options: [
            { label: "Vender mais produtos", icon: <Target className="text-primary" /> },
            { label: "Lançar um novo negócio", icon: <Rocket className="text-primary" /> },
            { label: "Autoridade e Posicionamento", icon: <Zap className="text-primary" /> }
        ]
    },
    {
        id: 2,
        question: "Qual o seu faturamento mensal atual?",
        options: [
            { label: "Ainda não faturo", value: "init" },
            { label: "Até R$ 10k", value: "low" },
            { label: "R$ 10k a R$ 50k", value: "mid" },
            { label: "Acima de R$ 50k", value: "high" }
        ]
    },
    {
        id: 3,
        question: "Como os clientes te encontram hoje?",
        options: [
            { label: "Indicação / Boca a boca", value: "referral" },
            { label: "Redes Sociais", value: "social" },
            { label: "Google / Anúncios", value: "ads" }
        ]
    }
];

const DiagnosticQuiz = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState({});
    const [isFinished, setIsFinished] = useState(false);
    const [email, setEmail] = useState('');

    const handleOption = (value) => {
        setAnswers({ ...answers, [steps[currentStep].id]: value });
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            setIsFinished(true);
        }
    };

    return (
        <section className="py-24 bg-dark/50" id="quiz">
            <div className="container mx-auto px-6 max-w-2xl">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-display font-black text-white mb-4">
                        DIAGNÓSTICO <span className="text-primary">DIGITAL 2026</span>
                    </h2>
                    <p className="text-white/40 text-sm">Responda 3 perguntas e descubra a estratégia ideal para o seu negócio.</p>
                </div>

                <div className="bg-dark-surface border border-white/5 rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-2xl">
                    <AnimatePresence mode="wait">
                        {!isFinished ? (
                            <motion.div
                                key={currentStep}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-8"
                            >
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-primary text-xs font-bold uppercase tracking-widest">Passo {currentStep + 1} de {steps.length}</span>
                                    <div className="flex gap-1">
                                        {steps.map((_, i) => (
                                            <div key={i} className={`h-1 w-8 rounded-full transition-colors ${i <= currentStep ? 'bg-primary' : 'bg-white/10'}`} />
                                        ))}
                                    </div>
                                </div>

                                <h3 className="text-xl font-bold text-white">{steps[currentStep].question}</h3>

                                <div className="grid gap-4">
                                    {steps[currentStep].options.map((opt, i) => (
                                        <button
                                            key={i}
                                            onClick={() => handleOption(opt.label)}
                                            className="flex items-center gap-4 p-5 bg-white/5 hover:bg-primary/10 border border-white/10 hover:border-primary/50 rounded-2xl transition-all text-left text-white/80 hover:text-white group"
                                        >
                                            {opt.icon && <div className="p-3 bg-dark rounded-xl">{opt.icon}</div>}
                                            <span className="font-medium flex-1">{opt.label}</span>
                                            <ChevronRight size={18} className="text-white/20 group-hover:text-primary transition-colors" />
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center space-y-6"
                            >
                                <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Mail className="text-primary" size={32} />
                                </div>
                                <h3 className="text-2xl font-bold text-white">Análise Pronta!</h3>
                                <p className="text-white/60">Identificamos o padrão de crescimento para 2026. Para onde enviamos o PDF com o seu diagnóstico personalizado?</p>

                                <div className="space-y-4">
                                    <input
                                        type="email"
                                        placeholder="Seu melhor e-mail"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-primary transition-colors"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <button className="w-full bg-primary text-dark font-bold py-4 rounded-xl hover:scale-105 transition-transform shadow-lg shadow-primary/20">
                                        RECEBER DIAGNÓSTICO AGORA
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};

export default DiagnosticQuiz;
