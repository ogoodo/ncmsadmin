import React from 'react'
import { browserHistory, Router, Route, Link } from 'react-router'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

class App extends React.Component {
  render() {
    const { pathname } = this.props.location

    // Only take the first-level part of the path as key, instead of the whole path.
    const key = pathname.split('/')[1] || 'root'

    return (
      <div>
        <ul>
          <li><Link to="/page1">Page 1</Link></li>
          <li><Link to="/page2">Page 2</Link></li>
        </ul>
        <ReactCSSTransitionGroup
          component="div" transitionName="swap"
          transitionEnterTimeout={500} transitionLeaveTimeout={500}
        >
          {React.cloneElement(this.props.children || <div />, { key: key })}
        </ReactCSSTransitionGroup>
      </div>
    )
  }
}

module.exports = App
//export default Page1
