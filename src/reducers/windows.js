import {Windows} from '../actions/windows';
import {transition, windowSize} from '../component/desktop/utils/windows';

const defaultSate = [
    {
        id: 'test',
        x: 100,
        y: 100,
        width: 400,
        height: 250,
        title: 'window 1',
        createdAt: 1,
        icon: 'dashboard'
    },
    {
        id: 'dmeo',
        x: 400,
        y: 300,
        width: 400,
        height: 250,
        title: 'window 2',
        createdAt: 2,
        icon: 'event'
    }
];

const windows = (state = defaultSate, action) => {
    const newState = [...state];
    const currentWindow = action.window ? newState.findIndex(window => window.id === action.window.id) : -1;

    switch (action.type) {
        case Windows.CREATE_WINDOW:

            newState.push({
                ...windowSize,
                ...action.window,
                createdAt: +new Date()
            });

            return newState;
        case Windows.ACTIVE_WINDOW:
            const activeWindow = newState.splice(currentWindow, 1)[0];

            newState.push(activeWindow);

            return newState.map(window => {
                window.active = false;

                return window;
            });
        case Windows.FULLSCREEN_WINDOW:

            if (newState[currentWindow].prev) {
                newState[currentWindow] = {
                    ...state[currentWindow].prev,
                    transition
                };
            } else {
                newState[currentWindow] = {
                    ...newState[currentWindow],
                    x: 0,
                    y: 0,
                    width: window.innerWidth,
                    height: window.innerHeight,
                    transition,
                    prev: {...newState[currentWindow]}
                };
            }

            return newState;
        case Windows.UPDATE_WINDOW:
            if (newState[currentWindow]) {
                newState[currentWindow] = {
                    ...newState[currentWindow],
                    ...action.data
                };

                return newState;
            }

            return state;
        case Windows.DELETE_WINDOW:
            newState.splice(currentWindow, 1);

            return newState;
        default:
            return state;
    }
};

export default windows;