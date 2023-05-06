import { SmallGoalCreateButton } from '@/components/atoms/SmallGoalCreateButton/SmallGoalCreateButton';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { selectGoal, setBigGoal } from '@/store/modules/goal';
import styled from '@emotion/styled';
import {
  faPaperPlane,
  faPenToSquare,
} from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const BigGoalList = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  position: relative;

  width: 712px;
  height: 50vh;

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

const MandalartTitle = styled.h1`
  font-size: 2rem;
  font-weight: 900;
  line-height: 1.5;
  color: #03510b;

  width: 100%;
  height: 3rem;

  padding-left: 1rem;

  text-align: left;
`;

const BigGoalContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  border-bottom: 1px solid #e0e0e0;
`;

const BigGoalTextField = styled.textarea`
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 1rem;
  width: 100%;
  height: 3rem;

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
  height: 3rem;

  font-size: 0.75rem;
  font-weight: 600;
  line-height: 1.5;
  color: #718f80;
`;

const YouCanEdit = styled.h2`
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.5;
  color: #718f80;

  margin-top: 4rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  height: 3rem;

  margin-top: 4rem;
`;

export const BigGoalListContainer = () => {
  const { title, bigGoalList } = useAppSelector(selectGoal);
  const dispatch = useAppDispatch();

  const handleChangeBigGoal = (index: number, bigGoal: string) => {
    dispatch(setBigGoal({ index, bigGoal }));
  };
  return (
    <BigGoalList>
      <MandalartTitle>{title}</MandalartTitle>
      {title === '' ? (
        <></>
      ) : (
        bigGoalList.map((bigGoal, index) => {
          return (
            <BigGoalContainer>
              <BigGoalTextField
                key={index}
                value={bigGoal}
                maxLength={20}
                onChange={e => handleChangeBigGoal(index, e.target.value)}
              />
              <BigGoalTextLength>{bigGoal.length}/20</BigGoalTextLength>
            </BigGoalContainer>
          );
        })
      )}
      <YouCanEdit>수정하고 싶은 목표가 있다면 변경해 보세요.</YouCanEdit>
      <ButtonContainer>
        <SmallGoalCreateButton />
      </ButtonContainer>
    </BigGoalList>
  );
};
