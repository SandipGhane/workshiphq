import * as actionTypes from './actionTypes';

const initialAuthState = {
    loginUser: {},
    isLoggin: false,
}

const authReducer = (state = initialAuthState, action) => {
    switch (action.type) {
        case actionTypes.LOGIN_USER_SET:
            return {
                ...state,
                loginUser: action.payload,
                isLoggin: true
            };
        // break;
        case actionTypes.LOGOUT_USER:
            return {
                ...state,
                loginUser: null,
                isLoggin: false
            };
        // break;
        default: return state;
    }
}

export default authReducer;