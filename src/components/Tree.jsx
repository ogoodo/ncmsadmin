import { parseString } from 'xml2js'
import { hashHistory, browserHistory, Router, Route, Link } from 'react-router'
import { Tree } from 'antd'
//import fetchJsonp from 'fetch-jsonp'
//import fetch from 'fetch'
//import 'whatwg-fetch'
const TreeNode = Tree.TreeNode

//import createBrowserHistory from 'history/lib/createBrowserHistory'

const gData = [];
/*  */
class LeftTree extends React.Component {
  constructor(props) {
      super(props)
      this.state = { gData }
      this.onSelect = this.onSelect.bind(this)
  }
  componentDidMount() {
    const that = this;
    fetch('http://127.0.0.1:3001/json/tree.json')
    .then((response) => {
        response.text()
    }).then((body) => {
        that.setState({ gData:JSON.parse(body) })
        //console.log('componentDidMount.body:::\r\n' + body)
    })
    // fetchJsonp('http://127.0.0.1:3001/json/tree.json')
    // .then(function(response) {
    //     return response.json()
    // }).then(function(body) {
    //     that.setState({gData:body});
    // })
  }
  onSelect(key, event) {
        this.context.router.replace(key[0]);
        // fetch('http://127.0.0.1:3001')
        // .then(function(response) {
        //     return response.text()
        // }).then(function(body) {
        //     console.log('body:::\r\n' + body);
        //     //document.body.innerHTML = body
        // })
        // if(__DEV__){
        //     console.log('__DEV__:调试版本=', __ENV__);
        // }
        // if(__ENV__){
        //     console.log('__ENV__:注入变量测试=', __ENV__);
        // }
  }
  render() {
    const loop = data => data.map((item) => {
      if (item.children) {
        return (
            <TreeNode key={item.key} title={item.title}>
                  {loop(item.children)}
            </TreeNode>
        )
      }
      return <TreeNode key={item.key} title={item.title} _path={item.key} />;
    });
    return (
      <Tree 
        defaultExpandedKeys={this.state.expandedKeys} 
        openAnimation={{}} 
        onSelect={this.onSelect}
      >
        {loop(this.state.gData)}
      </Tree>
    );
  }
}

//声明引用Provider和RouterContext.js定义的数据
LeftTree.contextTypes = {
    history:  React.PropTypes.object,
    location: React.PropTypes.object.isRequired,
    router:   React.PropTypes.object.isRequired,
    store:    React.PropTypes.object
    //store: storeShape
  }
  
module.exports = LeftTree
//*/
/* *
const LeftTree = React.createClass({
  getInitialState() {
    return {
      gData,
      //expandedKeys: ['0-0', '0-0-0', '0-0-0-0'],
    };
  },
  componentDidMount(){
    const that = this;
    fetch('http://127.0.0.1:3001/json/tree.json')
    .then(function(response) {
        return response.text()
        //return response.json()
    }).then(function(body) {
        that.setState({gData:JSON.parse(body)})
        console.log('componentDidMount.body:::\r\n' + body)
        //document.body.innerHTML = body
    })
    // fetchJsonp('http://127.0.0.1:3001/json/tree.json')
    // .then(function(response) {
    //     //return response.text()
    //     return response.json()
    // }).then(function(body) {
    //     that.setState({gData:body});
    //     //that.setState(JSON.parse(body));
    //     //that.setState(body);
    //     console.log('componentDidMount.body:::\r\n' + body);
    //     //document.body.innerHTML = body
    // })
  },
  onSelect(key, event) {
        //browserHistory.replace(key[0]);
        //this.context.history.replace(key[0]);
        this.context.router.replace(key[0]);
        //fetch('http://www.baidu.com/')
        fetch('http://127.0.0.1:3001')        
        .then(function(response) {
            return response.text()
        }).then(function(body) {
            console.log('body:::\r\n' + body);
            //document.body.innerHTML = body
        })
        if(__DEV__){
            console.log('__DEV__:调试版本=', __ENV__);
        }
        if(__ENV__){
            console.log('__ENV__:注入变量测试=', __ENV__);
        }
        // if(ENV === "mobile"){
        //     console.log('ENV.baseUrl=' + ENV2);
        //     //console.log('ENV.baseUrl=', ENV.baseUrl);
        // }
        //browserHistory.replace('/Page2/Tab2')
        //history.replace(null, '/Page2/Tab2')
        //alert(info);
  },
  render() {
    const loop = data => data.map((item) => {
      if (item.children) {
        return <TreeNode key={item.key} title={item.key}>
                    {loop(item.children)}
               </TreeNode>;
      }
      return <TreeNode key={item.key} title={item.key} _path={item.key} />;
    });
    return (
      <Tree defaultExpandedKeys={this.state.expandedKeys} openAnimation={{}} onSelect={this.onSelect} >
        {loop(this.state.gData)}
      </Tree>
    );
  },
});

//声明引用Provider和RouterContext.js定义的数据
LeftTree.contextTypes = {
    history:  React.PropTypes.object,
    location: React.PropTypes.object.isRequired,
    router:   React.PropTypes.object.isRequired,
    store:    React.PropTypes.object
    //store: storeShape
  }
  
module.exports = LeftTree
//*/
//ReactDOM.render(<Demo />, mountNode);



// const history  = createBrowserHistory()
// //export default createBrowserHistory()
/*
const x = 3;
const y = 2;
const z = 1;
const gData = [];

const generateData = (_level, _preKey, _tns) => {
  const preKey = _preKey || '0';
  const tns = _tns || gData;

  const children = [];
  for (let i = 0; i < x; i++) {
    const key = `${preKey}-${i}`;
    tns.push({ title: key, key });
    if (i < y) {
      children.push(key);
    }
  }
  if (_level < 0) {
    return tns;
  }
  const __level = _level - 1;
  children.forEach((key, index) => {
    tns[index].children = [];
    return generateData(__level, key, tns[index].children);
  });
};
generateData(z);
// */
//var xml = "<root>Hello xml2js!</root>"
// const xml = `
// <children key='0-0' title='0-0'>
//     <key>0-0</key>
//     <title>0-0</title>
//     <children key='0-0' title='0-0'>
//         <key>0-0</key>
//         <title>0-0</title>
//     </children>
//     <children key='0-0' title='0-0'>
//         <key>0-0</key>
//         <title>0-0</title>
//     </children>
// </children>
// `;
// let gData;
// parseString(xml, function (err, result) {
//     gData = [result.children];
//     console.dir(gData);
// });


  
  
//   render() {
//     const loop = data =>{ 
//         console.log(data);
//         data.map((item) => {
//             if (item.children) {
//                 return <TreeNode key={item.$.key} title={item.$.title}>
//                         {loop(item.children)}
//                     </TreeNode>;
//             }
//             console.log('item', item);
//             console.log('item.$.key：', item.$.key);
//             return <TreeNode key={item.$.key} title={item.$.title} />;
//         });
//     }
//     return (
//       <Tree defaultExpandedKeys={this.state.expandedKeys} openAnimation={{}} >
//         {loop(this.state.gData)}
//       </Tree>
//     );
//   },
  
  