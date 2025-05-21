export interface CreditPlan {
  id: string;
  name: string;
  price: number;
  credits: number;
  isAutoPay: boolean;
}

export interface CreditHistoryItem {
  id: string;
  type: 'credit' | 'debit';
  amount: number;
  title: string;
  description: string;
  date: string; // ISO string
  icon: 'money' | 'money-send' | 'money-receive';
}

export interface PlanHistoryItem {
  id: string;
  status: 'success' | 'failed';
  amount: number;
  description: string;
  date: string; // ISO string
  icon: 'empty-wallet-add' | 'empty-wallet-remove';
}

export interface CreditState {
  availableCredits: number;
  currentPlan: CreditPlan;
  history: CreditHistoryItem[];
  planHistory: PlanHistoryItem[];
  historyTab: 'credit' | 'plan';
  setHistoryTab: (tab: 'credit' | 'plan') => void;
  setAutoPay: (isAutoPay: boolean) => void;
  setPlan: (plan: CreditPlan) => void;
}
