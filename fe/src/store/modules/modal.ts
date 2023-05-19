import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';

export interface modalSlice {
  isInputBox: boolean;
  createButton: boolean;
  isMailBox: boolean;
}

const initialState = {
  isInputBox: true,
  createButton: false,
  isMailBox: false,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {

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
    },
    setResetMailBox: state => {
      state.isMailBox = false;
    },
    setMailBox: state => {
      state.isMailBox = !state.isMailBox;
    },
  },
});

export const {
  setResetInputBox,
  setInputBox,
  setResetCreateButton,
  setCreateButton,
  setResetMailBox,
  setMailBox,
} = modalSlice.actions;
export const selectModal = (state: RootState) => state.modal;
export default modalSlice.reducer;
