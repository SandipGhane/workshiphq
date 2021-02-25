
import * as actionTypes from './actionTypes';
export const addUser = (newUser) => {
    console.log('in reduser', newUser);
    return {
        type: actionTypes.ADD_USER,
        payload: newUser
    }
}
export const setUser = (userdata) => {
    console.log('user data in ', userdata)
    return {
        type: actionTypes.LOGIN_USER_SET,
        payload: userdata
    }
}

export const logout = () => {
    console.log('logout');
    return {
        type: actionTypes.LOGOUT_USER,
    }
}
