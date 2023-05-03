import styled from '@emotion/styled';
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Head from 'next/head';
import { useState } from 'react';

const CreateSection = styled.section`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  position: relative;
  width: 100vw;
  height: calc(100vh - 5.5rem);
  background-color: #ffffff;

  padding: 1rem 0;
`;

const TypingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;

  width: 50rem;
  height: 5rem;

  background-color: #efefef;
  border-radius: 0.5rem;
  border: 1px solid #e0e0e0;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 100%;
  padding: 1rem;
  border: none;
  outline: none;
  resize: none;
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.5;
  color: #000000;
  background-color: transparent;
`;

const TextLength = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  position: relative;
  width: 5rem;
  height: 100%;
  padding: 1rem;
  font-size: 0.75rem;
  font-weight: 500;
  line-height: 1.5;
  color: #000000;
  background-color: transparent;
`;

const SendButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 5rem;
  height: 100%;

  &:hover {
    background-color: #dfdfdf;
  }
`;

export default function Create() {
  const [goal, setGoal] = useState('');

  return (
    <>
      <Head>
        <title>Shine must get | 만다라트 생성</title>
        <meta
          name="description"
          content="최종 목표를 작성하고 당신만의 만다라트를 생성해 보세요."
        />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Shine Must Get" />
        <meta property="og:title" content="Shine Must Get | 만다라드 생성 " />
        <meta property="og:description" />
        <meta
          property="og:image"
          content="assets/images/common/front-image.png"
        />
        <meta property="og:url" content="https://shinemustget.com" />
      </Head>
      <CreateSection>
        <TypingContainer>
          <TextArea
            placeholder="당신의 최종 목표를 입력해주세요."
            maxLength={20}
            onChange={e => setGoal(e.target.value)}
          />
          <TextLength>
            <span>{goal.length}</span>
            <span>/20</span>
          </TextLength>
          <SendButton>
            <FontAwesomeIcon icon={faPaperPlane} />
          </SendButton>
        </TypingContainer>
      </CreateSection>
    </>
  );
}
