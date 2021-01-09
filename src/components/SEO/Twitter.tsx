import React from 'react';
import Head from 'next/head';
import urljoin from 'url-join';

interface ITwitterProps {
  type?: string;
  username: string;
  title: string;
  desc: string;
  imageBaseUrl?: string;
  image: string;
}

export const Twitter: React.FC<ITwitterProps> = ({
  type = 'summary_large_image',
  username,
  title,
  desc,
  imageBaseUrl,
  image
}) => (
  <Head>
    {username && <meta name="twitter:creator" content={username} />}
    <meta name="twitter:card" content={type} />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={desc} />
    <meta name="twitter:image" content={imageBaseUrl ? urljoin(imageBaseUrl, image) : image} />
    <meta name="twitter:image:alt" content={desc} />
  </Head>
);
