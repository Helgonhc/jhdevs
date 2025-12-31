import React from 'react';
import { ChefHat, Star, Clock, MapPin, Utensils } from 'lucide-react';

const SushiDemo = ({ isMobile }) => {
    return (
        <div className="font-sans text-neutral-200 bg-neutral-900 selection:bg-red-900 selection:text-white">
            {/* Nav */}
            <nav className="flex justify-between items-center p-6 bg-neutral-900/90 backdrop-blur-md sticky top-0 z-50 border-b border-white/5">
                <div className="text-2xl font-serif tracking-widest uppercase text-white">Sakura<span className="text-red-500">.</span></div>
                <div className={`hidden md:flex gap-8 text-xs font-bold tracking-widest text-neutral-400 uppercase ${isMobile ? '!hidden' : ''}`}>
                    <a href="#" className="hover:text-red-500 transition-colors">Menu</a>
                    <a href="#" className="hover:text-red-500 transition-colors">Omakase</a>
                    <a href="#" className="hover:text-red-500 transition-colors">Reservas</a>
                </div>
                <button className="border border-red-500 text-red-500 px-6 py-2 text-xs font-bold tracking-widest uppercase hover:bg-red-500 hover:text-white transition-all">
                    Reservar Mesa
                </button>
            </nav>

            {/* Hero */}
            <section className="relative h-[700px] flex items-center justify-center text-center overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=2070&auto=format&fit=crop"
                        className="w-full h-full object-cover opacity-60"
                        alt="Sushi Background"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-black/40" />
                </div>

                <div className="relative z-10 px-6">
                    <span className="text-red-500 text-xs font-bold tracking-[0.3em] uppercase mb-4 block">Experiência Gastronômica</span>
                    <h1 className={`${isMobile ? 'text-5xl' : 'text-6xl md:text-8xl'} font-serif text-white mb-6 leading-tight`}>
                        Arte em <br />
                        <span className="italic font-light">Cada Corte</span>
                    </h1>
                    <p className="text-neutral-300 max-w-lg mx-auto mb-10 font-light leading-relaxed">
                        Ingredientes importados, peixes frescos do dia e uma tradição milenar servida com excelência no coração da cidade.
                    </p>
                    <button className="bg-white text-black px-8 py-4 text-xs font-bold tracking-widest uppercase hover:bg-neutral-200 transition-colors">
                        Ver Cardápio Completo
                    </button>
                </div>
            </section>

            {/* Highlights */}
            <section className="py-24 bg-neutral-900">
                <div className="container mx-auto px-6">
                    <div className={`grid ${isMobile ? 'grid-cols-1 gap-10' : 'grid-cols-1 md:grid-cols-2 gap-16'} items-center`}>
                        <div>
                            <img
                                src="https://images.unsplash.com/photo-1617196034438-63563218fe9b?q=80&w=2070&auto=format&fit=crop"
                                className="rounded-sm shadow-2xl shadow-red-900/10 grayscale hover:grayscale-0 transition-all duration-700"
                                alt="Chef"
                            />
                        </div>
                        <div>
                            <h2 className={`${isMobile ? 'text-3xl' : 'text-4xl'} font-serif text-white mb-6`}>O Chef</h2>
                            <p className="text-neutral-400 mb-6 leading-relaxed">
                                Com mais de 20 anos de experiência em Tóquio, o Chef Kenji traz para o Brasil a autêntica culinária Kaiseki. Cada prato é uma obra de arte pensada para despertar todos os sentidos.
                            </p>
                            <div className="flex gap-8 border-t border-white/10 pt-8">
                                <div>
                                    <div className="text-3xl font-serif text-red-500 mb-1">20+</div>
                                    <div className="text-xs uppercase tracking-widest text-neutral-500">Anos de Experiência</div>
                                </div>
                                <div>
                                    <div className="text-3xl font-serif text-red-500 mb-1">3</div>
                                    <div className="text-xs uppercase tracking-widest text-neutral-500">Estrelas Michelin</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Menu Grid */}
            <section className="py-24 bg-neutral-950">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <span className="text-red-500 text-xs font-bold tracking-[0.2em] uppercase">Nossos Favoritos</span>
                        <h2 className={`${isMobile ? 'text-3xl' : 'text-4xl'} font-serif text-white mt-4`}>Menu Degustação</h2>
                    </div>

                    <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-3'} gap-8`}>
                        {[
                            { title: 'Sashimi Premium', price: 'R$ 180', img: 'https://images.unsplash.com/photo-1534482421-64566f976cfa?q=80&w=2069&auto=format&fit=crop' },
                            { title: 'Nigiri Selection', price: 'R$ 145', img: 'https://images.unsplash.com/photo-1553621042-f6e147245754?q=80&w=1925&auto=format&fit=crop' },
                            { title: 'Wagyu Beef', price: 'R$ 290', img: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=2069&auto=format&fit=crop' }
                        ].map((item, i) => (
                            <div key={i} className="group cursor-pointer">
                                <div className="overflow-hidden mb-6 relative h-[300px]">
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10" />
                                    <img src={item.img} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" alt={item.title} />
                                </div>
                                <div className="flex justify-between items-end border-b border-white/10 pb-4">
                                    <h3 className="text-xl font-serif text-white">{item.title}</h3>
                                    <span className="text-red-500 font-serif italic text-lg">{item.price}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default SushiDemo;
