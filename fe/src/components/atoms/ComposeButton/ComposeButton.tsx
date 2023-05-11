import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import podoWrite from '@/pages/api/podoWrite';
import { useAppSelector } from '@/hooks/useRedux';
import { selectIdx } from '@/store/modules/detailIdx';
import podoRead from '@/pages/api/podoRead';
import { Dispatch, SetStateAction } from 'react';

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.55rem;
  width: 100%;
  height: 3rem;
  box-shadow: 0 0 0.5rem 1px #22222225;
  padding: 0.5rem;
  color: #a3da08;
  font-weight: 900;

  &:hover {
    box-shadow: 0 0 1rem 1px #22222250;
  }
`;

export function ComposeButton({
  imageUrl,
  oneline,
  updatePodo,
  setUpdatePodo,
}: {
  imageUrl: any;
  oneline: any;
  updatePodo: boolean;
  setUpdatePodo: Dispatch<SetStateAction<boolean>>;
}) {
  const { index } = useAppSelector(selectIdx);

  const propsDetail = {
    id: index,
    imageUrl: imageUrl,
    oneline: oneline,
  };

  const onClickHandler = () => {
    if (
      propsDetail.imageUrl ==
        'https://www.shinemustget.com/images/stickers/lock_default.png' ||
      propsDetail.imageUrl ==
        'https://www.shinemustget.com/images/stickers/lock_smile.png' ||
      propsDetail.imageUrl ==
        'https://www.shinemustget.com/images/stickers/lock_sad.png'
    ) {
      alert('해당 스티커는 선택이 불가능합니다!');
    } else {
      podoWrite(propsDetail).then(res => {
        podoRead(index);
        setUpdatePodo(!updatePodo);
        alert('작성이 완료되었습니다!');
      });
    }
  };

  return <Button onClick={onClickHandler}>작성</Button>;
}
