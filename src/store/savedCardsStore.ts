import {create} from 'zustand';
import {SavedCardsStore, SavedCard} from '../types/payment';

export const useSavedCardsStore = create<SavedCardsStore>(set => ({
  creditCard: undefined,
  debitCard: undefined,
  setCreditCard: (card: SavedCard) => set({creditCard: card}),
  setDebitCard: (card: SavedCard) => set({debitCard: card}),
  removeCreditCard: () => set({creditCard: undefined}),
  removeDebitCard: () => set({debitCard: undefined}),
}));
