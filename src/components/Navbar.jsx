import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Code2, MessageSquare } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Início', href: '/' },
        { name: 'Serviços', href: '/servicos' },
        { name: 'Portfolio', href: '/portfolio' },
        { name: 'Contato', href: '/contato' },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-dark/80 backdrop-blur-md py-4' : 'bg-transparent py-6'}`}>
            <div className="container mx-auto px-6 flex justify-between items-center">
                <Link to="/" className="flex items-center gap-2 group">
                    <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                        <Code2 size={24} className="text-dark" strokeWidth={2.5} />
                    </div>
                    <span className="text-2xl font-display font-black tracking-tighter">
                        JH <span className="text-primary">DEV'S</span>
                    </span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-6">
                    {navLinks.map((link, i) => (
                        <Link
                            key={link.name}
                            to={link.href}
                            className={`text-sm font-medium transition-colors ${isActive(link.href) ? 'text-primary font-bold' : 'hover:text-primary'}`}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <div className="flex items-center gap-3 pl-4 border-l border-white/10">
                        <ThemeToggle />
                        <Link
                            to="/contato"
                            className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-dark hover:scale-110 transition-transform shadow-lg shadow-primary/20"
                        >
                            <MessageSquare size={20} strokeWidth={2.5} />
                        </Link>
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
                                <Link
                                    key={link.name}
                                    to={link.href}
                                    className={`text-lg font-medium transition-colors ${isActive(link.href) ? 'text-primary font-bold' : 'hover:text-primary'}`}
                                    onClick={() => setIsOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <Link
                                to="/contato"
                                className="btn-primary w-full mt-2 text-center"
                                onClick={() => setIsOpen(false)}
                            >
                                Começar Projeto
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
