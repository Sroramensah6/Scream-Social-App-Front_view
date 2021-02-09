import {
    DARK_MODE
} from "../types";

export const darkModeAction = (variable) => (dispatch) => {
    dispatch({
        type: DARK_MODE,
        payload: variable
    })
}