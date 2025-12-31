import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Users, DollarSign, TrendingUp, Calendar, ArrowUpRight, Bell } from 'lucide-react';

const AdminDemo = ({ isMobile }) => {
    const visitsData = [
        { name: 'Seg', uv: 4000 },
        { name: 'Ter', uv: 3000 },
        { name: 'Qua', uv: 2000 },
        { name: 'Qui', uv: 2780 },
        { name: 'Sex', uv: 1890 },
        { name: 'Sab', uv: 2390 },
        { name: 'Dom', uv: 3490 },
    ];

    const leadsData = [
        { id: 1, name: 'Roberto Silva', status: 'Novo', time: '10 min ago' },
        { id: 2, name: 'Ana Maria', status: 'Em Contato', time: '1h ago' },
        { id: 3, name: 'Carlos Edu', status: 'Fechado', time: '3h ago' },
    ];

    return (
        <div className="bg-slate-50 min-h-screen font-sans text-slate-800">
            {/* Top Bar */}
            <header className="bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center sticky top-0 z-10">
                <div className="font-bold text-lg text-indigo-600">Painel do Cliente</div>
                <div className="flex items-center gap-4">
                    <button className="relative p-2 hover:bg-slate-100 rounded-full">
                        <Bell size={20} className="text-slate-500" />
                        <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
                    </button>
                    <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 font-bold text-xs">
                        JH
                    </div>
                </div>
            </header>

            <main className="p-6 space-y-6">
                {/* Stats Overview */}
                <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-3'} gap-4`}>
                    <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Visitas Hoje</p>
                                <h3 className="text-2xl font-bold mt-1">1,204</h3>
                            </div>
                            <div className="p-2 bg-green-50 text-green-600 rounded-lg">
                                <Users size={20} />
                            </div>
                        </div>
                        <div className="flex items-center gap-1 text-xs font-medium text-green-600">
                            <ArrowUpRight size={12} />
                            <span>12% vs ontem</span>
                        </div>
                    </div>
                    <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Leads</p>
                                <h3 className="text-2xl font-bold mt-1">18</h3>
                            </div>
                            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                                <TrendingUp size={20} />
                            </div>
                        </div>
                        <div className="flex items-center gap-1 text-xs font-medium text-green-600">
                            <ArrowUpRight size={12} />
                            <span>5 novos hoje</span>
                        </div>
                    </div>
                    <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Fatura Atual</p>
                                <h3 className="text-2xl font-bold mt-1">R$ 0,00</h3>
                            </div>
                            <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
                                <DollarSign size={20} />
                            </div>
                        </div>
                        <div className="flex items-center gap-1 text-xs font-medium text-slate-400">
                            <span>Próx. vencimento 10/12</span>
                        </div>
                    </div>
                </div>

                {/* Main Graph */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                    <h4 className="font-bold text-slate-700 mb-6">Tráfego Semanal</h4>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={visitsData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} fontSize={12} tick={{ fill: '#64748b' }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} fontSize={12} tick={{ fill: '#64748b' }} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                    cursor={{ stroke: '#6366f1', strokeWidth: 2 }}
                                />
                                <Line type="monotone" dataKey="uv" stroke="#6366f1" strokeWidth={3} dot={{ r: 4, fill: '#6366f1', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Recent Leads */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                    <div className="flex justify-between items-center mb-6">
                        <h4 className="font-bold text-slate-700">Últimos Contatos</h4>
                        <button className="text-xs text-indigo-600 font-bold uppercase hover:underline">Ver Todos</button>
                    </div>
                    <div className="space-y-4">
                        {leadsData.map(lead => (
                            <div key={lead.id} className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer border border-transparent hover:border-slate-100">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                                        {lead.name.charAt(0)}
                                    </div>
                                    <div>
                                        <div className="font-bold text-sm text-slate-800">{lead.name}</div>
                                        <div className="text-xs text-slate-400 flex items-center gap-1">
                                            <Calendar size={10} /> {lead.time}
                                        </div>
                                    </div>
                                </div>
                                <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${lead.status === 'Novo' ? 'bg-green-100 text-green-700' :
                                        lead.status === 'Fechado' ? 'bg-slate-100 text-slate-600' : 'bg-blue-100 text-blue-700'
                                    }`}>
                                    {lead.status}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AdminDemo;
