import styled from '@emotion/styled';
import { CompleteButton } from '@/components/atoms/CompleteButton/CompleteButton';

const DetailedRightButton = styled.div`
  margin-top: 3rem;
`;

export function DetailedRight() {
  return (
      <DetailedRightButton>
        <CompleteButton />
      </DetailedRightButton>
  );
}
