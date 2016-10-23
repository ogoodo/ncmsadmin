
import * as PubSymbol from 'commPath/symbol.js';
import constants from './constants.js';
import { pageName } from './pageName.js';


/**
 * 保留, 这项每个页面要有
 * 用来页面销毁的时候清理此页面相关的数据
 */
export function removePage() {
  return (dispatch, getState) => {
    return dispatch({
      [PubSymbol.REMOVE_PAGE]: true, // 有这个标记会清除页面在redux里的数据
      pageName,
      type: `${pageName}>${constants.removePage}`,
    });
  }
}

/**
 * @param {object} params 调用接口的入参, 具体数据结构看后端接口文档
 * @param {object} options 如果要带部分数据给接口调用完之后一起处理, 可以通过这里传递
 */
export function testCallApiAction1(params, options) {
  return (dispatch, getState) => {
    return dispatch({
      [PubSymbol.FETCH]: true, //这项必须有(以后扩展可以做版本号); true: 这里代表是调用接口; false: 表示不调接口;
      [PubSymbol.SHOW_LOADER]: false, // true: 代表现实全局loader动画; false: 代表不显示; 默认值:true
      [PubSymbol.REQ_NOTICE]: true, // true: 请求阶段会发送个action给redux,会触发reader; false: ; 默认值:false
      pageName, // 每个页面都要是全局唯一名称, 如果有两个页名称一样会冲突
      // 每个type必须唯一， “pageName>”这段必须带上, 改constants的key就好了
      type: `${pageName}>${constants.testCallApiAction1}`,
      url: '/com/ogoodo/qryList.do', // 调用后台接口的名称
      requestData: params, // 看函数说明
      requestOptions: options, // 看函数说明
    });
  }
}

/**
 * 说明同 testcxbAction1
 */
export function testCallApiAction2(params, options) {
  return (dispatch, getState) => {
    dispatch({
      [PubSymbol.FETCH]: true,
      [PubSymbol.SHOW_LOADER]: false,
      [PubSymbol.REQ_NOTICE]: false,
      pageName,
      type: `${pageName}>${constants.testCallApiAction2}`,
      url: '/com/ogoodo/getList.do',
      requestData: params,
      requestOptions: options,
    });
  }
}


export function testInnerAction3(params, options) {
  return (dispatch, getState) => {
    dispatch({
      [PubSymbol.FETCH]: false,
      pageName,
      type: `${pageName}>${constants.testInnerAction3}`,
      requestData: params,
      requestOptions: options,
    });
  }
}
