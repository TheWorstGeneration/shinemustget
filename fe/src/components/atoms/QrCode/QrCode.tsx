import styled from '@emotion/styled';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const QrCodeImage = styled(Image)<{ isBottom: boolean }>`
  position: relative;
  z-index: 1000;

  ${({ isBottom }) =>
    isBottom
      ? `
    transform: translateY(-5.5rem);
  `
      : ` 
    transform: translateY(0);
  `}
`;

export const QrCode = () => {
  const path = 'assets/images/common/qr_code.webp';
  const [isBottom, setIsBottom] = useState(false);

  const handleScroll = () => {
    const { scrollHeight, scrollTop, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight) {
      setIsBottom(true);
    } else {
      setIsBottom(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <QrCodeImage
      src={path}
      alt="qr-code"
      width={200}
      height={200}
      isBottom={isBottom}
    />
  );
};
