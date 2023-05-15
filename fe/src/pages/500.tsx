import Image from 'next/image';
import errorImage from '../../public/assets/images/common/error.png';
import { useInnerWidth } from '@/hooks/useInnerWidth';
import styled from '@emotion/styled';

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
`;

const ErrorImage = styled(Image)`
  object-fit: contain;

  // 중앙 정렬
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  // 반응형
  @media screen and (max-width: 960px) {
    width: 512px;
  }

  @media screen and (max-width: 500px) {
    width: 457px;
  }
`;

function Error() {
  const width = useInnerWidth() / 2;
  const height = width * 0.45;

  return (
    <ImageContainer>
      <ErrorImage
        src={errorImage}
        width={width}
        height={height}
        alt="404 Not found"
      />
    </ImageContainer>
  );
}

export default Error;
