import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { motion } from 'framer-motion';
import { ShieldAlert, Mail, Lock, AlertCircle, LogIn } from 'lucide-react';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleAdminLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const { data, error: authError } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (authError) {
            setError(authError.message);
        } else {
            // Check if it's the owner email
            if (email.toLowerCase() === 'helgonhc19@yahoo.com.br') {
                navigate('/admin-portal');
            } else {
                setError("Acesso negado. Esta área é restrita a administradores.");
                await supabase.auth.signOut();
            }
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-dark flex flex-col items-center justify-center p-6 relative overflow-hidden">
            <div className="absolute top-1/4 -left-20 w-80 h-80 bg-red-500/10 blur-[150px] -z-1" />

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md bg-dark-surface border border-red-500/10 p-12 rounded-[40px] shadow-2xl relative"
            >
                <div className="text-center mb-10">
                    <div className="w-16 h-16 bg-red-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <ShieldAlert className="text-white" size={32} />
                    </div>
                    <h1 className="text-3xl font-display font-black text-white italic uppercase tracking-tighter">
                        ADMIN <span className="text-red-500">GATE</span>
                    </h1>
                    <p className="text-white/40 text-sm mt-2">Acesso restrito ao proprietário</p>
                </div>

                <form onSubmit={handleAdminLogin} className="space-y-6">
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-xl text-xs flex items-center gap-3"
                        >
                            <AlertCircle size={16} />
                            {error}
                        </motion.div>
                    )}

                    <div className="space-y-4">
                        <div className="relative group">
                            <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-red-500 transition-colors" size={18} />
                            <input
                                type="email"
                                required
                                placeholder="E-mail Admin"
                                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-14 pr-6 text-white focus:outline-none focus:border-red-500 transition-all text-sm"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="relative group">
                            <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-red-500 transition-colors" size={18} />
                            <input
                                type="password"
                                required
                                placeholder="Senha Admin"
                                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-14 pr-6 text-white focus:outline-none focus:border-red-500 transition-all text-sm"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-red-500 text-white font-black py-4 rounded-2xl hover:bg-red-600 transition-all shadow-xl shadow-red-500/20 flex items-center justify-center gap-3"
                    >
                        {loading ? (
                            <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                        ) : (
                            <>AUTENTICAR ADMIN <LogIn size={18} /></>
                        )}
                    </button>
                </form>
            </motion.div>

            <button
                onClick={() => navigate('/')}
                className="mt-8 text-white/20 hover:text-white flex items-center gap-2 text-xs font-bold uppercase tracking-widest transition-colors relative z-20 cursor-pointer"
            >
                Voltar ao Site
            </button>
        </div>
    );
};

export default AdminLogin;
