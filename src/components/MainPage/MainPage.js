import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import History from './History/History';
import Header from './Header/Header';
import Console from './Console/Console';
import {setPageTitle} from '../../store/actions/common';

export default function () {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle(`Консоль`));
    }, [dispatch]);

    return (
        <>
            <Header />
            <History />
            <Console />
        </>
    );
}
