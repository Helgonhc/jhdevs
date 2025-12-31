import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import {
    Smartphone, Monitor, LayoutDashboard, MousePointer2, CloudUpload,
    Edit3, Eye, Activity, Download, ChevronRight, Check, X,
    Briefcase, Building2, Phone, Sparkles, Palette,
    ArrowRight, Star, Globe, Shield, Zap, Image as ImageIcon,
    CreditCard, HelpCircle, Plus, Minus, Lock, AlertTriangle, Menu, Send, RefreshCw, Heart, Layers
} from 'lucide-react';
import canvasConfetti from 'canvas-confetti';

// --- ASSETS DATABASE (V12) ---
const ASSETS_V12 = {
    'advocacia': {
        images: ['https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=1600&auto=format', 'https://images.unsplash.com/photo-1555374018-13a8994ab246?q=80&w=1600&auto=format', 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?q=80&w=1600&auto=format'],
        plans: [
            { name: "Essencial", price: "R$ 450", features: ["Análise de Caso", "Parecer Verbal", "Videochamada 1h"] },
            { name: "Premium", price: "Sob Consulta", features: ["Representação Completa", "Acompanhamento Processual", "Relatórios Mensais"], recommended: true },
            { name: "Corporativo", price: "Mensal", features: ["Blindagem Jurídica", "Revisão de Contratos", "Plantão 24h"] }
        ],
        faqs: [
            { q: "Quanto tempo demora um processo?", a: "O tempo varia conforme a complexidade, mas nossa equipe atua para garantir a máxima celeridade possível." },
            { q: "Vocês atendem online?", a: "Sim, realizamos atendimentos para todo o Brasil via videoconferência com total segurança." },
            { q: "Qual a especialidade do escritório?", a: "Somos especialistas em resolução de conflitos complexos e direito empresarial estratégico." }
        ]
    },
    'saude': {
        images: ['https://images.unsplash.com/photo-1579684385136-137bb965da9d?q=80&w=1600&auto=format', 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?q=80&w=1600&auto=format', 'https://images.unsplash.com/photo-1666214280557-f1b5022eb634?q=80&w=1600&auto=format'],
        plans: [
            { name: "Check-up", price: "R$ 300", features: ["Exames Básicos", "Retorno Incluso", "Avaliação Física"] },
            { name: "Tratamento", price: "Personalizado", features: ["Acompanhamento Contínuo", "Suporte 24h", "Equipe Multidisciplinar"], recommended: true },
            { name: "Familiar", price: "Sob Consulta", features: ["Desconto para Dependentes", "Prioridade na Agenda", "Telemedicina Ilimitada"] }
        ],
        faqs: [
            { q: "Aceitam convênios?", a: "Trabalhamos com as principais seguradoras e oferecemos sistema de reembolso facilitado." },
            { q: "Como agendar uma consulta?", a: "Você pode agendar diretamente pelo WhatsApp ou através do nosso formulário online abaixo." },
            { q: "Quais os horários de atendimento?", a: "Funcionamos de segunda a sábado, das 07h às 20h, com plantão de dúvidas online." }
        ]
    },
    'tecnologia': {
        images: ['https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1600&auto=format', 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1600&auto=format', 'https://images.unsplash.com/photo-1531297461136-82lw9z1.jpg?q=80&w=1600&auto=format'],
        plans: [
            { name: "Startup", price: "R$ 1.5k/mês", features: ["Suporte Básico", "5 Usuários", "Cloud Storage"] },
            { name: "Scale", price: "R$ 3.5k/mês", features: ["Suporte Prioritário", "Usuários Ilimitados", "API Access"], recommended: true },
            { name: "Enterprise", price: "Custom", features: ["SLA Garantido", "Gerente de Conta", "Infraestrutura Dedicada"] }
        ],
        faqs: [
            { q: "A integração é complexa?", a: "Nossa tecnologia é Plug & Play. Em menos de 24 horas seu sistema estará operando 100%." },
            { q: "Meus dados estão seguros?", a: "Utilizamos criptografia de ponta a ponta e seguimos rigorosamente a LGPD." },
            { q: "Existe fidelidade?", a: "Não acreditamos em amarras. Você é livre para cancelar quando quiser, sem multas." }
        ]
    }
};

// --- PROCEDURAL DNA ENGINE ---
const generateDNA = (niche, seed = Math.random()) => {
    // Pools for each niche
    const pools = {
        'advocacia': ['enterprise', 'universal', 'luxury'],
        'saude': ['clinical', 'enterprise', 'universal'],
        'tecnologia': ['midnight', 'universal', 'enterprise'],
        'outro': ['universal', 'enterprise', 'midnight']
    };

    const layoutPool = pools[niche] || pools['outro'];
    // Deterministic random behavior based on seed if we passed a string, else random
    const layoutIndex = Math.floor(Math.random() * layoutPool.length);
    const heroModes = ['split', 'center', 'minimal'];
    const palettes = {
        'enterprise': ['slate', 'navy'],
        'midnight': ['blue', 'purple'],
        'luxury': ['amber', 'gold'],
        'clinical': ['teal', 'sky'],
        'universal': ['indigo', 'rose']
    };

    const layout = layoutPool[layoutIndex];
    const palettePool = palettes[layout] || ['blue'];

    return {
        id: Math.random().toString(36).substr(2, 9),
        layout: layout,
        heroMode: heroModes[Math.floor(Math.random() * heroModes.length)],
        palette: palettePool[Math.floor(Math.random() * palettePool.length)],
        rounded: layout === 'clinical' ? '3xl' : layout === 'midnight' ? 'none' : 'lg'
    };
};


// --- HOOKS ---
const useTypewriter = (text, speed = 20) => {
    const [displayedText, setDisplayedText] = useState('');
    useEffect(() => {
        let i = 0;
        setDisplayedText('');
        const timer = setInterval(() => {
            if (i < text.length) {
                setDisplayedText(prev => prev + text.charAt(i));
                i++;
            } else {
                clearInterval(timer);
            }
        }, speed);
        return () => clearInterval(timer);
    }, [text, speed]);
    return displayedText || <span className="opacity-0">.</span>;
};

// --- SUB-COMPONENTS ---
const NavResponsive = ({ businessName, theme, viewMode, variant }) => {
    const isMobile = viewMode === 'mobile';
    const bgClass = variant === 'midnight' ? 'bg-black/80 border-white/10' : variant === 'clinical' ? 'bg-white/90 border-teal-100 shadow-sm text-teal-900' : 'bg-white/90 border-slate-200 text-slate-800';
    const textClass = variant === 'midnight' ? 'text-white' : variant === 'clinical' ? 'text-teal-900' : 'text-slate-900';

    return (
        <nav className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 backdrop-blur-xl border rounded-full px-5 py-3 flex items-center shadow-xl transition-all duration-300 ${isMobile ? 'w-[90%] justify-between' : 'w-[90%] max-w-4xl justify-between'} ${bgClass}`}>
            <span className={`font-bold text-sm tracking-tight truncate max-w-[120px] ${textClass}`}>{businessName || 'Brand'}</span>
            {!isMobile && (
                <div className={`flex gap-6 text-xs font-medium opacity-70 ${textClass}`}>
                    <span className="hover:opacity-100 cursor-pointer">Início</span>
                    <span className="hover:opacity-100 cursor-pointer">Serviços</span>
                    <span className="hover:opacity-100 cursor-pointer">Planos</span>
                </div>
            )}
            <div className="flex items-center gap-2">
                <button className={`px-4 py-2 rounded-full text-xs font-bold text-white whitespace-nowrap bg-${theme.color}-600 shadow-lg shadow-${theme.color}-500/20`}>
                    {isMobile ? <Phone size={14} /> : 'Fale Conosco'}
                </button>
            </div>
        </nav>
    );
};

// --- LAYOUT ENGINES (V12) ---

// 1. ENTERPRISE (Standard, Trust)
const LayoutEnterprise = ({ content, theme, viewMode, dna, onLead }) => (
    <div className="bg-slate-50 text-slate-900 pb-20 font-serif">
        <NavResponsive businessName={content.businessName} theme={theme} viewMode={viewMode} variant="enterprise" />
        <header className={`pt-32 pb-20 px-6 max-w-6xl mx-auto ${dna.heroMode === 'center' ? 'text-center' : 'grid lg:grid-cols-2 gap-12 items-center'}`}>
            <div className={dna.heroMode === 'center' ? 'max-w-3xl mx-auto' : ''}>
                <div className={`inline-block px-3 py-1 mb-6 rounded-md bg-${theme.color}-900 text-white text-[10px] font-bold uppercase tracking-widest`}>
                    {content.tagline}
                </div>
                <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight text-slate-900 leading-[1.1]">
                    {useTypewriter(content.headline)}
                </h1>
                <p className="text-lg text-slate-600 mb-8 leading-relaxed">{content.subheadline}</p>
                <div className={`flex gap-4 ${dna.heroMode === 'center' ? 'justify-center' : ''}`}>
                    <button className={`px-8 py-3 rounded bg-${theme.color}-900 text-white font-bold text-sm`}>Agendar Reunião</button>
                </div>
            </div>
            {dna.heroMode !== 'center' && (
                <div className="relative h-[500px] rounded-sm overflow-hidden shadow-2xl">
                    <img src={content.heroImage} className="w-full h-full object-cover" />
                </div>
            )}
        </header>
        <section className="py-20 bg-white">
            <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8">
                {content.features.map((f, i) => (
                    <div key={i} className="p-8 border-l-4 border-slate-200 hover:border-slate-900 transition-colors bg-slate-50">
                        <h3 className="text-xl font-bold mb-3">{f.title}</h3>
                        <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    </div>
);

// 2. MIDNIGHT (Tech, Dark)
const LayoutMidnight = ({ content, theme, viewMode, dna, onLead }) => (
    <div className="bg-black text-white pb-20 font-sans selection:bg-purple-500">
        <NavResponsive businessName={content.businessName} theme={theme} viewMode={viewMode} variant="midnight" />
        <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-purple-900/20 to-black pointer-events-none" />
        <header className="pt-32 pb-20 px-6 max-w-6xl mx-auto relative z-10">
            <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50">
                {useTypewriter(content.headline)}
            </h1>
            <div className="grid md:grid-cols-2 gap-12 items-end">
                <p className="text-xl opacity-60 border-l border-white/20 pl-6">{content.subheadline}</p>
                <div className="flex gap-4">
                    <button className="px-8 py-4 bg-white text-black font-bold text-sm hover:scale-105 transition-transform">Start Now</button>
                    <button className="px-8 py-4 border border-white/20 font-bold text-sm hover:bg-white/10">Learn More</button>
                </div>
            </div>
        </header>
        <section className="px-4">
            <div className="max-w-6xl mx-auto h-[400px] rounded-3xl overflow-hidden relative group">
                <img src={content.heroImage} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                <div className="absolute bottom-8 left-8">
                    <div className="text-sm font-mono text-purple-400 mb-1">SYSTEM ONLINE</div>
                    <div className="text-2xl font-bold">Arquitetura V12</div>
                </div>
            </div>
        </section>
    </div>
);

// 3. CLINICAL (New: Soft, Health)
const LayoutClinical = ({ content, theme, viewMode, dna, onLead }) => (
    <div className="bg-teal-50/30 text-teal-900 pb-20 font-sans">
        <NavResponsive businessName={content.businessName} theme={theme} viewMode={viewMode} variant="clinical" />
        <header className="pt-32 pb-20 px-6 max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm text-teal-600 text-xs font-bold mb-6">
                    <Heart size={14} className="fill-current" /> Cuidado e Excelência
                </div>
                <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight text-teal-950">
                    {useTypewriter(content.headline)}
                </h1>
                <p className="text-lg text-teal-800/70 mb-8 leading-relaxed">{content.subheadline}</p>
                <button className="px-8 py-4 bg-teal-600 text-white rounded-2xl shadow-lg shadow-teal-600/20 font-bold hover:-translate-y-1 transition-transform">
                    Agendar Consulta
                </button>
            </div>
            <div className="order-1 lg:order-2 relative">
                <div className="absolute inset-0 bg-teal-200 rounded-full blur-[100px] opacity-30" />
                <img src={content.heroImage} className="relative z-10 rounded-[3rem] shadow-2xl rotate-2 hover:rotate-0 transition-all duration-700 border-4 border-white" />
            </div>
        </header>
        <section className="py-16 bg-white rounded-t-[3rem] shadow-sm">
            <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-3 gap-8">
                {content.features.map((f, i) => (
                    <div key={i} className="text-center p-6 rounded-2xl bg-teal-50 hover:bg-teal-100 transition-colors">
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-4 text-teal-600 shadow-sm">
                            <Activity size={20} />
                        </div>
                        <h3 className="font-bold text-lg mb-2 text-teal-900">{f.title}</h3>
                        <p className="text-sm text-teal-700/60">{f.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    </div>
);

// 4. UNIVERSAL (New: Bold, Generic)
const LayoutUniversal = ({ content, theme, viewMode, dna, onLead }) => (
    <div className="bg-white text-black pb-20 font-sans">
        <NavResponsive businessName={content.businessName} theme={theme} viewMode={viewMode} variant="enterprise" />
        <div className="pt-24 px-4 pb-4">
            <div className="bg-neutral-900 rounded-[2rem] text-white p-8 md:p-20 text-center relative overflow-hidden">
                <img src={content.heroImage} className="absolute inset-0 w-full h-full object-cover opacity-20" />
                <div className="relative z-10 max-w-4xl mx-auto">
                    <h1 className="text-5xl md:text-8xl font-black mb-8 uppercase tracking-tighter leading-[0.9]">
                        {useTypewriter(content.headline)}
                    </h1>
                    <p className="text-xl md:text-2xl opacity-80 mb-12 max-w-2xl mx-auto">{content.subheadline}</p>
                    <button className="bg-white text-black px-10 py-5 font-black text-lg uppercase tracking-wider hover:bg-neutral-200 transition-colors">
                        Fale Agora
                    </button>
                </div>
            </div>
        </div>
        <section className="py-20 px-6">
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {content.features.slice(0, 4).map((f, i) => (
                    <div key={i} className="bg-neutral-100 p-8 rounded-xl font-bold text-xl flex items-end min-h-[200px]">
                        {f.title}
                    </div>
                ))}
            </div>
        </section>
    </div>
);

// 5. LUXURY (Parallax) - Keeping existing logic but refined
const LayoutLuxury = ({ content, theme, viewMode, dna, onLead }) => (
    <div className="bg-[#1a1a1a] text-white h-full overflow-y-auto relative font-serif">
        <NavResponsive businessName={content.businessName} theme={theme} viewMode={viewMode} variant="midnight" />
        <div className="h-[90vh] relative flex items-center justify-center text-center px-6">
            <img src={content.heroImage} className="absolute inset-0 w-full h-full object-cover opacity-40" />
            <div className="relative z-10">
                <div className="text-sm tracking-[0.3em] uppercase mb-4 opacity-70">{content.tagline}</div>
                <h1 className="text-6xl md:text-8xl italic font-medium mb-8">{useTypewriter(content.headline)}</h1>
                <button className="border border-white/30 px-8 py-3 text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-colors">Descobrir</button>
            </div>
        </div>
    </div>
);


const MagicGenerator = () => {
    const [step, setStep] = useState(0);
    const [viewMode, setViewMode] = useState('desktop');
    const [isGenerating, setIsGenerating] = useState(false);
    const [userData, setUserData] = useState({ businessName: '', industry: '', headline: '', customNiche: '' });
    const [dna, setDna] = useState(null); // The V12 DNA Object
    const [showPremiumModal, setShowPremiumModal] = useState(false);
    const [leadsCaptured, setLeadsCaptured] = useState(0);

    // Initial DNA generation on step 2 entry or remix
    const generateAndSetDNA = () => {
        const newDNA = generateDNA(userData.industry || 'outro');
        setDna(newDNA);
    };

    // Prepare content
    const assetKey = userData.industry === 'outro' ? 'tecnologia' : (userData.industry || 'tecnologia');
    const assets = ASSETS_V12[assetKey] || ASSETS_V12['tecnologia'];

    // Pick image procedurally based on DNA if available, else random
    const imgIndex = dna ? parseInt(dna.id.substring(0, 1), 16) % assets.images.length : 0;

    const content = {
        businessName: userData.businessName,
        headline: userData.headline || 'Transforme seu Futuro',
        subheadline: `A ${userData.businessName || 'Empresa'} é líder em soluções de ${userData.industry === 'outro' ? userData.customNiche : assetKey}, entregando excelência.`,
        tagline: `Referência em ${userData.industry === 'outro' ? userData.customNiche : assetKey}`,
        heroImage: assets.images[imgIndex],
        features: assets.plans[1].features.map(f => ({ title: "Excelência", desc: f })),
        plans: assets.plans,
        faqs: assets.faqs
    };

    const theme = { color: dna?.palette || 'blue' };

    const handleNext = () => {
        if (step === 1) { // Transitioning to compilation
            generateAndSetDNA();
            setIsGenerating(true);
            setTimeout(() => { setIsGenerating(false); setStep(2); canvasConfetti(); }, 2500); // Step 2 is now Result
        } else setStep(p => p + 1);
    };

    const handleRemix = () => {
        setIsGenerating(true);
        setTimeout(() => {
            generateAndSetDNA(); // Reroll
            setIsGenerating(false);
        }, 800);
    };

    return (
        <section className="py-24 bg-[#09090B] relative overflow-hidden min-h-screen border-y border-white/5 font-sans">

            {/* PREMIUM MODAL */}
            <AnimatePresence>
                {showPremiumModal && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md px-4">
                        <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-[#121215] border border-red-500/30 w-full max-w-md p-8 rounded-2xl text-center shadow-2xl relative overflow-hidden">
                            <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6 text-red-500"><Lock size={32} /></div>
                            <h3 className="text-2xl font-bold text-white mb-2">Código Protegido V12</h3>
                            <p className="text-white/60 text-sm mb-6">Arquitetura DNA Única avaliada em <span className="text-white font-bold">R$ 18.000,00</span>.</p>
                            <button onClick={() => setShowPremiumModal(false)} className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-bold text-sm rounded-lg">Entendi</button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* HEADER */}
            <div className="w-full lg:col-span-2 mb-8 text-center space-y-4 pt-10 px-4">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-green-500/30 bg-green-500/10 text-green-400 text-xs font-bold uppercase tracking-widest">
                    <Sparkles size={12} /> V12 DNA Engine
                </div>
                <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight">
                    Web Design <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500">Procedural & Único</span>
                </h1>
            </div>

            <div className="container mx-auto px-4 h-full flex flex-col lg:flex-row gap-8 pb-24">

                {/* WIZARD */}
                <div className="w-full lg:w-3/12 flex flex-col gap-6 sticky top-24 h-fit z-20">
                    <div className="bg-[#121215] border border-white/10 rounded-2xl p-6 shadow-2xl">
                        <div className="flex items-center justify-between mb-6">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-white/50">Setup {step + 1}/2</h4>
                            <div className="flex gap-1">{[0, 1].map(i => <div key={i} className={`w-2 h-2 rounded-full ${i <= step ? 'bg-green-600' : 'bg-white/10'}`} />)}</div>
                        </div>

                        {step === 0 && (
                            <div className="space-y-4 animate-in slide-in-from-right fade-in duration-300">
                                <div>
                                    <label className="text-xs text-white/70 block mb-2">Nome do Negócio</label>
                                    <input value={userData.businessName} onChange={e => setUserData({ ...userData, businessName: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-sm text-white focus:border-green-500 outline-none" placeholder="Ex: Dr. Silva" />
                                </div>
                                <div>
                                    <label className="text-xs text-white/70 block mb-2">Nicho</label>
                                    <select value={userData.industry} onChange={e => setUserData({ ...userData, industry: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-sm text-white outline-none">
                                        <option value="" disabled className="bg-[#121215]">Selecione...</option>
                                        <option value="advocacia" className="bg-[#121215]">Advocacia</option>
                                        <option value="saude" className="bg-[#121215]">Saúde</option>
                                        <option value="tecnologia" className="bg-[#121215]">Tecnologia</option>
                                        <option value="outro" className="bg-[#121215]">Outro</option>
                                    </select>
                                </div>
                            </div>
                        )}

                        {step === 1 && (
                            <div className="space-y-4 animate-in slide-in-from-right fade-in duration-300">
                                <div>
                                    <label className="text-xs text-white/70 block mb-2">Promessa (Headline)</label>
                                    <input value={userData.headline} onChange={e => setUserData({ ...userData, headline: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-sm text-white focus:border-green-500 outline-none" placeholder="Ex: Resultado Garantido" />
                                </div>
                            </div>
                        )}

                        {step !== 2 ? (
                            <button onClick={handleNext} className="w-full mt-6 py-3 bg-green-600 hover:bg-green-500 text-white font-bold text-sm rounded-lg transition-colors flex items-center justify-center gap-2">
                                {step === 1 ? 'Gerar Arquitetura' : 'Próximo'} <ArrowRight size={16} />
                            </button>
                        ) : (
                            <div className="mt-6 space-y-4 animate-in fade-in">
                                <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                                    <div className="flex items-center justify-between text-xs text-white/50 mb-2">
                                        <span>DNA DO SITE</span>
                                        <span className="font-mono text-green-400">#{dna?.id}</span>
                                    </div>
                                    <div className="flex gap-1">
                                        <div className={`h-1 flex-1 rounded-full bg-${dna?.palette}-500`} />
                                        <div className={`h-1 flex-1 rounded-full bg-slate-500`} />
                                        <div className={`h-1 flex-1 rounded-full bg-white`} />
                                    </div>
                                    <div className="mt-2 text-[10px] uppercase font-bold text-white/70">
                                        {dna?.layout} • {dna?.heroMode} • {dna?.palette}
                                    </div>
                                </div>

                                <button onClick={handleRemix} className="w-full py-3 bg-white/5 hover:bg-white/10 text-white text-xs font-bold rounded-lg border border-white/10 flex items-center justify-center gap-2">
                                    <RefreshCw size={14} /> Remixar Design (Novo DNA)
                                </button>

                                <button onClick={() => setStep(0)} className="w-full py-3 border border-white/10 text-white text-xs font-bold rounded-lg hover:bg-white/5">
                                    Novo Projeto
                                </button>
                                <button onClick={() => setShowPremiumModal(true)} className="w-full py-3 bg-white/5 border border-white/10 text-white text-xs font-bold rounded-lg hover:bg-white/10 flex items-center justify-center gap-2">
                                    <Lock size={14} className="text-white/50" /> Liberar Código
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* PREVIEW */}
                <div className="w-full lg:w-9/12 bg-[#121215] border border-white/10 rounded-3xl overflow-hidden flex flex-col h-[850px] relative shadow-2xl">
                    <div className="h-14 border-b border-white/10 bg-[#09090b] flex items-center justify-between px-6">
                        <div className="flex gap-2 text-white/20">
                            <Monitor size={16} onClick={() => setViewMode('desktop')} className={`cursor-pointer hover:text-white ${viewMode === 'desktop' && 'text-green-500'}`} />
                            <Smartphone size={16} onClick={() => setViewMode('mobile')} className={`cursor-pointer hover:text-white ${viewMode === 'mobile' && 'text-green-500'}`} />
                        </div>
                        <div className="text-[10px] font-mono text-white/30 truncate max-w-[200px]">{userData.businessName ? `${userData.businessName}.com.br` : 'meusite.com.br'}</div>
                    </div>

                    <div className="flex-1 bg-[#09090b] relative flex items-center justify-center p-0 overflow-hidden">
                        <AnimatePresence mode='wait'>
                            {isGenerating ? (
                                <motion.div key="loader" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center z-10 w-full px-8">
                                    <Activity className="text-green-500 animate-spin mx-auto mb-6" size={48} />
                                    <h3 className="text-2xl font-bold text-white mb-2">Gerando DNA Único...</h3>
                                    <div className="font-mono text-xs text-white/40 space-y-1">
                                        <p>Sorteando Layout...</p>
                                        <p>Definindo Paleta de Cores...</p>
                                        <p>Construindo Blocos React...</p>
                                    </div>
                                </motion.div>
                            ) : step === 2 && dna ? (
                                <motion.div key={dna.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`bg-white h-full transition-all duration-500 shadow-2xl overflow-hidden ${viewMode === 'mobile' ? 'w-[375px] rounded-[3rem] border-[8px] border-[#202020] my-8' : 'w-full'}`}>
                                    {dna.layout === 'enterprise' && <LayoutEnterprise content={content} theme={theme} viewMode={viewMode} dna={dna} onLead={() => setLeadsCaptured(p => p + 1)} />}
                                    {dna.layout === 'midnight' && <LayoutMidnight content={content} theme={theme} viewMode={viewMode} dna={dna} onLead={() => setLeadsCaptured(p => p + 1)} />}
                                    {dna.layout === 'luxury' && <LayoutLuxury content={content} theme={theme} viewMode={viewMode} dna={dna} onLead={() => setLeadsCaptured(p => p + 1)} />}
                                    {dna.layout === 'clinical' && <LayoutClinical content={content} theme={theme} viewMode={viewMode} dna={dna} onLead={() => setLeadsCaptured(p => p + 1)} />}
                                    {dna.layout === 'universal' && <LayoutUniversal content={content} theme={theme} viewMode={viewMode} dna={dna} onLead={() => setLeadsCaptured(p => p + 1)} />}
                                </motion.div>
                            ) : (
                                <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center opacity-20">
                                    <LayoutDashboard size={80} className="mx-auto mb-4" />
                                    <p className="font-mono text-xs">AGUARDANDO CONFIGURAÇÃO</p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default MagicGenerator;
