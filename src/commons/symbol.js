/**
 * 配置redux及项目用到的符号变量
 */
// fetch调用接口使用
export const FETCH = Symbol('FETCH ACTION');

// fetch调用接口使用
// 'request': 接口请求中, 'success': 接口调用成功, 'failure': 接口调用失败
export const STATE = Symbol('FETCH STATE');

// ???这里要考虑其它特别动画否???
// true:显示动画 false:不显示
export const SHOW_LOADER = Symbol('FETCH SHOW LOADER');

// 请求阶段是否触发到redux, 如果触发会引起两次render会降低性能
// true: 触发, false: 不触发(默认建议不触发)
export const REQ_NOTICE = Symbol('FETCH TRIGGER REQUERST NOTICE');

// 用来将每个页面的action,reducer,constant归类在一个目录
// 这里用符号combineReducers识别不了
export const PAGES = 'PAGES';
// export const PAGES = Symbol('REDUX PAGES');

// 页面跳转了之后, 清空redux里遗留的数据, 节约内存提高性能
export const REMOVE_PAGE = Symbol('REMOVE PAGE DATA FROM REDUX');
