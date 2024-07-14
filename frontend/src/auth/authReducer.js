import {
    TOKEN_VALIDATED,
    USER_FETCHED_AUTH,
} from "../common/utils/actionTypes";
import { userKey } from "../common/utils/systemConstants";
const INITIAL_STATE = {
    user: JSON.parse(localStorage.getItem(userKey)),
    validToken: false,
};

export default function authReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case TOKEN_VALIDATED:
            if (action.payload) {
                return { ...state, validToken: true };
            } else {
                localStorage.removeItem(userKey);
                return { ...state, validToken: false, user: null };
            }
        case USER_FETCHED_AUTH:
            localStorage.setItem(userKey, JSON.stringify(action.payload));
            if (!action.payload) window.location.reload();
            return { ...state, user: action.payload, validToken: true };
        default:
            return state;
    }
}
