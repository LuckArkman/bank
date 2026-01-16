
export interface RoadmapSection {
  id: string;
  title: string;
  icon: string;
  description: string;
  details: string[];
  codeSnippet?: string;
  critical?: boolean;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface TransactionStep {
  name: string;
  status: 'pending' | 'active' | 'completed' | 'failed';
  description: string;
}
