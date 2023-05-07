import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import profile from './profile'
import detailIdx from './detailIdx';


const rootReducer = combineReducers({
    // reducers
  profile,
  detailIdx,
})

const persistConfig = {
    key: 'root',
    storage,
    whitelist: [
      // reducers
      'profile',
      'detailIdx'
    ],
};

export default persistReducer(persistConfig, rootReducer)
