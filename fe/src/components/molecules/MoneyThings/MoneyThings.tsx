import { Banner } from '@/components/atoms/Banner/Banner';
import { QrCode } from '@/components/atoms/QrCode/QrCode';
import { useInnerWidth } from '@/hooks/useInnerWidth';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';

const Container = styled.aside<{ isMaxWidth: boolean }>`
  position: fixed;
  top: 6.5rem;
  left: ${({ isMaxWidth }) => (isMaxWidth ? '10rem' : '-15rem')};

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  z-index: 100;
`;

export const MoneyThings = () => {
  const router = useRouter();
  const isLandingPage = router.pathname === '/';

  const isMaxWidth = useInnerWidth() >= 1440;

  return isLandingPage ? null : (
    <Container isMaxWidth={isMaxWidth}>
      <Banner />
      <QrCode />
    </Container>
  );
};
