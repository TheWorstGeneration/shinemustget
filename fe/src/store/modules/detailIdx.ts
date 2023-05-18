import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';

interface Podo {
  id: number;
  imageUrl: string;
}

export interface Podos {
  podoCnt: number;
  podoDtoList: Podo[];
}

interface Result {
  pageCnt: number;
  podosList: Podos[];
}

export interface idxSlice {
  index: number;
  isPodo: boolean;
  content: string;
  isToday: boolean;
  isClear: boolean;
  result: Result;
}

const initialState = {
  index: 0,
  isPodo: false,
  content: null,
  isToday: false,
  isClear: false,
  result: {
    pageCnt: 0,
    podosList: [
      {
        podoCnt: 0,
        podoDtoList: [
          {
            id: 0,
            imageUrl: '',
          },
        ],
      },
    ],
  },
};

const detailSlice = createSlice({
  name: 'detailIdx',
  initialState,
  reducers: {
    setIdx: (state, action) => {
      state.index = action.payload;
    },
    setPodo: (state, action) => {
      state.isPodo = action.payload.isPodo;
      state.content = action.payload.content;
      state.isToday = action.payload.isToday;
      state.isClear = action.payload.isClear;
    },
    setIsPodo: state => {
      state.isPodo = !state.isPodo;
    },
    setIsToday: state => {
      state.isToday = !state.isToday;
    },
    setPodosList: (state, action) => {
      state.result = action.payload;
    },
  },
});

export const { setIdx, setPodo, setIsPodo, setIsToday, setPodosList } =
  detailSlice.actions;
export const selectIdx = (state: RootState) => state.detailIdx;
export default detailSlice.reducer;
