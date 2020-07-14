import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {executeRequest, formatJSON, setRequestError, setRequest, setResponse} from '../../../store/actions/console';
import {useForm} from 'react-hook-form';
import {store} from 'react-notifications-component';
import Split from 'react-split';
import './Console.scss';

export default function () {
    const dispatch = useDispatch();
    const consoleState = useSelector((state) => state.console);

    let requestCol = 50;
    let responseCol = 50;
    if (localStorage.getItem(`requestCol`) && localStorage.getItem(`responseCol`)) {
        requestCol = parseFloat(localStorage.getItem(`requestCol`));
        responseCol = 100 - requestCol;
    }

    const {register, handleSubmit, errors, setValue, getValues} = useForm({
        defaultValues: {
            request: ``,
            response: ``,
        },
    });

    const saveSplitParams = (dimension) => {
        localStorage.setItem(`requestCol`, dimension[0]);
        localStorage.setItem(`responseCol`, dimension[1]);
    };

    const formatHandler = () => {
        if (getValues().request) {
            const formattedJSON = formatJSON(getValues().request);
            if (formattedJSON.isValid) {
                dispatch(setRequestError(false));
                setValue(`request`, formattedJSON.json);
                return true;
            } else {
                dispatch(setRequestError(true));
                store.addNotification({
                    title: `JSON не валиден`,
                    message: `Пожалуйста, сделайте что-нибудь`,
                    type: `danger`,
                    container: `center`,
                    animationIn: [`animate__animated`, `animate__fadeIn`],
                    animationOut: [`animate__animated`, `animate__fadeOut`],
                    dismiss: {
                        duration: 3000,
                        onScreen: true,
                    },
                });
            }
        }
        return false;
    };

    useEffect(() => {
        if (consoleState.request) {
            setValue(`request`, consoleState.request);
            dispatch(setRequest(``));
        }
        if (consoleState.response) {
            setValue(`response`, consoleState.response);
            dispatch(setResponse(``));
        }
    }, [consoleState, dispatch, setValue]);

    const submitHandler = (data) => {
        if (data.request) {
            const formatResult = formatHandler(data.request);
            if (formatResult) {
                dispatch(executeRequest(data.request));
            }
        }
    };

    return (
        <form onSubmit={handleSubmit(submitHandler)}>
            <div className={`console-container`}>
                <Split
                    className={`split`}
                    sizes={[requestCol, responseCol]}
                    minSize={200}
                    onDragEnd={(dimension, gutterSize, index) => {
                        saveSplitParams(dimension, gutterSize, index);
                    }}
                >
                    <div>
                        <label htmlFor={`request`} className={`console-container__label label ${errors.request || consoleState.requestError ? `label_error` : ``}`}>
                            Запрос:
                        </label>
                        <textarea
                            name={`request`}
                            className={`console-container__textarea form-control ${errors.request || consoleState.requestError ? `form-control_error` : ``}`}
                            ref={register({required: true})}
                            onChange={() => {
                                dispatch(setRequestError(false));
                            }}
                        ></textarea>
                    </div>
                    <div>
                        <label htmlFor={`response`} className={`console-container__label label ${consoleState.responseError ? `label_error` : ``}`}>
                            Ответ:
                        </label>
                        <textarea disabled={`disabled`} name={`response`} className={`console-container__textarea form-control ${consoleState.responseError ? `form-control_error` : ``}`} ref={register}></textarea>
                    </div>
                </Split>
            </div>
            <div className={`console-actions`}>
                <button type={`submit`} className={`console-actions__btn btn btn_primary ${Object.keys(errors).length ? `btn_disabled` : null}`}>
                    <div className={`btn__content`}>
                        {consoleState.loading ? (
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
                            <span>Отправить</span>
                        )}
                    </div>
                </button>
                <a className={`github-link`} href={`https://github.com/needforjamaica/sendsay.git`} target={`_blank`} rel={`noopener noreferrer`}>
                    github.com/needforjamaica/sendsay.git
                </a>
                <button type={`button`} className={`console-actions__format-link format-link black-blue-link button-link`} onClick={() => formatHandler()}>
                    <span className={`black-blue-link__icon format-link__icon icon-format`}></span>Форматировать
                </button>
            </div>
        </form>
    );
}
