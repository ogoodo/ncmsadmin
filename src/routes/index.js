
export default {
    path: '/',
    component: require('../components/Main.js'),
    childRoutes: [
        require('../routes/Page1'),
        require('../routes/Page2'),
        require('../routes/Page3/route-index.js')
        //require('./routes/Page2/index.js')
    ]
}
