import constant from './template-example.constant.js'


/**
 * 说明
 * 此文件是处理服务器接口返回数据的代码规范模板
 * 文件template-example.action.js里的action调用服务器接口会映射到本文件相应的函数做处理,如果需要
 */
export default  {
	/**
	 * 本处理从服务器返回数据
	 * 如果要增加其他接口处理函数, 复制一份, 改变函数名和做相应数据处理就行
	 * @param {object} state 数据
	 * @param {object} response 调用服务器接口返回的数据
	 */
	[constant.INCREMENT_COUNTER]:  (state, response) => {
		// 如果接口返回的数据需要做格式化, 或者拼接等操作, 则在此处做
		return Object.assign({}, state, {
			data: response
		});
	},

	/**
	 * 这里是另一个接口返回数据处理的函数, 详情见上面函数说明
	 */
	[constant.DECREMENT_COUNTER]:  (state, response) => {
		// 如果接口返回的数据需要做格式化, 或者拼接等操作, 则在此处做
		return Object.assign({}, state, {
			data: response
		});
	}
}
