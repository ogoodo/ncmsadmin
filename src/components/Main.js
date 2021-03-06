import React from 'react'
import { browserHistory, Router, Route, Link } from 'react-router'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import Tree from '../components/nav/Tree.jsx'
// import 'app.css'

import counterContainerTTT from '../modules/test/counter/Counter.container'

console.log('main.js counterContainerTTT')
const CounterContainer = counterContainerTTT('page', 'module')
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
            <CounterContainer />
        </div>
        <div>
            <ul>
                <li><Link to="/page1">Pagehh 1</Link></li>
                <li><Link to="/page2">Pagehh 2</Link></li>
            </ul>
        </div>
        <div className="tree-left">
            <Tree />
        </div>
        <div className="tree-right">
            <ReactCSSTransitionGroup
              component="div"
              transitionName="swap"
              transitionEnterTimeout={500}
              transitionLeaveTimeout={500}
            >
                {React.cloneElement(this.props.children || <div />, { key })}
            </ReactCSSTransitionGroup>
        </div>
      </div>
    )
  }
}
Main.propTypes = {
    location: React.PropTypes.object.isRequired,
    children: React.PropTypes.object
}
module.exports = Main
