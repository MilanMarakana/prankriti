export type PaymentMethod = {
  key: string;
  label: string;
  description?: string;
  icon: any; // ImageSourcePropType
  isCard?: boolean;
};

export type SavedCard = {
  type: 'credit' | 'debit';
  cardNumber: string;
  cardHolder: string;
  expiry: string;
  cvv: string;
};

export type SavedCardsStore = {
  creditCard?: SavedCard;
  debitCard?: SavedCard;
  setCreditCard: (card: SavedCard) => void;
  setDebitCard: (card: SavedCard) => void;
  removeCreditCard: () => void;
  removeDebitCard: () => void;
};
