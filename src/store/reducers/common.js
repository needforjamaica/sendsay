import {COMMON_SET_TITLE, COMMON_SET_FULLSCREEN} from '../actions/actionTypes';

const initialState = {
    pageTitle: `React by Igor Tomkovich`,
    fullScreen: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case COMMON_SET_TITLE:
            return {
                ...state,
                pageTitle: action.payload,
            };
        case COMMON_SET_FULLSCREEN:
            return {
                ...state,
                fullScreen: action.payload,
            };
        default:
            return state;
    }
};
