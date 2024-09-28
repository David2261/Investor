import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { motion, useAnimation } from 'framer-motion';

const eases = {
  power2InOut: [0.4, 0.0, 0.2, 1.0],
  power3InOut: [0.645, 0.045, 0.355, 1.0],
  power4InOut: [0.77, 0.0, 0.175, 1.0],
  power3Out: [0.215, 0.61, 0.355, 1.0]
};

const BandeSVG = () => (
  <svg
    className="bande"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 544.67 64"
  >
    <defs>
      <style>
        {`.cls-1 {
          fill: none;
          stroke: #000;
          stroke-miterlimit: 10;
        }`}
      </style>
    </defs>
    <polygon
      className="cls-1"
      points="122.56 63.5 161.25 0.5 178.95 0.5 140.26 63.5 122.56 63.5"
    ></polygon>
    <polygon
      className="cls-1"
      points="92.14 63.5 130.83 0.5 148.53 0.5 109.84 63.5 92.14 63.5"
    ></polygon>
    <polygon
      className="cls-1"
      points="31.33 63.5 70.02 0.5 87.72 0.5 49.04 63.5 31.33 63.5"
    ></polygon>
    <polygon
      className="cls-1"
      points="152.97 63.5 191.66 0.5 209.36 0.5 170.68 63.5 152.97 63.5"
    ></polygon>
    <polygon
      className="cls-1"
      points="183.39 63.5 222.08 0.5 239.78 0.5 201.09 63.5 183.39 63.5"
    ></polygon>
    <polygon
      className="cls-1"
      points="274.56 63.5 313.25 0.5 330.95 0.5 292.26 63.5 274.56 63.5"
    ></polygon>
    <polygon
      className="cls-1"
      points="244.14 63.5 282.83 0.5 300.53 0.5 261.85 63.5 244.14 63.5"
    ></polygon>
    <polygon
      className="cls-1"
      points="213.73 63.5 252.41 0.5 270.12 0.5 231.43 63.5 213.73 63.5"
    ></polygon>
    <polygon
      className="cls-1"
      points="304.97 63.5 343.66 0.5 361.36 0.5 322.68 63.5 304.97 63.5"
    ></polygon>
    <polygon
      className="cls-1"
      points="335.39 63.5 374.08 0.5 391.78 0.5 353.09 63.5 335.39 63.5"
    ></polygon>
    <polygon
      className="cls-1"
      points="426.56 63.5 465.25 0.5 482.95 0.5 444.26 63.5 426.56 63.5"
    ></polygon>
    <polygon
      className="cls-1"
      points="396.14 63.5 434.83 0.5 452.53 0.5 413.85 63.5 396.14 63.5"
    ></polygon>
    <polygon
      className="cls-1"
      points="456.97 63.5 495.66 0.5 513.36 0.5 474.68 63.5 456.97 63.5"
    ></polygon>
    <polygon
      className="cls-1"
      points="487.39 63.5 526.08 0.5 543.78 0.5 505.09 63.5 487.39 63.5"
    ></polygon>
    <polygon
      className="cls-1"
      points="61.76 63.5 100.43 0.5 118.13 0.5 79.46 63.5 61.76 63.5"
    ></polygon>
    <polygon
      className="cls-1"
      points="0.89 63.5 39.56 0.5 57.26 0.5 18.59 63.5 0.89 63.5"
    ></polygon>
    <polygon
      className="cls-1"
      points="365.73 63.5 404.4 0.5 422.1 0.5 383.43 63.5 365.73 63.5"
    ></polygon>
  </svg>
);

const TargetSVG = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" fill="none">
    <g clipPath="url(#clip0_16_21459)">
      <path
        d="M15.5504 10.5259V8.88538H14.4496V10.5259C12.3986 10.7758 10.7758 12.3991 10.5259 14.4496H8.88544V15.5504H10.5259C10.7758 17.6008 12.3986 19.2242 14.4496 19.474V21.114H15.5504V19.474C17.6014 19.2241 19.2242 17.6008 19.4741 15.5504H21.1146V14.4496H19.4741C19.2242 12.3991 17.6014 10.7758 15.5504 10.5259ZM14.4496 18.0841C13.8049 17.9692 13.2294 17.6613 12.783 17.2169C12.3377 16.7706 12.0303 16.1951 11.9159 15.5504H14.4496V18.0841ZM14.4496 14.4496H11.9159C12.0303 13.8048 12.3377 13.2289 12.783 12.783C13.2294 12.3381 13.8049 12.0298 14.4496 11.9159V14.4496ZM17.2169 17.2169C16.7706 17.6613 16.1956 17.9692 15.5504 18.0841V15.5504H18.0841C17.9701 16.1951 17.6623 16.7706 17.2169 17.2169ZM15.5504 14.4496V11.9159C16.1956 12.0298 16.7706 12.3381 17.2169 12.783C17.6623 13.2289 17.9701 13.8048 18.0841 14.4496H15.5504Z"
        fill="black"
      />
      <path
        d="M26.8128 14.3116C26.4691 8.32412 21.6758 3.53086 15.6884 3.18721V0H14.3121V3.18721C8.32418 3.53086 3.53092 8.32371 3.18721 14.3116H0V15.6884H3.18721C3.53092 21.6754 8.32418 26.4691 14.3121 26.8129V30H15.6884V26.8128C21.6758 26.4691 26.4691 21.6754 26.8128 15.6884H30V14.3116L26.8128 14.3116ZM25.4331 15.6884C25.2632 18.3026 24.1373 20.6515 22.3946 22.3946C20.6515 24.1363 18.3026 25.2632 15.6884 25.4331V24.0823H14.3121V25.4331C11.6974 25.2632 9.34793 24.1363 7.60529 22.3946C5.86266 20.6515 4.73725 18.3026 4.56686 15.6884H5.91762V14.3116H4.56691C4.7373 11.697 5.86266 9.3484 7.60535 7.60482C9.34793 5.86266 11.6965 4.73678 14.3121 4.56691V5.91768H15.6884V4.56691C18.3026 4.73678 20.6521 5.86318 22.3952 7.60482C24.1373 9.34846 25.2632 11.697 25.4331 14.3116H24.0823V15.6884H25.4331Z"
        fill="black"
      />
    </g>
    <defs>
      <clipPath id="clip0_16_21459">
        <rect width="30" height="30" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

const Marquee = ({ children }) => {
  return (
    <div className="marquee">
      <div className="marquee__content">
        {children}
        {children}
      </div>
    </div>
  );
};

const CountAnimation = ({ delay = 1500, onCompletion = null }) => {
  const [count, setCount] = useState(0);
  const [intervalDuration, setIntervalDuration] = useState(50);
  const [animationStarted, setAnimationStarted] = useState(false);

  useEffect(() => {
    // Delay before starting the count animation
    const delayTimeout = setTimeout(() => {
      setAnimationStarted(true);
    }, delay);

    return () => clearTimeout(delayTimeout);
  }, [delay]);

  useEffect(() => {
    if (animationStarted) {
      const interval = setInterval(() => {
        if (count < 100) {
          setCount((prevCount) => {
            if (prevCount < 80) {
              // Increment by 10 until 80
              return prevCount + 10;
            } else {
              // Increment by 1 from 80 to 100
              return prevCount + 1;
            }
          });

          // Adjust interval duration based on count
          if (count > 70) {
            // Slow down after 70
            setIntervalDuration(intervalDuration + 10);
          }
        } else {
          clearInterval(interval);
        }
      }, intervalDuration);

      if (onCompletion) {
        onCompletion();
      }

      return () => clearInterval(interval);
    }
  }, [count, intervalDuration, animationStarted]);

  const formatCount = (num) => {
    return num.toString().padStart(2, "0");
  };

  return (
    <div className="count-animation">
      <div className="count loader-type">{formatCount(count)}%</div>
    </div>
  );
};

const Loader = ({ ease = eases.power4InOut }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const controlOverlay = useAnimation();

  const handleCompletion = () => {
    controlOverlay.start({
      y: "-100vh",
      transition: { duration: 0.6, ease, delay: 0.6 }
    });
    setTimeout(() => setIsLoaded(true), 5800);
  };

  if (isLoaded) {
    return null;
  }

  return (
    <motion.div className="loading-wrapper" animate={controlOverlay}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, ease, delay: 0.5 }}
        className="loader-container"
      >
        <div className="loader-type">
          Loading..<span className="pulsing">.</span>
        </div>
        <div className="loader-bands">
          <div className="loader-count">
            <CountAnimation delay={1000} onCompletion={handleCompletion} />
          </div>
          <Marquee>
            <BandeSVG />
          </Marquee>
          <div className="loader-target">
            <TargetSVG />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const App = () => {
  return (
    <>
      <Loader />
      <img
        className="test-image"
        src="https://picsum.photos/1000/400"
        // initial={{ scaleY: 0 }}
        // animate={{ scaleY: 1 }}
        // transition={{ duration: 0.45, delay: 1.5, ease: [0.22, 1, 0.36, 1] }}
      />
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
