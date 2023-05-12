import styled from '@emotion/styled';
import Image from 'next/image';
import qrCodeUrl from '../../../../public/assets/images/common/qr_code.webp';

const QrCodeImage = styled(Image)`
  position: relative;
`;

export const QrCode = () => {
  return (
    <QrCodeImage
      src={qrCodeUrl}
      alt="qr-code"
      width={200}
      height={200}
      placeholder="blur"
    />
  );
};
