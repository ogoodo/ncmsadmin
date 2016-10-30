
import React, { Component, PropTypes } from 'react';
import { pageName } from './pageName';
import * as reducers from './reducer.js';
import * as pagesReducer from 'GPagesReducer';


// class Main2 extends React.Component {
//   render() {
//     console.log('this.props.children:')
//     return (
//       <div>
//       发生的方式发生22222222
//       </div>
//     )
//   }
// }
// module.exports = Main2


class TestCxb extends Component {

  constructor(props, context) {
    super(props, context);
    console.log('TestCxb->constructor')
    // console.log('TestCxb.constructor', reducers, pagesReducer);
    pagesReducer.addPages(pageName, reducers);
    this.state = {
      employeeId: '',
    };
  }

  componentWillMount() {
    // 调用接口
    const data = { key: 'test', pageNo: 1, pageSize: 10, };
    this.props.actions.testCallApiAction1(data).then(() => {
      console.log('调用接口1, 成功了, 这里可以做相应处理!')
    }).catch(() => {
      console.warn('调用接口1, 异常或者返回错误!')
    });

    // 内部action
    this.props.actions.testInnerAction3({ test: '仅作测试' });
  }

  // componentWillUnmount() {
  //   console.log('componentWillUnmount: ', pageName);
  //   // 清除page在redux里挂载的数据
  //   this.props.actions.removePage();
  //   // 清除处理此页面接口用的reducer引用, 让浏览器能垃圾回收
  //   pagesReducer.removePages(pageName);
  // }

  renderListApi1() {
    // if (!this.props.api || !this.props.api.testcxbAction1) {
    //   return false;
    // }
    // const data = this.props.api.testcxbAction1.data;
    // return (
    //   <div>
    //   {
    //     JSON.stringify(data)
    //   }
    //   </div>
    // )
  }

  render() {
    console.log('render: ************************', 'lang=', this.props);
    return (
      <div className="left-right">
        <h3>这里是接口1，数据显示1233123</h3>
        {
          this.renderListApi1()
        }
      </div>
    );
  }

}

TestCxb.propTypes = {
  api: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
};

export default TestCxb;
// module.export = TestCxb;

