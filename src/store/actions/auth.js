import {AUTH_SET_DATA} from './actionTypes';
import {store} from 'react-notifications-component';
import Cookies from 'js-cookie';
import Sendsay from 'sendsay-api';

export function setAuthToken(token) {
    return (dispatch) => {
        dispatch({type: AUTH_SET_DATA, payload: token});
    };
}

export function signOut() {
    return (dispatch) => {
        dispatch(setAuthToken({userToken: null, login: null, sublogin: null, error: null, loading: false}));
        Cookies.remove(`userToken`);
        Cookies.remove(`login`);
        Cookies.remove(`sublogin`);
    };
}

export const signIn = (data, history) => {
    return async (dispatch) => {
        dispatch(setAuthToken({loading: true}));
        const sendsay = new Sendsay();
        const authData = {
            login: data.login,
            password: data.password,
        };
        if (data.sublogin) {
            authData.sublogin = data.sublogin;
        }
        sendsay
            .login(authData)
            .then(() => {
                const inAnHour = new Date(new Date().getTime() + 60 * 60 * 1000);
                Cookies.set(`userToken`, sendsay.session, {expires: inAnHour});
                Cookies.set(`login`, data.login, {expires: inAnHour});
                Cookies.set(`sublogin`, data.sublogin, {expires: inAnHour});
                dispatch(setAuthToken({signingIn: true}));
                store.addNotification({
                    title: `Успешно!`,
                    message: `Перенаправляем...`,
                    type: `success`,
                    insert: `top`,
                    container: `center`,
                    animationIn: [`animate__animated`, `animate__bounceIn`],
                    animationOut: [`animate__animated`, `animate__bounceOut`],
                    dismiss: {
                        duration: 1500,
                        onScreen: true,
                    },
                    onRemoval: () => {
                        dispatch(setAuthToken({userToken: sendsay.session, login: data.login, sublogin: data.sublogin, error: null, loading: false, signingIn: false}));
                        history.push(`/`);
                    },
                });
            })
            .catch((error) => {
                const publicResponse = {id: error.id, explain: error.explain};
                dispatch(
                    setAuthToken({
                        error: JSON.stringify(publicResponse).replace(`"id"`, `id`).replace(`"explain"`, `explain`).replace(`,`, `, `),
                        loading: false,
                    })
                );
            });
    };
};
