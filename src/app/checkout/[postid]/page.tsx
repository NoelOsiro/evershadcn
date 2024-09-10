'use client'
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
// Adjust the path if needed
import React from 'react';
import {Checkout} from '@/components/Checkout';// Replace './path/to/Checkout' with the actual path to the Checkout component

const CheckoutPage = () => {
  const router = useRouter();
  const postId = '2'
  const [amount, setAmount] = useState<number>(0); // Initialize with a default value or fetch dynamically

  useEffect(() => {
    if (typeof postId === 'string') {
      // You can fetch the amount based on postId if needed
      // Example: fetch(`/api/get-amount?postId=${postId}`)
      // .then(response => response.json())
      // .then(data => setAmount(data.amount))
      // .catch(error => console.error('Error fetching amount:', error));
      
      // For now, we'll use a static value for demonstration purposes
      setAmount(100); // Replace with dynamic amount
    }
  }, [postId]);

  if (!postId || amount === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="px-12 py-4 mt-24 mx-auto">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      <Checkout postId={postId} amount={amount} />
    </div>
  );
};

export default CheckoutPage;
