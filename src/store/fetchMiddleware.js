/**
 * @author chenxiaobo
 */
import { Modal } from 'antd';
import superagent from 'superagent';
import * as PubSymbol from 'commPath/symbol.js';

const showLoader = (show) => {console.log('显示加载动画', show)};

export default function fetchMiddleware(client) {
  return ({ dispatch, getState }) => next => action => {
    // console.log('fetchMiddleware >>>');
    // 调用用户action里的函数
    if (typeof action === 'function') {
      return action(dispatch, getState);
    }
    // 默认的action处理过程
    if (!action.hasOwnProperty(PubSymbol.FETCH)) {
      return next(action);
    }
    // 用fetchMiddleware.js中间件处理
    if (action[PubSymbol.FETCH] === false) {
      return next(action);
    }

    const { requestData, requestOptions, pageName, type, url } = action;
    const REQ_NOTICE = action[PubSymbol.REQ_NOTICE] || false;
    const SHOW_LOADER = action[PubSymbol.SHOW_LOADER] || true;
    if (typeof url === 'function') {
      return url(getState());
    }
    if (typeof url !== 'string') {
      throw new Error('调用接口url必须是字符串');
    }

    // 这里要加个特定通知, 有些不会使用全局通知
    if (SHOW_LOADER) {
      showLoader(true);
    }
    const callNext = function (state, body) {
      return next({
        pageName,
        type,
        [PubSymbol.FETCH]: true,
        requestData,
        requestOptions,
        [PubSymbol.STATE]: state,
        body,
      });
    }
    // 避免频繁刷新页面调用render函数
    // 这里大部分情况应该是不要这个通知的
    if (REQ_NOTICE) {
      callNext('request', '');
    }
    return new Promise((resolve, reject) => {
      const request = superagent
        .post(url)
        .withCredentials()
        .set('Content-Type', 'application/json')
        .accept('application/json');
      if (requestData) {
        request.send(requestData);
      }
      request.end((err, { body } = {}) => {
        SHOW_LOADER && showLoader(false);
        if (err) {
          callNext('failure', err);
          reject(err);
          Modal.error({ title : '调接口异常!' })
        } else if (body.responseCode === '10000') {
          resolve(body);
          callNext('success', body);
        } else {
          callNext('failure', body);
          reject(body);
          Modal.error({ title : '服务器出错!', content : body.responseMsg })
        }
      });
    });
  }
}
