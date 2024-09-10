import { createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';


export async function POST(req: NextRequest) {
    const supabase = createClient();

    try {
        const formData = await req.formData();
        const image = formData.get('image') as File;
        if (!image) {
            throw new Error('Image file is missing');
        }

        const fileExt = image.name.split('.').pop();
        const fileName = `postImage_${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
        const filePath = `images/${fileName}`;

        // Upload image
        const { error: uploadError } = await supabase.storage
            .from('images')
            .upload(filePath, image.stream(), {
                contentType: image.type,
            });

        if (uploadError) {
            throw uploadError;
        }

        // Get public URL
        const { data: publicUrlData } = supabase.storage
            .from('images')
            .getPublicUrl(filePath);

        const imageUrl = publicUrlData?.publicUrl || '';

        return NextResponse.json({ imageUrl });
    } catch (error) {
        console.error('Error uploading image:', error);
        return NextResponse.json({ message: 'Failed to upload image', error }, { status: 500 });
    }
}
