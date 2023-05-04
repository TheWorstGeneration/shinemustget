import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { selectGoal, setGoal } from '@/store/modules/goal';
import { selectModal, setInputBox } from '@/store/modules/modal';
import styled from '@emotion/styled';
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';

const TypingContainer = styled.div<{ isInputBox: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;

  width: 50rem;
  height: 5rem;

  background-color: #efefef;
  border-radius: 0.5rem;
  border: 1px solid #e0e0e0;

  transform: translateY(${({ isInputBox }) => (isInputBox ? '0' : '10rem')});
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

export const InputBox = () => {
  const dispatch = useAppDispatch();
  const [input, setInput] = useState('');
  const { row, col, goal } = useAppSelector(selectGoal);
  const { isInputBox } = useAppSelector(selectModal);

  const handleGoalChange = (e: { target: { value: string } }) => {
    setInput(e.target.value);
  };

  const handleSendButtonClick = () => {
    dispatch(setGoal({ row, col, goal: input }));
    dispatch(setInputBox());
  };

  return (
    <TypingContainer isInputBox={isInputBox}>
      <TextArea
        placeholder={`${goal}를 입력해주세요.`}
        maxLength={20}
        onChange={() => handleGoalChange}
        onKeyDown={e => {
          if (e.key === 'Enter') {
            handleSendButtonClick();
          }
        }}
      />
      <TextLength>
        <span>{goal.length}</span>
        <span>/20</span>
      </TextLength>
      <SendButton
        type="button"
        onClick={handleSendButtonClick}
        title="목표 저장"
      >
        <FontAwesomeIcon icon={faPaperPlane} />
      </SendButton>
    </TypingContainer>
  );
};
