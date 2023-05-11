import { SmallGoalCreateButton } from '@/components/atoms/SmallGoalCreateButton/SmallGoalCreateButton';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { selectGoal, setBigGoal } from '@/store/modules/goal';
import { selectModal } from '@/store/modules/modal';
import styled from '@emotion/styled';

const BigGoalList = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;

  position: relative;

  width: 712px;
  height: 100vh;

  @media screen and (max-width: 960px) {
    width: 512px;
  }

  @media screen and (max-width: 500px) {
    width: 457px;
  }

  @media screen and (max-width: 450px) {
    width: calc(100vw - 2rem);
    height: 844px;
  }
`;

const MandalartTitle = styled.h1`
  font-size: 2rem;
  font-weight: 900;
  line-height: 1.5;
  color: #03510b;

  width: 100%;

  padding-left: 1rem;

  text-align: left;
`;

const BigGoals = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  height: 50vh;
`;

const BigGoalContainer = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;

  width: 100%;
  border-bottom: 1px solid #e0e0e0;
`;

const BigGoalText = styled.h2`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;

  font-size: 1rem;
  line-height: 1.5;
  color: #1e9457;
`;

const BigGoalNumber = styled.h3`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 2rem;
  height: 2.5rem;

  margin: 0 1rem;

  font-size: 1rem;
  font-weight: 600;
  line-height: 1.5;
  color: #1e9457;
`;

const BigGoalTextField = styled.textarea`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 2rem;

  font-size: 1rem;
  font-weight: 600;
  line-height: 1.5;
  color: #1e9457;
  background-color: transparent;

  border: none;
  outline: none;
  resize: none;

  overflow: hidden;
`;

const BigGoalTextLength = styled.span`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  position: relative;

  width: 3rem;

  font-size: 0.75rem;
  font-weight: 600;
  line-height: 1.5;
  color: #718f80;
`;

const YouCanEdit = styled.h2<{ isInputBox: boolean }>`
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.5;
  color: #718f80;
  text-align: center;
  width: 100%;
  transform: ${props =>
    props.isInputBox ? 'translateY(-10em)' : 'translateY(0)'};
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  height: 3rem;
`;

export const BigGoalListContainer = () => {
  const { title, bigGoalList } = useAppSelector(selectGoal);
  const { isInputBox } = useAppSelector(selectModal);
  const dispatch = useAppDispatch();

  const handleChangeBigGoal = (index: number, bigGoal: string) => {
    dispatch(setBigGoal({ index, bigGoal }));
  };
  return (
    <BigGoalList>
      <MandalartTitle>{title}</MandalartTitle>
      {title === '' ? (
        <YouCanEdit isInputBox={isInputBox}>
          {isInputBox
            ? '장기적인 목표를 작성할수록 좋은 결과를 가져옵니다.'
            : 'Shine Must Get이 당신의 만다라트를 작성 중 입니다.'}
        </YouCanEdit>
      ) : (
        <>
          <BigGoals>
            <BigGoalContainer>
              <BigGoalText>중간 목표</BigGoalText>
              <BigGoalTextLength>글자 수</BigGoalTextLength>
            </BigGoalContainer>
            {bigGoalList.map((bigGoal, index) => {
              return (
                <BigGoalContainer key={index}>
                  <BigGoalNumber>{index + 1}.</BigGoalNumber>
                  <BigGoalTextField
                    key={index}
                    value={bigGoal}
                    maxLength={20}
                    onChange={e => handleChangeBigGoal(index, e.target.value)}
                  />
                  <BigGoalTextLength>{bigGoal.length}/20</BigGoalTextLength>
                </BigGoalContainer>
              );
            })}
          </BigGoals>
          <YouCanEdit isInputBox={isInputBox}>
            수정하고 싶은 목표가 있다면 변경해 보세요.
            <br />
            <br />
            20자 이하의 목표를 작성하시는 것을 추천드립니다.
          </YouCanEdit>
          <ButtonContainer>
            <SmallGoalCreateButton />
          </ButtonContainer>
        </>
      )}
    </BigGoalList>
  );
};
