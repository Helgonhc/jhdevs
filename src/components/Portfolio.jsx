import LiveDemoViewer from './LiveDemoViewer';
import GymDemo from './demos/GymDemo';
import MechanicDemo from './demos/MechanicDemo';
import DentistDemo from './demos/DentistDemo';
import SushiDemo from './demos/SushiDemo';
import RealEstateDemo from './demos/RealEstateDemo';
import BarberDemo from './demos/BarberDemo';
import { useState } from 'react';
import { motion } from 'framer-motion';

const Portfolio = () => {
    const [viewerOpen, setViewerOpen] = useState(false);
    const [selectedDemo, setSelectedDemo] = useState(null);

    const projects = [
        {
            title: 'Clínica Sorriso Clean',
            category: 'Odontologia',
            desc: 'Site direto para agendamento de consultas via WhatsApp, com fotos reais da clínica e lista de serviços clara.',
            image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=2068&auto=format&fit=crop',
            tags: ['Agendamento', 'Google Maps'],
            component: DentistDemo
        },
        {
            title: 'Sakura Sushi',
            category: 'Gastronomia',
            desc: 'Design imersivo com fotos de alta qualidade, cardápio digital interativo e sistema de reservas de mesa.',
            image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=2070&auto=format&fit=crop',
            tags: ['Cardápio Digital', 'Reservas', 'Food Porn'],
            component: SushiDemo
        },
        {
            title: 'Horizon Estates',
            category: 'Imobiliária de Luxo',
            desc: 'Vitrine minimalista para imóveis de alto padrão, com galerias sofisticadas e busca avançada.',
            image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2071&auto=format&fit=crop',
            tags: ['Busca Avançada', 'Galeria HD', 'Luxo'],
            component: RealEstateDemo
        },
        {
            title: 'Auto Center Precisão',
            category: 'Reparo Automotivo',
            desc: 'Página de serviços com botão de orçamento rápido, lista de especialidades e integração com localização.',
            image: 'https://images.unsplash.com/photo-1486006920555-c77dcf18193c?q=80&w=1938&auto=format&fit=crop',
            tags: ['Catálogo', 'WhatsApp', 'SEO Local'],
            component: MechanicDemo
        },
        {
            title: 'Academia Corpo & Vida',
            category: 'Saúde e Lazer',
            desc: 'Landing page para apresentação dos planos, fotos das aulas e grade de horários sempre atualizada.',
            image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1470&auto=format&fit=crop',
            tags: ['Grade de Aulas', 'Planos', 'Inscrição'],
            component: GymDemo
        },
        {
            title: 'The Gentleman\'s Cut',
            category: 'Barbearia',
            desc: 'Estética vintage e robusta, focada na experiência do cliente e fidelização através do estilo.',
            image: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?q=80&w=2074&auto=format&fit=crop',
            tags: ['Estilo Vintage', 'Agendamento', 'Branding'],
            component: BarberDemo
        }
    ];

    const openDemo = (Component) => {
        setSelectedDemo(() => Component);
        setViewerOpen(true);
    };

    return (
        <section id="portfolio" className="py-24 bg-dark">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-primary font-bold tracking-widest uppercase text-sm mb-4">Galeria de Possibilidades</h2>
                    <h3 className="text-4xl md:text-5xl font-display font-black">
                        MODELOS <span className="text-primary italic">PARA INSPIRAR</span>
                    </h3>
                    <p className="text-white/40 mt-4 max-w-2xl mx-auto">
                        Veja exemplos de estruturas reais que podemos desenvolver para o seu negócio. Estes modelos servem como base para entregarmos algo único para você.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {projects.map((project, i) => (
                        <motion.div
                            key={project.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="group relative overflow-hidden rounded-[2.5rem] bg-dark-card border border-white/5 flex flex-col"
                        >
                            <div className="aspect-video overflow-hidden relative">
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10" />
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale-[30%] group-hover:grayscale-0"
                                />
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20 bg-black/40 backdrop-blur-sm">
                                    <button
                                        onClick={() => openDemo(project.component)}
                                        className="bg-primary text-dark font-bold px-6 py-3 rounded-full transform scale-90 group-hover:scale-100 transition-transform"
                                    >
                                        Ver Demonstração
                                    </button>
                                </div>
                            </div>
                            <div className="p-8 flex-1 flex flex-col">
                                <div className="mb-4">
                                    <span className="text-primary text-xs font-bold uppercase tracking-widest block mb-2">{project.category}</span>
                                    <h4 className="text-2xl font-bold">{project.title}</h4>
                                </div>
                                <p className="text-white/40 mb-6 leading-relaxed text-sm flex-1">
                                    {project.desc}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {project.tags.map(tag => (
                                        <span key={tag} className="px-3 py-1 bg-white/5 rounded-full text-[10px] font-bold uppercase tracking-wider text-white/60">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <LiveDemoViewer
                isOpen={viewerOpen}
                onClose={() => setViewerOpen(false)}
                component={selectedDemo}
            />
        </section>
    );
};

export default Portfolio;
