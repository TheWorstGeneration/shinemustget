import { selectGoal } from "@/store/modules/goal";
import { useAppSelector } from "./useRedux";

export const useMandalart = () => {
    const { title, bigGoalList, smallGoalLists } = useAppSelector(selectGoal);

    // 위에 선언된 변수들로 만다라트 데이터를 만들어서 반환
    const mandalart = {
        title,
        bigGoalList,
        smallGoalLists,
    };
}