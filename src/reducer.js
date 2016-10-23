import { combineReducers } from 'redux'
import testModule from './modules/test/reducers'
import PageBModule from './modules/PageB/reducers'
import dynamic from './modules/dynamic.reducer.js'
import * as pagesReducer from 'GPagesReducer';
import * as PubSymbol from 'commPath/symbol.js';

const tt = dynamic('aa', 'bb')

// 这样层级会多一层
const rootReducer2 = combineReducers({
    testModule,
    PageBModule
})
const rootReducer = {
    testModule,
    PageBModule,
    tt,
    [PubSymbol.PAGES]: pagesReducer.pagesReducer,
};

export default rootReducer
