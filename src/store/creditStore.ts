import {create} from 'zustand';
import {
  CreditState,
  CreditPlan,
  CreditHistoryItem,
  PlanHistoryItem,
} from '../types/credit';

const initialPlan: CreditPlan = {
  id: 'plan-1',
  name: 'Current Plan',
  price: 4999,
  credits: 300,
  isAutoPay: true,
};

const initialHistory: CreditHistoryItem[] = [
  {
    id: '1',
    type: 'debit',
    amount: -75,
    title: 'Rose flower pot',
    description: '-75 Pran Credit for Rose flower pot',
    date: '2024-12-15T15:45:00Z',
    icon: 'money-send',
  },
  {
    id: '2',
    type: 'credit',
    amount: 25,
    title: 'Referral',
    description: '+25 Pran Credit for Referral',
    date: '2024-12-15T15:45:00Z',
    icon: 'money-receive',
  },
  {
    id: '3',
    type: 'debit',
    amount: -120,
    title: 'Tulip flower pot',
    description: '-120 Pran Credit for Tulip flower pot',
    date: '2024-12-15T15:45:00Z',
    icon: 'money-send',
  },
  {
    id: '4',
    type: 'debit',
    amount: -75,
    title: 'Rose flower pot',
    description: '-75 Pran Credit for Rose flower pot',
    date: '2024-12-15T15:45:00Z',
    icon: 'money-send',
  },
  {
    id: '5',
    type: 'debit',
    amount: -120,
    title: 'Tulip flower pot',
    description: '-120 Pran Credit for Tulip flower pot',
    date: '2024-12-15T15:45:00Z',
    icon: 'money-send',
  },
  {
    id: '6',
    type: 'credit',
    amount: 75,
    title: 'Rose flower pot',
    description: '+75 Pran Credit for Rose flower pot',
    date: '2024-12-15T15:45:00Z',
    icon: 'money-receive',
  },
];

const initialPlanHistory: PlanHistoryItem[] = [
  {
    id: 'p1',
    status: 'success',
    amount: 4999,
    description: 'Auto pay ₹4,999 credited to Account',
    date: '2024-12-15T15:45:00Z',
    icon: 'empty-wallet-add',
  },
  {
    id: 'p2',
    status: 'failed',
    amount: 4999,
    description: 'Auto pay Failed ₹4,999',
    date: '2024-12-15T15:45:00Z',
    icon: 'empty-wallet-remove',
  },
  {
    id: 'p3',
    status: 'success',
    amount: 4999,
    description: 'Auto pay ₹4,999 credited to Account',
    date: '2024-12-15T15:45:00Z',
    icon: 'empty-wallet-add',
  },
  {
    id: 'p4',
    status: 'failed',
    amount: 4999,
    description: 'Auto pay Failed ₹4,999',
    date: '2024-12-15T15:45:00Z',
    icon: 'empty-wallet-remove',
  },
];

export const useCreditStore = create<CreditState>(set => ({
  availableCredits: 180,
  currentPlan: initialPlan,
  history: initialHistory,
  planHistory: initialPlanHistory,
  historyTab: 'credit',
  setHistoryTab: tab => set({historyTab: tab}),
  setAutoPay: isAutoPay =>
    set(state => ({currentPlan: {...state.currentPlan, isAutoPay}})),
  setPlan: plan => set({currentPlan: plan}),
}));
