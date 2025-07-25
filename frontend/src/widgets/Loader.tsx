import { motion } from 'framer-motion';
// styles
import styles from '../styles/widgets/Loader.module.css';


function GoogleLoader() {
    return (
      <>
        <div className={styles["loader-main"]}>
          <motion.div className={`${styles["circle"]} ${styles["blue"]}`} animate={{ y: [0, -50, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }} />
          <motion.div className={`${styles["circle"]} ${styles["red"]}`} animate={{ y: [0, -50, 0] }}
            transition={{ delay: .4, duration: 2, repeat: Infinity, ease: 'easeInOut' }} />
          <motion.div className={`${styles["circle"]} ${styles["yellow"]}`} animate={{ y: [0, -50, 0] }}
            transition={{ delay: .8, duration: 2, repeat: Infinity, ease: 'easeInOut' }} />
          <motion.div className={`${styles["circle"]} ${styles["green"]}`} animate={{ y: [0, -50, 0] }}
            transition={{ delay: 1.2, duration: 2, repeat: Infinity, ease: 'easeInOut' }} />
        </div>
      </>
    )
}

export default GoogleLoader;