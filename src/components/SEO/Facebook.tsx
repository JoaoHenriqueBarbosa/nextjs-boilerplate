import React from 'react';
import Head from 'next/head';
import urljoin from 'url-join';

interface IFacebookProps {
  url: string;
  type: string;
  baseUrl: string;
  title: string;
  desc: string;
  image: string;
  locale: string;
}

export const Facebook: React.FC<IFacebookProps> = ({
  url,
  baseUrl,
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
    <meta property="og:image" content={urljoin(baseUrl, image)} />
    <meta property="og:image:alt" content={desc} />
  </Head>
);
