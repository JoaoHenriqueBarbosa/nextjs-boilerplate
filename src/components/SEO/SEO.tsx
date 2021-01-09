import React from 'react';
import { Facebook } from './Facebook';
import { Twitter } from './Twitter';
import Head from 'next/head';
import urljoin from 'url-join';

interface ISEOProps {
  title?: string;
  siteTitle: string;
  description: string;
  pathname: string;
  imageBaseUrl?: string;
  article?: boolean;
  image: string;
  siteLanguage: string;
  siteLocale: string;
  twitterUsername: string;
  author?: string;
  datePublished?: string;
  dateModified?: string;
}

export const SEO: React.FC<ISEOProps> = ({
  title,
  siteTitle,
  description,
  pathname,
  article = false,
  image,
  imageBaseUrl,
  siteLanguage,
  siteLocale,
  twitterUsername,
  author = 'J Doe.',
  datePublished,
  dateModified
}) => {
  const seo = {
    title: title ? title.slice(0, 70) : siteTitle.slice(0, 70),
    siteTitle: siteTitle.slice(0, 70),
    description: description.slice(0, 160),
    datePublished: datePublished ? null : new Date(Date.now()).toISOString(),
    dateModified: dateModified ? null : new Date(Date.now()).toISOString()
  };

  const copyrightYear = new Date().getFullYear();

  // schema.org in JSONLD format
  // https://developers.google.com/search/docs/guides/intro-structured-data
  // You can fill out the 'author', 'creator' with more data or another type (e.g. 'Organization')
  // Structured Data Testing Tool >>
  // https://search.google.com/structured-data/testing-tool

  const schemaOrgWebPage = {
    '@context': 'http://schema.org',
    '@type': 'WebPage',
    url: pathname,
    headline: seo.description,
    inLanguage: siteLanguage,
    mainEntityOfPage: pathname,
    description: seo.description,
    name: seo.title,
    author: {
      '@type': 'Person',
      name: author
    },
    copyrightHolder: {
      '@type': 'Person',
      name: author
    },
    copyrightYear,
    creator: {
      '@type': 'Person',
      name: author
    },
    publisher: {
      '@type': 'Person',
      name: author
    },
    datePublished: seo.datePublished,
    dateModified: seo.dateModified,
    image: {
      '@type': 'ImageObject',
      url: `${imageBaseUrl ? urljoin(imageBaseUrl, image) : image}`
    }
  };

  // Initial breadcrumb list

  const itemListElement = [
    {
      '@type': 'ListItem',
      item: {
        '@id': pathname,
        name: 'Homepage'
      },
      position: 1
    }
  ];

  let schemaArticle = null;

  if (article) {
    schemaArticle = {
      '@context': 'http://schema.org',
      '@type': 'Article',
      author: {
        '@type': 'Person',
        name: author
      },
      copyrightHolder: {
        '@type': 'Person',
        name: author
      },
      copyrightYear,
      creator: {
        '@type': 'Person',
        name: author
      },
      publisher: {
        '@type': 'Organization',
        name: author,
        logo: {
          '@type': 'ImageObject',
          url: `${imageBaseUrl ? urljoin(imageBaseUrl, image) : image}`
        }
      },
      datePublished: seo.datePublished,
      dateModified: seo.dateModified,
      description: seo.description,
      headline: seo.title,
      inLanguage: siteLanguage,
      url: pathname,
      name: seo.title,
      image: {
        '@type': 'ImageObject',
        url: imageBaseUrl ? urljoin(imageBaseUrl, image) : image
      },
      mainEntityOfPage: pathname
    };
    // Push current blog post into breadcrumb list
    itemListElement.push({
      '@type': 'ListItem',
      item: {
        '@id': pathname,
        name: seo.title
      },
      position: 2
    });
  }

  const breadcrumb = {
    '@context': 'http://schema.org',
    '@type': 'BreadcrumbList',
    description: 'Breadcrumbs list',
    name: 'Breadcrumbs',
    itemListElement
  };

  return (
    <>
      <Head>
        <title>{title ? title + ' | ' + siteTitle : siteTitle}</title>

        {/* <html lang={siteLanguage ? siteLanguage : 'en'} /> */}
        <link rel="canonical" href={pathname} />
        <meta name="description" content={seo.description} />

        {!article && (
          <script type="application/ld+json">
            {JSON.stringify(schemaOrgWebPage)}
          </script>
        )}
        {article && (
          <script type="application/ld+json">
            {JSON.stringify(schemaArticle)}
          </script>
        )}
        <script type="application/ld+json">{JSON.stringify(breadcrumb)}</script>
      </Head>
      {image && (
        <>
          <Facebook
            desc={seo.description}
            image={image}
            title={seo.title}
            type={article ? 'article' : 'website'}
            url={pathname}
            imageBaseUrl={imageBaseUrl}
            locale={siteLocale || 'pt_BR'}
          />
          <Twitter
            title={seo.title}
            image={image}
            imageBaseUrl={imageBaseUrl}
            desc={seo.description}
            username={twitterUsername}
          />
        </>
      )}
    </>
  );
};
