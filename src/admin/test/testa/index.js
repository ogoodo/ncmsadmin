
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as PubSymbol from 'commPath/symbol.js'
import * as actions from './action.js'
import { pageName } from './pageName.js'
import PageView from './PageView.jsx'

function mapStateToProps(state) {
  if (!state[PubSymbol.PAGES].hasOwnProperty(pageName)) {
    console.log('index.js mapStateToProps: 初始化值')
    return { api: {} }
  }
  return {
    // 这里还可以加全局信息, 及其他数据
    api: state[PubSymbol.PAGES][pageName],
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

const Page = connect(mapStateToProps, mapDispatchToProps)(PageView);
export default Page
