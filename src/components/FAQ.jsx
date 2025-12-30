import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const FAQ = () => {
    const faqs = [
        {
            q: 'Quanto custa para criar um site?',
            a: 'Os valores variam conforme a complexidade (Landing Page, Site Institucional ou App). No entanto, focamos em soluções acessíveis para pequenos negócios, com planos que iniciam em valores justos para o mercado de alta tecnologia.'
        },
        {
            q: 'Qual o prazo de entrega?',
            a: 'Para uma Landing Page convencional, entregamos em até 7-10 dias úteis. Projetos maiores como portais ou aplicativos podem levar de 15 a 30 dias.'
        },
        {
            q: 'Eu mesmo consigo atualizar o site depois?',
            a: 'Sim! Entregamos o site com as ferramentas necessárias e um mini-tutorial para que você altere textos e imagens sem depender de ninguém.'
        },
        {
            q: 'O site terá suporte técnico?',
            a: 'Com certeza. Oferecemos suporte mensal para atualizações, segurança e melhorias contínuas, garantindo que sua casa digital esteja sempre aberta e segura.'
        },
        {
            q: 'Vocês cuidam dos anúncios (Google/Insta)?',
            a: 'Sim, integramos o desenvolvimento com estratégias de Tráfego Pago para que você não tenha apenas um "site bonito", mas sim uma ferramenta que atrai novos clientes diariamente.'
        }
    ];

    const [openIndex, setOpenIndex] = useState(0);

    return (
        <section id="faq" className="py-24 bg-dark-surface/30">
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row gap-16">
                    <div className="lg:w-1/3">
                        <h2 className="text-primary font-bold tracking-widest uppercase text-sm mb-4">F.A.Q</h2>
                        <h3 className="text-4xl font-display font-black leading-tight mb-6">
                            DÚVIDAS <br className="hidden md:block" />
                            <span className="text-primary">FREQUENTES</span>
                        </h3>
                        <p className="text-white/40 mb-8">
                            Não encontrou sua resposta aqui? Sem problema, me chame agora no WhatsApp e tiramos todas as suas dúvidas na hora.
                        </p>
                        <a href="https://wa.me/5531993338026" className="btn-primary inline-flex">
                            Tirar dúvidas agora
                        </a>
                    </div>

                    <div className="lg:w-2/3 space-y-4">
                        {faqs.map((faq, i) => (
                            <div
                                key={i}
                                className={`border border-white/5 rounded-3xl overflow-hidden transition-all duration-300 ${openIndex === i ? 'bg-white/5 border-primary/20' : 'bg-white/2 hover:bg-white/5'}`}
                            >
                                <button
                                    onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
                                    className="w-full p-6 flex items-center justify-between text-left"
                                >
                                    <span className="text-lg font-bold">{faq.q}</span>
                                    <div className={`w-8 h-8 rounded-full border border-white/10 flex items-center justify-center transition-all ${openIndex === i ? 'bg-primary text-dark border-primary' : ''}`}>
                                        {openIndex === i ? <Minus size={18} /> : <Plus size={18} />}
                                    </div>
                                </button>
                                <AnimatePresence>
                                    {openIndex === i && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="p-6 pt-0 text-white/60 leading-relaxed border-t border-white/5 mt-0">
                                                {faq.a}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FAQ;
