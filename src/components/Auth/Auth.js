import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {useForm} from 'react-hook-form';
import {useDispatch} from 'react-redux';
import {setPageTitle} from '../../store/actions/common';
import {signIn} from '../../store/actions/auth';
import './Auth.scss';

export default (props) => {
    const dispatch = useDispatch();
    const authState = useSelector((state) => state.auth);
    // eslint-disable-next-line
    const [loginValue, setLoginValue] = useState(``);

    const {register, handleSubmit, errors, formState, getValues} = useForm();

    const loginValidator = () => {
        if (formState.isSubmitting || formState.isSubmitted) {
            let regexp = /^\w+$/i;
            if (getValues().login.match(`@`)) {
                regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            }
            if (!regexp.test(getValues().login)) {
                errors.login = `Login invalid`;
            }
        }
        setLoginValue(getValues().login);
    };

    useEffect(() => {
        dispatch(setPageTitle(`Войдите!`));
    }, [dispatch]);

    const submitHandler = (data) => {
        if (Object.keys(errors).length === 0) {
            dispatch(signIn(data, props.history));
        }
    };

    return authState.signingIn ? null : (
        <div className={`login-form-wrapper`}>
            <div className={`login-form-container`}>
                <div className={`login-form-container__logo-container`}>
                    <div className={`logo`}></div>
                </div>
                <div className={`login-form-container__form-container login-form`}>
                    <h3 className={`login-form__title`}>API-консолька</h3>
                    <form onSubmit={handleSubmit(submitHandler)}>
                        {authState.error ? (
                            <div className={`sign-in-error-block`}>
                                <div className={`sign-in-error-block__icon icon-meh`}></div>
                                <div>
                                    <div className={`sign-in-error-block__title`}>Вход не вышел</div>
                                    <div className={`sign-in-error-block__text`}>{authState.error}</div>
                                </div>
                            </div>
                        ) : null}

                        <label htmlFor={`login`} className={`label ${errors.login ? `label_error` : ``}`}>
                            Логин
                        </label>
                        <input type={`text`} className={`form-control ${errors.login ? `form-control_error` : ``}`} name={`login`} ref={register({required: `Пожалуйста укажите логин`})} onChange={() => loginValidator()} />
                        <label htmlFor={`sublogin`} className={`label label_optional`}>
                            Сублогин
                        </label>
                        <input type={`text`} className={`form-control`} name={`sublogin`} autoComplete={`off`} ref={register} />
                        <label htmlFor={`password`} className={`label ${errors.password ? `label_error` : ``}`}>
                            Пароль
                        </label>
                        <input
                            type={`password`}
                            className={`form-control ${errors.password ? `form-control_error` : ``}`}
                            name={`password`}
                            ref={register({
                                required: `Пожалуйста, укажите пароль`,
                                pattern: {
                                    value: /^[a-z0-9\s]+$/i,
                                    message: `Только латиница и пробел`,
                                },
                            })}
                        />
                        <button type={`submit`} className={`login-form__btn btn btn_primary ${Object.keys(errors).length ? `btn_disabled` : ``}`}>
                            <div className={`btn__content`}>
                                {authState.loading ? (
                                    <div className={`btn-loader`}>
                                        <div className={`btn-loader__element`}></div>
                                        <div className={`btn-loader__element`}></div>
                                        <div className={`btn-loader__element`}></div>
                                        <div className={`btn-loader__element`}></div>
                                        <div className={`btn-loader__element`}></div>
                                        <div className={`btn-loader__element`}></div>
                                        <div className={`btn-loader__element`}></div>
                                        <div className={`btn-loader__element`}></div>
                                    </div>
                                ) : (
                                    <span>Войти</span>
                                )}
                            </div>
                        </button>
                    </form>
                </div>
                <div className={`login-form-container__github-link-container`}>
                    <a className={`github-link`} href={`https://github.com/needforjamaica/sendsay.git`} target={`_blank`} rel={`noopener noreferrer`}>
                        github.com/needforjamaica/sendsay.git
                    </a>
                </div>
            </div>
        </div>
    );
};
