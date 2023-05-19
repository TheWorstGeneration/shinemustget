import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';

export interface profileSlice {
  imageUrl: string;
  nickname: string;
  language: string;
  isLogin: boolean;
  canCreate: boolean;
  isDelete: boolean;
}

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

export const { setLogin, setLogout, setLanguage, setCanCreate, setIsDelete } =
  profileSlice.actions;
export const selectProfile = (state: RootState) => state.profile;
export default profileSlice.reducer;
