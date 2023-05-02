import styled from "@emotion/styled";
import { MailContainer } from "../MailContainer/MailContrainer";
import { CompleteButton } from "@/components/atoms/CompleteButton/CompleteButton";

const DetailedRightDiv = styled.div`
  margin-left: 1.25rem;
`;

const DetailedRightButton = styled.div`
  margin-top: 7rem; 
`;

export function DetailedRight() { 
  return (
  <DetailedRightDiv>
      <MailContainer />
      <DetailedRightButton>
        <CompleteButton/>
      </DetailedRightButton>
    </DetailedRightDiv>
  );
}