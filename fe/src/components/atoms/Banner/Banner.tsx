import styled from '@emotion/styled';
import Image from 'next/image';
import bannerUrl from '../../../../public/assets/images/common/banner.png';

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
    window.open(
      'https://www.ssafy.com/ksp/servlet/swp.content.controller.SwpContentServlet?p_process=select-content-view&p_menu_cd=M0201&p_content_cd=C0201',
      '_blank',
    );
  };
  return (
    <BannerImage
      src={bannerUrl}
      alt="banner"
      width={200}
      height={400}
      onClick={handleBannerClick}
      placeholder="blur"
      priority
    />
  );
};
