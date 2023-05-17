import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { Toggle } from '@/components/atoms/Toggle/Toggle';
import { GrapeBoardList } from '../GrapeBoardList/GrapeBoardList';
import { UserComment } from '../UserComment/UserComment';
import { UserMemo } from '../UserMemo/UserMemo';
import { sticker } from '@/constants/stickerList';
import { useAppSelector } from '@/hooks/useRedux';
import { selectIdx } from '@/store/modules/detailIdx';

const DetailedOverDiv = styled.div`
  width: 100%;
  @media (max-width: 960px) {
    width: calc(100vw - 2rem);
  }

  @media (max-width: 500px) {
    width: 90vw;
  }
`;

const DetailedDiv = styled.div`
  display: flex;
  margin-bottom: 2.05rem;
  width: 100%;
`;

const DetailedDivGoal = styled.div`
  width: 100%;
  height: 4rem;
  margin-bottom: 2.05rem;
  display: flex;
  justify-content: space-between;
`;

const DetailedDivToggle = styled.div`
  display: flex;
  align-items: flex-end;
`;

const DetailedDivToggleDesc = styled.div`
  margin-right: 0.55rem;
`;

const DetailedDivPos = styled.div`
  display: flex;
  flex-direction: row;

  @media (max-width: 500px) {
    flex-direction: column;
  }
`;

const DetailedDivPosLeft = styled.div`
  flex: 1;

  @media (max-width: 500px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;

const DetailedDivRight = styled.div`
  margin-left: 1.35rem;
  flex: 1.25;

  @media (max-width: 500px) {
    margin-left: 0;
  }
`;

const DetailedDivEmpty = styled.div`
  font-size: 1.5rem;
  width: 100%;
  height: 40rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export function DetailedCenter({ stickerList }: { stickerList: sticker[] }) {
  const { isPodo, isToday } = useAppSelector(selectIdx);
  const [podoDetail, setPodoDetail] = useState('');
  const content = useAppSelector(selectIdx).content;

  return (
    <DetailedOverDiv>
      <DetailedDivGoal>
        <h1>{content}</h1>
        <DetailedDivToggle>
          <DetailedDivToggleDesc>
            <p>포도알 설정</p>
          </DetailedDivToggleDesc>
          <Toggle />
        </DetailedDivToggle>
      </DetailedDivGoal>
      {isPodo ? (
        <DetailedDivPos>
          <DetailedDivPosLeft>
            <GrapeBoardList setPodoDetail={setPodoDetail} />
          </DetailedDivPosLeft>
          <DetailedDivRight>
            <UserMemo podoDetail={podoDetail} />
            <UserComment stickerList={...stickerList} />
          </DetailedDivRight>
        </DetailedDivPos>
      ) : (
        <DetailedDivEmpty>
          <p>포도알을 설정해 목표를 관리해보세요.</p>
        </DetailedDivEmpty>
      )}
    </DetailedOverDiv>
  );
}
