
// import { PubSymbol} from 'commPath/symbol.js';
import constants from './constants.js';
const initalState = false; // { };

export default {

  /**
   * 为了兼容性, 一定要写上request, success, failure这三个状态的处理函数
   * 就只写一个success的部分还没考虑清楚
   * 稳定后和需求清晰之后, 做request和failure的缺省处理函数
   */
  [constants.testCallApiAction1]: {
    /**
     * 调用接口后(这个阶段接口还没返回)会调用
     * @param {object} action 同success函数
     **/
    request(state = initalState, action) {
      return false;
    },
    /**
     * 调用接口返回成功后调用
     * @param {object} action
     * @param {object} action.body 接口返回的数据
     * @param {object} action.requestData 调用接口入参
     * @param {object} action.requestOptions 页面附带过来的数据
     */
    success(state = initalState, action) {
      return {
        ...state,
        data: action.body.data, // 这里是接口返回的data字段, 返回内容都会在这里
      };
    },
    /**
     * 调用接口返回失败,或者调用接口不成功会调用
     * @param {object} action 同success函数
     */
    failure(state = initalState, action) {
      return false;
    },
  },

  /**
   * 说明同 testcxbAction1
   */
  [constants.testCallApiAction2]: {
    request(state = initalState, action) {
      return false;
    },
    success(state = initalState, action) {
      return {
        ...state,
        data: action.body.data,
      };
    },
    failure(state = initalState, action) {
      return false;
    },
  },

  /**
   * 这部份还没考虑清楚, 先不要用
   * 不调用接口
   * 浏览器内部调用action, 传递数据到redux
   */
  [constants.testInnerAction3]: {
    inner(state = initalState, action) {
      console.log('不走接口就内部调用action');
      return {
        ...state,
        data: action.requestData,
      };
    },
  },

}
