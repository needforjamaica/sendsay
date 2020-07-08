import React, {useState, useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {ErrorMessage} from '@hookform/error-message';
import {useDispatch} from 'react-redux';
import {setPageTitle} from '../../store/actions/common';
import {signUp, signIn} from '../../store/actions/auth';
import './Auth.scss';
export default (props) => {
    const [state, setState] = useState({
        action: `signIn`,
    });

    const {register, handleSubmit, errors} = useForm({
        defaultValues: {
            login: ``,
            sublogin: ``,
            password: ``,
        },
    });

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setPageTitle(`Auth`));
    }, [dispatch]);

    const setAction = (action) => {
        setState({...state, action: action});
    };

    const submitHandler = (data) => {
        if (state.action === `signIn`) {
            dispatch(signIn(data, props.history));
        } else if (state.action === `signUp`) {
            dispatch(signUp(data, props.history));
        }
    };

    return (
        <div className={`login-form-wrapper`}>
            <div className={`login-form-container`}>
                <div className={`logo-container`}>
                    <div className={`logo`}></div>
                </div>
                <div className={`form-container`}>
                    <h3>API-консолька</h3>
                    <form onSubmit={handleSubmit(submitHandler)}>
                        <div className={`form-group`}>
                            <label htmlFor={`login`} className={errors.login ? `error` : null}>
                                Логин
                            </label>
                            <input
                                type={`text`}
                                className={`form-control ${errors.login ? `error` : null}`}
                                id={`login`}
                                name={`login`}
                                autoComplete={`off`}
                                ref={register({
                                    required: `Пожалуйста укажите логин`,
                                    pattern: {
                                        value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                        message: `Email is invalid`,
                                    },
                                })}
                            />
                            <ErrorMessage errors={errors} name={`login`} as={`span`} className={`error`} />
                        </div>
                        <div className={`form-group`}>
                            <label htmlFor={`sublogin`} className={`optional ${errors.sublogin ? `error` : null}`}>
                                Сублогин
                            </label>
                            <input type={`text`} className={`form-control ${errors.sublogin ? `error` : null}`} id={`sublogin`} name={`sublogin`} autoComplete={`off`} />
                            <ErrorMessage errors={errors} name={`sublogin`} as={`span`} className={`error`} />
                        </div>
                        <div className={`form-group`}>
                            <label htmlFor={`password`} className={errors.password ? `error` : null}>
                                Пароль
                            </label>
                            <input type={`password`} className={`form-control ${errors.password ? `error` : null}`} id={`password`} name={`password`} autoComplete={`off`} ref={register({required: `Пожалуйста, укажите пароль`})} />
                            <ErrorMessage errors={errors} name={`password`} as={`span`} className={`error`} />
                        </div>
                        <a href='#' className={`btn btn-primary`}>
                            <span>Войти</span>
                        </a>
                        {/*<input*/}
                        {/*    type={`submit`}*/}
                        {/*    className={`btn btn-primary`}*/}
                        {/*    value={`Войти`}*/}
                        {/*    onClick={() => {*/}
                        {/*        setAction(`signIn`);*/}
                        {/*    }}*/}
                        {/*/>*/}
                    </form>
                </div>
                <div className={`link-container`}>
                    <a className={`github-link`} href={`https://github.com/needforjamaica/sendsay.git`} target={`_blank`} rel={`noopener noreferrer`}>
                        github.com/needforjamaica/sendsay.git
                    </a>
                </div>
            </div>
        </div>
    );
};
