import { combineReducers } from 'redux'
import items from './items/items.reducer.js'
import filter from './filter/filter.reducer.js'
import counter from './counter/Counter.reducer.js'

const rootReducer = combineReducers({
    counter,
    items,
    filter
})

export default rootReducer
