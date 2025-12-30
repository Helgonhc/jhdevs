import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Mail, MapPin, ArrowUpRight } from 'lucide-react';

const Contact = () => {
    return (
        <section id="contact" className="py-24 relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 blur-[150px] rounded-full" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="bg-dark-card border border-white/10 rounded-[3rem] p-8 md:p-16">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                        <div>
                            <h2 className="text-primary font-bold tracking-widest uppercase text-sm mb-4">Contato</h2>
                            <h3 className="text-4xl md:text-6xl font-display font-black mb-8 leading-tight">
                                VAMOS TIRAR SEU <span className="text-primary">PROJETO</span> DO PAPEL?
                            </h3>
                            <p className="text-white/60 text-lg mb-12 max-w-md">
                                Preencha o formulário ou fale diretamente comigo pelo WhatsApp para uma consultoria gratuita.
                            </p>

                            <div className="space-y-6">
                                <a href="https://wa.me/5531993338026" target="_blank" className="flex items-center gap-4 group">
                                    <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center group-hover:bg-primary group-hover:text-dark transition-all">
                                        <MessageSquare size={20} />
                                    </div>
                                    <div>
                                        <div className="text-sm text-white/40 font-bold uppercase tracking-wider">WhatsApp</div>
                                        <div className="text-lg font-bold group-hover:text-primary transition-colors">(31) 99333-8026</div>
                                    </div>
                                </a>

                                <div className="flex items-center gap-4 group">
                                    <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center">
                                        <Mail size={20} className="text-primary" />
                                    </div>
                                    <div>
                                        <div className="text-sm text-white/40 font-bold uppercase tracking-wider">E-mail</div>
                                        <div className="text-lg font-bold">contato@jhdev.com.br</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white/5 p-8 rounded-3xl border border-white/10">
                            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-bold text-white/40 mb-2 uppercase">Nome</label>
                                        <input type="text" className="w-full bg-dark/50 border border-white/10 rounded-xl px-4 py-3 focus:border-primary outline-none transition-colors" placeholder="Seu nome" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-white/40 mb-2 uppercase">Telefone</label>
                                        <input type="text" className="w-full bg-dark/50 border border-white/10 rounded-xl px-4 py-3 focus:border-primary outline-none transition-colors" placeholder="(99) 99999-9999" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-white/40 mb-2 uppercase">Assunto</label>
                                    <select className="w-full bg-dark/50 border border-white/10 rounded-xl px-4 py-3 focus:border-primary outline-none transition-colors appearance-none">
                                        <option>Landing Page</option>
                                        <option>Site Institucional</option>
                                        <option>Aplicativo Mobile</option>
                                        <option>Outro</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-white/40 mb-2 uppercase">Mensagem</label>
                                    <textarea rows="4" className="w-full bg-dark/50 border border-white/10 rounded-xl px-4 py-3 focus:border-primary outline-none transition-colors" placeholder="Conte-me sobre seu projeto..."></textarea>
                                </div>
                                <button className="btn-primary w-full py-4 flex items-center justify-center gap-2">
                                    Enviar Mensagem
                                    <ArrowUpRight size={20} />
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
