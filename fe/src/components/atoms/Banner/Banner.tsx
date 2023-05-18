import styled from '@emotion/styled';
import Image from 'next/image';
import bannerUrl from '../../../../public/assets/images/common/banner.svg';

const BannerImage = styled(Image)`
  position: relative;
  border: 1px solid #eaeaea;
  cursor: pointer;

  &:hover {
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  }
`;

export const Banner = () => {
  const handleBannerClick = () => {
    window.open('https://oreuda.kr/', '_blank');
  };
  return (
    <BannerImage
      src={bannerUrl}
      alt="banner"
      width={200}
      height={400}
      onClick={handleBannerClick}
      priority
    />
  );
};
