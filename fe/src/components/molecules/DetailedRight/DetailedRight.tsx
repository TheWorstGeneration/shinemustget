import styled from '@emotion/styled';
import { MailContainer } from '../MailContainer/MailContrainer';
import { CompleteButton } from '@/components/atoms/CompleteButton/CompleteButton';

const DetailedRightDiv = styled.div`
`;

const DetailedRightButton = styled.div`
  position: absolute;
  margin-top: 38rem;
`;

export function DetailedRight() {
  return (
    <DetailedRightDiv>
      <DetailedRightButton>
        <CompleteButton />
      </DetailedRightButton>
    </DetailedRightDiv>
  );
}
