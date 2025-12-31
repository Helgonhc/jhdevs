import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { motion, AnimatePresence } from 'framer-motion';
import {
    LayoutDashboard,
    Briefcase,
    FileText,
    Settings,
    LogOut,
    Clock,
    CheckCircle2,
    ExternalLink,
    AlertTriangle,
    RefreshCw,
    UserCircle,
    Package,
    Camera,
    Save,
    MapPin,
    Phone,
    Building2,
    Upload,
    Download,
    Trash2,
    Check,
    X,
    ShieldCheck,
    Monitor,
    Smartphone,
    Power
} from 'lucide-react';

const ClientDashboard = () => {
    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState(null);
    const [projects, setProjects] = useState([]);
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('dashboard');
    const [isSaving, setIsSaving] = useState(false);
    const [isUploading, setIsUploading] = useState(false);

    // Cinema Preview States
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);
    const [previewUrl, setPreviewUrl] = useState('');
    const [previewDevice, setPreviewDevice] = useState('desktop'); // 'desktop' | 'mobile'
    const [isPowerOn, setIsPowerOn] = useState(false);
    const [isBooting, setIsBooting] = useState(false);
    const navigate = useNavigate();

    const [fileForm, setFileForm] = useState({
        name: '',
        category: 'Logotipo',
        description: '',
        file: null
    });

    // Form settings state
    const [settingsForm, setSettingsForm] = useState({
        full_name: '',
        phone: '',
        address: '',
        business_name: '',
        document: ''
    });

    const fetchDashboardData = async () => {
        const { data: { user: authUser } } = await supabase.auth.getUser();

        if (!authUser) {
            navigate('/login');
            return;
        }

        setUser(authUser);

        // Fetch Profile
        const { data: profileData } = await supabase
            .from('profiles')
            .select('*')
            .eq('auth_id', authUser.id)
            .single();

        if (profileData) {
            setProfile(profileData);
            setSettingsForm({
                full_name: profileData.full_name || '',
                phone: profileData.phone || '',
                address: profileData.address || '',
                business_name: profileData.business_name || '',
                document: profileData.document || ''
            });

            // Fetch Projects
            const { data: projectsData } = await supabase
                .from('projects')
                .select('*')
                .eq('client_id', profileData.id)
                .order('updated_at', { ascending: false });
            setProjects(projectsData || []);

            // Fetch Files
            const { data: filesData } = await supabase
                .from('client_files')
                .select('*')
                .eq('client_id', profileData.id)
                .order('created_at', { ascending: false });
            setFiles(filesData || []);
        }

        setLoading(false);
    };

    useEffect(() => {
        fetchDashboardData();
    }, [navigate]);

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            const { error } = await supabase
                .from('profiles')
                .update({
                    full_name: settingsForm.full_name,
                    phone: settingsForm.phone,
                    address: settingsForm.address,
                    business_name: settingsForm.business_name,
                    document: settingsForm.document,
                    updated_at: new Date()
                })
                .eq('auth_id', user.id);

            if (error) throw error;
            alert("Perfil atualizado com sucesso!");
            fetchDashboardData();
        } catch (err) {
            alert("Erro ao atualizar: " + err.message);
        }
        setIsSaving(false);
    };

    const handleAvatarUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const filePath = `${user.id}/${fileName}`;

            let { error: uploadError } = await supabase.storage
                .from('avatars')
                .upload(filePath, file, {
                    upsert: true
                });

            if (uploadError) throw uploadError;

            const { data: { publicUrl } } = supabase.storage
                .from('avatars')
                .getPublicUrl(filePath);

            const { error: updateError } = await supabase
                .from('profiles')
                .update({ avatar_url: publicUrl })
                .eq('auth_id', user.id);

            if (updateError) throw updateError;
            alert("Foto de perfil atualizada!");
            fetchDashboardData();
        } catch (err) {
            alert("Erro no upload: " + err.message);
        }
    };

    const handleFileUpload = async (e) => {
        e.preventDefault();
        if (!fileForm.file || !fileForm.name) {
            alert('Por favor, selecione um arquivo e dê um nome a ele.');
            return;
        }

        setIsUploading(true);
        try {
            const file = fileForm.file;
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const filePath = `${user.id}/${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('documents')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            const { data: { publicUrl } } = supabase.storage
                .from('documents')
                .getPublicUrl(filePath);

            const { error: dbError } = await supabase
                .from('client_files')
                .insert([{
                    client_id: profile.id,
                    name: fileForm.name,
                    url: publicUrl,
                    type: file.type,
                    size: file.size,
                    category: fileForm.category,
                    description: fileForm.description
                }]);

            if (dbError) throw dbError;

            setFileForm({ name: '', category: 'Logotipo', description: '', file: null });

            // Refresh files list
            const { data: updatedFiles } = await supabase
                .from('client_files')
                .select('*')
                .eq('client_id', profile.id)
                .order('created_at', { ascending: false });
            setFiles(updatedFiles || []);

            alert('Arquivo enviado com sucesso!');
        } catch (error) {
            console.error('Error uploading file:', error);
            alert('Erro no upload: ' + error.message);
        } finally {
            setIsUploading(false);
        }
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate('/login');
    };

    const handleOpenPreview = (url) => {
        if (!url) {
            alert('Seu site está sendo preparado! O link de homologação será liberado em breve.');
            return;
        }
        setPreviewUrl(url);
        setIsPowerOn(false); // Start turned off
        setIsBooting(false);
        setIsPreviewOpen(true);
    };

    const handlePowerToggle = () => {
        if (isPowerOn) {
            setIsPowerOn(false);
            setIsBooting(false);
        } else {
            setIsBooting(true);
            // Boot sequence simulation
            setTimeout(() => {
                setIsBooting(false);
                setIsPowerOn(true);
            }, 3500); // 3.5 seconds boot
        }
    };

    if (loading) return (
        <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center space-y-4">
            <RefreshCw className="text-primary animate-spin" size={32} />
            <p className="text-white/20 font-black uppercase tracking-[5px] text-[10px]">Sincronizando sua Área do Cliente...</p>
        </div>
    );

    const activeProject = projects[0];

    const TabButton = ({ id, icon: Icon, label }) => (
        <button
            onClick={() => setActiveTab(id)}
            className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all border ${activeTab === id ? 'bg-primary text-dark border-primary shadow-xl shadow-primary/10' : 'text-white/30 border-transparent hover:bg-white/5 hover:text-white'}`}
        >
            <Icon size={18} /> {label}
        </button>
    );

    return (
        <div className="min-h-screen bg-[#070707] flex font-sans selection:bg-primary selection:text-dark antialiased">
            {/* Sidebar Desktop */}
            <aside className="hidden lg:flex w-80 border-r border-white/5 flex-col p-10 bg-black/40 backdrop-blur-3xl sticky top-0 h-screen">
                <div className="flex flex-col gap-6 mb-14">
                    <img src="/logo.png" alt="JH DEV'S LOGO" className="h-14 w-auto object-contain self-start" />
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-2xl overflow-hidden border border-primary/20 relative group">
                            {profile?.avatar_url ? (
                                <img src={profile.avatar_url} alt="" className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-primary font-display font-black text-xl italic bg-primary/5">
                                    {profile?.full_name?.[0] || 'U'}
                                </div>
                            )}
                        </div>
                        <div>
                            <span className="block font-display font-black text-xl tracking-tighter text-white italic uppercase leading-none">ÁREA DO <span className="text-primary">CLIENTE</span></span>
                            <span className="text-[9px] text-white/20 font-black uppercase tracking-[3px] mt-1 block">Acesso Elite JH DEV</span>
                        </div>
                    </div>
                </div>

                <nav className="flex-1 space-y-3">
                    <TabButton id="dashboard" icon={LayoutDashboard} label="Visão Geral" />
                    <TabButton id="projects" icon={Briefcase} label="Meus Projetos" />
                    <TabButton id="documents" icon={FileText} label="Dossiê de Arquivos" />
                    <TabButton id="settings" icon={Settings} label="Configurações" />
                </nav>

                <div className="mt-auto border-t border-white/5 pt-8">
                    <button onClick={handleLogout} className="w-full flex items-center gap-4 px-6 py-4 text-red-500/40 hover:text-red-500 text-[10px] font-black uppercase tracking-widest transition-all">
                        <LogOut size={18} /> Encerrar Sessão
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 lg:p-16 max-w-7xl">
                <AnimatePresence mode="wait">
                    {/* DASHBOARD TAB */}
                    {activeTab === 'dashboard' && (
                        <motion.div key="dashboard" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                            <header className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16">
                                <div>
                                    <h1 className="text-4xl font-display font-black text-white italic uppercase tracking-tighter">
                                        Status de Operação, <span className="text-primary">{profile?.full_name?.split(' ')[0] || 'Cliente'}</span>
                                    </h1>
                                    <p className="text-white/20 text-[10px] font-black uppercase tracking-[6px] mt-3">Você está no centro do controle</p>
                                </div>
                                <button onClick={() => setActiveTab('settings')} className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/5 hover:border-primary/30 transition-all group">
                                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary transition-all group-hover:bg-primary group-hover:text-dark">
                                        <Camera size={18} />
                                    </div>
                                    <div className="pr-4 text-left">
                                        <p className="text-[9px] text-white/20 font-black uppercase tracking-widest mb-0.5">Customizar</p>
                                        <p className="text-[10px] font-black text-white uppercase italic">Editar Perfil</p>
                                    </div>
                                </button>
                            </header>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                                {[
                                    { label: 'Projetos em Fila', value: projects.length.toString().padStart(2, '0'), icon: <Clock className="text-primary" /> },
                                    { label: 'Arquivos no Dossiê', value: files.length.toString().padStart(2, '0'), icon: <Package className="text-primary" /> },
                                    { label: 'Entrega Final', value: projects.filter(p => p.status === 'Live').length.toString().padStart(2, '0'), icon: <CheckCircle2 className="text-primary" /> }
                                ].map((stat, i) => (
                                    <div key={i} className="bg-dark-surface border border-white/5 p-8 rounded-[40px] flex items-center justify-between hover:border-primary/20 transition-all group">
                                        <div>
                                            <p className="text-white/20 text-[9px] font-black uppercase tracking-[4px] mb-2">{stat.label}</p>
                                            <p className="text-5xl font-display font-black text-white italic group-hover:text-primary transition-colors">{stat.value}</p>
                                        </div>
                                        <div className="w-14 h-14 bg-white/[0.03] rounded-2xl flex items-center justify-center group-hover:bg-primary/10 transition-all">{stat.icon}</div>
                                    </div>
                                ))}
                            </div>

                            {activeProject ? (
                                <div className="bg-dark-surface border border-white/5 rounded-[56px] p-12 relative overflow-hidden shadow-3xl">
                                    <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 blur-[120px] -z-1" />
                                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-14">
                                        <div>
                                            <h2 className="text-3xl font-display font-black text-white italic uppercase tracking-tighter mb-4">Projeto: <span className="text-primary">{activeProject.name}</span></h2>
                                            <div className="inline-flex items-center gap-3 px-6 py-2 bg-primary/10 text-primary border border-primary/20 rounded-full text-[10px] font-black uppercase tracking-[3px]">
                                                <span className="w-2 h-2 bg-primary rounded-full animate-pulse shadow-[0_0_10px_#7CFF01]" /> {activeProject.status}
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => handleOpenPreview(activeProject.preview_url)}
                                            className="flex items-center gap-3 bg-white text-dark font-black px-8 py-5 rounded-[24px] hover:scale-105 transition-all text-[11px] uppercase tracking-widest shadow-2xl"
                                        >
                                            <ExternalLink size={18} /> {activeProject.preview_url ? 'VISUALIZAR AGORA' : 'Aguardando Link'}
                                        </button>
                                    </div>
                                    <div className="grid md:grid-cols-2 gap-20">
                                        <div className="space-y-12">
                                            <div className="space-y-4">
                                                <p className="text-white/20 text-[9px] font-black uppercase tracking-[4px] mb-2">Engenharia de Progresso</p>
                                                <p className="text-3xl font-display font-black text-white italic">{activeProject.progress}% <span className="text-primary text-sm tracking-normal font-sans not-italic font-bold ml-2">Concluído</span></p>
                                                <div className="h-2 bg-white/5 rounded-full overflow-hidden border border-white/5"><motion.div initial={{ width: 0 }} animate={{ width: `${activeProject.progress}%` }} className="h-full bg-primary shadow-[0_0_20px_rgba(124,255,1,0.5)]" /></div>
                                            </div>
                                        </div>
                                        <div className="bg-white/[0.02] rounded-[40px] p-10 border border-white/5 flex flex-col items-center text-center justify-center space-y-6">
                                            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4"><Package className="text-primary" size={32} /></div>
                                            <h3 className="text-xl font-display font-black text-white italic uppercase tracking-tighter">Status Gerencial</h3>
                                            <p className="text-white/30 text-[10px] uppercase font-black tracking-widest">Última atualização: {new Date(activeProject.updated_at).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="bg-dark-surface border border-white/5 rounded-[56px] p-24 text-center border-dashed">
                                    <Package size={64} className="mx-auto text-white/5 mb-8" />
                                    <h2 className="text-xl font-display font-black text-white italic uppercase tracking-widest mb-2 opacity-20">Aguardando novo projeto</h2>
                                </div>
                            )}
                        </motion.div>
                    )}

                    {/* SETTINGS TAB */}
                    {activeTab === 'settings' && (
                        <motion.div key="settings" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                            <div className="mb-12">
                                <h2 className="text-4xl font-display font-black text-white italic uppercase tracking-tighter">Seu <span className="text-primary">Perfil</span></h2>
                                <p className="text-white/20 text-[10px] font-black uppercase tracking-[6px] mt-3">Personalize seu ambiente de elite</p>
                            </div>

                            <div className="grid lg:grid-cols-3 gap-12">
                                <div className="lg:col-span-1 space-y-8">
                                    <div className="bg-dark-surface border border-white/5 p-10 rounded-[48px] text-center flex flex-col items-center">
                                        <div className="relative group w-40 h-40 mb-8">
                                            <div className="w-full h-full rounded-[40px] overflow-hidden border-2 border-primary/20 bg-primary/5">
                                                {profile?.avatar_url ? (
                                                    <img src={profile.avatar_url} alt="" className="w-full h-full object-cover" />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-primary font-display font-black text-4xl italic">{profile?.full_name?.[0] || 'U'}</div>
                                                )}
                                            </div>
                                            <label className="absolute -bottom-4 -right-4 w-12 h-12 bg-primary text-dark rounded-2xl flex items-center justify-center cursor-pointer hover:scale-110 transition-all shadow-xl shadow-primary/20 border-4 border-[#070707]">
                                                <Camera size={20} />
                                                <input type="file" className="hidden" accept="image/*" onChange={handleAvatarUpload} />
                                            </label>
                                        </div>
                                        <h3 className="text-xl font-display font-black text-white italic uppercase tracking-tighter">{profile?.full_name}</h3>
                                        <p className="text-[10px] text-white/30 font-black uppercase tracking-[4px] mt-2">{profile?.email}</p>
                                    </div>
                                </div>

                                <div className="lg:col-span-2">
                                    <form onSubmit={handleUpdateProfile} className="bg-dark-surface border border-white/5 p-12 rounded-[56px] space-y-8">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <div className="space-y-2">
                                                <label className="flex items-center gap-2 text-[9px] font-black text-white/30 uppercase tracking-[4px] ml-4"><UserCircle size={10} /> Nome Completo</label>
                                                <input type="text" value={settingsForm.full_name} onChange={(e) => setSettingsForm({ ...settingsForm, full_name: e.target.value })} className="w-full bg-[#0a0a0a] border border-white/10 rounded-[22px] py-5 px-8 text-white focus:border-primary transition-all text-sm font-bold uppercase" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="flex items-center gap-2 text-[9px] font-black text-white/30 uppercase tracking-[4px] ml-4"><Phone size={10} /> Telefone</label>
                                                <input type="text" value={settingsForm.phone} onChange={(e) => setSettingsForm({ ...settingsForm, phone: e.target.value })} className="w-full bg-[#0a0a0a] border border-white/10 rounded-[22px] py-5 px-8 text-white focus:border-primary transition-all text-sm font-bold uppercase" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="flex items-center gap-2 text-[9px] font-black text-white/30 uppercase tracking-[4px] ml-4"><Building2 size={10} /> Empresa</label>
                                                <input type="text" value={settingsForm.business_name} onChange={(e) => setSettingsForm({ ...settingsForm, business_name: e.target.value })} className="w-full bg-[#0a0a0a] border border-white/10 rounded-[22px] py-5 px-8 text-white focus:border-primary transition-all text-sm font-bold uppercase" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="flex items-center gap-2 text-[9px] font-black text-white/30 uppercase tracking-[4px] ml-4"><X size={10} /> CPF / CNPJ</label>
                                                <input type="text" value={settingsForm.document} onChange={(e) => setSettingsForm({ ...settingsForm, document: e.target.value })} className="w-full bg-[#0a0a0a] border border-white/10 rounded-[22px] py-5 px-8 text-white focus:border-primary transition-all text-sm font-bold uppercase" />
                                            </div>
                                            <div className="space-y-2 md:col-span-2">
                                                <label className="flex items-center gap-2 text-[9px] font-black text-white/30 uppercase tracking-[4px] ml-4"><MapPin size={10} /> Endereço Residencial/Comercial</label>
                                                <input type="text" value={settingsForm.address} onChange={(e) => setSettingsForm({ ...settingsForm, address: e.target.value })} className="w-full bg-[#0a0a0a] border border-white/10 rounded-[22px] py-5 px-8 text-white focus:border-primary transition-all text-sm font-bold uppercase" />
                                            </div>
                                        </div>
                                        <button disabled={isSaving} type="submit" className="w-full bg-primary text-dark font-black py-6 rounded-[24px] hover:scale-[1.02] active:scale-95 transition-all text-xs tracking-widest uppercase flex items-center justify-center gap-4 shadow-xl shadow-primary/20">
                                            {isSaving ? <RefreshCw className="animate-spin" size={20} /> : <><Save size={20} /> SALVAR ALTERAÇÕES</>}
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* PROJECTS TAB */}
                    {activeTab === 'projects' && (
                        <motion.div key="projects" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                            <div className="mb-12">
                                <h2 className="text-4xl font-display font-black text-white italic uppercase tracking-tighter">Meus <span className="text-primary">Projetos</span></h2>
                                <p className="text-white/20 text-[10px] font-black uppercase tracking-[6px] mt-3">Acompanhamento detalhado de suas entregas</p>
                            </div>

                            <div className="grid grid-cols-1 gap-8">
                                {projects.length === 0 ? (
                                    <div className="bg-dark-surface border-2 border-dashed border-white/5 rounded-[56px] py-40 text-center">
                                        <Briefcase size={48} className="mx-auto text-white/5 mb-6" />
                                        <h2 className="text-xl font-display font-black text-white italic uppercase tracking-widest mb-2 opacity-20">Nenhum projeto vinculado</h2>
                                        <p className="text-white/20 font-black uppercase tracking-[3px] text-[10px]">Em breve você verá suas entregas aqui.</p>
                                    </div>
                                ) : (
                                    projects.map((project) => (
                                        <div key={project.id} className="bg-dark-surface border border-white/5 rounded-[48px] p-10 relative overflow-hidden group hover:border-primary/20 transition-all shadow-3xl">
                                            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
                                                <div className="flex-1 space-y-6 w-full">
                                                    <div className="flex items-center justify-between md:justify-start md:gap-6">
                                                        <h3 className="text-2xl font-display font-black text-white italic uppercase tracking-tighter">{project.name}</h3>
                                                        <div className="px-4 py-1.5 bg-primary/10 text-primary border border-primary/20 rounded-full text-[8px] font-black uppercase tracking-[2px] flex items-center gap-2">
                                                            <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" /> {project.status}
                                                        </div>
                                                    </div>

                                                    <div className="space-y-4">
                                                        <div className="flex justify-between items-end">
                                                            <p className="text-white/20 text-[9px] font-black uppercase tracking-[3px]">Progresso da Entrega</p>
                                                            <p className="text-xl font-display font-black text-white italic">{project.progress}%</p>
                                                        </div>
                                                        <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                                                            <motion.div
                                                                initial={{ width: 0 }}
                                                                animate={{ width: `${project.progress}%` }}
                                                                className="h-full bg-primary shadow-[0_0_15px_rgba(124,255,1,0.4)]"
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="flex flex-wrap gap-4 pt-4 border-t border-white/5">
                                                        <div className="flex items-center gap-2 text-[9px] font-black text-white/30 uppercase tracking-widest">
                                                            <Clock size={12} className="text-primary" /> Atualizado em {new Date(project.updated_at).toLocaleDateString()}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="shrink-0 w-full md:w-auto">
                                                    <button
                                                        onClick={() => handleOpenPreview(project.preview_url)}
                                                        className="w-full md:w-auto flex items-center justify-center gap-3 bg-white text-dark font-black px-8 py-5 rounded-[24px] hover:scale-105 transition-all text-[10px] uppercase tracking-widest shadow-2xl group-hover:bg-primary transition-colors"
                                                    >
                                                        <ExternalLink size={16} /> {project.preview_url ? 'VISUALIZAR AGORA' : 'Aguardando Link'}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </motion.div>
                    )}

                    {/* DOCUMENTS TAB */}
                    {activeTab === 'documents' && (
                        <motion.div key="documents" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                            <div className="mb-12">
                                <h2 className="text-4xl font-display font-black text-white italic uppercase tracking-tighter">Dossiê de <span className="text-primary">Arquivos</span></h2>
                                <p className="text-white/20 text-[10px] font-black uppercase tracking-[6px] mt-3">Repositório seguro de documentos e ativos</p>
                            </div>

                            <div className="grid lg:grid-cols-3 gap-12">
                                <div className="lg:col-span-1 space-y-8">
                                    <div className="bg-dark-surface border border-white/5 p-10 rounded-[48px]">
                                        <h3 className="text-xl font-display font-black text-white italic uppercase tracking-tighter mb-8 flex items-center gap-4">
                                            <Upload className="text-primary" size={24} /> Enviar Arquivo
                                        </h3>
                                        <form onSubmit={handleFileUpload} className="space-y-6">
                                            <div className="space-y-2">
                                                <label className="text-[9px] font-black text-white/30 uppercase tracking-[4px] ml-4">Nome do Arquivo</label>
                                                <input type="text" value={fileForm.name} onChange={(e) => setFileForm({ ...fileForm, name: e.target.value })} placeholder="Ex: Logo Principal" className="w-full bg-[#0a0a0a] border border-white/10 rounded-[22px] py-4 px-6 text-white text-xs font-bold uppercase" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[9px] font-black text-white/30 uppercase tracking-[4px] ml-4">Categoria / Área</label>
                                                <select value={fileForm.category} onChange={(e) => setFileForm({ ...fileForm, category: e.target.value })} className="w-full bg-[#0a0a0a] border border-white/10 rounded-[22px] py-4 px-6 text-white text-xs font-bold uppercase appearance-none">
                                                    <option value="Logotipo">Logotipo</option>
                                                    <option value="Conteúdo do Site">Conteúdo do Site</option>
                                                    <option value="Imagens/Fotos">Imagens/Fotos</option>
                                                    <option value="Documentação">Documentação</option>
                                                    <option value="Outros">Outros</option>
                                                </select>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[9px] font-black text-white/30 uppercase tracking-[4px] ml-4">Instruções / Onde Usar</label>
                                                <textarea value={fileForm.description} onChange={(e) => setFileForm({ ...fileForm, description: e.target.value })} placeholder="Ex: Usar no topo da página..." title="Descreva onde este arquivo deve ser usado no site" className="w-full bg-[#0a0a0a] border border-white/10 rounded-[22px] py-4 px-6 text-white text-xs font-bold uppercase min-h-[100px]"></textarea>
                                            </div>
                                            <div className="relative">
                                                <input type="file" id="client-file-upload" className="hidden" onChange={(e) => setFileForm({ ...fileForm, file: e.target.files[0] })} />
                                                <label htmlFor="client-file-upload" className="w-full bg-white/5 border border-dashed border-white/20 rounded-[22px] py-10 flex flex-col items-center justify-center cursor-pointer hover:bg-white/10 transition-all">
                                                    <Package className={fileForm.file ? "text-primary" : "text-white/20"} size={32} />
                                                    <span className="text-[10px] font-black uppercase text-white/40 mt-4 tracking-widest">{fileForm.file ? fileForm.file.name : "Selecionar Arquivo"}</span>
                                                </label>
                                            </div>
                                            <button disabled={isUploading} type="submit" className="w-full bg-primary text-dark font-black py-5 rounded-[22px] hover:scale-[1.02] active:scale-95 transition-all text-xs tracking-widest uppercase flex items-center justify-center gap-4 shadow-xl shadow-primary/20">
                                                {isUploading ? <RefreshCw className="animate-spin" size={20} /> : <><Upload size={20} /> ENVIAR AGORA</>}
                                            </button>
                                        </form>
                                    </div>
                                </div>

                                <div className="lg:col-span-2 space-y-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-xl font-display font-black text-white italic uppercase tracking-tighter">Meus Arquivos Enviados</h3>
                                        <span className="text-[10px] font-black text-white/20 uppercase tracking-widest">{files.length} Arquivos</span>
                                    </div>

                                    {files.length === 0 ? (
                                        <div className="bg-dark-surface border-2 border-dashed border-white/5 rounded-[56px] py-40 text-center">
                                            <FileText size={48} className="mx-auto text-white/5 mb-6" />
                                            <p className="text-white/20 font-black uppercase tracking-[3px] text-xs px-10">Você ainda não enviou nenhum arquivo. Use o formulário ao lado para compartilhar seus ativos conosco.</p>
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-1 gap-6">
                                            {files.map((file) => (
                                                <div key={file.id} className="bg-dark-surface border border-white/5 p-8 rounded-[40px] flex items-center justify-between hover:border-primary/20 transition-all group">
                                                    <div className="flex items-center gap-6">
                                                        <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-dark transition-all">
                                                            <Package size={28} />
                                                        </div>
                                                        <div>
                                                            <div className="flex items-center gap-3">
                                                                <p className="text-white font-black text-base uppercase italic">{file.name}</p>
                                                                <span className="px-2 py-1 bg-primary/10 text-primary text-[8px] font-black uppercase rounded-md tracking-wider">{file.category}</span>
                                                            </div>
                                                            {file.description && <p className="text-[10px] text-white/40 font-bold mt-1 line-clamp-1 italic">"{file.description}"</p>}
                                                            <p className="text-[10px] text-white/20 font-black uppercase tracking-widest mt-2">{new Date(file.created_at).toLocaleDateString()} • {(file.size / 1024 / 1024).toFixed(2)} MB</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-3">
                                                        <a href={file.url} target="_blank" rel="noreferrer" className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-white/20 hover:text-primary transition-all">
                                                            <Download size={20} />
                                                        </a>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>

            {/* CINEMA PREVIEW MODAL */}
            <AnimatePresence>
                {isPreviewOpen && (
                    <div className="fixed inset-0 z-[500] flex flex-col bg-[#050505]">
                        {/* Preview Header */}
                        <div className="flex items-center justify-between px-8 py-6 border-b border-white/5 bg-black/40 backdrop-blur-md z-10">
                            <div className="flex items-center gap-6">
                                <button
                                    onClick={() => setIsPreviewOpen(false)}
                                    className="p-3 bg-white/5 rounded-2xl text-white/40 hover:text-white hover:bg-white/10 transition-all"
                                >
                                    <X size={20} />
                                </button>
                                <div>
                                    <h3 className="text-xl font-display font-black text-white italic uppercase tracking-tighter">Cinema <span className="text-primary">Preview</span></h3>
                                    <p className="text-[9px] text-white/20 font-black uppercase tracking-[3px] mt-0.5">Live Experience Engine</p>
                                </div>
                            </div>

                            {/* Device Selector */}
                            <div className="bg-white/5 p-1.5 rounded-2xl border border-white/5 flex items-center gap-2">
                                <button
                                    onClick={() => setPreviewDevice('desktop')}
                                    className={`flex items-center gap-3 px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${previewDevice === 'desktop' ? 'bg-primary text-dark shadow-lg shadow-primary/20' : 'text-white/30 hover:text-white'}`}
                                >
                                    <Monitor size={16} /> Desktop
                                </button>
                                <button
                                    onClick={() => setPreviewDevice('mobile')}
                                    className={`flex items-center gap-3 px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${previewDevice === 'mobile' ? 'bg-primary text-dark shadow-lg shadow-primary/20' : 'text-white/30 hover:text-white'}`}
                                >
                                    <Smartphone size={16} /> Mobile
                                </button>
                            </div>

                            <div className="flex items-center gap-4">
                                <button
                                    onClick={handlePowerToggle}
                                    className={`flex items-center gap-3 px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border ${isPowerOn ? 'bg-red-500/10 text-red-500 border-red-500/20 hover:bg-red-500 hover:text-white' : 'bg-primary text-dark border-primary shadow-xl shadow-primary/20 active:scale-95'}`}
                                >
                                    <Power size={18} /> {isPowerOn ? 'DESLIGAR TELA' : 'LIGAR MONITOR'}
                                </button>
                            </div>
                        </div>

                        {/* Preview Area */}
                        <div className="flex-1 overflow-hidden p-8 flex flex-col justify-center items-center bg-[radial-gradient(circle_at_center,_rgba(124,255,1,0.03)_0%,_transparent_70%)] relative">
                            {/* Physical Monitor Frame */}
                            <motion.div
                                layout
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`relative bg-[#0a0a0a] shadow-[0_0_100px_rgba(0,0,0,0.8)] border-[12px] border-[#1a1a1a] overflow-hidden transition-all duration-700 flex flex-col
                                    ${previewDevice === 'desktop' ? 'w-[90%] h-[80%] rounded-[40px]' : 'w-[380px] h-[780px] rounded-[60px]'}
                                `}
                            >
                                {/* Screen Content */}
                                <div className="flex-1 relative bg-black overflow-hidden flex items-center justify-center">
                                    {/* 1. OFF STATE */}
                                    {!isPowerOn && !isBooting && (
                                        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black">
                                            <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none opacity-50" />
                                            <motion.button
                                                animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
                                                transition={{ duration: 2, repeat: Infinity }}
                                                onClick={handlePowerToggle}
                                                className="w-20 h-20 rounded-full border border-primary/30 flex items-center justify-center text-primary/30 group-hover:text-primary transition-all"
                                            >
                                                <Power size={32} />
                                            </motion.button>
                                            <p className="text-[9px] text-white/10 font-black uppercase tracking-[5px] mt-6">Sistema Standby - Clique para Iniciar</p>
                                        </div>
                                    )}

                                    {/* 2. BOOTING STATE */}
                                    {isBooting && (
                                        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-black">
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                className="flex flex-col items-center"
                                            >
                                                <img src="/logo.png" alt="JH DEV'S" className="h-16 w-auto object-contain mb-8 filter brightness-0 invert opacity-50" />
                                                <div className="h-0.5 w-48 bg-white/5 rounded-full overflow-hidden">
                                                    <motion.div
                                                        initial={{ width: 0 }}
                                                        animate={{ width: "100%" }}
                                                        transition={{ duration: 3, ease: "easeInOut" }}
                                                        className="h-full bg-primary shadow-[0_0_15px_#7CFF01]"
                                                    />
                                                </div>
                                                <div className="mt-8 space-y-2 text-center">
                                                    <motion.p
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: [0, 1, 1, 0] }}
                                                        transition={{ duration: 3.5, times: [0, 0.2, 0.8, 1] }}
                                                        className="text-[10px] text-primary font-black uppercase tracking-[4px]"
                                                    >
                                                        Preparado para se surpreender?
                                                    </motion.p>
                                                    <p className="text-[8px] text-white/20 font-black uppercase tracking-widest">Iniciando Motor de Experiência JH DEV...</p>
                                                </div>
                                            </motion.div>
                                            <div className="absolute bottom-10 font-mono text-[8px] text-white/10 tracking-widest">JH_DEV_OS v3.0 // KERNEL LOADED</div>
                                        </div>
                                    )}

                                    {/* 3. LIVE STATE (IFRAME) */}
                                    {isPowerOn && (
                                        <motion.div
                                            initial={{ opacity: 0, filter: 'brightness(2) contrast(1.2)' }}
                                            animate={{ opacity: 1, filter: 'brightness(1) contrast(1)' }}
                                            transition={{ duration: 0.5 }}
                                            className="w-full h-full"
                                        >
                                            <iframe
                                                src={previewUrl}
                                                className="w-full h-full border-none bg-white"
                                                title="Project Preview"
                                            />
                                        </motion.div>
                                    )}

                                    {/* Screen Glare Effect */}
                                    <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-white/[0.02] to-transparent z-40" />
                                </div>

                                {/* Physical Bezel Bottom Label */}
                                <div className="h-10 bg-[#1a1a1a] flex items-center justify-center border-t border-white/5">
                                    <div className="flex items-center gap-2">
                                        <div className={`w-1.5 h-1.5 rounded-full ${isPowerOn ? 'bg-primary shadow-[0_0_8px_#7CFF01]' : 'bg-red-500 animate-pulse'} `} />
                                        <span className="text-[8px] font-black text-white/30 tracking-[3px] uppercase">JH DEV PROFESSIONAL SERIES</span>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Monitor Stand (Desktop mode only) */}
                            {previewDevice === 'desktop' && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="w-64 h-12 bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] rounded-b-[40px] border-x border-b border-white/10 shadow-3xl -mt-0.5 relative z-[-1]"
                                />
                            )}
                        </div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ClientDashboard;
