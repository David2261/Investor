import { Helmet } from 'react-helmet-async';
import { DEFAULT_TITLE } from '../constants/const';

const SEOProvider = ({ title, children } : { title: string, children: any }) => {
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

export default SEOProvider;
