import {AUTH_SET_DATA} from '../actions/actionTypes';
import Cookies from 'js-cookie';

const initialState = {
    userToken: null,
    login: null,
    sublogin: null,
    error: null,
    loading: false,
    signingIn: false,
};

if (Cookies.get(`userToken`)) {
    initialState.userToken = Cookies.get(`userToken`);
    initialState.login = Cookies.get(`login`);
    initialState.sublogin = Cookies.get(`sublogin`);
}

export default (state = initialState, action) => {
    switch (action.type) {
        case AUTH_SET_DATA:
            return {...state, ...action.payload};
        default:
            return state;
    }
};
