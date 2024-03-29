import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { DetailedCenter } from '@/components/molecules/DetailedCenter/DetailedCenter';
import Head from 'next/head';
import { useInnerWidth } from '@/hooks/useInnerWidth';
import { setPodosList } from '@/store/modules/detailIdx';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import podoRead from '../api/podoRead';
import podoSticker from '../api/podoSticker';
import { selectIdx } from '@/store/modules/detailIdx';
import { CompleteButton } from '@/components/atoms/CompleteButton/CompleteButton';
import { useGoToLandingPage } from '@/hooks/useGoToLandingPage';

const HeadDiv = styled.div`
  margin-bottom: 7rem;
`;

const DetailedDiv = styled.div<{ isMaxWidth: boolean }>`
  display: flex;
  margin: 0 auto;
  justify-content: center;

  width: ${({ isMaxWidth }) => (isMaxWidth ? '50vw' : '100vw')};
  padding: ${({ isMaxWidth }) => (isMaxWidth ? '0' : '0 10rem')};

  @media (max-width: 960px) {
    display: flex;
    justify-content: column;
  }

  @media (max-width: 500px) {
    display: flex;
    justify-content: column;
  }
`;

const DetailedDivCenter = styled.div<{ isMaxWidth: boolean }>`
  width: 100%;
  @media (max-width: 960px) {
    padding: 1rem;
  }

  @media (max-width: 500px) {
  }
`;

const DetailedDivRight = styled.div`
  @media (max-width: 960px) {
    padding: 0;
  }

  @media (max-width: 500px) {
  }
`;

export interface podo {
  id: number;
  imageUrl: string;
}

export interface podoList {
  podoCnt: number;
  podoDtoList: podo[];
}

export interface podoListRecord {
  pageCnt: number;
  podosList: podoList[];
}

export default function Detail() {
  useGoToLandingPage();

  const dispatch = useAppDispatch();
  const isMaxWidth = useInnerWidth() >= 1440;

  const [stickerList, setstickerList] = useState<any>(null);
  const { index, isToday } = useAppSelector(selectIdx);
  useEffect(() => {
    podoRead(index).then(response => {
      dispatch(setPodosList(response));
    });
    podoSticker().then(response => {
      setstickerList(response);
    });
  }, [index, isToday]);

  return (
    <>
      <HeadDiv>
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
      </HeadDiv>
      <DetailedDiv isMaxWidth={isMaxWidth}>
        <DetailedDivCenter isMaxWidth={isMaxWidth}>
          <DetailedCenter stickerList={...stickerList} />
          <CompleteButton />
        </DetailedDivCenter>
      </DetailedDiv>
    </>
  );
}
