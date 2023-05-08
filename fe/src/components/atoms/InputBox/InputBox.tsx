import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import getBigGoal from '@/pages/api/getBigGoal';
import { setBigGoal, setTitle } from '@/store/modules/goal';
import { selectModal, setInputBox } from '@/store/modules/modal';
import styled from '@emotion/styled';
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';

const TypingContainer = styled.div<{ isInputBox: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: absolute;

  top: 100vh;

  width: 712px;
  height: 5rem;

  background-color: #efefef;
  border-radius: 0.5rem;
  border: 1px solid #e0e0e0;

  transform: translateY(
    ${({ isInputBox }) => (isInputBox ? '-7rem' : '10rem')}
  );

  @media screen and (max-width: 960px) {
    width: 512px;
  }

  @media screen and (max-width: 500px) {
    width: 457px;
  }

  @media screen and (max-width: 450px) {
    width: calc(100vw - 2rem);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 100%;
  padding: 1.5rem 1rem;
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
  const { isInputBox } = useAppSelector(selectModal);

  const axiosBigGoal = async (input: string) => {
    const bigGoalDTO = await getBigGoal(input);
    console.log(bigGoalDTO);
    if (bigGoalDTO) {
      dispatch(setTitle(input));
      bigGoalDTO[input].forEach((bigGoal, index) => {
        dispatch(setBigGoal({ index, bigGoal }));
      });
    }
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value === '\n') return;
    setInput(e.target.value);
  };

  const handleSendButtonClick = () => {
    if (!input.trim()) {
      alert('목표를 입력해 주세요.');
      setInput('');
    } else {
      setInput('');
      axiosBigGoal(input);
      dispatch(setInputBox());
    }
  };

  const handleEscape = () => {
    dispatch(setInputBox());
    setInput('');
  };

  return (
    <TypingContainer isInputBox={isInputBox}>
      <TextArea
        placeholder={'목표를 작성해 주세요.'}
        maxLength={20}
        onChange={handleChangeInput}
        onKeyDown={e => {
          if (e.key === 'Enter') {
            console.log('enter');
            handleSendButtonClick();
          } else if (e.key === 'Escape') {
            handleEscape();
          } else {
            return;
          }
        }}
        value={input}
        required
      />
      <TextLength>
        <span>{input.length}</span>
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
