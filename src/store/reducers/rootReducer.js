import {combineReducers} from 'redux';
import common from './common';
import auth from './auth';
import console from './console';

export default combineReducers({
    common: common,
    auth: auth,
    console: console,
});
