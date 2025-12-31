import React from 'react';
import { Scissors, Calendar, User, Clock, Watch } from 'lucide-react';

const BarberDemo = ({ isMobile }) => {
    return (
        <div className="font-sans text-neutral-800 bg-[#E8E6E1]">
            {/* Header */}
            <nav className="flex justify-between items-center p-6 container mx-auto">
                <div className="flex flex-col items-center leading-none">
                    <span className="text-xs uppercase tracking-[0.4em] font-bold text-neutral-500">Est. 2018</span>
                    <span className="text-2xl font-black uppercase tracking-tighter text-neutral-900">Gentleman's</span>
                    <span className="text-xs font-serif italic text-neutral-600">Barber Shop</span>
                </div>
                <button className={`border-2 border-neutral-900 px-6 py-2 font-bold uppercase text-sm hover:bg-neutral-900 hover:text-[#E8E6E1] transition-colors ${isMobile ? 'text-xs px-4' : ''}`}>
                    Agendar
                </button>
            </nav>

            {/* Hero */}
            <section className={`container mx-auto px-6 py-12 md:py-20 flex flex-col md:flex-row items-center gap-12 ${isMobile ? 'flex-col' : ''}`}>
                <div className="flex-1 space-y-6">
                    <h1 className={`${isMobile ? 'text-4xl' : 'text-5xl md:text-7xl'} font-black text-neutral-900 uppercase leading-[0.9]`}>
                        Corte <br />
                        Clássico, <br />
                        <span className="text-orange-700">Estilo Moderno</span>
                    </h1>
                    <p className="text-neutral-600 text-lg leading-relaxed max-w-sm border-l-4 border-orange-700 pl-6">
                        Resgatando a tradição da barbearia clássica com toalha quente, navalha e cerveja gelada.
                    </p>
                    <div className="pt-8">
                        <div className="inline-flex items-center gap-4 bg-white p-4 shadow-lg rounded-sm">
                            <div className="bg-neutral-100 p-3 rounded-full">
                                <Calendar size={24} className="text-orange-700" />
                            </div>
                            <div>
                                <div className="text-xs font-bold uppercase text-neutral-400">Próximo Horário</div>
                                <div className="font-bold text-neutral-900">Hoje, 14:30</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex-1 relative">
                    <div className="absolute top-4 right-4 w-full h-full border-4 border-neutral-900 z-0 transform translate-x-4 translate-y-4" />
                    <img
                        src="https://images.unsplash.com/photo-1585747860715-2ba37e788b70?q=80&w=2074&auto=format&fit=crop"
                        alt="Barber"
                        className="relative z-10 w-full h-[600px] object-cover filter sepia-[0.3] contrast-125 grayscale-[0.2]"
                    />
                </div>
            </section>

            {/* Services List */}
            <section className="bg-neutral-900 text-[#E8E6E1] py-24">
                <div className="container mx-auto px-6">
                    <div className="max-w-2xl mx-auto">
                        <div className="text-center mb-16">
                            <Scissors className="mx-auto text-orange-600 mb-4" size={40} />
                            <h2 className="text-4xl font-black uppercase tracking-wide">Nossos Serviços</h2>
                        </div>

                        <ul className="space-y-8">
                            {[
                                { name: 'Corte de Cabelo', desc: 'Tesoura ou máquina, acabamento na navalha', price: 'R$ 60' },
                                { name: 'Barba Terapia', desc: 'Toalha quente, massagem facial e hidratação', price: 'R$ 50' },
                                { name: 'Combo Gentleman', desc: 'Cabelo + Barba + Bebida Cortesia', price: 'R$ 100' },
                                { name: 'Pezinho e Sobrancelha', desc: 'Acabamento fino e alinhamento', price: 'R$ 30' }
                            ].map((service, i) => (
                                <li key={i} className="flex justify-between items-start border-b border-neutral-800 pb-6 group hover:border-orange-700 transition-colors cursor-default">
                                    <div>
                                        <h3 className="text-xl font-bold uppercase mb-1 group-hover:text-orange-600 transition-colors">{service.name}</h3>
                                        <p className="text-neutral-500 font-serif italic text-sm">{service.desc}</p>
                                    </div>
                                    <span className="text-2xl font-black">{service.price}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default BarberDemo;
