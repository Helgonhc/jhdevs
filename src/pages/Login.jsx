import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { motion, AnimatePresence } from 'framer-motion';
import { LogIn, Mail, Lock, AlertCircle, UserPlus, ArrowRight, RefreshCw } from 'lucide-react';

const Login = () => {
    const [isSignUp, setIsSignUp] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            if (isSignUp) {
                const { error: signUpError } = await supabase.auth.signUp({
                    email,
                    password,
                    options: {
                        data: { full_name: fullName }
                    }
                });
                if (signUpError) throw signUpError;
                alert("Conta criada com sucesso! Faça login agora.");
                setIsSignUp(false);
            } else {
                const { error: signInError } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                });
                if (signInError) throw signInError;
                navigate('/dashboard');
            }
        } catch (err) {
            setError(err.message);
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center p-6 relative overflow-hidden">
            {/* Background Glows */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,#7CFF0108_0%,transparent_50%)] pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md bg-dark-surface border border-white/5 p-10 rounded-[48px] shadow-3xl relative z-10"
            >
                <div className="text-center mb-10">
                    <motion.div
                        key={isSignUp ? 'signup' : 'login'}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="w-20 h-20 bg-primary/10 rounded-[24px] flex items-center justify-center mx-auto mb-8 border border-primary/20"
                    >
                        {isSignUp ? <UserPlus className="text-primary" size={32} /> : <LogIn className="text-primary" size={32} />}
                    </motion.div>

                    <h1 className="text-4xl font-display font-black text-white italic uppercase tracking-tighter">
                        {isSignUp ? 'CRIAR' : 'ÁREA DO'} <span className="text-primary">{isSignUp ? 'CONTA' : 'CLIENTE'}</span>
                    </h1>
                    <p className="text-white/30 text-[10px] font-black uppercase tracking-[4px] mt-4">
                        {isSignUp ? 'Junte-se ao ecossistema Elite' : 'Acesse sua área exclusiva de projetos'}
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <AnimatePresence mode="wait">
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="bg-red-500/10 border border-red-500/20 text-red-500 p-5 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-4"
                            >
                                <AlertCircle size={18} />
                                {error}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div className="space-y-4">
                        {isSignUp && (
                            <div className="relative group">
                                <UserPlus className="absolute left-6 top-1/2 -translate-y-1/2 text-white/10 group-focus-within:text-primary transition-colors" size={20} />
                                <input
                                    type="text"
                                    required
                                    placeholder="NOME COMPLETO"
                                    className="w-full bg-[#0a0a0a] border border-white/5 rounded-3xl py-6 pl-16 pr-8 text-white focus:outline-none focus:border-primary/50 transition-all text-sm font-bold uppercase placeholder:text-white/5 placeholder:font-black placeholder:tracking-widest"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                />
                            </div>
                        )}

                        <div className="relative group">
                            <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-white/10 group-focus-within:text-primary transition-colors" size={20} />
                            <input
                                type="email"
                                required
                                placeholder="E-MAIL"
                                className="w-full bg-[#0a0a0a] border border-white/5 rounded-3xl py-6 pl-16 pr-8 text-white focus:outline-none focus:border-primary/50 transition-all text-sm font-bold uppercase placeholder:text-white/5 placeholder:font-black placeholder:tracking-widest"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="relative group">
                            <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-white/10 group-focus-within:text-primary transition-colors" size={20} />
                            <input
                                type="password"
                                required
                                placeholder="SENHA"
                                className="w-full bg-[#0a0a0a] border border-white/5 rounded-3xl py-6 pl-16 pr-8 text-white focus:outline-none focus:border-primary/50 transition-all text-sm font-bold uppercase placeholder:text-white/5 placeholder:font-black placeholder:tracking-widest"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-primary text-dark font-black py-6 rounded-3xl hover:scale-[1.02] active:scale-95 transition-all shadow-2xl shadow-primary/20 flex items-center justify-center gap-4 text-xs tracking-widest uppercase"
                    >
                        {loading ? (
                            <RefreshCw className="animate-spin" size={20} />
                        ) : (
                            <> {isSignUp ? 'FINALIZAR CADASTRO' : 'ENTRAR NA ÁREA DO CLIENTE'} <ArrowRight size={20} /></>
                        )}
                    </button>

                    <div className="flex flex-col gap-4 mt-8">
                        <button
                            type="button"
                            onClick={() => setIsSignUp(!isSignUp)}
                            className="text-[10px] font-black text-white/20 uppercase tracking-[4px] hover:text-primary transition-colors py-2"
                        >
                            {isSignUp ? 'JÁ TENHO UMA CONTA' : 'NÃO TEM CONTA? CRIE AGORA'}
                        </button>

                        {!isSignUp && (
                            <button
                                type="button"
                                className="text-[9px] font-bold text-white/10 uppercase tracking-[2px] hover:text-white/30 transition-colors"
                                onClick={() => alert('Suporte via WhatsApp: (31) 99333-8026')}
                            >
                                PROBLEMAS NO ACESSO? CHAME O SUPORTE
                            </button>
                        )}
                    </div>
                </form>
            </motion.div>

            <button
                onClick={() => navigate('/')}
                className="mt-12 text-white/20 hover:text-white flex items-center gap-4 text-[10px] font-black uppercase tracking-[5px] transition-all group relative z-20 cursor-pointer"
            >
                <div className="w-8 h-px bg-white/10 group-hover:w-12 group-hover:bg-primary transition-all" />
                VOLTAR AO INÍCIO
            </button>
        </div>
    );
};

export default Login;
