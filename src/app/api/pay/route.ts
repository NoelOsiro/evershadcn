export const maxDuration = 60;
import MpesaDaraja from '@/lib/mpesa';
import { createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

const mpesa = new MpesaDaraja();

const SHORT_CODE = process.env.MPESA_SHORTCODE || 0;

interface FormData {
  phoneNumber: string;
  total: number;
  postId: string;
}

export interface IResult {
  MerchantRequestID: string;
  CheckoutRequestID: string;
  ResponseCode: string;  // Ensure it's a string, based on the Mpesa API response
  ResponseDescription: string;
  CustomerMessage: string;
}

export async function POST(req: NextRequest) {
  const supabase = createClient();
  try {
    const { phoneNumber, total, postId }: FormData = await req.json();

    // Check for valid phone number and total
    if (!phoneNumber || !total) {
      return NextResponse.json({ message: 'Invalid request data' }, { status: 400 });
    }

    // Start the Mpesa payment process
    try {
      const result: IResult = await mpesa.lipaNaMpesaOnline({
        shortCode: Number(SHORT_CODE),
        phoneNumber: Number(phoneNumber),
        amount: total,
        accountReference: 'EverCherished',
        transactionDesc: 'Post Payment',
      });

      // Handle Mpesa response
      if (result.ResponseCode !== '0') {
        throw new Error(result.ResponseDescription);
      }

      // Insert into Supabase after successful Mpesa initiation
      const {error: insertError } = await supabase
        .from('payment')
        .insert([{
          phone: phoneNumber,
          amount: total,
          MerchantRequestID: result.MerchantRequestID,
          CheckoutRequestID: result.CheckoutRequestID,
          postId: postId,
          complete: false,
        }]);

      if (insertError) {
        throw insertError;
      }

      // Return success response
      return NextResponse.json({
        message: `Payment initiation successful. Please check your phone: ${phoneNumber}`,
        data: result,
      }, { status: 201 });

    } catch (error) {
        console.error('Failed to initiate payment', error);
      return NextResponse.json({
        message: 'Failed to initiate payment',
        error: error,
      }, { status: 500 });
    }

  } catch (error) {
    return NextResponse.json({
      message: 'Invalid request format',
      error: error,
    }, { status: 400 });
  }
}
