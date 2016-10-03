// import constantTTT from './counter.constant.js'

export default function generateAction(pageName, moduleName) {
  // const constant = constantTTT('page', 'module')
  // const prefix = `${pageName}.${moduleName}`

  // console.log(constant)

  //reducer其实也是个方法而已,参数是state和action,返回值是新的state
  function counter(state = 0, action) {
    return Object.assign({}, state, { [action.type]: action.type })
  }
  return counter
}
