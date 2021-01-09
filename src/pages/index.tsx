import React from 'react';

import Page from '../components/Page';
import SEO from '../components/SEO';
import config from '../data/config';

const Home: React.FC = () => {
  return (
    <Page>
      <SEO
        siteTitle={config.title}
        description={config.description}
        image={config.logo}
        pathname={config.siteUrl}
        imageBaseUrl={config.siteUrl}
        siteLanguage="pt-BR"
        siteLocale="BR"
        twitterUsername={config.twitter}
      />
    </Page>
  );
};

export default Home;
