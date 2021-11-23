/* eslint-disable max-len */
import React from 'react';

type Props = {
  type: string,
  width: string,
  height: string,
}

const SvgIcons = (props: Props) => {
  const { type, width="", height="" } = props;
  if (type === 'svg-avatar') {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        viewBox="0 0 90 90"
        fill="none"
      >
        <circle cx="45" cy="45" r="45" fill="#060C2C" />
        <path
          d="M45 22C38.3121 22 32.8711 27.441 32.8711 34.1289C32.8711 40.8168 38.3121 46.2578 45 46.2578C51.6879 46.2578 57.1289 40.8168 57.1289 34.1289C57.1289 27.441 51.6879 22 45 22Z"
          fill="#2F3452"
        />
        <path
          d="M60.0907 54.1816C56.7701 50.8099 52.368 48.9531 47.6953 48.9531H42.3047C37.6321 48.9531 33.2299 50.8099 29.9093 54.1816C26.6049 57.5367 24.7852 61.9655 24.7852 66.6523C24.7852 67.3966 25.3885 68 26.1328 68H63.8672C64.6115 68 65.2148 67.3966 65.2148 66.6523C65.2148 61.9655 63.3951 57.5367 60.0907 54.1816Z"
          fill="#2F3452"
        />
      </svg>
    );
  }
  if (type === "svg-testimonial") {
    return  (
      <svg
        className="quote-boxed__shape"
        height="28"
        version="1.1"
        viewBox="0 0 32.2 28"
        width="32.2"
        x="0px"
        y="0px"
      >
        <path
          /* eslint-disable-next-line max-len */
          d="M6.2,0C2.8,0,0,2.8,0,6.3s2.8,6.3,6.2,6.3c6.2,0,2.1,12.3-6.2,12.3v3C14.7,27.9,20.4,0,6.2,0L6.2,0z M23.9,0       c-3.4,0-6.2,2.8-6.2,6.3s2.8,6.3,6.2,6.3c6.2,0,2.1,12.3-6.2,12.3v3C32.4,27.9,38.2,0,23.9,0L23.9,0z M23.9,0"></path>
      </svg>
    );
  }
  return null;
};

export default SvgIcons;
