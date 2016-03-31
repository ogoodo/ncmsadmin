//import React from 'react'
import { parseString } from 'xml2js'
import { hashHistory, browserHistory, Router, Route, Link } from 'react-router'
import { Tree } from 'antd'
import Loading from 'react-component-loading';
//import fetchJsonp from 'fetch-jsonp'
//import fetch from 'fetch'
//import 'whatwg-fetch'
const TreeNode = Tree.TreeNode

//import createBrowserHistory from 'history/lib/createBrowserHistory'

const gData = [];

class LeftTree extends React.Component {
  constructor(props) {
      super(props)
      this.state = { gData, loading:true }
      this.onSelect = this.onSelect.bind(this)
  }
  componentDidMount() {
    const that = this;
    fetch('http://127.0.0.1:3001/json/tree.json')
    .then((response) => response.text()
    ).then((body) => {
        //console.log('componentDidMount.body:::\r\n' + body)
        setTimeout(() => {
            that.setState({ gData:JSON.parse(body), loading: false })
        }, 500)
    })
    // 如果返回数据不是jsonp格式会包超时错误:ogoodo.com:2016.3.31
    // fetchJsonp('http://127.0.0.1:3001/json/tree.json')
    // .then((response) => {
    //     response.json()
    // }).then((body) => {
    //     that.setState({ gData:body });
    // })
  }
  onSelect(key, event) {
    this.context.router.push(key[0]);
    //this.context.router.replace(key[0]);
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
        const ca = <Loading />
        //const ca = <div>loading...</div>
        const cb =(
            <Tree
              defaultExpandedKeys={this.state.expandedKeys}
              openAnimation={{}}
              onSelect={this.onSelect}
            >
                {loop(this.state.gData)}
            </Tree>)
        const cc = this.state.loading ? ca : cb;
    return cc;
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
