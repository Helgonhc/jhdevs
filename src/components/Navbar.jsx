import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Code2, MessageSquare } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Início', href: '#home' },
        { name: 'Nichos', href: '#niches' },
        { name: 'Serviços', href: '#services' },
        { name: 'Modelos', href: '#portfolio' },
        { name: 'Depoimentos', href: '#testimonials' },
    ];

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-dark/80 backdrop-blur-md py-4' : 'bg-transparent py-6'}`}>
            <div className="container mx-auto px-6 flex justify-between items-center">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-2"
                >
                    <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                        <Code2 size={24} className="text-dark" strokeWidth={2.5} />
                    </div>
                    <span className="text-2xl font-display font-black tracking-tighter">
                        JH <span className="text-primary">DEV'S</span>
                    </span>
                </motion.div>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-6">
                    {navLinks.map((link, i) => (
                        <motion.a
                            key={link.name}
                            href={link.href}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="text-sm font-medium hover:text-primary transition-colors"
                        >
                            {link.name}
                        </motion.a>
                    ))}
                    <div className="flex items-center gap-3 pl-4 border-l border-white/10">
                        <ThemeToggle />
                        <motion.a
                            href="https://wa.me/5531993338026"
                            target="_blank"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-dark hover:scale-110 transition-transform shadow-lg shadow-primary/20"
                            title="(31) 99333-8026"
                        >
                            <MessageSquare size={20} strokeWidth={2.5} />
                        </motion.a>
                    </div>
                </div>

                {/* Mobile Toggle */}
                <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-dark-surface border-b border-white/10"
                    >
                        <div className="flex flex-col p-6 gap-4">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className="text-lg font-medium hover:text-primary transition-colors"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {link.name}
                                </a>
                            ))}
                            <a
                                href="https://wa.me/5531993338026"
                                target="_blank"
                                className="btn-primary w-full mt-2 text-center"
                            >
                                Começar Projeto
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
