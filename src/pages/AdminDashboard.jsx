import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Users,
    Briefcase,
    Plus,
    Edit3,
    Trash2,
    ShieldCheck,
    Search,
    RefreshCw,
    X,
    ExternalLink,
    LogOut,
    UserPlus,
    CheckCircle2,
    Mail,
    Phone,
    MapPin,
    Building2,
    FileText,
    Package,
    Camera,
    Upload,
    Download
} from 'lucide-react';

const AdminDashboard = () => {
    const [user, setUser] = useState(null);
    const [clients, setClients] = useState([]);
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    // Modal States
    const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
    const [isClientModalOpen, setIsClientModalOpen] = useState(false);
    const [editingProject, setEditingProject] = useState(null);
    const [editingClient, setEditingClient] = useState(null);
    const [currentClientFiles, setCurrentClientFiles] = useState([]);
    const [modalTab, setModalTab] = useState('dados'); // 'dados' | 'arquivos'

    // Form States (Project)
    const [formData, setFormData] = useState({
        name: '',
        client_id: '',
        status: 'Briefing',
        progress: 0,
        preview_url: ''
    });

    // Form States (Client Advanced)
    const [clientForm, setClientForm] = useState({
        full_name: '',
        email: '',
        phone: '',
        address: '',
        business_name: '',
        document: ''
    });

    const navigate = useNavigate();

    useEffect(() => {
        const checkAdmin = async () => {
            const { data: { user: authUser } } = await supabase.auth.getUser();
            if (!authUser) {
                navigate('/admin-login');
                return;
            }

            const isOwner = authUser.email?.toLowerCase() === 'helgonhc19@yahoo.com.br';

            let profileRole = null;
            try {
                const { data: profile } = await supabase
                    .from('profiles')
                    .select('role')
                    .eq('auth_id', authUser.id)
                    .single();
                profileRole = profile?.role;
            } catch (err) {
                console.log("Profile role check failed", err);
            }

            if (isOwner || profileRole === 'admin') {
                setUser(authUser);
                fetchData();
            } else {
                navigate('/dashboard');
            }
            setLoading(false);
        };
        checkAdmin();
    }, [navigate]);

    const fetchData = async () => {
        try {
            const { data: profilesData } = await supabase.from('profiles').select('*').order('created_at', { ascending: false });
            const { data: projectsData } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
            setClients(profilesData || []);
            setProjects(projectsData || []);
        } catch (err) {
            console.error("Fetch Data Error:", err);
        }
    };

    const handleSaveClient = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                full_name: clientForm.full_name,
                email: clientForm.email.toLowerCase(),
                phone: clientForm.phone,
                address: clientForm.address,
                business_name: clientForm.business_name,
                document: clientForm.document,
                role: 'client'
            };

            if (editingClient) {
                const { error } = await supabase
                    .from('profiles')
                    .update(payload)
                    .eq('id', editingClient.id);
                if (error) throw error;
            } else {
                const { error } = await supabase
                    .from('profiles')
                    .insert([payload]);
                if (error) throw error;
            }

            setIsClientModalOpen(false);
            setEditingClient(null);
            setClientForm({ full_name: '', email: '', phone: '', address: '', business_name: '', document: '' });
            setModalTab('dados');
            fetchData();
            alert(editingClient ? "Dados do cliente atualizados!" : "Cliente pré-cadastrado com sucesso!");
        } catch (err) {
            alert("Erro ao salvar: " + err.message);
        }
    };

    const openEditClient = async (client) => {
        setEditingClient(client);
        setModalTab('dados');
        setClientForm({
            full_name: client.full_name || '',
            email: client.email || '',
            phone: client.phone || '',
            address: client.address || '',
            business_name: client.business_name || '',
            document: client.document || ''
        });

        const { data: clientFiles } = await supabase
            .from('client_files')
            .select('*')
            .eq('client_id', client.id)
            .order('created_at', { ascending: false });
        setCurrentClientFiles(clientFiles || []);

        setIsClientModalOpen(true);
    };

    const handleDeleteFile = async (fileId) => {
        if (!window.confirm('Excluir este arquivo permanentemente?')) return;
        try {
            const { error } = await supabase
                .from('client_files')
                .delete()
                .eq('id', fileId);
            if (error) throw error;
            setCurrentClientFiles(currentClientFiles.filter(f => f.id !== fileId));
        } catch (err) {
            alert('Erro ao deletar: ' + err.message);
        }
    };

    const handleSaveProject = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                name: formData.name,
                client_id: formData.client_id,
                status: formData.status,
                progress: parseInt(formData.progress),
                preview_url: formData.preview_url,
                updated_at: new Date()
            };

            if (editingProject) {
                const { error } = await supabase
                    .from('projects')
                    .update(payload)
                    .eq('id', editingProject.id);
                if (error) throw error;
            } else {
                const { error } = await supabase
                    .from('projects')
                    .insert([payload]);
                if (error) throw error;
            }

            setIsProjectModalOpen(false);
            setEditingProject(null);
            setFormData({ name: '', client_id: '', status: 'Briefing', progress: 0, preview_url: '' });
            fetchData();
            alert(editingProject ? "Projeto atualizado!" : "Projeto conectado com sucesso!");
        } catch (err) {
            alert("Erro ao salvar projeto: " + err.message);
        }
    };

    const openEditProject = (project) => {
        setEditingProject(project);
        setFormData({
            name: project.name,
            client_id: project.client_id,
            status: project.status,
            progress: project.progress,
            preview_url: project.preview_url || ''
        });
        setIsProjectModalOpen(true);
    };

    const handleDeleteProject = async (id) => {
        if (!confirm("Confirmar exclusão definitiva do projeto?")) return;
        try {
            const { error } = await supabase.from('projects').delete().eq('id', id);
            if (error) throw error;
            fetchData();
        } catch (err) {
            alert("Falha na exclusão: " + err.message);
        }
    };

    const filteredClients = clients.filter(c =>
        c.role === 'client' &&
        (c.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            c.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            c.business_name?.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    if (loading) return (
        <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center space-y-4">
            <RefreshCw className="text-primary animate-spin" size={32} />
            <p className="text-white/20 font-black uppercase tracking-[5px] text-[10px]">Autenticando Command Center...</p>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#070707] flex flex-col font-sans selection:bg-primary selection:text-dark antialiased">
            {/* Header */}
            <header className="border-b border-white/5 bg-black/80 backdrop-blur-3xl sticky top-0 z-[100] p-6 px-12 flex justify-between items-center">
                <div className="flex items-center gap-6">
                    <img src="/logo.png" alt="JH DEV'S LOGO" className="h-12 w-auto object-contain" />
                    <div className="h-8 w-px bg-white/10 mx-2" />
                    <div>
                        <h1 className="text-xl font-display font-black text-white leading-none tracking-tighter uppercase whitespace-nowrap">
                            ADMIN <span className="text-primary italic">PANEL</span>
                        </h1>
                        <p className="text-[9px] text-white/20 uppercase tracking-[4px] mt-1 font-black">Sistema de Controle de Projetos</p>
                    </div>
                </div>

                <div className="flex items-center gap-6">
                    <div className="hidden lg:flex items-center gap-4 border-r border-white/10 pr-6 mr-6">
                        <div className="text-right">
                            <p className="text-[10px] font-black text-white/30 uppercase tracking-widest mb-1">Operador Logado</p>
                            <p className="text-xs font-bold text-white uppercase italic">{user?.email}</p>
                        </div>
                    </div>

                    <button
                        onClick={() => navigate('/')}
                        className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl text-white/40 hover:text-white hover:bg-white/10 transition-all text-[10px] font-black uppercase tracking-widest border border-white/5"
                    >
                        <ExternalLink size={14} /> Site
                    </button>

                    <button
                        onClick={async () => { await supabase.auth.signOut(); navigate('/admin-login'); }}
                        className="flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 hover:bg-red-500 hover:text-white transition-all text-[10px] font-black uppercase tracking-widest shadow-lg shadow-red-500/10"
                    >
                        <LogOut size={14} /> Sair
                    </button>
                </div>
            </header>

            <main className="p-8 lg:p-12 max-w-7xl mx-auto w-full space-y-12">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-dark-surface border border-white/5 p-8 rounded-[40px] relative overflow-hidden group hover:border-primary/20 transition-all">
                        <Users className="absolute -right-6 -bottom-6 text-primary/5 group-hover:scale-110 transition-transform" size={160} />
                        <p className="text-white/30 text-[10px] font-black uppercase tracking-[3px] mb-2">Clientes na Base</p>
                        <p className="text-6xl font-display font-black text-white italic">{clients.filter(c => c.role === 'client').length}</p>
                        <div className="mt-4 flex items-center gap-2 text-[10px] font-black text-green-500 uppercase">
                            <CheckCircle2 size={12} /> Sincronizado
                        </div>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-dark-surface border border-white/5 p-8 rounded-[40px] flex flex-col justify-between hover:border-primary/20 transition-all border-dashed">
                        <div>
                            <h3 className="text-2xl font-display font-black text-white uppercase italic mb-2">Novo <span className="text-primary">Cliente</span></h3>
                            <p className="text-white/30 text-xs font-bold">Pré-cadastrar perfil por e-mail.</p>
                        </div>
                        <button onClick={() => { setEditingClient(null); setClientForm({ full_name: '', email: '', phone: '', address: '', business_name: '', document: '' }); setIsClientModalOpen(true); }} className="w-full bg-white/5 border border-white/10 text-white font-black py-5 rounded-[24px] text-xs uppercase hover:bg-primary hover:text-dark transition-all flex items-center justify-center gap-3 mt-6">
                            <UserPlus size={20} /> CADASTRAR AGORA
                        </button>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-primary/5 border border-primary/20 p-8 rounded-[40px] flex flex-col justify-between shadow-2xl shadow-primary/5 text-xs">
                        <div>
                            <h3 className="text-2xl font-display font-black text-white uppercase italic mb-2">Vincular <span className="text-primary">Projeto</span></h3>
                            <p className="text-white/30 text-xs font-bold">Atribuir entrega a um perfil existente.</p>
                        </div>
                        <button onClick={() => { setEditingProject(null); setFormData({ name: '', client_id: '', status: 'Briefing', progress: 0 }); setIsProjectModalOpen(true); }} className="w-full bg-primary text-dark font-black py-5 rounded-[24px] text-xs uppercase hover:scale-[1.03] transition-all flex items-center justify-center gap-3 shadow-xl shadow-primary/20 mt-6 font-sans">
                            <Plus size={20} /> INICIAR PROCESSO
                        </button>
                    </motion.div>
                </div>

                {/* Table View */}
                <div className="bg-dark-surface border border-white/5 rounded-[56px] overflow-hidden shadow-3xl">
                    <div className="p-12 border-b border-white/5 flex flex-col md:flex-row justify-between items-center gap-10">
                        <div>
                            <h2 className="text-4xl font-display font-black text-white italic uppercase tracking-tighter">Command <span className="text-primary">Center</span></h2>
                            <p className="text-white/20 text-[10px] font-black uppercase tracking-[5px] mt-2">Gestão de Projetos</p>
                        </div>
                        <div className="relative w-full md:w-[450px]">
                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-primary" size={20} />
                            <input
                                type="text"
                                placeholder="PROCURAR POR NOME OU E-MAIL..."
                                className="w-full bg-[#0a0a0a] border border-white/10 rounded-[30px] py-6 pl-16 pr-8 text-white focus:border-primary transition-all text-xs font-black uppercase tracking-widest"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="p-12">
                        {filteredClients.length === 0 ? (
                            <div className="py-32 text-center border-2 border-dashed border-white/5 rounded-[48px]">
                                <Users size={56} className="mx-auto text-white/5 mb-6" />
                                <p className="text-white/20 font-black uppercase tracking-[4px] text-sm">Sem resultados encontrados</p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="text-white/10 text-[9px] font-black uppercase tracking-[4px] border-b border-white/5">
                                            <th className="pb-8 px-6 min-w-[300px]">Identificação / Perfil</th>
                                            <th className="pb-8 px-6 min-w-[200px]">Projeto Atribuído</th>
                                            <th className="pb-8 px-6 min-w-[200px]">Performance / Status</th>
                                            <th className="pb-8 px-6 text-right">Controle</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5">
                                        {filteredClients.map((client) => {
                                            const project = projects.find(p => p.client_id === client.id);
                                            return (
                                                <tr key={client.id} className="group hover:bg-white/[0.01] transition-all">
                                                    <td className="py-10 px-6">
                                                        <div className="flex items-center gap-6">
                                                            <div className="w-14 h-14 rounded-2xl overflow-hidden border border-white/10 bg-white/5 relative">
                                                                {client.avatar_url ? (
                                                                    <img src={client.avatar_url} alt="" className="w-full h-full object-cover" />
                                                                ) : (
                                                                    <div className="w-full h-full flex items-center justify-center text-primary font-display font-black text-2xl">
                                                                        {client.full_name?.[0] || 'U'}
                                                                    </div>
                                                                )}
                                                            </div>
                                                            <div>
                                                                <div className="flex items-center gap-2">
                                                                    <p className="text-white font-black text-xl italic uppercase group-hover:text-primary transition-colors">{client.full_name || 'Sem Nome'}</p>
                                                                    {client.business_name && (
                                                                        <span className="px-2 py-0.5 bg-white/5 text-[8px] text-white/40 border border-white/10 rounded-md font-black uppercase tracking-widest">{client.business_name}</span>
                                                                    )}
                                                                </div>
                                                                <p className="text-[10px] text-white/20 font-mono font-bold uppercase">{client.email}</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="py-10 px-6">
                                                        {project ? (
                                                            <div className="space-y-2">
                                                                <p className="text-white font-black text-sm uppercase italic">{project.name}</p>
                                                                <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-[9px] text-primary font-black uppercase">
                                                                    <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" /> {project.status}
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            <button
                                                                onClick={() => { setFormData({ ...formData, client_id: client.id }); setIsProjectModalOpen(true); }}
                                                                className="text-[9px] font-black text-white/20 hover:text-primary uppercase tracking-[2px] p-2 px-4 border border-white/5 rounded-xl hover:border-primary/20 transition-all"
                                                            >
                                                                + CONECTAR PROJETO
                                                            </button>
                                                        )}
                                                    </td>
                                                    <td className="py-10 px-6">
                                                        <div className="w-full max-w-[200px]">
                                                            <div className="flex justify-between items-center mb-2">
                                                                <span className="text-[9px] font-black text-white/30 uppercase tracking-widest">Entrega</span>
                                                                <span className="text-sm font-display font-black text-primary italic">{project?.progress || 0}%</span>
                                                            </div>
                                                            <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                                                                <motion.div initial={{ width: 0 }} animate={{ width: `${project?.progress || 0}%` }} className="h-full bg-primary" />
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="py-10 px-6 text-right">
                                                        <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all">
                                                            <button onClick={() => openEditClient(client)} className="p-3 bg-white/5 rounded-xl text-white/20 hover:text-primary transition-all"><Edit3 size={16} /></button>
                                                            {project && (
                                                                <>
                                                                    <button onClick={() => openEditProject(project)} className="p-3 bg-white/5 rounded-xl text-white/20 hover:text-primary transition-all"><Briefcase size={16} /></button>
                                                                    <button onClick={() => handleDeleteProject(project.id)} className="p-3 bg-white/5 rounded-xl text-white/20 hover:text-red-500 transition-all"><Trash2 size={16} /></button>
                                                                </>
                                                            )}
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            {/* MODAL: REGISTRAR / EDITAR CLIENTE */}
            <AnimatePresence>
                {isClientModalOpen && (
                    <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 backdrop-blur-3xl bg-black/80">
                        <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="bg-dark-surface border border-white/10 w-full max-w-4xl rounded-[48px] overflow-hidden shadow-3xl">
                            <div className="p-10 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
                                <div>
                                    <h3 className="text-3xl font-display font-black text-white italic uppercase tracking-tighter">
                                        {editingClient ? 'DOSSIÊ DO' : 'PRÉ-CADASTRAR'} <span className="text-primary">{editingClient ? 'CLIENTE' : 'PERFIL'}</span>
                                    </h3>
                                    <p className="text-[10px] text-white/20 font-black uppercase tracking-[4px] mt-1">Gestão Completa de Dados</p>
                                </div>
                                <button onClick={() => setIsClientModalOpen(false)} className="p-4 bg-white/5 rounded-2xl text-white/30 hover:text-white transition-all"><X size={20} /></button>
                            </div>

                            {editingClient && (
                                <div className="px-10 py-4 bg-white/[0.02] border-b border-white/5 flex gap-8">
                                    {[
                                        { id: 'dados', label: 'Dados Cadastrais', icon: <UserPlus size={14} /> },
                                        { id: 'arquivos', label: 'Dossiê de Arquivos', icon: <Package size={14} /> }
                                    ].map(tab => (
                                        <button
                                            key={tab.id}
                                            type="button"
                                            onClick={() => setModalTab(tab.id)}
                                            className={`flex items-center gap-3 pb-4 px-2 text-[10px] font-black uppercase tracking-[3px] transition-all relative ${modalTab === tab.id ? 'text-primary' : 'text-white/20 hover:text-white/40'
                                                }`}
                                        >
                                            {tab.icon} {tab.label}
                                            {modalTab === tab.id && <motion.div layoutId="modalTabLine" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary shadow-[0_0_10px_#7CFF01]" />}
                                        </button>
                                    ))}
                                </div>
                            )}

                            <div className="p-10 max-h-[70vh] overflow-y-auto custom-scrollbar">
                                {modalTab === 'dados' ? (
                                    <form onSubmit={handleSaveClient} className="space-y-10">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            {/* Personal Info */}
                                            <div className="space-y-6">
                                                <div className="space-y-2">
                                                    <label className="flex items-center gap-2 text-[9px] font-black text-white/30 uppercase tracking-[4px] ml-4"><UserPlus size={10} /> Nome Completo</label>
                                                    <input type="text" required value={clientForm.full_name} onChange={(e) => setClientForm({ ...clientForm, full_name: e.target.value })} className="w-full bg-[#0a0a0a] border border-white/10 rounded-[22px] py-5 px-8 text-white focus:border-primary transition-all text-sm font-bold uppercase" placeholder="NOME DO CLIENTE" />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="flex items-center gap-2 text-[9px] font-black text-white/30 uppercase tracking-[4px] ml-4"><Mail size={10} /> E-mail de Acesso</label>
                                                    <input type="email" required value={clientForm.email} onChange={(e) => setClientForm({ ...clientForm, email: e.target.value })} className="w-full bg-[#0a0a0a] border border-white/10 rounded-[22px] py-5 px-8 text-white focus:border-primary transition-all text-sm font-bold lowercase" placeholder="e-mail@servico.com" />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="flex items-center gap-2 text-[9px] font-black text-white/30 uppercase tracking-[4px] ml-4"><Phone size={10} /> Telefone / WhatsApp</label>
                                                    <input type="text" value={clientForm.phone} onChange={(e) => setClientForm({ ...clientForm, phone: e.target.value })} className="w-full bg-[#0a0a0a] border border-white/10 rounded-[22px] py-5 px-8 text-white focus:border-primary transition-all text-sm font-bold" placeholder="(00) 00000-0000" />
                                                </div>
                                            </div>

                                            {/* Business Info */}
                                            <div className="space-y-6">
                                                <div className="space-y-2">
                                                    <label className="flex items-center gap-2 text-[9px] font-black text-white/30 uppercase tracking-[4px] ml-4"><Building2 size={10} /> Nome da Empresa</label>
                                                    <input type="text" value={clientForm.business_name} onChange={(e) => setClientForm({ ...clientForm, business_name: e.target.value })} className="w-full bg-[#0a0a0a] border border-white/10 rounded-[22px] py-5 px-8 text-white focus:border-primary transition-all text-sm font-bold uppercase" placeholder="RAZÃO SOCIAL OU NOME FANTASIA" />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="flex items-center gap-2 text-[9px] font-black text-white/30 uppercase tracking-[4px] ml-4"><FileText size={10} /> CPF / CNPJ</label>
                                                    <input type="text" value={clientForm.document} onChange={(e) => setClientForm({ ...clientForm, document: e.target.value })} className="w-full bg-[#0a0a0a] border border-white/10 rounded-[22px] py-5 px-8 text-white focus:border-primary transition-all text-sm font-bold" placeholder="000.000.000-00" />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="flex items-center gap-2 text-[9px] font-black text-white/30 uppercase tracking-[4px] ml-4"><MapPin size={10} /> Endereço Completo</label>
                                                    <input type="text" value={clientForm.address} onChange={(e) => setClientForm({ ...clientForm, address: e.target.value })} className="w-full bg-[#0a0a0a] border border-white/10 rounded-[22px] py-5 px-8 text-white focus:border-primary transition-all text-sm font-bold uppercase" placeholder="RUA, NÚMERO, BAIRRO, CIDADE - UF" />
                                                </div>
                                            </div>
                                        </div>

                                        <button type="submit" className="w-full bg-primary text-dark font-black py-6 rounded-3xl hover:scale-[1.02] shadow-primary/20 transition-all text-xs tracking-widest uppercase flex items-center justify-center gap-3">
                                            <ShieldCheck size={20} /> {editingClient ? 'SALVAR ALTERAÇÕES' : 'CADASTRAR PERFIL ELITE'}
                                        </button>
                                    </form>
                                ) : (
                                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h4 className="text-xl font-display font-black text-white italic uppercase tracking-tighter">Ativos Disponíveis</h4>
                                                <p className="text-[10px] text-white/20 font-black uppercase tracking-widest mt-1">Arquivos enviados pelo cliente para produção</p>
                                            </div>
                                            <span className="px-4 py-2 bg-white/5 rounded-xl text-[10px] font-black text-white/40 uppercase tracking-widest border border-white/5">
                                                {currentClientFiles.length} Itens
                                            </span>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {currentClientFiles.length === 0 ? (
                                                <div className="col-span-2 py-20 bg-white/[0.02] border border-dashed border-white/10 rounded-[40px] text-center">
                                                    <Package className="mx-auto text-white/5 mb-4" size={48} />
                                                    <p className="text-[10px] text-white/20 font-black uppercase tracking-[3px]">Aguardando envios do cliente.</p>
                                                </div>
                                            ) : (
                                                currentClientFiles.map(file => (
                                                    <motion.div
                                                        layout
                                                        key={file.id}
                                                        className="bg-white/[0.03] border border-white/5 p-6 rounded-[32px] hover:border-primary/30 transition-all group/file relative overflow-hidden"
                                                    >
                                                        <div className="flex items-center gap-5">
                                                            <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary group-hover/file:bg-primary group-hover/file:text-dark transition-all shrink-0">
                                                                <FileText size={24} />
                                                            </div>
                                                            <div className="overflow-hidden pr-12">
                                                                <p className="text-white font-black text-sm uppercase italic truncate tracking-tight">{file.name}</p>
                                                                <div className="flex flex-wrap items-center gap-3 mt-2">
                                                                    <span className="px-2 py-1 bg-white/5 text-white/40 text-[8px] font-black uppercase rounded-lg tracking-wider border border-white/5 italic">{file.category}</span>
                                                                    <p className="text-[9px] text-white/20 font-black uppercase tracking-widest">{(file.size / 1024 / 1024).toFixed(1)} MB</p>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {file.description && (
                                                            <div className="mt-4 pt-4 border-t border-white/5">
                                                                <p className="text-[9px] text-white/40 font-bold leading-relaxed line-clamp-2 italic italic opacity-60 group-hover/file:opacity-100 transition-opacity">"{file.description}"</p>
                                                            </div>
                                                        )}

                                                        <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-2 opacity-0 group-hover/file:opacity-100 transition-all scale-90 group-hover/file:scale-100">
                                                            <a href={file.url} target="_blank" rel="noreferrer" className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-white hover:bg-primary hover:text-dark transition-all shadow-xl"><Download size={18} /></a>
                                                            <button type="button" onClick={() => handleDeleteFile(file.id)} className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-white hover:bg-red-500 transition-all shadow-xl"><Trash2 size={18} /></button>
                                                        </div>
                                                    </motion.div>
                                                ))
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* MODAL: PROJETOS */}
            <AnimatePresence>
                {isProjectModalOpen && (
                    <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 backdrop-blur-3xl bg-black/80">
                        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-dark-surface border border-white/10 w-full max-w-xl rounded-[56px] overflow-hidden">
                            <div className="p-10 border-b border-white/5 flex justify-between items-center">
                                <h3 className="text-3xl font-display font-black text-white italic uppercase">{editingProject ? 'EDITAR' : 'NOVO'} <span className="text-primary">PROJETO</span></h3>
                                <button onClick={() => { setIsProjectModalOpen(false); setEditingProject(null); }} className="p-4 bg-white/5 rounded-2xl text-white/30 hover:text-white transition-all"><X size={20} /></button>
                            </div>
                            <form onSubmit={handleSaveProject} className="p-10 space-y-8">
                                <div className="grid grid-cols-1 gap-6">
                                    <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full bg-[#0a0a0a] border border-white/10 rounded-[24px] py-5 px-8 text-white focus:border-primary transition-all text-sm font-bold uppercase" placeholder="NOME DO PROJETO" />
                                    <div className="grid grid-cols-2 gap-6">
                                        <select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })} className="bg-[#0a0a0a] border border-white/10 rounded-3xl py-5 px-8 text-white focus:border-primary text-[10px] font-black uppercase">
                                            <option value="Briefing">Briefing</option>
                                            <option value="Design">Arquitetura UI/UX</option>
                                            <option value="Desenvolvimento">Codificação</option>
                                            <option value="Finalização">Homologação</option>
                                            <option value="Live">Publicado</option>
                                        </select>
                                        <input type="number" min="0" max="100" required value={formData.progress} onChange={(e) => setFormData({ ...formData, progress: e.target.value })} className="bg-[#0a0a0a] border border-white/10 rounded-3xl py-5 px-8 text-white focus:border-primary text-sm font-bold" />
                                    </div>
                                    {!editingProject && (
                                        <select required value={formData.client_id} onChange={(e) => setFormData({ ...formData, client_id: e.target.value })} className="bg-[#0a0a0a] border border-white/10 rounded-3xl py-5 px-8 text-white focus:border-primary text-[10px] font-black uppercase">
                                            <option value="">VINCULAR A QUAL CLIENTE?</option>
                                            {clients.filter(c => c.role === 'client').map(c => (
                                                <option key={c.id} value={c.id}>{c.full_name.toUpperCase()}</option>
                                            ))}
                                        </select>
                                    )}
                                    <div className="space-y-2">
                                        <label className="flex items-center gap-2 text-[9px] font-black text-white/30 uppercase tracking-[4px] ml-4"><ExternalLink size={10} /> URL de Preview (Sites/App)</label>
                                        <input type="url" value={formData.preview_url} onChange={(e) => setFormData({ ...formData, preview_url: e.target.value })} className="w-full bg-[#0a0a0a] border border-white/10 rounded-[24px] py-5 px-8 text-white focus:border-primary transition-all text-sm font-bold lowercase" placeholder="https://preview-do-site.com" />
                                    </div>
                                </div>
                                <button type="submit" className="w-full bg-primary text-dark font-black py-6 rounded-3xl hover:scale-[1.02] shadow-primary/20 transition-all text-xs tracking-widest uppercase">{editingProject ? 'SALVAR ALTERAÇÕES' : 'CONECTAR PROJETO'}</button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AdminDashboard;
