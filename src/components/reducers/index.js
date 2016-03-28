import { combineReducers } from 'redux'
import items from './items'
import filter from './filter'
import counter from './counter'

const rootReducer = combineReducers({
    counter,
    items,
    filter
})

export default rootReducer
