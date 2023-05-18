import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import profile from './profile';
import detailIdx from './detailIdx';
import goal from './goal';
import modal from './modal';

const rootReducer = combineReducers({
  profile,
  detailIdx,
  goal,
  modal,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: [
    'profile',
    'detailIdx',
    'goal',
    'modal',
  ],
};

export default persistReducer(persistConfig, rootReducer);
