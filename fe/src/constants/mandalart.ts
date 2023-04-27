import { GoalBoxProps } from "@/components/atoms/GoalBox/GoalBox";
import { GoalBoxContainerProps } from "@/components/molecules/GoalBoxContainer/GoalBoxContainer";

const smallList: GoalBoxProps[] = [];

for (let i = 1; i <= 8; i++) {
    smallList.push({
        id: i,
        location: i,
        content: `Small ${i}`,
        isPodo: false,
        isClear: false,
    })
}

const bigList: GoalBoxContainerProps[] = [];

for (let i = 1; i <= 8; i++) {
    bigList.push({
        location: i,
        content: `Big ${i}`,
        isClear: false,
        smallList,
        isCenter: undefined
    })
}

export const MANDALART = {
    title: 'Mandalart',
    isClear: false,
    bigList,
};