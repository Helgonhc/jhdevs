import React from 'react';
import { motion } from 'framer-motion';
import { Github, Instagram, Linkedin, Code2 } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="py-12 border-t border-white/5">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
                            <Code2 size={18} className="text-primary" />
                        </div>
                        <span className="text-xl font-display font-black tracking-tighter">
                            JH <span className="text-primary">DEV'S</span>
                        </span>
                    </div>

                    <div className="text-white/40 text-sm">
                        © {new Date().getFullYear()} JH DEV'S. Todos os direitos reservados.
                    </div>

                    <div className="flex items-center gap-6">
                        <a href="#" className="text-white/40 hover:text-primary transition-colors"><Github size={20} /></a>
                        <a href="#" className="text-white/40 hover:text-primary transition-colors"><Instagram size={20} /></a>
                        <a href="#" className="text-white/40 hover:text-primary transition-colors"><Linkedin size={20} /></a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
