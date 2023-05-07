import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';

// state type
export interface idxSlice {
  index: number;
}

// 초기 상태 정의
const initialState = {
  index: 0,
};

const detailSlice = createSlice({
  name: 'detailIdx',
  initialState,
  reducers: {
    // 액션 생성함수
    setIdx: (state, action) => { 
      state.index = action.payload;
    }
  },
});

// 액션 생성함수
export const { setIdx } = detailSlice.actions;
export const selectIdx = (state: RootState) => state.detailIdx;
// 리듀서
export default detailSlice.reducer;
