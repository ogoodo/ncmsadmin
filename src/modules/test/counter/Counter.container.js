import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Counter from './counter.component.js'
import * as CounterActions from './counter.action.js'

console.log('counter.constainer generateAction');

export default function generateContainer(pageName, moduleName) {
  const ACTION_PREFIX = `${pageName}.${moduleName}`
  const prefix = `${pageName}.${moduleName}`
  //将state.counter绑定到props的counter
  function mapStateToProps(state) {
    return {
      //counter: state.counter
      counter2: state.testModule.counter,
      counter: 3, // state.testModule[prefix].counter,
    }
  }

  //将action的所有方法绑定到props上
  function mapDispatchToProps(dispatch) {
    return bindActionCreators(CounterActions, dispatch)
  }

  //通过react-redux提供的connect方法将我们需要的state中的数据和actions中的方法绑定到props上
  return connect(mapStateToProps, mapDispatchToProps)(Counter)
}
