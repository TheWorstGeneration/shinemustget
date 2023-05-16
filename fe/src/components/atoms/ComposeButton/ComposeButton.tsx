import styled from '@emotion/styled';
import podoWrite from '@/pages/api/podoWrite';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { selectIdx, setIsToday } from '@/store/modules/detailIdx';
import podoRead from '@/pages/api/podoRead';

const Button = styled.button<{ isToday: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.55rem;
  width: 100%;
  height: 3rem;
  padding: 0.5rem;
  border: 1px solid ${({ isToday }) => (isToday ? '#88888888' : '#a3da08')};
  color: ${({ isToday }) => (isToday ? '#88888888' : '#a3da08')};
  font-weight: 900;

  transition: box-shadow 2s;

  &:hover {
  }
`;

export function ComposeButton({
  imageUrl,
  oneline,
}: {
  imageUrl: string;
  oneline: string;
}) {
  const { index, isToday } = useAppSelector(selectIdx);
  const dispatch = useAppDispatch();
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
      podoWrite(propsDetail).then(() => {
        dispatch(setIsToday());
      });
    }
  };

  return (
    <Button
      type="button"
      title="스티커 작성"
      isToday={isToday}
      disabled={isToday}
      onClick={onClickHandler}
    >
      작성
    </Button>
  );
}
