import {COMMON_SET_TITLE} from './actionTypes';

export const setPageTitle = (data) => {
    return {
        type: COMMON_SET_TITLE,
        data,
    };
};