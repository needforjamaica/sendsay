import React, {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import './HistoryItem.scss';
import 'bootstrap/js/dist/dropdown';
import {fillRequestFromHistory} from '../../../../store/actions/console';
import Dropdown from './Dropdown/Dropdown';
export default (props) => {
    const dispatch = useDispatch();
    return (
        <li
            className={`history-item`}
            id={`js-history-item-${props.request.requestId}`}
            onClick={(e) => {
                if (e.target.className !== 'dropdown-trigger') {
                    dispatch(fillRequestFromHistory(props.request.requestId));
                }
            }}
        >
            <div className={`history-item__status ${props.request.success ? `history-item__status_success` : `history-item__status_failed`}`}></div>
            <div className={`history-item__type`}>{props.request.requestType}</div>
            <div className={`history-item__dropdown-trigger`}>
                <Dropdown request={props.request} />
            </div>
        </li>
    );
};
