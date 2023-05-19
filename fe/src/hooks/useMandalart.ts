import { selectGoal } from '@/store/modules/goal';
import { useAppSelector } from './useRedux';

interface SmallGoal {
  id: number;
  location: number;
  content: string;
  isClear?: boolean | undefined;
  isCenter?: number | undefined;
}

interface BigGoal {
  location: number;
  content: string;
  isClear?: boolean | undefined;
  smallList: SmallGoal[];
  isCenter?: number | undefined;
}

export interface MandalartData {
  title: string;
  bigList: BigGoal[];
}

export const useMandalart = (): MandalartData => {
  const { title, bigGoalList, smallGoalLists } = useAppSelector(selectGoal);

  return {
    title,
    bigList: bigGoalList.map((bigGoal: string, index) => ({
      location: index + 1,
      content: bigGoal,
      smallList: smallGoalLists[index].map(
        (smallGoal: string, index: number) => ({
          location: index + 1,
          content: smallGoal,
        }),
      ),
    })),
  };
};
