import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

// Define types for the M-Pesa callback metadata items
interface MpesaCallbackItem {
  Name: string;
  Value: string | number;
}

// Define types for the entire M-Pesa callback body
interface MpesaCallbackBody {
  Body: {
    stkCallback: {
      ResultCode: number;
      CallbackMetadata: {
        Item: MpesaCallbackItem[];
      };
    };
  };
}

export async function POST(req: Request) {
  try {
    // Parsing the M-Pesa callback response
    const mpesaResponse: MpesaCallbackBody = await req.json();
    const supabase = createClient();

    // Extracting callback result from response
    const { stkCallback } = mpesaResponse.Body;

    // Check if the transaction was successful
    if (stkCallback.ResultCode === 0) {
      // Find the `AccountReference` in the callback metadata, which holds the `postId`
      const accountReferenceItem = stkCallback.CallbackMetadata.Item.find(
        (item: MpesaCallbackItem) => item.Name === 'AccountReference'
      );

      // Ensure that AccountReference exists and is of type string
      if (!accountReferenceItem || typeof accountReferenceItem.Value !== 'string') {
        console.error('AccountReference not found or invalid in the callback metadata');
        return NextResponse.json({ success: false, error: 'Invalid callback data' }, { status: 400 });
      }

      const postId = accountReferenceItem.Value;

      // Update the post status to 'published' in Supabase
      const { error } = await supabase
        .from('posts')
        .update({ status: 'published' })
        .eq('id', postId);

      if (error) {
        console.error('Error updating post status:', error.message);
        return NextResponse.json({ success: false, error: 'Database update failed' }, { status: 500 });
      }

      console.log(`Payment successful, post status updated for postId: ${postId}`);
      return NextResponse.json({ success: true }, { status: 200 });
    } else {
      console.warn(`M-Pesa callback failed with ResultCode: ${stkCallback.ResultCode}`);
      return NextResponse.json({ success: false, error: 'Payment failed' }, { status: 400 });
    }
  } catch (error) {
    console.error('Error processing callback:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
