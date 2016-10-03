import constant from './template-example.constant.js'

/**
 * 说明
 * 此文件是调用服务器接口代码规范模板
 * 每一个接口对应一个函数
 * 注意和服务器调用接口不能写在其他文件, 只能写在这
 */
/**
 * 增加调用服务器接口， 按此例子写
 * 快捷方法 将此函数复制一份， 然后改函数名type和url三个地方就行了
 * 服务器返回后结果会由redux传人template-example.reducer.js文件里的相应函数
 * @param {json} params 这里是调用服务器接口, 传给接口的参数
 * @return 无
 */
export function increment(params) {
	return (dispatch, getState) => {
		// 在这里可以对传给接口的数据进行处理, 如格式化, 过滤非法内容等等
		dispatch({
			'FETCH-DATA': {
				type: constant.INCREMENT_COUNTER, // 此静态变量在template-example.constant.js文件里定的
				url: `need-call-server-api-name`,// 这里写要调用服务器的接口
				data: params
			}
		})
	}
}

/**
 * 这里是另一个调用接口的函数, 详情见上面函数说明
 */
export function decrement(params) {
	return (dispatch, getState) => {
		dispatch({
			'FETCH-DATA': {
				type: constant.DECREMENT_COUNTER,
				url: `other-server-api`,
				data: params
			}
		})
	}
}
