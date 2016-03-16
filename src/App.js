import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { hashHistory, browserHistory, Router, Route, Link } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import { createHashHistory, useBasename } from 'history';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import './app.css'
//import { DatePicker } from 'antd'
import 'antd/lib/index.css'//
//import App from './components/App.js'
// import Page1 from './components/Page1.js'
// import Page2 from './components/Page2.js'
// import Tab1 from './components/Tab1.js'
// import Tab2 from './components/Tab2.js'
// import routes from './config/routes.js'

import configureStore from './components/store/configureStore'
const store = configureStore(browserHistory)

const rootRoute = {
    path: '/',
    component: require('./components/Main.js'),
    childRoutes: [
        require('./routes/Page1'),
        require('./routes/Page2')
        //require('./routes/Page2/index.js')
    ]
}
const history3 = syncHistoryWithStore(browserHistory, store)
history3.listen(location => console.log('路由: ' + location.pathname))
render(
    <Provider store={store}>
        <Router history={history3} routes={rootRoute}/>
    </Provider>
    ,document.getElementById('example')
)

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



