import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// styles
import '../styles/widgets/Loader.css';


function GoogleLoader() {
    return (
      <>
        <div className='loader-main'>
          <motion.div className="circle blue" animate={{ y: [0, -50, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }} />
          <motion.div className="circle red" animate={{ y: [0, -50, 0] }}
            transition={{ delay: .4, duration: 2, repeat: Infinity, ease: 'easeInOut' }} />
          <motion.div className="circle yellow" animate={{ y: [0, -50, 0] }}
            transition={{ delay: .8, duration: 2, repeat: Infinity, ease: 'easeInOut' }} />
          <motion.div className="circle green" animate={{ y: [0, -50, 0] }}
            transition={{ delay: 1.2, duration: 2, repeat: Infinity, ease: 'easeInOut' }} />
        </div>
      </>
    )
}

export default GoogleLoader;