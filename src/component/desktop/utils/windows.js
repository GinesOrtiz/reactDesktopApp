export const windowSize = {width: 200, height: 100};
export const transition = 'all .3s';

export const windowInteraction = (activeWindow, windowConfig, ev) => {
    const window = activeWindow.window;

    switch (activeWindow.src) {
        case 'window':
            windowConfig.x = ev.pageX - activeWindow.layerX;
            windowConfig.y = ev.pageY - activeWindow.layerY;

            return windowConfig;
        case 'resize-br':
        case 'resize-b':
        case 'resize-r':
            if (['resize-br', 'resize-r'].includes(activeWindow.src)) {
                const width = window.width + (ev.clientX - activeWindow.clientX);

                windowConfig.width = width > windowSize.width ? width : windowSize.width;
            }
            if (['resize-br', 'resize-b'].includes(activeWindow.src)) {
                const height = window.height + (ev.clientY - activeWindow.clientY);

                windowConfig.height = height > windowSize.height ? height : windowSize.height;
            }

            return windowConfig;
        case 'resize-tl':
        case 'resize-l':
        case 'resize-t':
            if (['resize-tl', 'resize-l'].includes(activeWindow.src)) {
                const width = window.width + (activeWindow.clientX - ev.clientX);

                if (width > windowSize.width) {
                    windowConfig.width = width > windowSize.width ? width : windowSize.width;
                    windowConfig.x = ev.clientX;
                }
            }
            if (['resize-tl', 'resize-t'].includes(activeWindow.src)) {
                const height = window.height + (activeWindow.clientY - ev.clientY);

                if (height > windowSize.height) {
                    windowConfig.height = height > windowSize.height ? height : windowSize.height;
                    windowConfig.y = ev.clientY;
                }
            }

            return windowConfig;
        case 'resize-tr':
            const widthTR = window.width + (ev.clientX - activeWindow.clientX);
            const heightTR = window.height + (activeWindow.clientY - ev.clientY);

            windowConfig.width = widthTR > windowSize.width ? widthTR : windowSize.width;

            if (heightTR > windowSize.height) {
                windowConfig.height = heightTR > windowSize.height ? heightTR : windowSize.height;
                windowConfig.y = ev.clientY;
            }

            return windowConfig;
        case 'resize-bl':
            const heightBL = window.height + (ev.clientY - activeWindow.clientY);
            const widthBL = window.width + (activeWindow.clientX - ev.clientX);

            windowConfig.height = heightBL > windowSize.height ? heightBL : windowSize.height;

            if (widthBL > windowSize.width) {
                windowConfig.width = widthBL > windowSize.width ? widthBL : windowSize.width;
                windowConfig.x = ev.clientX;
            }

            return windowConfig;
    }
};