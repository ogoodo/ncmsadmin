
export default {
    path: '/',
    component: require('../components/Main.js'),
    childRoutes: [
        require('./Page1'),
        require('./Page2'),
        require('./Page3/route-index.js')
        //require('./routes/Page2/index.js')
    ]
}
