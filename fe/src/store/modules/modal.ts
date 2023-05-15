import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';

export interface modalSlice {
  isInputBox: boolean;
  createButton: boolean;
}

// 초기 상태 정의
const initialState = {
  isInputBox: true,
  createButton: false,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    // 액션 생성함수
    setResetInputBox: state => {
      state.isInputBox = true;
    },
    setInputBox: state => {
      state.isInputBox = false;
    },
    setResetCreateButton: state => {
      state.createButton = false;
    },
    setCreateButton: state => {
      state.createButton = true;
    }
  },
});
// 액션 생성함수
export const { setResetInputBox, setInputBox, setResetCreateButton, setCreateButton } = modalSlice.actions;
export const selectModal = (state: RootState) => state.modal;
// 리듀서
export default modalSlice.reducer;
