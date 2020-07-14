import React, {useEffect, useState} from 'react';
import {createPopper} from '@popperjs/core';
import './Dropdown.scss';
import {copyItem, deleteItem, executeItem} from '../../../../../store/actions/console';
import {useDispatch} from 'react-redux';

export default function (props) {
    const dispatch = useDispatch();
    const [copied, setCopied] = useState(false);

    const executeItemHandler = () => {
        dispatch(executeItem(props.request.requestId));
    };

    const copyItemHandler = () => {
        dispatch(copyItem(props.request.requestId));
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 1500);
    };

    const deleteItemHandler = () => {
        dispatch(deleteItem(props.request.requestId));
    };

    let popperInstance = null;
    function create(button, dropdownMenu) {
        popperInstance = createPopper(button, dropdownMenu, {
            placement: `bottom-end`,
            modifiers: [
                {
                    name: `offset`,
                    options: {
                        offset: [0, 0],
                    },
                },
            ],
        });
    }

    function destroy() {
        if (popperInstance) {
            popperInstance.destroy();
            popperInstance = null;
        }
    }

    const show = (e) => {
        if (!document.getElementById(`js-dropdownMenu`)) {
            e.target.closest(`.history-item`).classList.add(`history-item__focused`);
            //backdrop
            let backdrop = document.createElement(`div`);
            backdrop.id = `js-backdrop`;
            document.body.append(backdrop);
            document.getElementById(`js-backdrop`).addEventListener(`click`, hide);
            //dropdown-menu
            const dropdownMenu = document.getElementById(`js-dropdown-menu-${props.request.requestId}`).cloneNode(true);
            dropdownMenu.id = `js-dropdownMenu`;
            document.body.append(dropdownMenu);
            document.getElementById(`js-dropdown-menu-${props.request.requestId}`).setAttribute(`data-show`, ``);
            create(document.getElementById(`js-dropdown-trigger-${props.request.requestId}`), document.getElementById(`js-dropdownMenu`));
            //bind buttons
            document.querySelector(`#js-dropdownMenu .js-execute-button`).addEventListener(`click`, executeItemHandler);
            document.querySelector(`#js-dropdownMenu .js-execute-button`).addEventListener(`click`, hide);
            document.querySelector(`#js-dropdownMenu .js-copy-button`).addEventListener(`click`, copyItemHandler);
            document.querySelector(`#js-dropdownMenu .js-copy-button`).addEventListener(`click`, hide);
            document.querySelector(`#js-dropdownMenu .js-delete-button`).addEventListener(`click`, deleteItemHandler);
            document.querySelector(`#js-dropdownMenu .js-delete-button`).addEventListener(`click`, hide);
        }
    };

    function hide() {
        document.getElementById(`js-backdrop`).remove();
        document.getElementById(`js-dropdownMenu`).remove();
        document.querySelector(`.history-item__focused`).classList.remove(`history-item__focused`);
        destroy();
    }

    useEffect(() => {
        document.getElementById(`js-dropdown-trigger-${props.request.requestId}`).addEventListener(`click`, show);
        // eslint-disable-next-line
    }, []);

    return (
        <>
            <div id={`js-dropdown-trigger-${props.request.requestId}`} className={`dropdown-trigger`}></div>
            <div className={`copied-container ${copied ? `copied-container_active` : ``}`}>
                <div className={`copied-container__text`}>Скопировано</div>
            </div>
            <ul id={`js-dropdown-menu-${props.request.requestId}`} role={`tooltip`} className={`dropdown-menu`}>
                <li className={`dropdown-menu__item-container`}>
                    <button className={`dropdown-menu__item dropdown-menu__item_default button-link js-execute-button`}>Выполнить</button>
                </li>
                <li className={`dropdown-menu__item-container`}>
                    <button className={`dropdown-menu__item dropdown-menu__item_default button-link js-copy-button`}>Скопировать</button>
                </li>
                <li className={`dropdown-menu__item-container dropdown-menu__item-divider`}></li>
                <li className={`dropdown-menu__item-container dropdown-menu__item-container_border-top`}>
                    <button className={`dropdown-menu__item dropdown-menu__item_danger button-link js-delete-button`}>Удалить</button>
                </li>
            </ul>
        </>
    );
}
