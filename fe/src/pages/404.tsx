import Image from 'next/image';
import notFound from '../../public/assets/images/common/not-found.png';
import { useInnerWidth } from '@/hooks/useInnerWidth';
import styled from '@emotion/styled';

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
`;

const NotFoundImage = styled(Image)`
  object-fit: contain;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  @media screen and (max-width: 960px) {
    width: 512px;
  }

  @media screen and (max-width: 500px) {
    width: 457px;
  }
`;

function NotFound() {
  const width = useInnerWidth() / 2;
  const height = width * 0.45;

  return (
    <ImageContainer>
      <NotFoundImage
        src={notFound}
        width={width}
        height={height}
        alt="404 Not found"
      />
    </ImageContainer>
  );
}

export default NotFound;
