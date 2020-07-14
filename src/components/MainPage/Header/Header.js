import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {toggleFullScreen} from '../../../store/actions/common';
import {signOut} from '../../../store/actions/auth';
import './Header.scss';

export default function () {
    const dispatch = useDispatch();
    const authState = useSelector((state) => state.auth);
    const commonState = useSelector((state) => state.common);

    const toggleFullScreenHandler = () => {
        dispatch(toggleFullScreen());
    };

    const signOutHandler = () => {
        dispatch(signOut());
    };

    return (
        <header className={`header`}>
            <div className={`header__side-container`}>
                <div className='header__logo logo'></div>
                <h3 className={`header__title`}>API-консолька</h3>
            </div>
            <div className={`header__side-container`}>
                <div className='header__user-info user-info'>
                    {authState.login}
                    {authState.sublogin ? (
                        <span>
                            <span className={`user-info__delimiter`}>:</span>
                            {authState.sublogin}
                        </span>
                    ) : null}
                </div>
                <button className={`header__sign-out sign-out black-blue-link button-link`} onClick={() => signOutHandler()}>
                    Выйти<span className={`black-blue-link__icon sign-out__icon icon-sign-out`}></span>
                </button>
                <button className={`header__fullscreen black-blue-link button-link`} onClick={() => toggleFullScreenHandler()}>
                    <span className={`black-blue-link__icon icon-fullscreen ${commonState.fullScreen ? `icon-fullscreen-off` : `icon-fullscreen-on`}`}></span>
                </button>
            </div>
        </header>
    );
}
