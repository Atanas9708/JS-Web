export default (store = [], action) => {
    switch (action.type) {
        case 'INCREMENT':
            return [...store.slice(0, action.payload.index),
            Object.assign({}, store[action.payload.index], {
                value: store[action.payload.index].value + action.payload.step
            }),
            ...store.slice(action.payload.index + 1)
            ]
        case 'DECREMENT':
            return [...store.slice(0, action.payload.index),
            Object.assign({}, store[action.payload.index], {
                value: store[action.payload.index].value - action.payload.step
            }),
            ...store.slice(action.payload.index + 1)
            ]
        case 'CLEAR':
            return [...store.slice(0, action.payload.index),
            Object.assign({}, store[action.payload.index], {
                value: 0
            }),
            ...store.slice(action.payload.index + 1)
            ]
        case 'ADD_COUNTER':
            return [...store, { index: store.length, value: 0 }]
        case 'REMOVE_LAST':
            return [...store.slice(0, store.length - 1)]
        default:
            return store;
    }
}