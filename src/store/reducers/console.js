import {CONSOLE_SET_HISTORY, CONSOLE_SET_REQUEST, CONSOLE_SET_RESPONSE, CONSOLE_SET_RESPONSE_ERROR, CONSOLE_SET_LOADING, CONSOLE_SET_REQUEST_ERROR} from '../actions/actionTypes';

const initialState = {
    request: ``,
    response: ``,
    responseError: false,
    loading: false,
};

initialState.history = JSON.parse(localStorage.getItem('history') || '[]');

export default (state = initialState, action) => {
    switch (action.type) {
        case CONSOLE_SET_HISTORY:
            return {
                ...state,
                history: action.payload,
            };
        case CONSOLE_SET_REQUEST:
            return {
                ...state,
                request: action.payload,
            };
        case CONSOLE_SET_RESPONSE:
            return {
                ...state,
                response: action.payload,
            };
        case CONSOLE_SET_RESPONSE_ERROR:
            return {
                ...state,
                responseError: action.payload,
            };
        case CONSOLE_SET_REQUEST_ERROR:
            return {
                ...state,
                requestError: action.payload,
            };
        case CONSOLE_SET_LOADING:
            return {
                ...state,
                loading: action.payload,
            };
        default:
            return state;
    }
};
