import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';

// state type
export interface goalSlice {
  row: number;
    col: number;
    goal: string;
}

// 초기 상태 정의
const initialState = {
    row: 0,
    col: 0,
    goal: '',
};

const goalSlice = createSlice({
  name: 'goal',
  initialState,
  reducers: {
    // 액션 생성함수
    setGoal: (state, actions) => {
        state.row = actions.payload.row;
        state.col = actions.payload.col;
        state.goal = actions.payload.goal;
    },
  },
});

// 액션 생성함수
export const { setGoal } = goalSlice.actions;
export const selectGoal = (state: RootState) => state.goal;
// 리듀서
export default goalSlice.reducer;
