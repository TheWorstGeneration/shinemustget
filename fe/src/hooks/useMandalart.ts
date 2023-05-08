import { selectGoal } from "@/store/modules/goal";
import { useAppSelector } from "./useRedux";

export const useMandalart = () => {
  const { title, bigGoalList, smallGoalLists } = useAppSelector(selectGoal);

  return {
    title,
    isClear: false,
    bigList: bigGoalList.map((bigGoal, index) => ({
      location: index + 1,
      content: bigGoal,
      isClear: false,
      smallList: smallGoalLists[index].map(
        (
          smallGoal: {
            id: number;
            content: string;
            isPodo: boolean;
            isToday: boolean;
          },
          index: number,
        ) => ({
          location: index + 1,
          content: smallGoal.content,
          isPodo: false,
          isToday: false,
          isClear: false,
        }),
      ),
    })),
  };
};
