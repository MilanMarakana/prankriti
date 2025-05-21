import {create} from 'zustand';

export type Plan = {
  id: string;
  title: string;
  description: string;
  price: number;
  badge?: string;
  badgeColor?: string;
};

interface PaymentCartState {
  selectedPlanId: string;
  quantity: Record<string, number>;
  plans: Plan[];
  setSelectedPlan: (planId: string) => void;
  increment: (planId: string) => void;
  decrement: (planId: string) => void;
}

export const usePaymentCartStore = create<PaymentCartState>((set, _get) => ({
  plans: [
    {
      id: 'plan1',
      title: '1 months',
      description:
        'Enjoy 14-16 vibrant plants with bi-monthly expert care. Includes seasonal plant replacements and home-friendly greenery.',
      price: 4999,
      badge: 'SAVE 28%',
      badgeColor: '#B6FF5C',
    },
    {
      id: 'plan2',
      title: '1 months',
      description:
        'Get 36-38 premium plants with twice-a-month maintenance. Includes plant swaps, soil enrichment, and pest control for a lush space.',
      price: 8999,
    },
  ],
  selectedPlanId: 'plan1',
  quantity: {plan1: 2, plan2: 1},
  setSelectedPlan: (planId: string) => set({selectedPlanId: planId}),
  increment: (planId: string) =>
    set(state => ({
      quantity: {
        ...state.quantity,
        [planId]: (state.quantity[planId] || 1) + 1,
      },
    })),
  decrement: (planId: string) =>
    set(state => ({
      quantity: {
        ...state.quantity,
        [planId]: Math.max(1, (state.quantity[planId] || 1) - 1),
      },
    })),
}));
