import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import profile from './profile'

const rootReducer = combineReducers({
    // reducers
    profile,
})

const persistConfig = {
    key: 'root',
    storage,
    whitelist: [
        // reducers
        'profile',
    ],
};

export default persistReducer(persistConfig, rootReducer)
