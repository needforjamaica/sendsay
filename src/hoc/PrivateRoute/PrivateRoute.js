import React, {useEffect} from 'react';
import {Route, withRouter} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {store} from 'react-notifications-component';
import {setPageTitle} from '../../store/actions/common';

const PrivateRoute = ({component: Component, ...rest}) => {
    const dispatch = useDispatch();
    useEffect(() => {
        if (!rest.condition) {
            dispatch(setPageTitle(`Закрытая часть приложения`));
            if (rest.redirect === `/auth`) {
                store.addNotification({
                    title: `Необходима авторизация`,
                    message: `Пожалуйста создайте аккаунт или войдите в существующий`,
                    type: `warning`,
                    container: `center`,
                    animationIn: [`animate__animated`, `animate__fadeIn`],
                    animationOut: [`animate__animated`, `animate__fadeOut`],
                    dismiss: {
                        duration: 4000,
                        onScreen: true,
                    },
                    onRemoval: () => {
                        rest.history.push(rest.redirect);
                    },
                });
            }
        }
        // eslint-disable-next-line
    }, [rest.condition]);
    return (
        <Route
            {...rest}
            render={(props) =>
                rest.condition ? (
                    <Component {...props} />
                ) : null
            }
        />
    );
};
export default withRouter(PrivateRoute);
