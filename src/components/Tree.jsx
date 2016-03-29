//import React from 'react'
import { parseString } from 'xml2js'
import { hashHistory, browserHistory, Router, Route, Link } from 'react-router'
import { Tree } from 'antd'
//import fetchJsonp from 'fetch-jsonp'
//import fetch from 'fetch'
//import 'whatwg-fetch'
const TreeNode = Tree.TreeNode

//import createBrowserHistory from 'history/lib/createBrowserHistory'

const gData = [];

class LeftTree extends React.Component {
  constructor(props) {
      super(props)
      this.state = { gData }
      this.onSelect = this.onSelect.bind(this)
  }
  componentDidMount() {
    const that = this;
    fetch('http://127.0.0.1:3001/json/tree.json')
    .then((response) => response.text()
    ).then((body) => {
        //console.log('componentDidMount.body:::\r\n' + body)
        that.setState({ gData:JSON.parse(body) })
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
            <TreeNode key={item.key} title={item.title} >
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
