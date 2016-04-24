import Immutable from 'immutable'
import { ADD_ITEM, DELETE_ITEM, DELETE_ALL } from '../counter/Counter.constant.js'

//这里new加得不知道对否, eslint过不了加的
const initialItems = new Immutable.List([1, 2, 3])

export default function items(state = initialItems, action) {
    switch (action.type) {
        case ADD_ITEM:
            return state.push(state.size !== 0 ? state.get(-1) + 1 : 1)
        case DELETE_ITEM:
            return state.delete(state.indexOf(action.item))
        case DELETE_ALL:
            return state.clear()
        default:
            return state
    }
}
