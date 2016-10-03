import { combineReducers } from 'redux'
import items from './items/items.reducer.js'
import filter from './filter/filter.reducer.js'
import counterTTT from './counter/Counter.reducer.js'
const counter = counterTTT('page', 'module')

const rootReducer = combineReducers({
    counter,
    items,
    filter
})

export default rootReducer
