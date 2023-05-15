import styled from '@emotion/styled';
import mandalartClear from '@/pages/api/mandalartClear';
import { useAppSelector } from '@/hooks/useRedux';
import { selectIdx } from '@/store/modules/detailIdx';
import { useRouter } from 'next/router';

const Button = styled.button`
  margin-top: 3rem;
  align-items: center;
  border-radius: 0.55rem;
  width: 100%;
  height: 3rem;
  box-shadow: 0 0 0.5rem 1px #22222225;
  padding: 1rem;
  color: #a3da08;
  font-weight: 900;

  &:hover {
    box-shadow: 0 0 1rem 1px #22222250;
  }
`;

export function CompleteButton() {
  const { index, content, isClear } = useAppSelector(selectIdx);
  const router = useRouter();

  const handleComplete = async () => {
    await mandalartClear(index);
    router.push('/home');
  };

  return (
    <Button
      type="button"
      title="세부 목표 달성"
      onClick={handleComplete}
      disabled={isClear}
    >
      {isClear ? '이미 완료된 목표입니다.' : `${content} 완료하기`}
    </Button>
  );
}
