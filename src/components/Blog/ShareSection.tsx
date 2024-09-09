// components/Blog/ShareSection.tsx
'use client'
// components/Blog/ShareSection.tsx
import { FaFacebook, FaTwitter, FaLinkedin, FaLink, FaWhatsapp } from 'react-icons/fa';
import { Button } from '@/components/ui/button';

export default function ShareSection({ postUrl }: { postUrl: string }) {
  const handleShare = (platform: string) => {
    let shareUrl = '';
    const encodedUrl = encodeURIComponent(postUrl);

    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}`;
        break;
      case 'whatsapp':
        shareUrl = `https://api.whatsapp.com/send?text=${encodedUrl}`;
        break;
      default:
        shareUrl = postUrl;
    }

    window.open(shareUrl, '_blank');
  };

  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold">Share this post:</h3>
      <div className="flex space-x-4 mt-4">
        {/* Facebook Share */}
        <Button variant="ghost" onClick={() => handleShare('facebook')}>
          <FaFacebook size={24} className="text-blue-600" />
        </Button>

        {/* Twitter Share */}
        <Button variant="ghost" onClick={() => handleShare('twitter')}>
          <FaTwitter size={24} className="text-blue-400" />
        </Button>

        {/* LinkedIn Share */}
        <Button variant="ghost" onClick={() => handleShare('linkedin')}>
          <FaLinkedin size={24} className="text-blue-700" />
        </Button>

        {/* WhatsApp Share */}
        <Button variant="ghost" onClick={() => handleShare('whatsapp')}>
          <FaWhatsapp size={24} className="text-green-500" />
        </Button>

        {/* Copy Link */}
        <Button variant="ghost" onClick={() => navigator.clipboard.writeText(postUrl)}>
          <FaLink size={24} className="text-gray-500" />
        </Button>
      </div>
    </div>
  );
}
