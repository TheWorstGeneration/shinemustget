import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';

// state type
export interface profileSlice {
  isLogin: boolean;
  isRanker: boolean;
  language: string;
}

// 초기 상태 정의
const initialState = {
  isLogin: false,
  isRanker: false,
  language: 'ko',
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    // 액션 생성함수
    setLogin: (state, action) => {
      state.isLogin = true;
      state.isRanker = action.payload.isRanker;
    },
    setLogout: (state) => {
      state.isLogin = false;
      state.isRanker = false;
    },
    setLanguage: (state, action) => {
      state.language = action.payload;
    }
  },
});

// 액션 생성함수
export const { 
  setLogin,
  setLogout,
  setLanguage,
 } = profileSlice.actions;
export const selectProfile = (state: RootState) => state.profile;
// 리듀서
export default profileSlice.reducer;
