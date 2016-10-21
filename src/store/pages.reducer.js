/**
 * @author chenxiaobo178 2016.10.09
 */
import * as PubSymbol from 'commPath/symbol.js';
const initalState = {
 // loaded: false,
}
const _pages = {};

/**
 * 测试
 */
export function pagesReducer(state = initalState, action) {
  console.log('testcxbPages.reducer >>>==================', action.type);
  const { pageName } = action;
  if (_pages.hasOwnProperty(pageName)) {
    if (action.hasOwnProperty(PubSymbol.REMOVE_PAGE)) {
      const newState = { ...state, [pageName]: null };
      delete newState[pageName];
      return newState;
    }
    if (!action.hasOwnProperty(PubSymbol.FETCH)) {
      console.error('页面内聚开发模式, 接口调用必须带PubSymbol.FETCH字段');
    }
    const page = _pages[pageName];
    const type = action.type.substr(action.type.indexOf('>')+1)
    if (page.hasOwnProperty(type)) {
      const pageOldState = state[pageName] || {};
      const apiOldState = pageOldState[type] || {};
      const reducerObj = page[type];
      const actionState = action[PubSymbol.STATE];
      if (['request', 'success', 'failure'].indexOf(actionState) < 0) {
        if (action[PubSymbol.FETCH] === true) {
          console.error('无此分支, 请确认源码是否符合规范', actionState);
        }
      }
      let apiNewState = {};
      if (reducerObj[actionState]) {
        // 这里更加状态调用reducer里传过来的函数,如:'request', 'success', 'failure'
        apiNewState = reducerObj[actionState](apiOldState, action);
      } else if (action[PubSymbol.FETCH] === false) {
        // 没调接口的, 就是浏览器内部调用action, 其实就是fetch为false的部分
        apiNewState = reducerObj.inner(apiOldState, action);
      }
      return { ...state, [pageName]: { ...pageOldState, [type]: apiNewState } };
    }
  }
  return state;
}
/**
 * 测试, 没用了
 */
export function pagesReducer3(state = initalState, action) {
  // console.log('testcxbPages.reducer >>>==================', action.type);
  const { pageName } = action;
  if (_pages.hasOwnProperty(pageName)) {
    // if (action.hasOwnProperty()) {
    // }
    const page = _pages[pageName];
    let type = action.type;
    const index = type.indexOf('_');
    type = type.substr(0, index);
    if (page.hasOwnProperty(type)) {
      const pageOldState = state[pageName] || {};
      const apiOldState = pageOldState[type] || {};
      const apiState = page[type](apiOldState, action);
      const apiNewState = apiState || {};
      return { ...state, [pageName]: { ...pageOldState, [type]: apiNewState } };
    }
  }
  return state;
}

/**
 * 动态增加reducer
 * @param {string} name action的type名
 * @param {function} callback 此action.type对应的处理函数
 */
export function addPages(pageName, callback) {
  if (_pages.hasOwnProperty(pageName)) {
    console.error('已经有此pages的name了, 不能重复!', pageName);
  }
  _pages[pageName] = callback;
}

export function removePages(pageName, callback) {
  console.log('testcxbPages.reducer >>>removePages==================');
  if (_pages.hasOwnProperty(pageName)) {
    delete _pages[pageName];
  } else {
    console.error('无此pages的name了', pageName);
  }
}
