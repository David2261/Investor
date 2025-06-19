import React from 'react';
import { Helmet } from 'react-helmet-async';
import styles from '../../styles/pages/static/NotFound.module.css';

const NotFound: React.FC = () => {
  return (
    <div className={styles.container}>
      <Helmet>
        <title>Not Found 404</title>
        <meta name="description" content="Not Found 404 page" />
      </Helmet>

      <div className={styles.row}>
        <div className={styles.four0four}>
          <span className={styles.off}>4</span>
          <span className={styles.flicker2}>0</span>
          <span className={styles.flicker3}>4</span>
        </div>

        <div className={styles['not-found']}>
          <span className={styles.flicker4}>P</span>
          <span className={styles.off}>a</span>
          <span>ge </span>
          <span>not </span>
          <span className={styles.off}>f</span>
          <span className={styles.flicker1}>o</span>
          <span className={styles.flicker3}>u</span>
          <span>n</span>
          <span className={styles.off}>d</span>
        </div>

        {[...Array(10)].map((_, i) => (
          <div key={i} className={styles[`fog${i}`]} />
        ))}
      </div>
    </div>
  );
};

export default NotFound;