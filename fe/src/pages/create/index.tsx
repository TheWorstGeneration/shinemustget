import styled from '@emotion/styled';
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
  );
}
