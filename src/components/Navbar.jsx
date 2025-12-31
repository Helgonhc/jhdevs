import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Code2, MessageSquare } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [user, setUser] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const checkUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
        };
        checkUser();

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
                    <img src="/logo.png" alt="JH DEV'S LOGO" className="h-14 w-auto object-contain transition-transform group-hover:scale-105" />
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

                        {/* WhatsApp Button */}
                        <a
                            href="https://wa.me/5531993338026"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform shadow-lg shadow-green-500/20"
                            title="WhatsApp Suporte"
                        >
                            <MessageSquare size={20} />
                        </a>

                        {/* Admin Link (Only for Helgon) */}
                        {user?.email === 'helgonhc19@yahoo.com.br' && (
                            <Link
                                to="/admin-login"
                                className="text-[10px] font-black uppercase tracking-widest text-primary/50 hover:text-primary transition-colors pr-2"
                            >
                                GESTÃO
                            </Link>
                        )}

                        <Link
                            to={user ? "/dashboard" : "/login"}
                            className="bg-primary hover:bg-primary-hover text-dark px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg shadow-primary/20"
                        >
                            ÁREA DO CLIENTE
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
                            <div className="flex flex-col gap-3 pt-4 border-t border-white/5">
                                <a
                                    href="https://wa.me/5531993338026"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-3 bg-green-500 text-white py-4 rounded-xl font-bold"
                                    onClick={() => setIsOpen(false)}
                                >
                                    <MessageSquare size={20} /> WhatsApp Suporte
                                </a>
                                <Link
                                    to={user ? "/dashboard" : "/login"}
                                    className="bg-primary text-dark py-4 rounded-xl font-bold text-center uppercase tracking-widest text-xs"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Área do Cliente
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
