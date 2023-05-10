import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';

// state type
export interface idxSlice {
  index: number;
  isPodo: boolean;
  content: string;
}

// 초기 상태 정의
const initialState = {
  index: 0,
  isPodo: false,
  content:null,
};

const detailSlice = createSlice({
  name: 'detailIdx',
  initialState,
  reducers: {
    // 액션 생성함수
    setIdx: (state, action) => { 
      state.index = action.payload;
    },
    setPodo: (state, action) => {
      state.isPodo = action.payload.isPodo;
      state.content = action.payload.content;

    }
  },
});

// 액션 생성함수
export const { setIdx,setPodo } = detailSlice.actions;
export const selectIdx = (state: RootState) => state.detailIdx;
// 리듀서
export default detailSlice.reducer;
