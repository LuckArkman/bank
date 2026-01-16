
import React from 'react';
import { Shield, FileCheck, Users, Lock, Eye, CheckCircle2 } from 'lucide-react';

const ComplianceView: React.FC = () => {
  const complianceAreas = [
    {
      title: 'LGPD (Lei Geral de Proteção de Dados)',
      icon: Shield,
      color: 'text-blue-400',
      items: [
        'Privacy by Design em todas as etapas de desenvolvimento.',
        'Criptografia de ponta a ponta para dados PII.',
        'Direito ao esquecimento com deleção lógica auditada.',
        'Consentimento granular e versionado.'
      ]
    },
    {
      title: 'KYC & AML',
      icon: Users,
      color: 'text-emerald-400',
      items: [
        'Know Your Customer: Identificação rigorosa de usuários.',
        'Anti-Money Laundering: Monitoramento de transações suspeitas.',
        'Integração com bureaux de crédito e listas de sanções.',
        'Análise comportamental em tempo real.'
      ]
    },
    {
      title: 'Auditoria & Logs',
      icon: Eye,
      color: 'text-amber-400',
      items: [
        'Logs de infraestrutura e aplicação imutáveis.',
        'Rastreabilidade total via CorrelationId em sistemas distribuídos.',
        'Retenção de dados conforme prazos do Banco Central.',
        'Mascaramento de dados sensíveis em ambientes de observabilidade.'
      ]
    }
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <section className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-500/10 border border-indigo-500/20 rounded-full">
          <FileCheck className="w-3.5 h-3.5 text-indigo-400" />
          <span className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em]">Compliance Bancário</span>
        </div>
        <h2 className="text-5xl font-black text-white">Segurança & <span className="text-indigo-400">Regulamentação</span></h2>
        <p className="text-slate-400 text-lg font-light leading-relaxed max-w-2xl mx-auto">
          Operar no mercado financeiro exige mais do que código performático; exige conformidade absoluta com as autoridades.
        </p>
      </section>

      <div className="grid grid-cols-1 gap-8">
        {complianceAreas.map((area, idx) => (
          <div key={idx} className="p-8 bg-slate-900/40 border border-slate-800 rounded-[2.5rem] flex flex-col md:flex-row gap-8 items-start hover:border-indigo-500/20 transition-all shadow-xl">
            <div className={`p-4 rounded-3xl bg-slate-800/50 border border-slate-700 flex-shrink-0`}>
              <area.icon className={`w-10 h-10 ${area.color}`} />
            </div>
            <div className="space-y-6">
              <h3 className="text-2xl font-black text-white">{area.title}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {area.items.map((item, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 bg-slate-950/40 border border-slate-800/50 rounded-2xl">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-400 text-sm leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-10 rounded-[3rem] bg-slate-900/60 border border-slate-800 space-y-6 border-dashed">
        <div className="flex items-center gap-4 mb-2">
          <Lock className="w-8 h-8 text-slate-500" />
          <h4 className="text-xl font-bold text-white">Zero Trust Architecture</h4>
        </div>
        <p className="text-slate-500 leading-relaxed text-sm">
          Acreditamos que nenhuma rede é segura. Implementamos mTLS entre microsserviços, 
          autenticação via OIDC e autorização via OPA (Open Policy Agent) para garantir que 
          apenas o tráfego legítimo acesse os dados financeiros sensíveis.
        </p>
      </div>
    </div>
  );
};

export default ComplianceView;
