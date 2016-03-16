import {parseString} from 'xml2js'
import { hashHistory, browserHistory, Router, Route, Link } from 'react-router'
import { Tree } from 'antd';
const TreeNode = Tree.TreeNode;

import createBrowserHistory from 'history/lib/createBrowserHistory'
const history  = createBrowserHistory()
//export default createBrowserHistory()

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
const gData = [
    {
        key:'/Page1',
        title:'Page1',
        path:'testpath',
        children:[
            {   key:'/Page1/Tab1', title:'Page1-Tab1' },
            {   key:'/Page1/Tab2', title:'Page1-Tab2' },
        ]
    },
    {
        key:'/Page2',
        title:'Page2',
        children:[
            {   key:'/Page2/Tab1', title:'Page2-Tab1' },
            {   key:'/Page2/Tab2', title:'Page2-Tab2' },
        ]
    },
];
console.log(gData);
const LeftTree = React.createClass({
  getInitialState() {
    return {
      gData,
      //expandedKeys: ['0-0', '0-0-0', '0-0-0-0'],
    };
  },
  onSelect(key, event) {
        browserHistory.replace(key[0])
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
//ReactDOM.render(<Demo />, mountNode);



  
  
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
  
  