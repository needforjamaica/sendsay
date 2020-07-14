import {CONSOLE_SET_HISTORY, CONSOLE_SET_REQUEST, CONSOLE_SET_RESPONSE, CONSOLE_SET_RESPONSE_ERROR, CONSOLE_SET_LOADING, CONSOLE_SET_REQUEST_ERROR} from './actionTypes';
import copy from 'copy-to-clipboard';
import Sendsay from 'sendsay-api';
import {signOut} from './auth';

const findRequestInHistory = (request, currentHistory) => {
    let sameItem = false;
    currentHistory.forEach((item) => {
        if (item.request === request) {
            sameItem = item;
            return item;
        }
    });
    return sameItem;
};

const addToHistory = (data) => {
    return (dispatch, getState) => {
        const consoleState = getState().console;
        const sameRequest = findRequestInHistory(data.request, consoleState.history);
        let newHistory = [...consoleState.history];
        if (sameRequest) {
            newHistory = newHistory.filter((item) => {
                return sameRequest.requestId !== item.requestId;
            });
        }
        newHistory.unshift(data);
        newHistory = newHistory.slice(0, 20);
        saveHistory(newHistory);
        dispatch({
            type: CONSOLE_SET_HISTORY,
            payload: newHistory,
        });
    };
};

const saveHistory = (history) => {
    localStorage.setItem('history', JSON.stringify(history));
};

export const setRequest = (payload) => {
    return (dispatch) => {
        dispatch({
            type: CONSOLE_SET_REQUEST,
            payload,
        });
    };
};

export const setResponse = (payload) => {
    return (dispatch) => {
        dispatch({
            type: CONSOLE_SET_RESPONSE,
            payload,
        });
    };
};

export const setRequestError = (payload) => {
    return (dispatch) => {
        dispatch({
            type: CONSOLE_SET_REQUEST_ERROR,
            payload,
        });
    };
};

export const formatJSON = (json) => {
    const result = {
        isValid: false,
        json: json,
    };
    try {
        const requestJSON = JSON.parse(json);
        result.isValid = true;
        result.json = JSON.stringify(requestJSON, null, 2);
    } catch (e) {}
    return result;
};

export const clearHistory = () => {
    return (dispatch) => {
        dispatch({
            type: CONSOLE_SET_HISTORY,
            payload: [],
        });
        saveHistory([]);
    };
};

export const executeRequest = (request) => {
    return async (dispatch) => {
        dispatch({type: CONSOLE_SET_LOADING, payload: true});
        const sendsay = new Sendsay();
        sendsay.setSessionFromCookie('userToken');
        const parsedRequest = JSON.parse(request);
        const formattedRequest = formatJSON(request);
        let data = {
            requestType: parsedRequest.action,
            request: formattedRequest.json,
        };
        try {
            const res = await sendsay.request(parsedRequest);
            data.requestId = res['request.id'];
            data.success = true;
            if (res.errors) {
                data.success = false;
            }
            dispatch({type: CONSOLE_SET_RESPONSE, payload: formatJSON(JSON.stringify(res)).json});
        } catch (e) {
            if (e.explain === `auth_parameters_not_exists`) {
                dispatch(signOut());
                return false;
            } else {
                data.requestId = new Date().getTime();
                data.success = false;
                dispatch({type: CONSOLE_SET_RESPONSE, payload: formatJSON(JSON.stringify(e)).json});
            }
        }
        dispatch({type: CONSOLE_SET_REQUEST, payload: data.request});
        dispatch({type: CONSOLE_SET_RESPONSE_ERROR, payload: !data.success});
        dispatch({type: CONSOLE_SET_REQUEST_ERROR, payload: false});
        dispatch({type: CONSOLE_SET_LOADING, payload: false});
        dispatch(addToHistory(data));
    };
};

export const fillRequestFromHistory = (requestId) => {
    return (dispatch, getState) => {
        getState().console.history.forEach((item) => {
            if (item.requestId === requestId) {
                dispatch(setRequest(item.request));
            }
        });
    };
};

export const executeItem = (requestId) => {
    return (dispatch, getState) => {
        getState().console.history.forEach((item) => {
            if (item.requestId === requestId) {
                dispatch(executeRequest(item.request));
            }
        });
    };
};

export const copyItem = (requestId) => {
    return (dispatch, getState) => {
        const consoleState = getState().console;
        consoleState.history.forEach((item) => {
            if (item.requestId === requestId) {
                copy(item.request);
            }
        });
    };
};

export const deleteItem = (requestId) => {
    return (dispatch, getState) => {
        const consoleState = getState().console;
        const newHistory = consoleState.history.filter((item) => {
            return item.requestId !== requestId;
        });
        dispatch({
            type: CONSOLE_SET_HISTORY,
            payload: newHistory,
        });
        saveHistory(newHistory);
    };
};
