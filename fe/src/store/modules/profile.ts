import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';

// state type
export interface profileSlice {
  imageUrl: string;
  nickname: string;
  language: string;
}

// 초기 상태 정의
const initialState = {
  imageUrl: '',
  nickname: '',
  language: 'ko',
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    // 액션 생성함수
    setLogin: (state, actions) => {
      state.imageUrl = actions.payload.imageUrl;
      state.nickname = actions.payload.nickname;
    },
    setLogout: (state) => {
      state.imageUrl = '';
      state.nickname = '';
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
