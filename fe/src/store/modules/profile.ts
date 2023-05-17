import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';

// state type
export interface profileSlice {
  imageUrl: string;
  nickname: string;
  language: string;
  isLogin: boolean;
  canCreate: boolean;
  isDelete: boolean;
}

// 초기 상태 정의
const initialState = {
  imageUrl: '',
  nickname: '',
  language: 'ko',
  isLogin: false,
  canCreate: false,
  isDelete: false,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    // 액션 생성함수
    setLogin: (state, actions) => {
      state.imageUrl = actions.payload.imageUrl;
      state.nickname = actions.payload.nickname;
      state.isLogin = true;
    },
    setLogout: state => {
      state.imageUrl = '';
      state.nickname = '';
      state.isLogin = false;
    },
    setLanguage: (state, action) => {
      state.language = action.payload;
    },
    setCanCreate: (state, action) => {
      state.canCreate = action.payload;
    },
    setIsDelete: (state, action) => {
      state.isDelete = action.payload;
    },
  },
});

// 액션 생성함수
export const { setLogin, setLogout, setLanguage, setCanCreate, setIsDelete } =
  profileSlice.actions;
export const selectProfile = (state: RootState) => state.profile;
// 리듀서
export default profileSlice.reducer;
