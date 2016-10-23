
import React, { Component, PropTypes } from 'react';
import * as pagesReducer from 'GPagesReducer';


class Main extends React.Component {
  render() {
    console.log('Main.jsx this.props.location.pathname:', location.pathname)
    // console.log('Main.jsx this.props:', this.props)
    // console.log('Main.jsx this.props.children:', this.props.children)
    return (
      this.props.children
    )
  }
}
Main.propTypes = {
    location: React.PropTypes.object.isRequired,
    children: React.PropTypes.object
}
module.exports = Main


// class TestCxb extends Component {

//   constructor(props, context) {
//     super(props, context);
//     console.log('TestCxb.constructor', reducers, pagesReducer);
//   }

//   render() {
//     console.log('render: ************************', 'lang=', lang, this.props);
//     return (
//       <div className="left-right">hi
//         {
//           // this.props.children
//         }
//       </div>
//     );
//   }

// }

// TestCxb.propTypes = {
//   api: PropTypes.object.isRequired,
//   actions: PropTypes.object.isRequired,
// };

// // export default TestCxb;
// module.export = TestCxb;
