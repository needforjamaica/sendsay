import HistoryItem from './HistoryItem/HistoryItem';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {TransitionGroup, CSSTransition} from 'react-transition-group';
import {clearHistory} from '../../../store/actions/console';
import './History.scss';

export default () => {
    const consoleState = useSelector((state) => state.console);
    const dispatch = useDispatch();
    const clearHistoryHandler = () => {
        dispatch(clearHistory());
    };
    useEffect(() => {
        if (document.getElementById(`js-horizontal-scroll`).addEventListener) {
            document.getElementById(`js-horizontal-scroll`).addEventListener(`mousewheel`, mouseWheelHandler, false);
            document.getElementById(`js-horizontal-scroll`).addEventListener(`DOMMouseScroll`, mouseWheelHandler, false);
        } else {
            document.getElementById(`js-horizontal-scroll`).attachEvent(`onmousewheel`, mouseWheelHandler);
        }
    }, []);

    const mouseWheelHandler = (e) => {
        e.preventDefault();
        if (e.detail) {
            const delta = Math.max(-1, Math.min(1, e.wheelDelta || -e.detail));
            document.getElementById(`js-horizontal-scroll`).scrollLeft -= delta * 20;
        }
        if (e.wheelDelta) {
            document.getElementById(`js-horizontal-scroll`).scrollLeft -= e.wheelDelta / 2;
        }
    };

    return (
        <div className={`history-container`} id={`js-horizontal-scroll`}>
            <div className={`history-container__history-pane`}>
                <TransitionGroup component={`ul`} className={`history`}>
                    {consoleState.history.map((request) => {
                        return (
                            <CSSTransition
                                timeout={{enter: 1000, exit: 400}}
                                key={request.requestId}
                                classNames={{
                                    enterActive: `animate__animated animate__zoomIn`,
                                    exitActive: `animate__animated animate__zoomOut`,
                                }}
                            >
                                <HistoryItem key={request.id} request={request} className={`history-item`}></HistoryItem>
                            </CSSTransition>
                        );
                    })}
                </TransitionGroup>
            </div>
            <div className={`history-container__gradient`}></div>
            <button className={`history-container__clear-history black-blue-link button-link`} onClick={() => clearHistoryHandler()}>
                <div className={`black-blue-link__icon icon-close`}></div>
            </button>
        </div>
    );
};
