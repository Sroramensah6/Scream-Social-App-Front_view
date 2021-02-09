import {
    DARK_MODE
} from '../types';

export default (state = {}, action) => {
    switch (action.type) {
        case DARK_MODE:
            return {
                ...state,
                darkMode: action.payload
            }
        default:
            return state;
    }
};