import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server'


export async function POST(req: Request) {
  const mpesaResponse = await req.json()

  const supabase = createClient();

  // Verify the response and update the post status
  if (mpesaResponse.Body.stkCallback.ResultCode === 0) {
    const postId = mpesaResponse.Body.stkCallback.CallbackMetadata.Item.find(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (item: any) => item.Name === 'AccountReference'
    ).Value

    // Update post status in the database
    const { error } = await supabase
      .from('posts')
      .update({ status: 'published' })
      .eq('id', postId)

    if (error) {
      console.error('Error updating post status:', error)
      return NextResponse.json({ success: false }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  }

  return NextResponse.json({ success: false }, { status: 400 })
}