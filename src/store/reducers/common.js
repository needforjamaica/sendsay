import {COMMON_SET_TITLE} from '../actions/actionTypes';

const initialState = {
    pageTitle: `React by Igor Tomkovich`,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case COMMON_SET_TITLE:
            return {
                ...state,
                pageTitle: action.data,
            };
        default:
            return state;
    }
};
