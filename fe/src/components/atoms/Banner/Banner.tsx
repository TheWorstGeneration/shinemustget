import styled from '@emotion/styled';
import Image from 'next/image';

const BannerImage = styled(Image)`
  position: relative;

  cursor: pointer;

  &:hover {
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  }
`;

export const Banner = () => {
  const path = 'assets/images/common/banner.webp';
  const handleBannerClick = () => {
    window.open(
      'https://www.ssafy.com/ksp/servlet/swp.content.controller.SwpContentServlet?p_process=select-content-view&p_menu_cd=M0201&p_content_cd=C0201',
      '_blank',
    );
  };
  return (
    <BannerImage
      src={path}
      alt="banner"
      width={200}
      height={400}
      onClick={handleBannerClick}
      priority
    />
  );
};
