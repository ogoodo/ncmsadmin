import { FILTER_ITEM } from '../counter/Counter.constant.js'

const initialFilterItem = ''

export default function filter(state = initialFilterItem, action) {
    switch (action.type) {
        case FILTER_ITEM:
            return action.filterItem
        default:
            return state
    }
}
