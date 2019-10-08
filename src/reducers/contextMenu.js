import {ContextMenu} from '../actions/contextMenu';

const defaultState = {
    active: false,
    content: []
};

const contextMenu = (state = defaultState, action) => {
    switch (action.type) {
        case ContextMenu.OPEN:
            return {
                ...state,
                ...action.config,
                active: true
            };
        case ContextMenu.CLOSE:
            return {
                ...state,
                active: false
            };
        default:
            return state;
    }
};

export default contextMenu;