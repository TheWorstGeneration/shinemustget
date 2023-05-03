import styled from '@emotion/styled';
import { DetailedCenter } from '@/components/molecules/DetailedCenter/DetailedCenter';
import { DetailedLeft } from '@/components/molecules/DetailedLeft/DetailedLeft';
import { DetailedRight } from '@/components/molecules/DetailedRight/DetailedRight';
import Head from 'next/head';

const DetailedDiv = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 6rem 10rem;
`;

const DetailedDivLeft = styled.div`
  flex: 0.85;
`;

const DetailedDivCenter = styled.div`
  flex: 2.25;
`;

const DetailedDivRight = styled.div`
  flex: 1;
`;

export default function Detail() {
  return (
    <>
      <Head>
        <title>Shine Must Get | 만다라트 상세 페이지</title>
        <meta
          name="description"
          content="포도알 스티커를 붙이며 차근차근 목표를 이루어 나가보세요."
        />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Shine Must Get" />
        <meta
          property="og:title"
          content="Shine Must Get | 만다라트 상세 페이지"
        />
        <meta
          property="og:description"
          content="포도알 스티커를 붙이며 차근차근 목표를 이루어 나가보세요."
        />
        <meta
          property="og:image"
          content="assets/images/common/front-image.png"
        />
        <meta property="og:url" content="https://shinemustget.com" />
      </Head>
      <DetailedDiv>
        <DetailedDivLeft>
          <DetailedLeft />
        </DetailedDivLeft>
        <DetailedDivCenter>
          <DetailedCenter />
        </DetailedDivCenter>
        <DetailedDivRight>
          <DetailedRight />
        </DetailedDivRight>
      </DetailedDiv>
    </>
  );
}
