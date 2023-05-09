import { useRouter } from 'next/router';
import { useEffect,useState } from 'react';
import styled from '@emotion/styled';
import { DetailedCenter } from '@/components/molecules/DetailedCenter/DetailedCenter';
import { DetailedRight } from '@/components/molecules/DetailedRight/DetailedRight';
import Head from 'next/head';
import { useInnerWidth } from '@/hooks/useInnerWidth';
import { setIdx } from '@/store/modules/detailIdx';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import podoRead from '../api/podoRead';
import podoSticker from '../api/podoSticker';
import { selectIdx } from '@/store/modules/detailIdx';
import podoIdSetting from '../api/podoIdSetting';
import { setPodo } from '@/store/modules/detailIdx';

const DetailedDiv = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 7rem 28rem;

   @media (max-width: 960px) {
    padding: 0;
  }

   @media (max-width: 500px) {
    height: 130vh;
  }
`;

const DetailedDivCenter = styled.section<{ isMaxWidth: boolean }>`
  display: flex;
  flex-direction: column;

  width: ${({ isMaxWidth }) => (isMaxWidth ? '50vw' : '100vw')};
  padding: ${({ isMaxWidth }) => (isMaxWidth ? '0' : '0 10rem')};
  height: 91vh;

  background-color: #ffffff;

  @media (max-width: 960px) {
    padding: 0;
  }

  @media (max-width: 500px) {
    height: 130vh;
  }
`;

const DetailedDivRight = styled.div`
  flex: 1;

  
  @media (max-width: 960px) {
    padding: 0;
  }

   @media (max-width: 500px) {
    height: 130vh;
  }
`;

export interface podo {
  id: number,
  imageUrl:string
}
 
export interface podoList{ 
  podoCnt: number,
  podoDtoList: podo[],
}

export interface podoListRecord { 
  pageCnt: number,
  podosList:podoList[],
}

export default function Detail() {
  const isMaxWidth = useInnerWidth() >= 1440;
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [setting, setSetting] = useState<any>(false);
  const [list, setList] = useState<any>(null);
  const [stickerList, setstickerList] = useState<any>(null);
  const [updatePodo, setUpdatePodo] = useState<boolean>(false);
  const [isOn, setisOn] = useState<any>(false);
  
  const { index }: any = useAppSelector(selectIdx);

  dispatch(setIdx(router?.query.id));
  useEffect(() => {
    podoIdSetting(index).then((response) => { setisOn(response) });
    podoRead(index).then((response) => {
      setList(response);
    });
    podoSticker().then((response) => { setstickerList(response) });
  }, []);
  
  useEffect(() => {
    podoRead(index).then((response) => {
      setList(response);
    });
  }, [updatePodo])

  useEffect(() => {
    podoIdSetting(index).then((response) => { setisOn(response) });
  }, [isOn]);
  
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
        <DetailedDivCenter isMaxWidth={isMaxWidth}>
          <DetailedCenter isOn={isOn} setisOn={setisOn } setting={setting } list={list} stickerList={...stickerList} updatePodo={ updatePodo} setUpdatePodo={setUpdatePodo} />
        </DetailedDivCenter>
        <DetailedDivRight>
          <DetailedRight/>
        </DetailedDivRight>
      </DetailedDiv>
    </>
  );
}
