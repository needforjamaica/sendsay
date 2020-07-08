import {AUTH_SET_TOKEN} from './actionTypes';
import {store} from 'react-notifications-component';
import Cookies from 'js-cookie';
import axios from 'axios';

export function setAuthToken(token) {
    return (dispatch) => {
        dispatch({type: AUTH_SET_TOKEN, data: token});
    };
}

export function signOut() {
    return (dispatch) => {
        dispatch(setAuthToken({token: null, email: null}));
        Cookies.remove(`userToken`);
        Cookies.remove(`email`);
    };
}

export const signUp = (data, history) => {
    return async (dispatch, getState) => {
        const authData = {
            email: data.email,
            password: data.password,
        };
        try {
            await axios.post(process.env.REACT_APP_SIGN_UP_URL, authData);
            dispatch(signIn(authData, history));
        } catch (e) {
            store.addNotification({
                title: `Что-то пошло не так!`,
                message: e.toString(),
                type: `danger`,
                insert: `top`,
                container: `center`,
                animationIn: [`animate__animated`, `animate__bounceIn`],
                animationOut: [`animate__animated`, `animate__bounceOut`],
                dismiss: {
                    duration: 3000,
                    onScreen: true,
                },
            });
        }
    };
};

export const signIn = (data, history) => {
    return async (dispatch, getState) => {
        const authData = {
            email: data.email,
            password: data.password,
            returnSecureToken: true,
        };
        const response = await axios.post(process.env.REACT_APP_SIGN_IN_URL, authData);
        const inAnHour = new Date(new Date().getTime() + 60 * 60 * 1000);
        Cookies.set(`userToken`, response.data.idToken, {expires: inAnHour});
        Cookies.set(`email`, response.data.email, {expires: inAnHour});
        store.addNotification({
            title: `Успешно!`,
            message: `Перенаправляем...`,
            type: `success`,
            insert: `top`,
            container: `center`,
            animationIn: [`animate__animated`, `animate__bounceIn`],
            animationOut: [`animate__animated`, `animate__bounceOut`],
            dismiss: {
                duration: 2000,
                onScreen: true, 
            },
            onRemoval: () => {
                dispatch(setAuthToken({token: response.data.idToken, email: response.data.email}));
                history.push(`/`);
            },
        });
    };
};
