import styled from '@emotion/styled';
import Image from 'next/image';

const QrCodeImage = styled(Image)`
  position: relative;
`;

export const QrCode = () => {
  const path = 'assets/images/common/qr_code.webp';
  return <QrCodeImage src={path} alt="qr-code" width={200} height={200} />;
};
