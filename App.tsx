
import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Database, 
  Scale, 
  GitBranch, 
  Mail, 
  Code, 
  Lock, 
  FileCheck, 
  Activity,
  ChevronRight,
  ExternalLink,
  BookOpen,
  Layers,
  History,
  RefreshCw,
  Repeat,
  Zap,
  Cloud,
  ChevronDown,
  Info,
  CheckCircle2,
  AlertTriangle,
  Menu,
  X as CloseIcon
} from 'lucide-react';
import { ROADMAP_CONTENT } from './constants';
import TransactionSimulator from './components/TransactionSimulator';
import AIChatbot from './components/AIChatbot';
import ComplianceView from './views/ComplianceView';

type ViewType = 'principles' | 'roadmap' | 'simulator' | 'compliance';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewType>('principles');
  const [selectedRoadmapId, setSelectedRoadmapId] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShieldAlert': return <ShieldAlert className="w-6 h-6 text-red-500" />;
      case 'Database': return <Database className="w-6 h-6 text-blue-500" />;
      case 'Scale': return <Scale className="w-6 h-6 text-amber-500" />;
      case 'GitBranch': return <GitBranch className="w-6 h-6 text-purple-500" />;
      case 'Mail': return <Mail className="w-6 h-6 text-emerald-500" />;
      case 'Layers': return <Layers className="w-6 h-6 text-indigo-500" />;
      case 'History': return <History className="w-6 h-6 text-orange-500" />;
      case 'RefreshCw': return <RefreshCw className="w-6 h-6 text-cyan-500" />;
      case 'Repeat': return <Repeat className="w-6 h-6 text-teal-500" />;
      case 'Zap': return <Zap className="w-6 h-6 text-yellow-500" />;
      case 'Cloud': return <Cloud className="w-6 h-6 text-sky-500" />;
      case 'FileCheck': return <FileCheck className="w-6 h-6 text-indigo-400" />;
      case 'BookOpen': return <BookOpen className="w-6 h-6 text-slate-400" />;
      case 'Lock': return <Lock className="w-6 h-6 text-slate-300" />;
      default: return <Activity className="w-6 h-6 text-slate-400" />;
    }
  };

  const principles = ROADMAP_CONTENT.find(r => r.id === 'principles');
  const filteredRoadmap = ROADMAP_CONTENT.filter(r => r.id !== 'principles');

  const navItems = [
    { id: 'principles', label: 'Diretrizes', icon: ShieldAlert },
    { id: 'roadmap', label: 'Roadmap', icon: Layers },
    { id: 'simulator', label: 'Simulador', icon: Zap },
    { id: 'compliance', label: 'Compliance', icon: FileCheck },
  ];

  return (
    <div className="min-h-screen pb-20 bg-[#0a0f1d] selection:bg-emerald-500/30">
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-500/10 rounded-full blur-[120px]" />
      </div>

      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/60 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentView('principles')}>
            <div className="w-9 h-9 bg-emerald-500 rounded-xl flex items-center justify-center font-bold text-slate-950 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
              D
            </div>
            <h1 className="text-lg font-bold tracking-tight text-white flex items-center gap-2">
              D-AI <span className="text-emerald-500 font-medium text-xs bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 uppercase">bank</span>
            </h1>
          </div>
          
          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id as ViewType)}
                className={`text-[10px] font-black uppercase tracking-[0.2em] transition-all px-3 py-1.5 rounded-lg border ${
                  currentView === item.id 
                    ? 'text-emerald-400 border-emerald-500/20 bg-emerald-500/5 shadow-[0_0_15px_rgba(16,185,129,0.1)]' 
                    : 'text-slate-500 border-transparent hover:text-slate-300 hover:border-slate-800'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden text-slate-400" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <CloseIcon /> : <Menu />}
          </button>
        </div>

        {/* Mobile Nav Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-slate-900 border-b border-slate-800 py-4 px-6 space-y-2 animate-in slide-in-from-top-4">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentView(item.id as ViewType);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-xs uppercase tracking-widest ${
                  currentView === item.id ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'text-slate-500'
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </button>
            ))}
          </div>
        )}
      </header>

      <main className="max-w-7xl mx-auto px-6 mt-16 animate-in fade-in duration-700">
        
        {/* Principles View */}
        {currentView === 'principles' && (
          <div className="max-w-4xl mx-auto space-y-16">
            <section className="text-center space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                <ShieldAlert className="w-3.5 h-3.5 text-emerald-500" />
                <span className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.2em]">D-AI Engineering Standard</span>
              </div>
              <h2 className="text-6xl font-black text-white leading-tight">
                Diretrizes <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-indigo-500">Inegociáveis</span>
              </h2>
              <p className="text-slate-400 text-xl font-light leading-relaxed max-w-2xl mx-auto">
                No D-AI bank, a integridade é nativa. Estes são os fundamentos técnicos que garantem a segurança de cada operação financeira.
              </p>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {principles?.details.map((detail, idx) => (
                <div key={idx} className="p-8 bg-slate-900/40 border border-slate-800 rounded-[2.5rem] flex flex-col gap-4 hover:border-emerald-500/30 transition-all hover:scale-[1.02] shadow-xl group">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 group-hover:bg-emerald-500/20 transition-colors">
                    <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                  </div>
                  <h4 className="text-xl font-bold text-white tracking-tight">{detail}</h4>
                  <p className="text-slate-500 text-sm leading-relaxed">Pilar fundamental do D-AI bank para garantir que o estado financeiro nunca seja corrompido.</p>
                </div>
              ))}
            </div>

            <div className="p-10 rounded-[3rem] bg-indigo-950/20 border border-indigo-500/20 text-center space-y-6">
              <Info className="w-10 h-10 text-indigo-400 mx-auto" />
              <h3 className="text-3xl font-black text-white">Engenharia de Elite</h3>
              <p className="text-slate-400 max-w-lg mx-auto leading-relaxed">Conheça a arquitetura por trás do D-AI bank, utilizando as melhores práticas de .NET e MongoDB.</p>
              <button 
                onClick={() => setCurrentView('roadmap')}
                className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-lg shadow-indigo-600/20"
              >
                Ver Blueprint Técnico
              </button>
            </div>
          </div>
        )}

        {/* Roadmap View */}
        {currentView === 'roadmap' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-7 space-y-10">
              <section className="space-y-4">
                <h2 className="text-4xl font-black text-white">D-AI Roadmap</h2>
                <p className="text-slate-400 font-light leading-relaxed">O caminho técnico para o desenvolvimento do core bancário do D-AI bank.</p>
              </section>

              <div className="space-y-4">
                {filteredRoadmap.map((section) => (
                  <div 
                    key={section.id}
                    onClick={() => setSelectedRoadmapId(section.id === selectedRoadmapId ? null : section.id)}
                    className={`group cursor-pointer p-6 rounded-2xl border transition-all duration-500 ${
                      selectedRoadmapId === section.id 
                        ? 'bg-slate-800/80 border-emerald-500/50 shadow-2xl ring-1 ring-emerald-500/20' 
                        : 'bg-slate-900/40 border-slate-800/50 hover:bg-slate-800/40 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`p-2.5 rounded-xl transition-colors ${selectedRoadmapId === section.id ? 'bg-slate-700' : 'bg-slate-800/50 group-hover:bg-slate-700'}`}>
                          {getIcon(section.icon)}
                        </div>
                        <div>
                          <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
                            {section.title}
                            {section.critical && <span className="text-[9px] bg-red-500/20 text-red-500 px-2 py-0.5 rounded border border-red-500/20 uppercase font-black">Crítico</span>}
                          </h3>
                          <p className="text-slate-500 text-xs mt-0.5 font-medium">{section.description}</p>
                        </div>
                      </div>
                      <ChevronDown className={`w-5 h-5 transition-transform ${selectedRoadmapId === section.id ? 'rotate-180 text-emerald-400' : 'text-slate-700'}`} />
                    </div>

                    {selectedRoadmapId === section.id && (
                      <div className="mt-6 pt-6 border-t border-slate-700 animate-in fade-in slide-in-from-top-2">
                        <ul className="space-y-3 mb-6">
                          {section.details.map((detail, idx) => (
                            <li key={idx} className="flex items-start gap-3 text-slate-300 text-sm leading-relaxed">
                              <div className="mt-2 w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                              {detail}
                            </li>
                          ))}
                        </ul>
                        {section.codeSnippet && (
                          <div className="rounded-xl overflow-hidden border border-slate-700">
                            <div className="bg-slate-950 px-4 py-2 flex items-center justify-between border-b border-slate-800">
                              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                                <Code className="w-3 h-3" /> Implementação D-AI
                              </span>
                            </div>
                            <pre className="p-4 bg-slate-950 text-emerald-400 text-[11px] code-font overflow-x-auto">
                              {section.codeSnippet}
                            </pre>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="lg:col-span-5 space-y-8">
              <div className="p-8 rounded-[2.5rem] bg-indigo-900/20 border border-indigo-500/20 space-y-6 sticky top-28">
                <h4 className="text-white font-black text-xl flex items-center gap-3">
                  <Activity className="w-6 h-6 text-indigo-400" /> Status D-AI bank
                </h4>
                <div className="space-y-4">
                  {[
                    { label: 'Integridade de Dados', val: '100%', color: 'text-emerald-400' },
                    { label: 'Idempotência', val: 'End-to-End', color: 'text-emerald-400' },
                    { label: 'Audit Trail', val: 'Ativo', color: 'text-emerald-400' }
                  ].map((item, i) => (
                    <div key={i} className="flex justify-between items-center p-4 bg-slate-900/50 rounded-2xl border border-slate-800">
                      <span className="text-slate-400 text-xs font-bold uppercase tracking-widest">{item.label}</span>
                      <span className={`font-black ${item.color}`}>{item.val}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Simulator View */}
        {currentView === 'simulator' && (
          <div className="max-w-5xl mx-auto space-y-12">
            <section className="text-center space-y-4">
              <h2 className="text-4xl font-black text-white">D-AI Execution Lab</h2>
              <p className="text-slate-400 font-light leading-relaxed max-w-xl mx-auto">
                Experimente o motor transacional do D-AI bank em tempo real.
              </p>
            </section>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <TransactionSimulator />
            </div>
          </div>
        )}

        {/* Compliance View */}
        {currentView === 'compliance' && <ComplianceView />}

      </main>

      {/* Floating AI Architect */}
      <AIChatbot />

      <footer className="mt-32 py-20 border-t border-slate-900 bg-slate-950/50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center font-bold text-slate-500 text-xs">D</div>
            <div className="flex flex-col">
              <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">D-AI bank Technical Blueprint</span>
              <span className="text-[9px] text-slate-600 font-bold uppercase tracking-widest">Strict Engineering Standard © 2024</span>
            </div>
          </div>
          <div className="flex gap-10">
            {navItems.map(item => (
              <button 
                key={item.id} 
                onClick={() => setCurrentView(item.id as ViewType)}
                className="text-[10px] font-black text-slate-600 hover:text-emerald-500 uppercase tracking-widest transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
