import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import MyComponent from './template-example.component.js'
import * as Actions from './template-example.action.js'


/**
 * 说明
 * 通过action和reducer我们的组件MyComponent就有接口调用和返回数据的处理能力
 * 并且将这两部分独立,使得条理更清晰
 */
/**
 * 此函数的作用是过滤出redux的stroe(即state参数)里的数据, 传到MyComponent组件的props里
 * state里的数据可能是从服务器返回, 或者内置写上得
 * @param {object} state redux的store
 */
function mapStateToProps(state) {
	return {
		data: state.testModule.data,
	}
}

/**
 * 此函数作用是将template-example.action.js定义调用服务器接口的函数, 传到MyComponent组件的props里
 * @param {function} dispath redux传递过来分发方法
 */
function mapDispatchToProps(dispatch) {
	return bindActionCreators(Actions, dispatch)
}

/**
 * 通过react-redux提供的connect方法将我们需要的state中的数据和actions中的方法绑定到props上
 * @param {function} mapStateToProps 见上面函数说明
 * @param {function} mapDispatchToProps 见上面函数说明
 * @param {class} MyComponent 我们页面逻辑和界面编码的地方
 */
export default connect(mapStateToProps, mapDispatchToProps)(MyComponent)

