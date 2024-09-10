export const maxDuration = 60;
import { NextRequest, NextResponse } from 'next/server';
import MpesaDaraja from "@/lib/mpesa";
import { createClient } from '@/utils/supabase/server';

const mpesa = new MpesaDaraja();
const SHORT_CODE = process.env.MPESA_SHORTCODE || 0;

interface FormData {
    transactionId: string;
    postId: number;
}
interface IResult {
    MerchantRequestID: string;
    CheckoutRequestID: string;
    ResponseCode: string;
    ResultCode: string;
    ResponseDescription: string;
    CustomerMessage: string;
    ResultDesc: string;
}

export async function POST(req: NextRequest) {
    const supabase = createClient();
    try {
        const { transactionId, postId }: FormData = await req.json();

        const result: IResult = await mpesa.querySTKTransactionStatus(Number(SHORT_CODE), transactionId);

        if (result.ResultCode === '0') {
            // Update the payment
            await supabase
                .from('payment')
                .update({ complete: true })
                .eq('CheckoutRequestID', transactionId)

            // Update the post
            await supabase
                .from('posts')
                .update({ status: 'published' })
                .eq('id', postId)

            return NextResponse.json({ message: result.ResultDesc }, { status: 200 });
        } else if (result.ResultCode === '1032' || result.ResultCode === '1037') {
            return NextResponse.json({ message: result.ResultDesc }, { status: 400 });
        } else {
            return NextResponse.json({ message: result.ResultDesc }, { status: 400 });
        }
    } catch (error) {
        return NextResponse.json({ message: 'Failed to process transaction' }, { status: 400 });
    }
}
