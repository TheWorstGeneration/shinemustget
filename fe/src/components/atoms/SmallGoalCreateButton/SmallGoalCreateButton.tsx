import { useAppSelector } from '@/hooks/useRedux';
import getSmallGoal from '@/pages/api/getSmallGoal';
import { selectGoal } from '@/store/modules/goal';
import styled from '@emotion/styled';
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Button = styled.button`
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
`;

export const SmallGoalCreateButton = () => {
  const { bigGoalList } = useAppSelector(selectGoal);

  const axiosSmallGoal = async (bigGoalList: string[]) => {
    const SmallGoalDTO = await getSmallGoal(bigGoalList);
    if (SmallGoalDTO) {
      SmallGoalDTO.forEach((SmallGoal: any, index: any) => {
        // dispatch(setBigGoal({ index, bigGoal }));
        console.log(SmallGoal);
      });
    }
  };

  const handleCreateSmallGoal = () => {
    axiosSmallGoal(bigGoalList);
  };

  return (
    <Button
      type="button"
      title="중간 목표를 기반으로 세부 목표를 작성합니다."
      onClick={handleCreateSmallGoal}
    >
      <FontAwesomeIcon icon={faPaperPlane} />
      세부 목표 작성
    </Button>
  );
};
