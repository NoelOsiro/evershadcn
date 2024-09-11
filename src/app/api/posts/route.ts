import { createClient } from '@/utils/supabase/server';
import { NextResponse, NextRequest } from 'next/server'


export async function GET(req: NextRequest) {
  const supabase = createClient();
    try {
      const searchParams = req.nextUrl.searchParams;
      const userId = searchParams.get('userId');
      if (!userId) {
        return NextResponse.json({ message: 'User ID or Post ID not provided' }, { status: 400 });
      }
  
      const { data, error: getError } = await supabase
        .from('posts')
        .select('*')
        .eq('userId', userId);
  
        if (getError) {
          throw getError;
        }
  
      if (data && data.length > 0) {
        return NextResponse.json({ posts: data }, { status: 200 });
      }
      } catch (error) {
      return NextResponse.json({ message: 'Failed to fetch posts' }, { status: 500 });
    }
  }
  // export async function POST(req: NextRequest) {
  //   const supabase = createClient();
  //   try {
  //     const formData = await req.formData();
  //     const base64Image = formData.get('image') as string;
  //     const title = formData.get('title') as string;
  //     const description = formData.get('description') as string;
  //     const content = formData.get('content') as string;
  //     const fullName = formData.get('fullName') as string;
  //     const dateOfBirth = formData.get('dateOfBirth') as string;
  //     const dateOfDeath = formData.get('dateOfDeath') as string;
  //     const placeOfDeath = formData.get('placeOfDeath') as string;
  //     const causeOfDeath = formData.get('causeOfDeath') as string;
  //     const postType = formData.get('postType') as string;
  //     const userId = formData.get('userId') as string;

  //     if (!base64Image) {
  //         throw new Error('Base64 image data is missing');
  //     }

  //     // Extract file extension from base64
  //     const fileExt = base64Image.split(';')[0].split('/')[1];
  //     const fileName = `postImage_${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
  //     const filePath = `images/${fileName}`;
      
  //     // Convert base64 to Buffer
  //     const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, "");
  //     const imageBuffer = Buffer.from(base64Data, 'base64');

  //     // Upload image
  //     const { error: uploadError } = await supabase.storage
  //         .from('images')
  //         .upload(filePath, imageBuffer, {
  //             contentType: `image/${fileExt}`,
  //         });

  //     if (uploadError) {
  //         throw uploadError;
  //     }

  //     // Get public URL
  //     const { data: publicUrlData } = supabase.storage
  //         .from('images')
  //         .getPublicUrl(filePath);

  //     const imageUrl = publicUrlData?.publicUrl || '';

  //     // Create post
  //     const { data, error: insertError } = await supabase
  //         .from('posts')
  //         .insert([
  //             {
  //                 title,
  //                 content,
  //                 description,
  //                 status: 'draft',
  //                 fullName,
  //                 dateOfBirth,
  //                 dateOfDeath,
  //                 placeOfDeath,
  //                 causeOfDeath,
  //                 type: postType,
  //                 imageUrl,
  //                 userId,
  //             },
  //         ]);

  //     if (insertError) {
        
  //         throw insertError;
  //     }

  //     return NextResponse.json({ data, success: true });
  // } catch (error) {
  //   console.error('Error creating post:', error);
  //     return NextResponse.json({ message: 'Failed to create post', error: error }, { status: 500 });
  // }
  // }

export async function POST(req: NextRequest) {
  const supabase = createClient();
  try {
    const formData = await req.formData();
    const base64Image = formData.get('image') as string;
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const content = formData.get('content') as string;
    const fullName = formData.get('fullName') as string;
    const dateOfBirth = formData.get('dateOfBirth') as string;
    const dateOfDeath = formData.get('dateOfDeath') as string;
    const placeOfDeath = formData.get('placeOfDeath') as string;
    const causeOfDeath = formData.get('causeOfDeath') as string;
    const postType = formData.get('postType') as string;
    const userId = formData.get('userId') as string;
    const postId = formData.get('postId') as string;
    if (!base64Image) {
      throw new Error('Base64 image data is missing');
    }

    // Extract file extension from base64
    const fileExt = base64Image.split(';')[0].split('/')[1];
    const fileName = `postImage_${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
    const filePath = `images/${fileName}`;
    
    // Convert base64 to Buffer
    const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, "");
    const imageBuffer = Buffer.from(base64Data, 'base64');

    // Upload image
    const { error: uploadError } = await supabase.storage
      .from('images')
      .upload(filePath, imageBuffer, {
        contentType: `image/${fileExt}`,
      });

    if (uploadError) {
      throw uploadError;
    }

    // Get public URL
    const { data: publicUrlData } = supabase.storage
      .from('images')
      .getPublicUrl(filePath);

    const imageUrl = publicUrlData?.publicUrl || '';
    const items = {
      // add id if postId is not null
      id: postId || undefined,
      title,
      content,
      description,
      status: 'draft',
      fullName,
      dateOfBirth,
      dateOfDeath,
      placeOfDeath,
      causeOfDeath,
      type: postType,
      imageUrl,
      userId
    }

    // Upsert post
    const { data, error: upsertError } = await supabase
      .from('posts')
      .upsert(items,{ onConflict: 'id' }); // Adjust the unique column(s) as necessary

    if (upsertError) {
      throw upsertError;
    }

    return NextResponse.json({ data, success: true });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return NextResponse.json({ message: 'Failed to create post', error: error.message }, { status: 500 });
  }
}
