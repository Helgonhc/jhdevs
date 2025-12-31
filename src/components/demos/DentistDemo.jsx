import React from 'react';
import { Calendar, Star, Smile, Clock, MapPin } from 'lucide-react';

const DentistDemo = ({ isMobile }) => {
    return (
        <div className="font-sans text-slate-600 bg-white">
            {/* Nav */}
            <nav className="flex justify-between items-center p-6 container mx-auto bg-white/80 backdrop-blur-md sticky top-0 z-50">
                <div className="text-2xl font-semibold text-teal-600 tracking-wide">Dr. Sorriso<span className="text-slate-400 font-light">.Clean</span></div>
                <div className={`hidden md:flex gap-8 text-sm font-medium text-slate-500 ${isMobile ? '!hidden' : ''}`}>
                    <a href="#" className="hover:text-teal-600">Tratamentos</a>
                    <a href="#" className="hover:text-teal-600">Corpo Clínico</a>
                    <a href="#" className="hover:text-teal-600">Estrutura</a>
                </div>
                <button className="bg-teal-500 text-white px-6 py-2 rounded-full font-medium shadow-lg shadow-teal-500/30 hover:bg-teal-600 transition-all text-sm">
                    Agendar Consulta
                </button>
            </nav>

            {/* Hero */}
            <section className={`container mx-auto px-6 py-12 md:py-20 flex flex-col md:flex-row items-center gap-12 ${isMobile ? 'flex-col' : ''}`}>
                <div className="flex-1 space-y-6">
                    <span className="inline-block px-4 py-1 rounded-full bg-teal-50 text-teal-600 text-xs font-bold tracking-wider uppercase">Odontologia Estética</span>
                    <h1 className={`${isMobile ? 'text-4xl' : 'text-5xl md:text-6xl'} font-serif text-slate-800 leading-tight`}>
                        Transforme seu sorriso com <span className="text-teal-500 italic">segurança</span> e conforto.
                    </h1>
                    <p className="text-slate-400 text-lg leading-relaxed max-w-md">
                        Tecnologia de ponta em implantes e lentes de contato dental. Recupere sua autoestima em poucas sessões.
                    </p>
                    <div className={`flex flex-col sm:flex-row gap-4 pt-4 ${isMobile ? 'flex-col' : ''}`}>
                        <button className="bg-slate-800 text-white px-8 py-3 rounded-lg font-medium hover:bg-slate-700 transition-colors">
                            Ver Antes e Depois
                        </button>
                        <div className="flex items-center gap-2 px-4 py-3">
                            <div className="flex -space-x-2">
                                {[1, 2, 3].map(i => <div key={i} className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white" />)}
                            </div>
                            <span className="text-xs font-bold text-slate-500">+2.000 Sorrisos</span>
                        </div>
                    </div>
                </div>
                <div className="flex-1 relative">
                    <div className="absolute inset-0 bg-teal-100 rounded-full filter blur-3xl opacity-30 transform translate-x-10 translate-y-10" />
                    <img
                        src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=2070&auto=format&fit=crop"
                        alt="Sorriso Perfeito"
                        className="relative rounded-[3rem] shadow-2xl object-cover w-full h-[500px]"
                    />
                    <div className="absolute bottom-10 left-[-20px] bg-white p-4 rounded-xl shadow-xl flex items-center gap-4 animate-bounce">
                        <div className="bg-yellow-100 p-2 rounded-full text-yellow-600">
                            <Star size={20} fill="currentColor" />
                        </div>
                        <div>
                            <div className="font-bold text-slate-800">5 Estrelas</div>
                            <div className="text-xs text-slate-400">Google Reviews</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Info */}
            <section className="bg-slate-50 py-20">
                <div className={`container mx-auto px-6 grid ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-3'} gap-8 text-center`}>
                    <div className="p-6">
                        <div className="w-16 h-16 bg-white mx-auto rounded-full shadow-sm flex items-center justify-center text-teal-500 mb-4">
                            <Smile size={32} />
                        </div>
                        <h3 className="font-serif text-xl text-slate-800 mb-2">Sem Dor</h3>
                        <p className="text-sm text-slate-400">Anestesia computadorizada e sedação consciente para seu conforto.</p>
                    </div>
                    <div className="p-6">
                        <div className="w-16 h-16 bg-white mx-auto rounded-full shadow-sm flex items-center justify-center text-teal-500 mb-4">
                            <Clock size={32} />
                        </div>
                        <h3 className="font-serif text-xl text-slate-800 mb-2">Rapidez</h3>
                        <p className="text-sm text-slate-400">Protocolos digitais que reduzem o tempo de tratamento pela metade.</p>
                    </div>
                    <div className="p-6">
                        <div className="w-16 h-16 bg-white mx-auto rounded-full shadow-sm flex items-center justify-center text-teal-500 mb-4">
                            <MapPin size={32} />
                        </div>
                        <h3 className="font-serif text-xl text-slate-800 mb-2">Localização</h3>
                        <p className="text-sm text-slate-400">Estacionamento próprio e fácil acesso no centro da cidade.</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default DentistDemo;
