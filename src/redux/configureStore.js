import { createStore, applyMiddleware } from 'redux';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';

import logger from './middleware/logger';
import monitorReducerEnhancer from './middleware/monitorReducer';
import createRootReducer from './reducers';

export const history = createBrowserHistory();

export default function configureStore(preloadedState) {
  const middlewares = [logger, thunkMiddleware];
  const middlewareEnhancer = applyMiddleware(
    routerMiddleware(history),
    ...middlewares
  );

  const enhancers = [middlewareEnhancer, monitorReducerEnhancer];

  const store = createStore(
    createRootReducer(history),
    preloadedState,
    composeWithDevTools(...enhancers)
  );

  // if (process.env.NODE_ENV !== 'production' && module.hot) {
  //   module.hot.accept('./reducers', () => store.replaceReducer(rootReducer));
  // }

  return store;
};
