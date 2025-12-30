import React from 'react';
import { motion } from 'framer-motion';
import { Tag } from 'lucide-react';

const Portfolio = () => {
    const projects = [
        {
            title: 'Clínica Sorriso Clean',
            category: 'Odontologia',
            desc: 'Site direto para agendamento de consultas via WhatsApp, com fotos reais da clínica e lista de serviços clara para o paciente.',
            image: '/portfolio/health.png',
            tags: ['Agendamento', 'Fotos Reais', 'Google Maps']
        },
        {
            title: 'Marins Advocacia & Associados',
            category: 'Direito Civil',
            desc: 'Site focado em autoridade técnica, com blog para artigos e área de contato rápida para consultoria jurídica inicial.',
            image: '/portfolio/legal.png',
            tags: ['Blog de Conteúdo', 'Formulário Direto', 'Mobile']
        },
        {
            title: 'Auto Center Precisão',
            category: 'Reparo Automotivo',
            desc: 'Página de serviços com botão de orçamento rápido, lista de especialidades e integração com localização para o cliente chegar fácil.',
            image: '/portfolio/mechanic.png',
            tags: ['Catálogo de Serviços', 'WhatsApp', 'SEO Local']
        },
        {
            title: 'Academia Corpo & Vida',
            category: 'Saúde e Lazer',
            desc: 'Landing page para apresentação dos planos, fotos das aulas e grade de horários sempre atualizada para os alunos.',
            image: '/portfolio/fitness.png',
            tags: ['Grade de Aulas', 'Planos de Preços', 'Inscrição']
        }
    ];

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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {projects.map((project, i) => (
                        <motion.div
                            key={project.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="group relative overflow-hidden rounded-[2.5rem] bg-dark-card border border-white/5"
                        >
                            <div className="aspect-video overflow-hidden">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale-[50%] group-hover:grayscale-0"
                                />
                            </div>
                            <div className="p-8">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <span className="text-primary text-xs font-bold uppercase tracking-widest block mb-2">{project.category}</span>
                                        <h4 className="text-2xl font-bold">{project.title}</h4>
                                    </div>
                                </div>
                                <p className="text-white/40 mb-6 leading-relaxed">
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
        </section>
    );
};

export default Portfolio;
