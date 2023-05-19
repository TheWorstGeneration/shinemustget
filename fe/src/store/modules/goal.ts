import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';

export interface goalSlice {
  title: string;
  bigGoalList: string[];
  smallGoalLists: string[][];
}

export interface BigGoalAction {
  index: number;
  bigGoal: string;
}

export interface SmallGoalAction {
  i: number;
  j: number;
  smallGoal: string;
}

const initialState = {
  title: '만다라트를 만들어보세요! 🎉',
  bigGoalList: Array(8).fill(''),
  smallGoalLists: Array(8).fill(Array(8).fill('')),
};

const goalSlice = createSlice({
  name: 'goal',
  initialState,
  reducers: {
    setTitle: (state, action) => {
      state.title = action.payload;
    },
    setBigGoal: (state, action) => {
      const { index, bigGoal }: BigGoalAction = action.payload;
      state.bigGoalList[index] = bigGoal;
    },
    setSmallGoal: (state, action) => {
      const { i, j, smallGoal }: SmallGoalAction = action.payload;
      state.smallGoalLists[i][j] = smallGoal;
    },
    setResetGoal: state => {
      state.title = '만다라트를 만들어보세요! 🎉';
      state.bigGoalList = Array(8).fill('');
      state.smallGoalLists = Array(8).fill(Array(8).fill(''));
    },
  },
});

export const { setTitle, setBigGoal, setSmallGoal, setResetGoal } =
  goalSlice.actions;
export const selectGoal = (state: RootState) => state.goal;
export default goalSlice.reducer;
