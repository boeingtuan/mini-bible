import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { persistStore } from 'redux-persist';

import Reactotron from '../../ReactotronConfig';

import rootReducer from './rootReducer';

const middlewares = [applyMiddleware(thunk)];
if (__DEV__ && Reactotron) {
  // @ts-ignore
  middlewares.push(Reactotron.createEnhancer());
}

export const store = createStore(rootReducer, compose(...middlewares));
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
export type GetState = () => RootState;
