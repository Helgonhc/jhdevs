import React from 'react';
import { Home, Key, Search, Map, ArrowRight } from 'lucide-react';

const RealEstateDemo = ({ isMobile }) => {
    return (
        <div className="font-sans text-slate-800 bg-white selection:bg-slate-200">
            {/* Header */}
            <header className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 border-b border-slate-100">
                <div className="container mx-auto px-6 h-20 flex justify-between items-center">
                    <div className="text-2xl font-light tracking-widest uppercase">Horizon<span className="font-bold">Estates</span></div>
                    <div className={`hidden md:flex gap-8 text-sm font-medium text-slate-500 ${isMobile ? '!hidden' : ''}`}>
                        <a href="#" className="hover:text-black transition-colors">Comprar</a>
                        <a href="#" className="hover:text-black transition-colors">Alugar</a>
                        <a href="#" className="hover:text-black transition-colors">Lançamentos</a>
                    </div>
                    <button className="bg-black text-white px-6 py-2.5 rounded-none hover:bg-slate-800 transition-colors text-sm uppercase tracking-wide">
                        Área do Cliente
                    </button>
                </div>
            </header>

            {/* Hero */}
            <section className="relative h-screen flex items-center">
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2071&auto=format&fit=crop"
                        className="w-full h-full object-cover"
                        alt="Luxury Home"
                    />
                    <div className="absolute inset-0 bg-black/20" />
                </div>

                <div className="container mx-auto px-6 relative z-10 mt-20">
                    <div className={`bg-white/95 backdrop-blur-sm ${isMobile ? 'p-6' : 'p-8 md:p-12'} max-w-xl shadow-2xl rounded-sm`}>
                        <span className="text-xs font-bold tracking-widest text-slate-500 uppercase mb-4 block">Imóveis de Alto Padrão</span>
                        <h1 className={`${isMobile ? 'text-3xl' : 'text-4xl md:text-5xl'} font-light leading-tight mb-6 text-slate-900`}>
                            Encontre a casa <br />
                            <span className="font-bold">dos seus sonhos.</span>
                        </h1>

                        <div className="flex flex-col gap-4">
                            <div className="bg-slate-50 border border-slate-200 p-2 flex items-center">
                                <Search className="text-slate-400 ml-2" size={20} />
                                <input
                                    type="text"
                                    placeholder="Cidade, bairro ou condomínio..."
                                    className="w-full bg-transparent border-none focus:ring-0 p-2 text-sm text-slate-700 placeholder:text-slate-400 outline-none"
                                />
                            </div>
                            <button className="bg-black text-white w-full py-4 uppercase tracking-widest text-sm font-bold hover:bg-slate-800 transition-colors">
                                Buscar Imóveis
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured */}
            <section className="py-24 bg-slate-50">
                <div className="container mx-auto px-6">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <h2 className="text-3xl font-light text-slate-900 mb-2">Destaques Exclusivos</h2>
                            <p className="text-slate-500">Curadoria fina dos melhores imóveis da região.</p>
                        </div>
                        <a href="#" className={`hidden md:flex items-center gap-2 text-sm font-bold uppercase tracking-wide hover:text-slate-600 ${isMobile ? '!hidden' : ''}`}>
                            Ver Todos <ArrowRight size={16} />
                        </a>
                    </div>

                    <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-3'} gap-8`}>
                        {[
                            { title: 'Mansão Alphaville', price: 'R$ 12.500.000', img: 'https://images.unsplash.com/photo-1613545325278-f24b0cae1224?q=80&w=2070&auto=format&fit=crop', spec: '5 Suítes • 800m²' },
                            { title: 'Penthouse Jardins', price: 'R$ 8.900.000', img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop', spec: '4 Suítes • 450m²' },
                            { title: 'Casa de Campo', price: 'R$ 5.200.000', img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop', spec: '4 Suítes • 2000m²' }
                        ].map((item, i) => (
                            <div key={i} className="bg-white group cursor-pointer hover:shadow-xl transition-shadow duration-300">
                                <div className="relative overflow-hidden aspect-[4/3]">
                                    <div className="absolute top-4 left-4 bg-black text-white text-[10px] font-bold px-3 py-1 uppercase z-10 tracking-wider">Venda</div>
                                    <img src={item.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={item.title} />
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-medium text-slate-900 mb-1">{item.title}</h3>
                                    <p className="text-xs text-slate-500 uppercase tracking-wide mb-4">{item.spec}</p>
                                    <div className="flex justify-between items-center border-t border-slate-100 pt-4">
                                        <span className="font-bold text-slate-900">{item.price}</span>
                                        <button className="text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-black">Detalhes</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default RealEstateDemo;
