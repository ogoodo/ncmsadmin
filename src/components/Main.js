import React from 'react'
import { browserHistory, Router, Route, Link } from 'react-router'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import Tree from '../components/Tree.jsx'


import CounterContainer from './containers/CounterContainer'
//import { connect } from 'react-redux'

class Main extends React.Component {
  render() {
    const { pathname } = this.props.location

    // Only take the first-level part of the path as key, instead of the whole path.
    const key = pathname.split('/')[1] || 'root'

    return (
      <div>
        <div>
            <CounterContainer />
        </div>
        <div>
            <Tree />
        </div>
        <div>
            <ul>
            <li><Link to="/page1">Pagehh 111</Link></li>
            <li><Link to="/page2">Pagehh 2</Link></li>
            </ul>
            <ReactCSSTransitionGroup
            component="div" transitionName="swap"
            transitionEnterTimeout={500} transitionLeaveTimeout={500}
            >
            {React.cloneElement(this.props.children || <div />, { key: key })}
            </ReactCSSTransitionGroup>
        </div>
      </div>
    )
  }
}

module.exports = Main

