
import React, { useState } from 'react';
import { CheckCircle2, Circle, Loader2, Database, ListChecks, History } from 'lucide-react';
import { TransactionStep } from '../types';

interface LedgerEntry {
  id: string;
  type: 'DEBIT' | 'CREDIT';
  amount: string;
  timestamp: string;
}

const TransactionSimulator: React.FC = () => {
  const [steps, setSteps] = useState<TransactionStep[]>([
    { name: 'Validação', status: 'pending', description: 'Checking Balance & Version' },
    { name: 'Balance Lock', status: 'pending', description: 'Optimistic Lock Applied' },
    { name: 'Append Ledger', status: 'pending', description: 'Immutable Record Entry' },
    { name: 'Outbox Sync', status: 'pending', description: 'Queue for Event Bus' },
    { name: 'Finalize', status: 'pending', description: 'Release Lock' }
  ]);
  const [ledger, setLedger] = useState<LedgerEntry[]>([]);
  const [isSimulating, setIsSimulating] = useState(false);

  const reset = () => {
    setSteps(s => s.map(item => ({ ...item, status: 'pending' })));
    setIsSimulating(false);
  };

  const startSimulation = async () => {
    reset();
    setIsSimulating(true);
    
    for (let i = 0; i < steps.length; i++) {
      setSteps(prev => prev.map((s, idx) => idx === i ? { ...s, status: 'active' } : s));
      await new Promise(r => setTimeout(r, 800));
      
      if (steps[i].name === 'Append Ledger') {
        const newEntry: LedgerEntry = {
          id: Math.random().toString(36).substr(2, 9).toUpperCase(),
          type: 'DEBIT',
          amount: 'R$ 150,00',
          timestamp: new Date().toLocaleTimeString()
        };
        setLedger(prev => [newEntry, ...prev]);
      }

      setSteps(prev => prev.map((s, idx) => idx === i ? { ...s, status: 'completed' } : s));
    }
    
    setIsSimulating(false);
  };

  return (
    <div className="space-y-6">
      {/* Simulation Stepper */}
      <div className="bg-slate-900/80 rounded-2xl p-6 border border-slate-700 shadow-2xl backdrop-blur-sm">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <ListChecks className="w-5 h-5 text-emerald-400" />
            <h3 className="text-lg font-bold text-slate-100 tracking-tight">Fluxo de Transação</h3>
          </div>
          <button 
            onClick={startSimulation}
            disabled={isSimulating}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-slate-950 rounded-xl font-bold text-xs transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(16,185,129,0.4)]"
          >
            {isSimulating ? <Loader2 className="animate-spin w-4 h-4" /> : 'Executar Transferência'}
          </button>
        </div>

        <div className="space-y-3">
          {steps.map((step, idx) => (
            <div 
              key={idx}
              className={`flex items-center gap-4 p-3 rounded-xl border transition-all duration-300 ${
                step.status === 'active' ? 'bg-emerald-500/10 border-emerald-500/50 scale-[1.02]' : 
                step.status === 'completed' ? 'bg-slate-800/40 border-slate-700' : 'bg-transparent border-slate-800/50 opacity-40'
              }`}
            >
              <div className="flex-shrink-0">
                {step.status === 'completed' && <CheckCircle2 className="text-emerald-500 w-4 h-4" />}
                {step.status === 'active' && <Loader2 className="text-emerald-400 w-4 h-4 animate-spin" />}
                {step.status === 'pending' && <Circle className="text-slate-600 w-4 h-4" />}
              </div>
              <div className="flex-1">
                <p className={`text-xs font-bold ${step.status === 'active' ? 'text-emerald-400' : 'text-slate-300'}`}>
                  {step.name}
                </p>
                <p className="text-[10px] text-slate-500 font-medium">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Ledger Preview */}
      <div className="bg-slate-900/80 rounded-2xl p-6 border border-slate-700 shadow-2xl backdrop-blur-sm">
        <div className="flex items-center gap-2 mb-4">
          <History className="w-5 h-5 text-indigo-400" />
          <h3 className="text-lg font-bold text-slate-100 tracking-tight">Ledger Imutável (Append-only)</h3>
        </div>
        
        <div className="bg-slate-950 rounded-xl border border-slate-800 overflow-hidden">
          <table className="w-full text-[10px] text-left">
            <thead className="bg-slate-900 text-slate-500 uppercase font-black tracking-widest border-b border-slate-800">
              <tr>
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Tipo</th>
                <th className="px-4 py-2">Valor</th>
                <th className="px-4 py-2">Hora</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {ledger.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-4 py-8 text-center text-slate-600 font-medium">
                    Aguardando transações...
                  </td>
                </tr>
              ) : (
                ledger.map((entry) => (
                  <tr key={entry.id} className="animate-in slide-in-from-top-2 duration-500 hover:bg-slate-800/20">
                    <td className="px-4 py-2 font-mono text-indigo-400">{entry.id}</td>
                    <td className="px-4 py-2">
                      <span className="bg-red-500/10 text-red-400 px-1.5 py-0.5 rounded border border-red-500/20 font-bold uppercase tracking-tighter">
                        {entry.type}
                      </span>
                    </td>
                    <td className="px-4 py-2 text-slate-300 font-bold">{entry.amount}</td>
                    <td className="px-4 py-2 text-slate-500">{entry.timestamp}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-[10px] text-slate-500 italic flex items-center gap-1">
          <Database className="w-3 h-3" /> Registros nunca são deletados ou alterados.
        </p>
      </div>
    </div>
  );
};

export default TransactionSimulator;
