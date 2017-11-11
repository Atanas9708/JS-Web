const ADD_COUNTER = 'ADD_COUNTER';
const REMOVE_LAST = 'REMOVE_LAST';
const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';
const CLEAR = 'CLEAR';

let actions = {
    addCounter: () => {
        return { type: ADD_COUNTER }
    },
    removeCounter: () => {
        return { type: REMOVE_LAST }
    },
    increment: (payload) => {
        return { type: INCREMENT, payload }
    },
    decrement: (payload) => {
        return { type: DECREMENT, payload }
    },
    clear: (payload) => {
        return { type: CLEAR, payload }
    }
};

export default actions;