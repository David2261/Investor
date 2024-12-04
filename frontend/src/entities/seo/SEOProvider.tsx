import React from 'react';
import { Helmet } from 'react-helmet-async';

const DEFAULT_TITLE = 'Investor Home';

const SEO = ({ title, children } : { title: string, children: any }) => {
  const fullTitle = title ? `${DEFAULT_TITLE} | ${title}` : DEFAULT_TITLE;

  return (
    <>
      <Helmet>
        <title>{fullTitle}</title>
      </Helmet>
      {children}
    </>
  );
};

export default SEO;
