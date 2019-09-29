export const Windows = {
    CREATE_WINDOW: 'CREATE_WINDOW',
    UPDATE_WINDOW: 'UPDATE_WINDOW',
    ACTIVE_WINDOW: 'ACTIVE_WINDOW',
    DELETE_WINDOW: 'DELETE_WINDOW',
    FULLSCREEN_WINDOW: 'FULLSCREEN_WINDOW'
};

export const createWindow = window => ({
    type: Windows.CREATE_WINDOW,
    window
});

export const updateWindow = (window, data) => ({
    type: Windows.UPDATE_WINDOW,
    window,
    data
});

export const activeWindow = window => ({
    type: Windows.ACTIVE_WINDOW,
    window
});


export const fullScreenWindow = window => ({
    type: Windows.FULLSCREEN_WINDOW,
    window
});

export const deleteWindow = window => ({
    type: Windows.DELETE_WINDOW,
    window
});