
生成jsdoc3文档
gulp jsdoc

运行正式版(打包到磁盘文件后运行)
npm run new

运行调试版(打包到磁盘文件后运行)(调试版打包)
npm run debug

开发调试(打包到webpack内存后调试)
npm run dev

发布项目
gulp prod  将build目录copy到node服务器的静态资源目录就行(注意网址可能要改下)

本机调试
node server/app.js

本机调试2(现在没用这种了,不知道配置还对不)
gulp webpack-dev-server

浏览器访问
http://localhost:3001



https://segmentfault.com/a/1190000003499526
https://github.com/chemdemo/webpack-bootstrap
ejs-loader

https://segmentfault.com/a/1190000004104496
https://github.com/TongchengQiu/webpack-best-practice

redux
npm install --save redux react-redux
npm install --save-dev redux-devtools
http://www.cnblogs.com/lewis617/p/5145073.html
https://github.com/lewis617/react-redux-tutorial  教程不错

UI方案
http://lobos.github.io/react-ui/#/tree
http://amazeui.org/
http://amazeui.org/react/components/dropdown  例子
http://ant.design/  阿里出品
https://github.com/callemall/material-ui
