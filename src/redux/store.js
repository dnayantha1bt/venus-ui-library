import { createBrowserHistory } from 'history';
import { compose, createStore, applyMiddleware } from 'redux';
import { routerMiddleware, connectRouter } from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';
import reducers from './rootReducer';
import rootSaga from './rootSaga';

import { logger } from 'redux-logger';

const sagaMiddleware = createSagaMiddleware();
export const history = createBrowserHistory();

const middlewares =
    process.env.NODE_ENV === 'prd'
        ? [sagaMiddleware, routerMiddleware(history)]
        : [sagaMiddleware, routerMiddleware(history), logger]; //logger

const store = compose(
    applyMiddleware(...middlewares),
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
)(createStore)(connectRouter(history)(reducers));

store.runSaga = sagaMiddleware.run;
store.asyncReducers = {};

sagaMiddleware.run(rootSaga);

export default store;
