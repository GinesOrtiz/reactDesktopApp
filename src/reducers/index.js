import {combineReducers} from 'redux';

import windows from './windows';
import contextMenu from './contextMenu';

export default combineReducers({
    windows,
    contextMenu,
})