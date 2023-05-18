import styled from '@emotion/styled';
import Image from 'next/image';
import defaultBanner from '../../../../public/assets/images/common/banner.png';
import oreudaBanner from '../../../../public/assets/images/common/banner.svg';
import { useState } from 'react';

const BannerImage = styled(Image)`
  position: relative;
  border: 1px solid #eaeaea;
  cursor: pointer;

  &:hover {
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  }
`;

export const Banner = () => {
  const Banner = [
    {
      src: defaultBanner,
      url: '',
    },
    {
      src: oreudaBanner,
      url: 'https://oreuda.kr/',
    },
  ];
  const [index, setIndex] = useState(0);

  setInterval(() => {
    setIndex((index + 1) % Banner.length);
  }, 10000);

  const handleBannerClick = () => {
    window.open(Banner[index].url, '_blank');
  };
  return (
    <BannerImage
      src={Banner[index].src}
      alt="banner"
      width={200}
      height={400}
      onClick={handleBannerClick}
      priority
    />
  );
};
