import { combineReducers } from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer } from 'redux-persist';

import { bibleReducer } from './bible/reducer';
import { readerReducer } from './reader/reducer';
import { favoriteVersesReducer } from './favoriteVerses/reducer';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['readerReducer', 'favoriteVersesReducer'],
};

const rootReducer = persistReducer(
  persistConfig,
  combineReducers({
    bibleReducer: bibleReducer,
    readerReducer: readerReducer,
    favoriteVersesReducer: favoriteVersesReducer,
  }),
);

export default rootReducer;
