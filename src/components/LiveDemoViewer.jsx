import React from 'react';
import { X, Smartphone, Monitor } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const LiveDemoViewer = ({ isOpen, onClose, component: Component }) => {
    const [viewMode, setViewMode] = React.useState('desktop'); // 'desktop' or 'mobile'

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[99999] bg-black/90 backdrop-blur-sm flex flex-col"
            >
                {/* Header Control Bar */}
                <div className="relative z-[100] flex items-center justify-between px-6 py-4 bg-dark-card border-b border-white/10">
                    <div className="flex items-center gap-4">
                        <span className="text-white font-bold text-lg">Visualização ao Vivo</span>
                        <div className="flex bg-white/5 rounded-lg p-1">
                            <button
                                onClick={() => setViewMode('desktop')}
                                className={`p-2 rounded-md transition-all ${viewMode === 'desktop' ? 'bg-primary text-dark' : 'text-white/50 hover:text-white'}`}
                            >
                                <Monitor size={20} />
                            </button>
                            <button
                                onClick={() => setViewMode('mobile')}
                                className={`p-2 rounded-md transition-all ${viewMode === 'mobile' ? 'bg-primary text-dark' : 'text-white/50 hover:text-white'}`}
                            >
                                <Smartphone size={20} />
                            </button>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full hover:bg-white/10 text-white transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Content Area */}
                <div className="flex-1 overflow-hidden bg-zinc-900 flex items-center justify-center p-4">
                    <motion.div
                        layout
                        className={`bg-white shadow-2xl overflow-hidden transition-all duration-500 ease-in-out relative transform-gpu ${viewMode === 'mobile'
                            ? 'w-[375px] h-[812px] rounded-[3rem] border-8 border-dark bg-black shadow-2xl'
                            : 'w-full h-full rounded-lg border border-white/5'
                            }`}
                    >
                        {/* Mobile Notch emulation if needed, or just container */}
                        <div className="w-full h-full overflow-y-auto bg-white scrollbar-thin scrollbar-thumb-gray-300">
                            {Component && <Component isMobile={viewMode === 'mobile'} />}
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default LiveDemoViewer;
