/**
 * @author chenxiaobo
 */
import * as PubSymbol from 'commPath/symbol.js'
const initalState = false
// 动态存储所有页面所有接口的reducer
const _pagesReducer = {}

/**
 * 检查fetch接口状态是不是正确的
 */
function checkCallbackStateName(action, actionState) {
  if (['request', 'success', 'failure'].indexOf(actionState) < 0) {
    if (action[PubSymbol.FETCH] === true) {
      console.error('无此分支, 请确认源码是否符合规范', actionState)
    }
  }
}

/**
 * @param {object} action
 * @param {Symbol} action[PubSymbol.FETCH] 要进入到此函数处理, 必须带此字段
 */
export function pagesReducer(state = initalState, action) {
  // console.log('pages.reducer.js >>>=========', action.type);
  const { pageName } = action
  if (!action.hasOwnProperty(PubSymbol.FETCH)) {
    if (__DEV__) {
      if (_pagesReducer.hasOwnProperty(pageName)) {
        console.error(`页${pageName}必须包含PubSymbol.FETCH才能正确处理`)
      }
    }
    return state
  }
  if (_pagesReducer.hasOwnProperty(pageName)) {
    // 清除页面在redux里的资源
    if (action.hasOwnProperty(PubSymbol.REMOVE_PAGE)) {
      const newState = { ...state, [pageName]: null }
      delete newState[pageName]
      return newState
    }
    const pageReducerObj = _pagesReducer[pageName]
    const apiName = action.type.substr(action.type.indexOf('>')+1)
    if (pageReducerObj.hasOwnProperty(apiName)) {
      const pageOldState = state[pageName] || {}
      const apiOldState = pageOldState[apiName] || {}
      const apiReducerObj = pageReducerObj[apiName]
      const actionState = action[PubSymbol.STATE]
      checkCallbackStateName(action, actionState)
      let apiNewState = {}
      if (apiReducerObj.hasOwnProperty(actionState)) {
        // 这里更加状态调用reducer里传过来的函数,如:'request', 'success', 'failure'
        apiNewState = apiReducerObj[actionState](apiOldState, action)
      } else if (action[PubSymbol.FETCH] === false) {
        // 没调接口的, 就是浏览器内部调用action, 其实就是fetch为false的部分
        apiNewState = apiReducerObj.inner(apiOldState, action)
      }
      return { ...state, [pageName]: { ...pageOldState, [apiName]: apiNewState } }
    } else {
      console.warn(`没有处理${pageName}页里${apiName}接口的reducer`)
    }
  }
  return state
}

/**
 * 动态增加reducer
 * @param {string} pageName 每个页面的唯一ID, 建议用路由
 * @param {object}   callbackObj 包含页面多个接口回调对象的对象
 * @param {object}   callbackObj.apiName 接口的回调对象
 * @param {function} callbackObj.apiName.request 接口发送请求后回调函数
 * @param {function} callbackObj.apiName.success 接口调用成功回调函数
 * @param {function} callbackObj.apiName.failure 接口调用失败回调函数
 */
export function addPages(pageName, callbackObj) {
  if (_pagesReducer.hasOwnProperty(pageName)) {
    console.error('已经有此pages的name了, 不能重复!', pageName)
  }
  _pagesReducer[pageName] = callbackObj
}

/**
 * 页面卸载时调用清理资源
 */
export function removePages(pageName) {
  console.log('testcxbPages.reducer >>>removePages==================')
  if (_pagesReducer.hasOwnProperty(pageName)) {
    delete _pagesReducer[pageName]
  } else {
    console.error('无此pages的name了', pageName)
  }
}
