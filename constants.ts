
import { RoadmapSection } from './types';

export const ROADMAP_CONTENT: RoadmapSection[] = [
  {
    id: 'principles',
    title: '0. Princípios Inegociáveis',
    icon: 'ShieldAlert',
    description: 'A fundação moral e técnica antes de qualquer linha de código.',
    details: [
      'Ledger imutável (Append-only)',
      'Decisão financeira fortemente consistente',
      'Saga + Outbox obrigatórios',
      'Idempotência end-to-end',
      'Sem isso → Não vá para produção.'
    ],
    critical: true
  },
  {
    id: 'compliance',
    title: '1. Modelo Regulatório & Compliance',
    icon: 'FileCheck',
    description: 'Navegando nas obrigações do Banco Central e ANPD.',
    details: [
      'LGPD (Privacy by Design)',
      'KYC / AML (Know Your Customer / Anti-Money Laundering)',
      'Auditoria financeira e retenção de dados',
      'Logs imutáveis sem dados sensíveis.'
    ]
  },
  {
    id: 'architecture',
    title: '2. Arquitetura Base (.NET)',
    icon: 'Layers',
    description: 'Clean Architecture + DDD + CQRS.',
    details: [
      '.NET 8 / ASP.NET Core',
      'CQRS obrigatório com MediatR',
      'FluentValidation para regras de entrada',
      'Polly para resiliência e retry controlado.'
    ],
    codeSnippet: `// Pipeline de Resiliência com Polly
var pipeline = new ResiliencePipelineBuilder()
    .AddRetry(new RetryStrategyOptions {
        MaxRetryAttempts = 3,
        BackoffType = DelayBackoffType.Exponential
    })
    .Build();`
  },
  {
    id: 'mongodb',
    title: '3. Banco de Dados — MongoDB',
    icon: 'Database',
    description: 'Uso correto do MongoDB como Event Store + State Store.',
    details: [
      'WriteConcern: majority (Garante durabilidade)',
      'Sharding por AccountId para escalabilidade horizontal',
      '❌ Nunca tratar como banco transacional tradicional sem controle OCC.',
      'Replica Set obrigatório.'
    ]
  },
  {
    id: 'ledger',
    title: '4. Ledger Financeiro (Fundação)',
    icon: 'BookOpen',
    description: 'A fonte da verdade absoluta, imutável e auditável.',
    details: [
      'Nunca atualiza, nunca deleta.',
      'Contém EventId, AccountId, Type (Debit/Credit), Amount, CorrelationId.',
      'Base para qualquer disputa legal ou auditoria.'
    ],
    codeSnippet: `public record LedgerEvent(
    Guid EventId,
    string AccountId,
    TransactionType Type,
    decimal Amount,
    string CorrelationId,
    DateTime Timestamp
);`
  },
  {
    id: 'balance-control',
    title: '5. Controle de Saldo',
    icon: 'Scale',
    description: 'Garantindo consistência forte para autorizações.',
    details: [
      'Nunca usar projeção para decisão de saldo.',
      'Atomic update: Balance >= amount AND Version == expected.',
      'Opções: Documento único com $inc + condition ou Serviço single-writer.'
    ],
    codeSnippet: `var result = await _collection.UpdateOneAsync(
    acc => acc.Id == accountId && 
           acc.Balance >= amount && 
           acc.Version == currentVersion,
    update.Inc(acc => acc.Balance, -amount)
          .Inc(acc => acc.Version, 1)
);`
  },
  {
    id: 'versioning',
    title: '6. Versionamento (Anti-Lost Update)',
    icon: 'History',
    description: 'Optimistic Concurrency Control (OCC) obrigatório.',
    details: [
      'Toda escrita valida a versão do documento.',
      'Incremento de versão em cada sucesso.',
      'Retry controlado em caso de conflito de versão.',
      'Sem isso → Double spend silencioso.'
    ]
  },
  {
    id: 'saga',
    title: '7. Saga Pattern',
    icon: 'GitBranch',
    description: 'Gerenciamento de operações multi-etapa como Pix e estornos.',
    details: [
      'Saga Orquestrada: Estado explícito em cada etapa.',
      'Lock -> Ledger -> Call External -> Unlock/Commit.',
      'Compensação automática em caso de falha externa.'
    ]
  },
  {
    id: 'outbox',
    title: '8. Outbox Pattern',
    icon: 'Mail',
    description: 'Anti Dual-Write: Garante que eventos cheguem à mensageria.',
    details: [
      'Escrita atômica: Ledger + Outbox na mesma transação MongoDB.',
      'Worker dedicado consome Outbox e publica no Kafka/RabbitMQ.',
      'Idempotência no consumidor é obrigatória.'
    ]
  },
  {
    id: 'consistency-eventual',
    title: '9. Consistência Eventual',
    icon: 'RefreshCw',
    description: 'Onde ela é permitida e onde é proibida.',
    details: [
      '✅ Permitida: UI, Relatórios, Dashboards, Projeções de leitura.',
      '❌ Proibida: Autorização financeira, Limites, Saldo disponível.',
      'Decisão financeira sempre lê estado consistente.'
    ]
  },
  {
    id: 'idempotency',
    title: '10. Idempotência End-to-End',
    icon: 'Repeat',
    description: 'Tornando o sistema imune a retentativas.',
    details: [
      'Uso de CommandId e CorrelationId em todas as chamadas.',
      'Consumer deduplication no nível do banco.',
      'Retry = Duplicação sem idempotência.'
    ]
  },
  {
    id: 'security-lgpd',
    title: '11. Segurança & LGPD',
    icon: 'Lock',
    description: 'Nível bancário de proteção de dados.',
    details: [
      'Field-level encryption para dados sensíveis (PII).',
      'Consentimento versionado e auditável.',
      'OAuth2 / OIDC + MFA + Zero Trust.',
      'Logs imutáveis sem segredos.'
    ]
  },
  {
    id: 'disaster-recovery',
    title: '12. Disaster Recovery',
    icon: 'Zap',
    description: 'Risco existencial: Esteja preparado para o pior.',
    details: [
      'Backup contínuo e Restore testado (Fire Drill).',
      'RPO (Recovery Point Objective) e RTO definido.',
      'Backup sem restore testado = Mentira.'
    ]
  },
  {
    id: 'observability',
    title: '13. Observabilidade & Auditoria',
    icon: 'Activity',
    description: 'Enxergando a saúde do dinheiro em tempo real.',
    details: [
      'Serilog + Grafana + Prometheus.',
      'Alertas de: Lag de projeção, Saga travada, Outbox backlog.',
      'Correlação de logs via CorrelationId.'
    ]
  },
  {
    id: 'infra-deploy',
    title: '14. Infra & Deploy',
    icon: 'Cloud',
    description: 'Escalabilidade e automação moderna.',
    details: [
      'Docker + Kubernetes (K8s).',
      'CI/CD com testes de integração rigorosos.',
      'Infra as Code (Terraform/Bicep) e Secrets Manager.'
    ]
  }
];
