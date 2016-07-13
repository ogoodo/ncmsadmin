
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { hashHistory, browserHistory, Router, Route, Link } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import { createHashHistory, useBasename } from 'history';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import rootRoute from './routes'
import './app.css'
import 'antd/dist/antd.less'
// require('./app.css');
// require('antd/lib/index.css');

import configureStore from './store/configureStore'
const store = configureStore(browserHistory)

// 将路由信息注入redux使得能够做撤销功能
const history = syncHistoryWithStore(browserHistory, store)
if (__DEV__) {
    history.listen(location => console.log(`App.js路由: ${location.pathname}`))
    console.log('App.js __DEV__:注入变量测试=', __DEV__);
}
if (__ENV__) {
    console.log('App.js __ENV__:注入变量测试=', __ENV__);
}
if (process.env.NODE_ENV !== 'production') {
    console.log('App.js process.env.NODE_ENV:注入变量测试=', process.env.NODE_ENV);
}
render(
    <Provider store={store}>
        <Router history={history} routes={rootRoute} />
    </Provider>
    , document.getElementById('id_root')
)

// const rootRoute = {
//     path: '/',
//     component: require('./components/Main.js'),
//     childRoutes: [
//         require('./routes/Page1'),
//         require('./routes/Page2'),
//         require('./routes/Page3/route-index.js')
//         //require('./routes/Page2/index.js')
//     ]
// }


//<Router history={browserHistory} routes={rootRoute}/>//这个配置文件可以
//<Router history={history}  routes={rootRoute}/>
//<Router history={history2}  routes={rootRoute}/>
//<Router history={hashHistory} routes={rootRoute}/>
//<Router  routes={rootRoute} />


// // 作用:  干掉React url 的_k=xxxx
// // 此处用于添加根路径
// const history = useBasename(createHashHistory)({
//   queryKey: false,//queryKey: '_key',
//   basename: '/',
// });
// import createBrowserHistory from 'history/lib/createBrowserHistory'
// const history2  = createBrowserHistory()


// const rootRoute = {
//     //component: 'App',
//     childRoutes: [{
//         path: '/',
//         component: require('./components/App'),
//         childRoutes: [
//             require('./routes/Page1'),
//             require('./routes/Page2')
//             //require('./routes/Page2/index.js')
//         ]
//     }]
// }


//*/
// render((
//   <Router history={browserHistory}>
//     <Route path="/" component={App}>
//       <Route path="page1" component={Page1}>
//         <Route path="tab1" component={Tab1} />
//         <Route path="tab2" component={Tab2} />
//       </Route>
//       <Route path="page2" component={Page2}>
//         <Route path="tab1" component={Tab1} />
//         <Route path="tab2" component={Tab2} />
//       </Route>
//     </Route>
//   </Router>
// ), document.getElementById('example'))
