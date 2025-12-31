import React from 'react';
import { Dumbbell, Calendar, Clock, Trophy, MapPin, Check } from 'lucide-react';

const GymDemo = ({ isMobile }) => {
    return (
        <div className="font-sans text-white bg-zinc-950 selection:bg-yellow-500 selection:text-black">
            {/* Nav */}
            <nav className="flex justify-between items-center p-6 bg-transparent absolute top-0 w-full z-10">
                <div className="text-2xl font-black italic tracking-tighter text-yellow-500">IRON<span className="text-white">FORGE</span></div>
                <button className="bg-yellow-500 text-black px-6 py-2 font-bold uppercase text-sm hover:bg-yellow-400 transition-colors">Matricule-se</button>
            </nav>

            {/* Hero */}
            <section className="relative h-[600px] flex items-center">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1470&auto=format&fit=crop')] bg-cover bg-center">
                    <div className="absolute inset-0 bg-black/60 bg-gradient-to-t from-zinc-950 via-transparent" />
                </div>
                <div className="container mx-auto px-6 relative z-10 pt-20">
                    <h1 className={`${isMobile ? 'text-4xl' : 'text-5xl md:text-7xl'} font-black italic uppercase leading-none mb-6`}>
                        Construa sua <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-600">Melhor Versão</span>
                    </h1>
                    <p className="text-zinc-300 text-lg max-w-lg mb-8">
                        Estrutura premium, equipamentos importados e acompanhamento profissional. Seu resultado começa agora.
                    </p>
                    <div className={`flex gap-4 ${isMobile ? 'flex-col' : 'flex-row'}`}>
                        <button className="bg-yellow-500 text-black px-8 py-4 font-black uppercase tracking-wider hover:bg-yellow-400 transition-transform hover:-translate-y-1">
                            Começar Agora
                        </button>
                        <button className="border border-white/20 text-white px-8 py-4 font-bold uppercase tracking-wider hover:bg-white/10 transition-colors">
                            Conhecer Planos
                        </button>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="py-20 bg-zinc-950">
                <div className="container mx-auto px-6">
                    <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-3'} gap-8`}>
                        <div className="p-8 bg-zinc-900 border-l-4 border-yellow-500">
                            <Dumbbell className="text-yellow-500 mb-4" size={40} />
                            <h3 className="text-xl font-bold uppercase mb-2">Equipamentos Hammer</h3>
                            <p className="text-zinc-400 text-sm">Maquinário importado de última geração para biomecânica perfeita.</p>
                        </div>
                        <div className="p-8 bg-zinc-900 border-l-4 border-yellow-500">
                            <Clock className="text-yellow-500 mb-4" size={40} />
                            <h3 className="text-xl font-bold uppercase mb-2">Aberto 24 Horas</h3>
                            <p className="text-zinc-400 text-sm">Treine no seu horário. Sem desculpas, sem feriados.</p>
                        </div>
                        <div className="p-8 bg-zinc-900 border-l-4 border-yellow-500">
                            <Trophy className="text-yellow-500 mb-4" size={40} />
                            <h3 className="text-xl font-bold uppercase mb-2">Treinadores Expert</h3>
                            <p className="text-zinc-400 text-sm">Equipe formada e especializada em hipertrofia e emagrecimento.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Plans */}
            <section className="py-20 bg-zinc-900">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-black italic uppercase">Nossos Planos</h2>
                    </div>
                    <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-3'} gap-8 max-w-5xl mx-auto`}>
                        {/* Card 1 */}
                        <div className="bg-zinc-950 p-8 border border-zinc-800">
                            <h3 className="text-xl font-bold text-zinc-400 uppercase">Mensal</h3>
                            <div className="text-4xl font-black text-white mt-4 mb-6">R$ 129<span className="text-sm font-normal text-zinc-500">/mês</span></div>
                            <ul className="space-y-4 mb-8">
                                <li className="flex items-center gap-2 text-zinc-300"><Check size={16} className="text-yellow-500" /> Acesso total</li>
                                <li className="flex items-center gap-2 text-zinc-300"><Check size={16} className="text-yellow-500" /> Sem taxas de adesão</li>
                            </ul>
                            <button className="w-full py-3 border border-white/20 text-white font-bold hover:bg-white/5 uppercase">Assinar</button>
                        </div>
                        {/* Card 2 Featured */}
                        <div className="bg-zinc-800 p-8 border border-yellow-500 relative transform md:-translate-y-4">
                            <div className="absolute top-0 right-0 bg-yellow-500 text-black text-xs font-bold px-3 py-1 uppercase">Mais Popular</div>
                            <h3 className="text-xl font-bold text-yellow-500 uppercase">Anual VIP</h3>
                            <div className="text-4xl font-black text-white mt-4 mb-6">R$ 89<span className="text-sm font-normal text-zinc-500">/mês</span></div>
                            <ul className="space-y-4 mb-8">
                                <li className="flex items-center gap-2 text-white"><Check size={16} className="text-yellow-500" /> Acesso total + Aulas</li>
                                <li className="flex items-center gap-2 text-white"><Check size={16} className="text-yellow-500" /> Camiseta exclusiva</li>
                                <li className="flex items-center gap-2 text-white"><Check size={16} className="text-yellow-500" /> Avaliação física grátis</li>
                            </ul>
                            <button className="w-full py-3 bg-yellow-500 text-black font-bold hover:bg-yellow-400 uppercase">Assinar Agora</button>
                        </div>
                        {/* Card 3 */}
                        <div className="bg-zinc-950 p-8 border border-zinc-800">
                            <h3 className="text-xl font-bold text-zinc-400 uppercase">Semestral</h3>
                            <div className="text-4xl font-black text-white mt-4 mb-6">R$ 109<span className="text-sm font-normal text-zinc-500">/mês</span></div>
                            <ul className="space-y-4 mb-8">
                                <li className="flex items-center gap-2 text-zinc-300"><Check size={16} className="text-yellow-500" /> Acesso total</li>
                                <li className="flex items-center gap-2 text-zinc-300"><Check size={16} className="text-yellow-500" /> Trancamento de 30 dias</li>
                            </ul>
                            <button className="w-full py-3 border border-white/20 text-white font-bold hover:bg-white/5 uppercase">Assinar</button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default GymDemo;
