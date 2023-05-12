import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';

interface Podo {
  id: number;
  imageUrl: string;
}

export interface Podos {
  pageCnt: number;
  podosList: Podo[];
}
// state type
export interface idxSlice {
  index: number;
  isPodo: boolean;
  content: string;
  isToday: boolean;
  podosDtoList: Podos;
}

// 초기 상태 정의
const initialState = {
  index: 0,
  isPodo: false,
  content: null,
  isToday: false,
  podosDtoList: 
    {
      pageCnt: 0,
      podosList: [
        {
          id: 0,
          imageUrl: '',
        },
      ],
    },
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
      state.isToday = action.payload.isToday;
    },
    setIsPodo: state => {
      state.isPodo = !state.isPodo;
    },
    setIsToday: state => {
      state.isToday = !state.isToday;
    },
    setPodosList: (state, action) => {
      state.podosDtoList = action.payload;
    },
  },
});

// 액션 생성함수
export const { setIdx, setPodo, setIsPodo, setIsToday, setPodosList } =
  detailSlice.actions;
export const selectIdx = (state: RootState) => state.detailIdx;
// 리듀서
export default detailSlice.reducer;
