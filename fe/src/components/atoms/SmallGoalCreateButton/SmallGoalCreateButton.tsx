import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import postSmallGoal from '@/pages/api/postSmallGoal';
import { selectGoal, setSmallGoal } from '@/store/modules/goal';
import { selectModal, setCreateButton } from '@/store/modules/modal';
import { scrollToTop } from '@/utils/scrollToTop';
import styled from '@emotion/styled';
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Button = styled.button<{ createButton: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;
  padding: 1rem;

  font-size: 1rem;
  font-weight: 600;
  line-height: 1.5;

  color: #ffffff;
  background-color: #1e9457;

  border: none;
  outline: none;
  border-radius: 0.5rem;

  svg {
    margin-right: 0.5rem;
  }

  ${({ createButton }) =>
    createButton &&
    `
    color: #1e9457;
    background-color: #ffffff;
  `}
`;

export const SmallGoalCreateButton = () => {
  const { bigGoalList } = useAppSelector(selectGoal);
  const { createButton } = useAppSelector(selectModal);

  const dispatch = useAppDispatch();

  const axiosSmallGoal = async (bigGoalList: string[]) => {
    const SmallGoalDTO = await postSmallGoal(bigGoalList);
    if (SmallGoalDTO) {
      Object.entries(SmallGoalDTO).forEach(([key, smallGoalList]) => {
        const i = bigGoalList.indexOf(key);
        smallGoalList.forEach((smallGoal, j) => {
          dispatch(setSmallGoal({ i, j, smallGoal }));
        });
      });
    }
  };

  const handleCreateSmallGoal = () => {
    axiosSmallGoal(bigGoalList);
    dispatch(setCreateButton());
    scrollToTop();
  };

  return (
    <Button
      type="button"
      title="중간 목표를 기반으로 세부 목표를 작성"
      onClick={handleCreateSmallGoal}
      createButton={createButton}
      disabled={createButton}
    >
      <FontAwesomeIcon
        icon={createButton ? faSpinner : faPaperPlane}
        spinPulse={createButton}
      />
      세부 목표 작성
    </Button>
  );
};
