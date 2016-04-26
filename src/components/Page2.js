import React from 'react'
import { browserHistory, Router, Route, Link } from 'react-router'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'


class Page2 extends React.Component {
  render() {
    const { pathname } = this.props.location

    return (
      <div className="Image">
        <h1>Page 222</h1>
        <ul>
          <li><Link to="/page2/tab1">Tab 1</Link></li>
          <li><Link to="/page2/tab2">Tab 2</Link></li>
        </ul>
        <ReactCSSTransitionGroup
          component="div" transitionName="example"
          transitionEnterTimeout={500} transitionLeaveTimeout={500}
        >
          {React.cloneElement(this.props.children || <div />, { key: pathname })}
        </ReactCSSTransitionGroup>
      </div>
    )
  }
}
Page2.propTypes = {
    location: React.PropTypes.object.isRequired,
    children: React.PropTypes.object
}
module.exports = Page2
//export default Page1
