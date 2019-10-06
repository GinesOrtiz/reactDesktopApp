export const ContextMenu = {
    OPEN: 'OPEN',
    CLOSE: 'CLOSE',
};

export const openContextMenu = config => ({
    type: ContextMenu.OPEN,
    config
});

export const closeContextMenu = () => ({
    type: ContextMenu.CLOSE
});