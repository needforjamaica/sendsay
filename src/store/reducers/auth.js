import {AUTH_SET_TOKEN} from '../actions/actionTypes';
import Cookies from 'js-cookie';

const initialState = {
    token: null,
    email: null,
};

if (Cookies.get(`userToken`)) {
    initialState.token = Cookies.get(`userToken`);
    initialState.email = Cookies.get(`email`);
}

export default (state = initialState, action) => {
    switch (action.type) {
        case AUTH_SET_TOKEN:
            return {...state, ...action.data};
        default:
            return state;
    }
};
