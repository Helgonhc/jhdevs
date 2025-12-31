import React from 'react';
import { Settings, Phone, MapPin, Wrench, ShieldCheck, Car } from 'lucide-react';

const MechanicDemo = ({ isMobile }) => {
    return (
        <div className="font-sans text-slate-800 bg-slate-50">
            {/* Header */}
            <header className="bg-white shadow-sm sticky top-0 z-50">
                <div className="container mx-auto px-6 h-20 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <div className="bg-blue-600 p-2 rounded text-white">
                            <Settings size={24} />
                        </div>
                        <span className="text-2xl font-bold text-slate-900 tracking-tight">AUTO<span className="text-blue-600">CENTRO</span></span>
                    </div>
                    <div className={`hidden md:flex items-center gap-8 font-medium text-sm ${isMobile ? '!hidden' : ''}`}>
                        <a href="#" className="hover:text-blue-600">Serviços</a>
                        <a href="#" className="hover:text-blue-600">Sobre</a>
                        <a href="#" className="hover:text-blue-600">Avaliações</a>
                    </div>
                    <button className="flex items-center gap-2 bg-green-500 text-white px-5 py-2.5 rounded-full font-bold hover:bg-green-600 transition-colors shadow-lg shadow-green-500/20">
                        <Phone size={18} />
                        (11) 99999-9999
                    </button>
                </div>
            </header>

            {/* Hero */}
            <section className="bg-slate-900 text-white py-24 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/2 h-full opacity-20">
                    <img src="https://images.unsplash.com/photo-1487754180451-c456f719a1fc?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover" />
                </div>
                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-2xl">
                        <div className="inline-block bg-blue-600/20 text-blue-400 font-bold px-3 py-1 rounded-full text-xs mb-6 border border-blue-500/30">
                            OFICINA ESPECIALIZADA EM IMPORTADOS
                        </div>
                        <h1 className={`${isMobile ? 'text-4xl' : 'text-5xl md:text-6xl'} font-bold leading-tight mb-6`}>
                            Seu Carro em Mãos de <span className="text-blue-500">Especialistas.</span>
                        </h1>
                        <p className="text-slate-400 text-lg mb-8 leading-relaxed max-w-lg">
                            Diagnóstico computadorizado, mecânica geral e estética automotiva. Garantia de serviço e peças originais.
                        </p>
                        <div className={`flex gap-4 ${isMobile ? 'flex-col' : 'flex-col sm:flex-row'}`}>
                            <button className="bg-blue-600 text-white px-8 py-4 rounded-lg font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20">
                                Agendar Revisão
                            </button>
                            <button className="bg-white/10 text-white px-8 py-4 rounded-lg font-bold hover:bg-white/20 transition-colors backdrop-blur-sm">
                                Socorro 24h
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Grid */}
            <section className="py-24">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-slate-900 mb-4">Serviços Completos</h2>
                        <p className="text-slate-500 max-w-2xl mx-auto">Tudo que seu veículo precisa em um só lugar, com transparência e preço justo.</p>
                    </div>

                    <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-3'} gap-8`}>
                        {/* Service 1 */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:border-blue-200 transition-colors group">
                            <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                <Wrench size={28} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">Mecânica Geral</h3>
                            <p className="text-slate-500 leading-relaxed mb-4">Motor, suspensão, freios e escapamento. Manutenção preventiva e corretiva.</p>
                            <a href="#" className="text-blue-600 font-bold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">Saiba mais →</a>
                        </div>
                        {/* Service 2 */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:border-blue-200 transition-colors group">
                            <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                <ShieldCheck size={28} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">Revisão Oficial</h3>
                            <p className="text-slate-500 leading-relaxed mb-4">Seguimos o checklist da montadora para manter a garantia do seu veículo.</p>
                            <a href="#" className="text-blue-600 font-bold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">Saiba mais →</a>
                        </div>
                        {/* Service 3 */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:border-blue-200 transition-colors group">
                            <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                <Car size={28} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">Estética & Detalhe</h3>
                            <p className="text-slate-500 leading-relaxed mb-4">Polimento, vitrificação e higienização interna para seu carro parecer novo.</p>
                            <a href="#" className="text-blue-600 font-bold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">Saiba mais →</a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Booking CTA */}
            <section className="bg-blue-600 py-16 text-white text-center">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-bold mb-6">Precisa de um orçamento rápido?</h2>
                    <p className="text-blue-100 mb-8 max-w-xl mx-auto">Envie uma foto do problema ou descreva o que está acontecendo. Respondemos em até 10 minutos.</p>
                    <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-bold hover:bg-slate-100 transition-colors shadow-lg">
                        Falar no WhatsApp
                    </button>
                </div>
            </section>
        </div>
    );
};

export default MechanicDemo;
