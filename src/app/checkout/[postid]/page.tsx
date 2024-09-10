'use client'

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { create } from 'zustand';
import BackgroundSVG from "@/components/BlogPost/BackgroundSVG";
import BottomSVG from "@/components/BlogPost/BottomSVG";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from '@/hooks/use-toast';
import { fetchPost } from '@/utils/fetchPost';


// Zustand store
interface CheckoutStore {
  paymentMethod: string;
  setPaymentMethod: (method: string) => void;
}

const useCheckoutStore = create<CheckoutStore>((set) => ({
  paymentMethod: 'mpesa',
  setPaymentMethod: (method) => set({ paymentMethod: method }),
}));

// Validation schema
const validationSchema = Yup.object({
  fullName: Yup.string().required('Name is required'),
  phoneNumber: Yup.string()
    .matches(/^254\d{9}$/, 'Invalid phone number. Must start with 254 and be 12 digits long.')
    .required('Phone number is required'),
});

export default function Checkout() {
  const params = useParams();
  const postId = params.postid as string;
  const { paymentMethod, setPaymentMethod } = useCheckoutStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [postDetails, setPostDetails] = useState<{ title: string; price: number } | null>(null);

  useEffect(() => {
    // Fetch post details based on postId
    
    const fetchAndSetPostDetails = async () => {
      const post = await fetchPost(postId);
      if (post) {
        setPostDetails({ title: post.title, price: 1});
      }
    };

    fetchAndSetPostDetails();
  }, [postId]);

  const formik = useFormik({
    initialValues: {
      fullName: '',
      phoneNumber: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsSubmitting(true);
      // call api/pay with phone postid and total
      await fetch('/api/pay', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...values, postId, total: postDetails?.price }),
      });
      
      console.log('Form submitted:', { ...values, paymentMethod, postId });
      toast({
        title: "Payment Initiated",
        description: `Check your ${paymentMethod.toUpperCase()} for payment instructions for ${postDetails?.title}.`,
      });
      setIsSubmitting(false);
    },
  });

  if (!postDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen text-gray-900 dark:text-gray-100 mt-24">
      <div className="max-w-md mx-auto py-10 px-6">
        <h1 className="text-2xl font-semibold mb-4">Checkout</h1>
        <h2 className="text-xl mb-8">{postDetails.title} - KES {postDetails.price}</h2>
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              placeholder='Mpesa account name'
              {...formik.getFieldProps('fullName')}
              className={formik.touched.fullName && formik.errors.fullName ? 'border-red-500' : ''}
            />
            {formik.touched.fullName && formik.errors.fullName && (
              <p className="mt-1 text-sm text-red-500">{formik.errors.fullName}</p>
            )}
          </div>
          <div>
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <Input
              id="phoneNumber"
              placeholder='254xxxxxxxx'
              {...formik.getFieldProps('phoneNumber')}
              className={formik.touched.phoneNumber && formik.errors.phoneNumber ? 'border-red-500' : ''}
            />
            {formik.touched.phoneNumber && formik.errors.phoneNumber && (
              <p className="mt-1 text-sm text-red-500">{formik.errors.phoneNumber}</p>
            )}
          </div>
          <div>
            <Label>Payment Method</Label>
            <RadioGroup
              value={paymentMethod}
              onValueChange={setPaymentMethod}
              className="flex flex-col space-y-1 mt-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="mpesa" id="mpesa" />
                <Label htmlFor="mpesa">M-Pesa</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="airtel" id="airtel" />
                <Label htmlFor="airtel">Airtel Money</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="postapay" id="postapay" />
                <Label htmlFor="postapay">PostaPay</Label>
              </div>
            </RadioGroup>
          </div>
          <Button type="submit" className="w-full mt-4" disabled={isSubmitting}>
            {isSubmitting ? 'Processing...' : `Pay KES ${postDetails.price} with ${paymentMethod.toUpperCase()}`}
          </Button>
        </form>
      </div>
      <BottomSVG />
      <BackgroundSVG />
    </div>
  )
}