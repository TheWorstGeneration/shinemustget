import styled from "@emotion/styled"
import Image from "next/image";

const MailContainerDiv = styled.div`
  box-shadow: 0 0 0.5rem 1px #22222225;
  border-radius: 0.55rem;
  padding: 1rem;
  padding-top: 2rem;
  height: 33.5rem;
`;

export function MailContainer() { 
  return (
    <MailContainerDiv>
      <Image src="/assets/images/mail/envelope.png" width={20} height={ 20} alt="image"></Image>
      <p>오늘 달성하지 못한 목표가 있습니다.</p>
      <p>만다라트에 좋아요가 눌렀습니다.</p>
    </MailContainerDiv>
  );
}