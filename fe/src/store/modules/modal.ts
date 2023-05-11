import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';

export interface modalSlice {
  isInputBox: boolean;
}

// 초기 상태 정의
const initialState = {
  isInputBox: true,
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
  },
});
// 액션 생성함수
export const { setResetInputBox, setInputBox } = modalSlice.actions;
export const selectModal = (state: RootState) => state.modal;
// 리듀서
export default modalSlice.reducer;
