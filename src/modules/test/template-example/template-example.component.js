import React, { Component, PropTypes } from 'react'

/**
 * 组件书写模板, 大家请按模板编写
 */

export default class MyComponent extends Component {
	/**
	 * props的默认值在这里初始化
	 */
	static defaultProps = {
		prefixCls: 'ant-btn',
		onClick() {},
		options: [],
	}
	// 父: 传递属性验证
	static childContextTypes: {
		publicActions: React.PropTypes.object.isRequired
	}
	// 父: 传递给子(后代)组件的属性
	getChildContext: function() {
		return {
			publicActions: this.props.publicActions,
			fruit: "传递的值"
		};
	}
	// 子: 指定访问哪些父类属性
	static contextTypes = {
		publicActions: React.PropTypes.object,
	}
	/**
	 * 对props传入值得校验写在这里
	 * 对传入的props参数做严格校验, 这样能保证更好的代码质量,有误能及时暴露
	 */
	static propTypes = {
		loadi: React.PropTypes.bool,
		onCli: React.PropTypes.func,
		numbe: React.PropTypes.number,
		style: React.PropTypes.object,
		typee: React.PropTypes.string,
		// 所有可以被渲染的对象：数字，字符串，DOM 元素或包含这些类型的数组
		label: React.PropTypes.node,
		// React 元素
		optionalElement: React.PropTypes.element,
		chren: React.PropTypes.any,
		// 用 JS 的 instanceof 操作符声明 prop 为类的实例。
		value: React.PropTypes.instanceOf(Date),
		// 用 enum 来限制 prop 只接受指定的值
		shape: React.PropTypes.oneOf(['circle', 'circle-outline']),
		// 指定的多个对象类型中的一个
		helpe: React.PropTypes.oneOfType([
			React.PropTypes.node,
			React.PropTypes.bool,
		]),
		// 指定类型组成的数组
		arrOf: React.PropTypes.arrayOf(React.PropTypes.number),
		// 指定类型的属性构成的对象
		objOf: React.PropTypes.objectOf(React.PropTypes.number),
		// 特定形状参数的对象
		Shape: React.PropTypes.shape({
			color: React.PropTypes.string,
			fontSize: React.PropTypes.number
		}),
		// 自定义验证器。如果验证失败需要返回一个 Error 对象。不要直接
		// 使用 `console.warn` 或抛异常，因为这样 `oneOfType` 会失效。
		customProp: function(props, propName, componentName) {
			if (!/matchme/.test(props[propName])) {
				return new Error('Validation failed!');
			}
		}
	}

	/**
	 * 构造函数, 可以在这里做些初始化工作
	 */
	constructor() {
		super();
	};

	// 组件生命周期函数书写begin, 请不要写到其他区域
	// ***特别注意*** 书写顺序按组件生命周期顺序书写
	
    /**
	 * 此函数表示页面将要挂载, 所有页面掉接口获取初始化数据都在这里写
	 * 当接口数据获取成功后, 会出发render函数, 渲染界面
	 */
    componentWillMount() {
		// increment函数是在template-example.action.js文件类定义的
		// 通过template-example.container.js文件的connect方法, 传人到了props
        this.props.action.increment();
    }
	/**
	 * 在挂载结束(地一次render)之后马上被调用。需要DOM节点的初始化操作应该放在这里
	 */
	componentDidMount() {
	};

	/**
	 * 当一个挂载的组件接收到新的props的时候被调用。
	 * 该方法应该用于比较 this.props 和 nextProps, 然后使用 this.setState() 来改变state。
	 */
	componentWillReceiveProps(nextProps) {
	}
	/**
	 * 这是在重新绘制过程开始之前触发
	 * 当组件做出是否要更新DOM的决定的时候被调用。
	 * 实现该函数，优化 this.props 和 nextProps ，以及 this.state 和 nextState 的比较，
	 * 如果不需要React更新DOM，则返回false。
	 * 特别注意**  不能在此函数中调用setState(会导致循环调用)
	 */
	shouldComponentUpdate(nextProps, nextState) {
	};
	/**
	 * 在更新发生之前被调用
	 * 特别注意**  不能在此函数中调用this.setState()(会导致循环调用)
	 */
	componentWillUpdate(nextProps, nextState) {
	};
	/**
	 * 在组件更新发生之后调用
	 */
	componentDidUpdate() {
	};
	/**
	 * 在组件移除和销毁之前被调用。清理工作应该放在这里
	 */
	componentWillUnmount() {
	};
	// 组件生命周期函数书写区域end

	// 控件时间回调函数书写begin, 请不要写到其他区域 
	/**
	 * 界面回调函数写在此处
	 * 如果有多个, 类似onClickQuery, onClickAdd, onClickEdit等
	 */
	onClickQuery = (event) => {
	}
	onClickAdd = (event) => {
	}
	onClickEdit = (event) => {
	}
	onClickDelete = (event) => {
	}
	onClickSave = (event) => {
	}
	// 控件时间回调函数书写end, 请不要写到其他区域 

	/**
	 * 将复杂界面通过类似渲染函数划分为多个功能清晰明了的模块
	 * 然后通过主render组合好
	 */
	renderOther() {
		return <div>模板展示</div>
	}

	/**
	 * 页面的界面都在此函数里组织
	 * 如果界面过于复杂, 则可以分多个函数组合例如:renderOther
	 */
	render() {
		// 从组件的props属性解构出相应的变量, 然后渲染到界面上
		const { increment } = this.props;
		return (
			<div>
				<div>{increment}</div>
				{ renderOther() }
				<button onClick={onClickQuery}>查询</button>
				<button onClick={onClickAdd}>新增</button>
				<button onClick={onClickEdit}>编辑</button>
				<button onClick={onClickDelete}>删除</button>
				<button onClick={onClickSave}>保存</button>
				<table cellPadding="0" cellSpacing="0" className="ta-table2">
					<thead>
						<tr>
							<th>选择</th>
							<th>编号</th>
							<th>订单名</th>
						</tr>
					</thead>
                    <tbody>
						<tr>
							<td>选择</td>
							<td>123</td>
							<td>
								<input type= "text" placeholder="请输入订单"/>
							</td>
						</tr>
                    </tbody>
                  </table>
			</div>
		)
	};
}
