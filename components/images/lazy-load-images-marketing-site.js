import React from 'react';
import { LazyImage } from 'react-lazy-images';
import Image from 'next/image';
import {SpinnerCircular} from "spinners-react";

type IProps = {
  url: string,
  className?: string,
  layout?: any,
  width?: number,
  height?: number,
  isWidth?: boolean,
  isHeight?: boolean,
}

const LazyLoadImagesMarketingSite = (props: IProps) => {
  const { url, className, layout, width, isWidth, height, isHeight } = props;
  // @ts-ignore
  return (
    <React.Fragment>
      {url && isWidth && isHeight && (
        <LazyImage
          src={url}
          alt="avatar."
          placeholder={({ ref }) => (
            <span ref={ref}>
              <SpinnerCircular
                size={100}
                сolor="#d7b8c0"
                thickness={200}
              />
            </span>
          )}
          actual={({ imageProps }) => (
            <Image
              {...imageProps}
              className={className}
              alt="avatar"
              width={isWidth ? `${width}px` || '100%' : ''}
              height={isHeight ? `${height}px` || '100%' : ''}
            />
          )}
          error={() => (
            <Image
              src="/images/image-placeholder.png"
              alt="Event Image"
              layout="fill"
              objectFit="cover"
            />
          )}
        />
      )}
      {url && !isHeight && !isWidth && (
        <LazyImage
          src={url}
          alt="avatar."
          placeholder={({ ref }) => (
            <span ref={ref}>
              <SpinnerCircular
                size={100}
                сolor="#d7b8c0"
                thickness={200}
              />
            </span>
          )}
          actual={({ imageProps }) => (
            <Image
              {...imageProps}
              className={className}
              alt="avatar"
              layout={layout}
              objectFit="cover"
            />
          )}
          error={() => (
            <Image
              src="/images/image-placeholder.png"
              alt="Event Image"
              layout="fill"
              objectFit="cover"
            />
          )}
        />
      )}
    </React.Fragment>
  );
};

LazyLoadImagesMarketingSite.defaultProps = {
  isWidth: true,
  isHeight: true,
  layout: '',
};

export default LazyLoadImagesMarketingSite;
