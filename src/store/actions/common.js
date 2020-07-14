import {COMMON_SET_TITLE, COMMON_SET_FULLSCREEN} from './actionTypes';

export const toggleFullScreen = () => {
    return (dispatch, getState) => {
        const fullScreen = getState().common.fullScreen;
        if (fullScreen) {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
        } else {
            if (document.documentElement.requestFullscreen) {
                document.documentElement.requestFullscreen();
            } else if (document.documentElement.mozRequestFullScreen) {
                document.documentElement.mozRequestFullScreen();
            } else if (document.documentElement.webkitRequestFullscreen) {
                document.documentElement.webkitRequestFullscreen();
            } else if (document.documentElement.msRequestFullscreen) {
                document.documentElement.msRequestFullscreen();
            }
        }
        dispatch({type: COMMON_SET_FULLSCREEN, payload: !fullScreen});
    };
};

export const setPageTitle = (payload) => {
    return {
        type: COMMON_SET_TITLE,
        payload,
    };
};
