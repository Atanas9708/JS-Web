const ADD_INPUT = 'ADD_INPUT';
const EDIT_INPUT = 'EDIT_INPUT';
const REMOVE_LAST = 'REMOVE_LAST';

let actions = {
    addInput: (text) => {
        return { type: ADD_INPUT, text }
    },
    deleteInput: () => {
        return { type: REMOVE_LAST }
    },
    editInput: (text) => {
        return { type: EDIT_INPUT, text }
    }
}

export default actions;