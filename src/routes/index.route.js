
export default {
    path: '/',
    component: require('../components/Main.js'),
    childRoutes: [
        require('../admin/route.js'),
        require('./Page1'),
        require('./Page2'),
        require('./Page3.route.js'),
        require('./page4.route.js'),
        //require('./routes/Page2/index.js')
    ]
}
