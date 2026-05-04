import PaystackPop from '@paystack/inline-js';

export const initializePayment = ({ email, amount, onSuccess, onCancel, metadata }) => {
  const popup = new PaystackPop();
  popup.newTransaction({
    key: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
    email,
    amount: amount * 100,
    currency: 'NGN',
    metadata,
    onSuccess,
    onCancel,
  });
};
