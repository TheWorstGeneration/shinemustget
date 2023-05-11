import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';

// state type
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

// 초기 상태 정의
const initialState = {
  title: '',
  bigGoalList: Array(8).fill(''),
  smallGoalLists: Array(8).fill(Array(8).fill('')),
};

const goalSlice = createSlice({
  name: 'goal',
  initialState,
  reducers: {
    // 액션 생성함수
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
    setResetGoal: (state) => {
      state.title = '';
      state.bigGoalList = Array(8).fill('');
      state.smallGoalLists = Array(8).fill(Array(8).fill(''));
    }
  },
});

// 액션 생성함수
export const { setTitle, setBigGoal, setSmallGoal, setResetGoal } = goalSlice.actions;
export const selectGoal = (state: RootState) => state.goal;
// 리듀서
export default goalSlice.reducer;
