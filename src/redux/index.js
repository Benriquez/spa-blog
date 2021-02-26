import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga';
import reducers from './modules'
import rootSaga from './saga';

const reduxDevTools = (process.env.NODE_ENV !== 'production' ?
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    trace: true,
    traceLimit: 25,
  })  : null) || compose

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  reducers,
  reduxDevTools(applyMiddleware(sagaMiddleware))
)

sagaMiddleware.run(rootSaga) 

export default store
