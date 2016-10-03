import keyMirror from 'fbjs/lib/keyMirror';


function createConstants(pageName, moduleName, constants) {
    // return constants.reduce((acc, constant) => {
    //     /* eslint-disable */
    //     acc[constant] = `${pageName}.${moduleName}.${constant}`;
    //     /* eslint-enable */
    //     return acc;
    // }, {});
    const obj = {};
    for (const key in constants) {
        if (constants.hasOwnProperty(key)) {
            obj[key] = `${pageName}.${moduleName}.${key}`
        }
    }
    return obj
}

export default function generateAction(pageName, moduleName) {
    const ACTION_PREFIX = `${pageName}.${moduleName}`;
    const LOAD = `${ACTION_PREFIX}.LOAD`;
    console.log('counter.constant generateAction');
    return createConstants(pageName, moduleName, {
        INCREMENT_COUNTER: null,
        DECREMENT_COUNTER: null,
        ADD_ITEM: null,
        DELETE_ITEM: null,
        DELETE_ALL: null,
        FILTER_ITEM: null
    });
    // return keyMirror({
    //     INCREMENT_COUNTER: null,
    //     DECREMENT_COUNTER: null,
    //     ADD_ITEM: null,
    //     DELETE_ITEM: null,
    //     DELETE_ALL: null,
    //     FILTER_ITEM: null
    // });
}

// export default keyMirror({
//     INCREMENT_COUNTER: null,
//     DECREMENT_COUNTER: null,
//     ADD_ITEM: null,
//     DELETE_ITEM: null,
//     DELETE_ALL: null,
//     FILTER_ITEM: null
// });

// 等于
// export const ADD_ITEM = 'ADD_ITEM';
// export const DELETE_ITEM = 'DELETE_ITEM';
// export const DELETE_ALL = 'DELETE_ALL';
// export const FILTER_ITEM = 'FILTER_ITEM';
