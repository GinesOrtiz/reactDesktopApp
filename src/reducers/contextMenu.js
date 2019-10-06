import {ContextMenu} from '../actions/contextMenu';

const defaultState = {
    active: false,
    content: []
};

const contextMenu = (state = defaultState, action) => {
    switch (action.type) {
        case ContextMenu.OPEN:
            return {
                ...action.config,
                active: true
            };
        case ContextMenu.CLOSE:
            return {
                active: false
            };
        default:
            return state;
    }
};

export default contextMenu;