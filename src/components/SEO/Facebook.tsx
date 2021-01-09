import React from 'react';
import Head from 'next/head';
import urljoin from 'url-join';

interface IFacebookProps {
  url: string;
  type: string;
  imageBaseUrl?: string;
  title: string;
  desc: string;
  image: string;
  locale: string;
}

export const Facebook: React.FC<IFacebookProps> = ({
  url,
  imageBaseUrl,
  type,
  title,
  desc,
  image,
  locale
}) => (
  <Head>
    <meta property="og:locale" content={locale} />
    <meta property="og:url" content={url} />
    <meta property="og:type" content={type} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={desc} />
    <meta property="og:image" content={imageBaseUrl ? urljoin(imageBaseUrl, image) : image} />
    <meta property="og:image:alt" content={desc} />
  </Head>
);
