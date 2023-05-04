import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import profile from './profile'
import goal from './goal'
import modal from './modal'

const rootReducer = combineReducers({
    // reducers
    profile,
    goal,
    modal
})

const persistConfig = {
    key: 'root',
    storage,
    whitelist: [
        // reducers
        'profile',
        'goal',
        'modal'
    ],
};

export default persistReducer(persistConfig, rootReducer)
