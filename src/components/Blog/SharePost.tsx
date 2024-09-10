import { hash } from 'crypto';
import React from 'react';
import {
  FacebookIcon,
  FacebookShareButton,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
  XIcon,
  LinkedinShareButton,
  LinkedinIcon,
} from 'react-share';

interface Iprops {
  shareUrl?: string;
  title: string;
}

const SharePost: React.FC<Iprops> = ({ shareUrl, title }) => {
  const baseUrl = process.env.NEXT_PUBLIC_AUTH_URL
  const url = encodeURI(`${baseUrl}/posts/${title}`);

  const icons = [
    {
      Component: FacebookShareButton,
      icon: FacebookIcon,
      hashtag: title,
    },
    {
      Component: TwitterShareButton,
      icon: XIcon,
      hashtag: title,
    },
    {
      Component: WhatsappShareButton,
      icon: WhatsappIcon,
    },
    {
      Component: LinkedinShareButton,
      icon: LinkedinIcon,
    }
  ];

  return (
    <>
      {icons.map(({ Component, icon: Icon,hashtag }, index) => (
        <Component key={index} url={url} title={title} hashtag={hashtag} className="ml-2">
          <Icon size={32} round />
        </Component>
      ))}
    </>
  );
};

export default SharePost;
