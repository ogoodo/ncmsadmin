import React from 'react'
import { render } from 'react-dom'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { hashHistory, browserHistory, Router, Route, Link } from 'react-router'
import { createHashHistory, useBasename } from 'history';
import './app.css'
//import App from './components/App.js'
// import Page1 from './components/Page1.js'
// import Page2 from './components/Page2.js'
// import Tab1 from './components/Tab1.js'
// import Tab2 from './components/Tab2.js'
// import routes from './config/routes.js'


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
const rootRoute = {
    path: '/',
    component: require('./components/App.js'),
    childRoutes: [
        require('./routes/Page1'),
        require('./routes/Page2')
        //require('./routes/Page2/index.js')
    ]
}
// 作用:  干掉React url 的_k=xxxx
// 此处用于添加根路径
const history = useBasename(createHashHistory)({
  queryKey: false,//queryKey: '_key',
  basename: '/',
});
render(
    //<Router history={history}  routes={rootRoute}/>,
    <Router history={browserHistory} routes={rootRoute}/>,
    //<Router history={hashHistory} routes={rootRoute}/>,
    //<Router  routes={rootRoute} />,
    document.getElementById('example')
)

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



