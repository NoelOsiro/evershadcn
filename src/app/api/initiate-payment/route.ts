import { NextResponse } from 'next/server'
import { mpesa } from '@/lib/mpesa'

export async function POST(req: Request) {
  const { amount, phoneNumber, postId } = await req.json()

  try {
    const result = await mpesa.initiatePayment({
      amount,
      phoneNumber,
      accountReference: postId,
      transactionDesc: 'Payment for post publication',
    })

    return NextResponse.json({ success: true, checkoutRequestID: result.CheckoutRequestID })
  } catch (error) {
    console.error('Payment initiation failed:', error)
    return NextResponse.json({ success: false, error: 'Payment initiation failed' }, { status: 500 })
  }
}