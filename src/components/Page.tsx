import React from 'react';

import { PageWrapper } from '../styles/Page';

const Page: React.FC = ({ children }) => {
  return (
    <PageWrapper>
      {children}
    </PageWrapper>
  );
};

export default Page;
