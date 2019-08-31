import React from 'react';
import styled from 'styled-components';
import Window from "../window/Window";

const transition = 'all .3s';
const windowSize = {width: 200, height: 100};
const DesktopMainFrame = styled.div`
    height: 100%;
    width: 100%;
    overflow: hidden;
    background: #405592;
`;

class Desktop extends React.Component {
    state = {
        windows: [
            {
                id: 'test',
                x: 100,
                y: 100,
                width: 400,
                height: 250,
                title: 'window 1'
            },
            {
                id: 'dmeo',
                x: 400,
                y: 300,
                width: 400,
                height: 250,
                title: 'window 2'
            }
        ],
        activeWindow: {}
    };

    updateActiveWindow = (data) => {
        const windows = [...this.state.windows];
        const windowIndex = this.state.activeWindow.pos;

        if (this.state.activeWindow.src) {
            Object.keys(data).forEach(key => {
                windows[windowIndex][key] = data[key];
            });

            this.setState({windows});
        }
    };

    onMouseDown = (ev, wId, src) => {
        const windows = [...this.state.windows];
        const activePos = windows.findIndex(window => window.id === wId);
        const activeWindow = {
            src,
            pos: activePos,
            layerX: ev.nativeEvent.layerX,
            layerY: ev.nativeEvent.layerY,
            clientX: ev.nativeEvent.clientX,
            clientY: ev.nativeEvent.clientY,
            window: {...windows[activePos]}
        };

        windows.map(window => window.active = false);
        windows[activePos].active = true;
        this.setState({windows, activeWindow});
        this.updateActiveWindow({active: 1});
    };

    onMouseMove = (ev) => {
        switch (this.state.activeWindow.src) {
            case 'window':
                this.updateActiveWindow({
                    x: ev.pageX - this.state.activeWindow.layerX,
                    y: ev.pageY - this.state.activeWindow.layerY,
                    transition: null
                });
                break;
            case 'resize':
                const window = this.state.activeWindow.window;
                const width = window.width + (ev.clientX - this.state.activeWindow.clientX);
                const height = window.height + (ev.clientY - this.state.activeWindow.clientY);

                this.updateActiveWindow({
                    width: width > windowSize.width ? width : windowSize.width,
                    height: height > windowSize.height ? height : windowSize.height,
                    transition: null
                });
                break;
        }
    };

    onMouseUp = () => {
        this.setState({activeWindow: {}});
    };

    onDoubleClick = (ev, wId) => {
        const windows = [...this.state.windows];
        const currentWindow = windows.findIndex(window => window.id === wId);

        if (windows[currentWindow].prev) {
            windows[currentWindow] = {
                ...windows[currentWindow].prev,
                transition
            };
        } else {
            windows[currentWindow] = {
                ...windows[currentWindow],
                x: 0,
                y: 0,
                width: window.innerWidth,
                height: window.innerHeight,
                transition,
                prev: {...windows[currentWindow]}
            };
        }

        setTimeout(() => {
            this.setState({windows});
        });
    };

    onWindowClick = wId => {
        const windows = [...this.state.windows];
        const currentWindow = windows.findIndex(window => window.id === wId);

        windows.map(window => window.active = false);
        windows[currentWindow].active = true;
        this.setState({windows});
    };

    render() {
        return (
            <DesktopMainFrame
                onMouseMove={this.onMouseMove}
                onMouseUp={this.onMouseUp}>
                {this.state.windows.map(window => <Window
                    window={window}
                    key={window.id}
                    onClick={() => this.onWindowClick(window.id)}
                    onMouseDown={this.onMouseDown}
                    onDoubleClick={this.onDoubleClick}
                />)}
            </DesktopMainFrame>
        );
    }
}

export default Desktop;