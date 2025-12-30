import React from 'react';
import { motion } from 'framer-motion';
import { Laptop, Smartphone, Globe, BarChart3, ShieldCheck, Rocket, X, ExternalLink } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';

const Services = () => {
    const [selectedService, setSelectedService] = React.useState(null);

    const services = [
        {
            id: 'lp',
            title: 'Landing Pages de Alta Conversão',
            icon: Rocket,
            desc: 'Páginas otimizadas para transformar visitantes em clientes reais. Foco total em ROI.',
            features: ['Copywriter persuasiva', 'Design exclusivo', 'Mobile First'],
            models: [
                { name: 'Dr. Silva - Dentista', img: '/portfolio/health.png' },
                { name: 'Marins Advogados', img: '/portfolio/legal.png' },
                { name: 'Academia Fit', img: '/portfolio/fitness.png' }
            ]
        },
        {
            id: 'site',
            title: 'Sites Institucionais',
            icon: Globe,
            desc: 'Sua empresa com uma presença digital sólida, profissional e de extrema autoridade.',
            features: ['Blog integrado', 'Multilingue', 'Gestão de Conteúdo'],
            models: [
                { name: 'Portal Construtora X', img: '/portfolio/site_corp.png' },
                { name: 'Consultoria Financeira Y', img: '/portfolio/legal.png' }
            ]
        },
        {
            id: 'app',
            title: 'Aplicativos Mobile',
            icon: Smartphone,
            desc: 'Soluções iOS e Android personalizadas para automatizar e escalar seu negócio.',
            features: ['UX/UI Premium', 'Notificações Push', 'Offline Mode'],
            models: [
                { name: 'Auto Center Precisão', img: '/portfolio/mechanic.png' },
                { name: 'App Fitness Premium', img: '/portfolio/fitness.png' }
            ]
        },
        {
            id: 'ads',
            title: 'SEO & Tráfego Pago',
            icon: BarChart3,
            desc: 'Apareça na primeira página do Google e atraia o público certo para seus serviços.',
            features: ['Google Meu Negócio', 'Audit SEO', 'Meta Ads'],
            models: [
                { name: 'Relatório Performance Ads', img: '/portfolio/ads_results.png' },
                { name: 'Resultados SEO Local', img: '/portfolio/seo_local.png' }
            ]
        }
    ];

    return (
        <section id="services" className="py-24 relative">
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row justify-between items-end mb-16 gap-8">
                    <div className="max-w-2xl">
                        <h2 className="text-primary font-bold tracking-widest uppercase text-sm mb-4">O que fazemos</h2>
                        <h3 className="text-4xl md:text-5xl font-display font-black">
                            SOLUÇÕES REAIS PARA <span className="text-primary">PROBLEMAS REAIS</span>.
                        </h3>
                    </div>
                    <p className="text-white/40 max-w-sm mb-2">
                        Tecnologia de ponta com foco total nos resultados do seu negócio.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {services.map((service, i) => (
                        <motion.div
                            key={service.title}
                            initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            onClick={() => setSelectedService(service)}
                            className="group p-8 bg-dark-surface border border-white/5 rounded-3xl hover:bg-dark-card transition-all duration-500 cursor-pointer"
                        >
                            <div className="flex flex-col md:flex-row gap-8">
                                <div className="w-16 h-16 shrink-0 bg-primary/10 rounded-2xl flex items-center justify-center group-hover:bg-primary transition-colors">
                                    <service.icon size={32} className="text-primary group-hover:text-dark transition-colors" />
                                </div>
                                <div>
                                    <h4 className="text-2xl font-bold mb-4">{service.title}</h4>
                                    <p className="text-white/60 mb-6 leading-relaxed">
                                        {service.desc}
                                    </p>
                                    <div className="mt-6 flex items-center justify-between">
                                        <div className="flex flex-wrap gap-2">
                                            {service.features.slice(0, 2).map(feature => (
                                                <span key={feature} className="px-2 py-1 bg-white/5 rounded-md text-[10px] text-white/40 uppercase font-bold">
                                                    {feature}
                                                </span>
                                            ))}
                                        </div>
                                        <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wider group-hover:translate-x-1 transition-transform">
                                            Ver modelos <ExternalLink size={14} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <AnimatePresence>
                {selectedService && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedService(null)}
                            className="absolute inset-0 bg-dark/95 backdrop-blur-xl"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="relative w-full max-w-5xl bg-dark-card border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl"
                        >
                            <div className="flex flex-col md:flex-row h-full max-h-[85vh]">
                                <div className="w-full md:w-1/3 p-8 border-b md:border-b-0 md:border-r border-white/5 bg-white/2">
                                    <button
                                        onClick={() => setSelectedService(null)}
                                        className="mb-8 w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:text-dark transition-all"
                                    >
                                        <X size={20} />
                                    </button>
                                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                                        <selectedService.icon size={32} className="text-primary" />
                                    </div>
                                    <h4 className="text-3xl font-black mb-4">{selectedService.title}</h4>
                                    <p className="text-white/60 mb-8">{selectedService.desc}</p>
                                    <h5 className="text-sm font-bold uppercase tracking-wider text-white/40 mb-4">Garantias JH DEV'S</h5>
                                    <ul className="space-y-3">
                                        {selectedService.features.map(f => (
                                            <li key={f} className="flex items-center gap-3 text-sm text-white/60 font-medium">
                                                <ShieldCheck size={18} className="text-primary" />
                                                {f}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="w-full md:w-2/3 p-8 overflow-y-auto">
                                    <h5 className="text-xl font-bold mb-6">Modelos <span className="text-primary italic">Fictícios</span></h5>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        {selectedService.models.map((model, i) => (
                                            <motion.div
                                                key={model.name}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: i * 0.1 }}
                                                className="group aspect-[4/3] relative rounded-2xl overflow-hidden bg-white/5 border border-white/5"
                                            >
                                                <img src={model.img} alt={model.name} className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-500 scale-105 group-hover:scale-100" />
                                                <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-dark/90 to-transparent">
                                                    <p className="text-sm font-bold text-white uppercase tracking-wider">{model.name}</p>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                    <div className="mt-8 p-6 rounded-2xl bg-primary/5 border border-primary/10">
                                        <p className="text-sm text-white/60 mb-4">Estes são apenas modelos estruturais. Cada projeto é feito sob medida do zero para a sua necessidade.</p>
                                        <a href="https://wa.me/5531993338026" target="_blank" className="btn-primary inline-flex">Falar com Desenvolvedor</a>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Services;
