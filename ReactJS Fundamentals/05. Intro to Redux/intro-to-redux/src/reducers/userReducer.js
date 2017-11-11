export default (store = [], action) => {
    switch (action.type) {
        case 'ADD_INPUT':
            return [...store, { index: store.length, value: action.text.input }]
        case 'REMOVE_LAST':
            return [...store.slice(0, store.length - 1)]
        case 'EDIT_INPUT':
            return [...store.slice(0, action.text.index),
                Object.assign({}, store[action.text.index], {
                    value: action.text.input
                }),
                ...store.slice(action.text.index + 1) 
            ]
        default:
            return store;
    }
}