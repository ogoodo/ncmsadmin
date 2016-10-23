export default {
    path: '/',
    component: require('./Main.jsx'),
    childRoutes: [
        require('./admin/route.js'),
        // require('./routes/Page1'),
        // require('./routes/Page2'),
        // require('./routes/Page3.route.js'),
        // require('./routes/page4.route.js'),
    ]
}
