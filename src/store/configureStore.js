import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
//import { hashHistory, browserHistory, Router, Route, Link } from 'react-router'
import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux'
import thunkMiddleware from 'redux-thunk'
import reducers from '../components/reducers'


export default function configureStore(browserHistory, initialState) {
    // Apply the middleware to the store
    const middleware = routerMiddleware(browserHistory)
    //applyMiddleware来自redux可以包装 store 的 dispatch
    //thunk作用是使被 dispatch 的 function 会接收 dispatch 作为参数，并且可以异步调用它
    const createStoreEx = compose(
        applyMiddleware(thunkMiddleware, middleware),
        window.devToolsExtension ? window.devToolsExtension() : f => f
    )(createStore)

  //const store = createStoreEx(reducers, initialState)
    const obj1 = {
        //reducers,
        ...reducers,
        routing: routerReducer
    };
    const obj2 = {
        reducers,
        routing: routerReducer
    };
  const store = createStoreEx(combineReducers(obj2))

  //热替换选项
  // if (module.hot) {
  //   // Enable Webpack hot module replacement for reducers
  //   module.hot.accept('../components/reducers', () => {
  //     const nextReducer = require('../components/reducers')
  //     store.replaceReducer(nextReducer)
  //   })
  // }

  return store
}
