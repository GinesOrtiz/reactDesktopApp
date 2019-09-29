import React from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux'

import Window from '../window/Window';
import Dock from './Dock';
import {windowInteraction} from './utils/windows';
import {updateWindow, activeWindow} from '../../actions/windows';

const DesktopMainFrame = styled.div`
    height: 100%;
    width: 100%;
    overflow: hidden;
    background: #405592;
`;

class Desktop extends React.Component {
    state = {
        activeWindow: {}
    };

    onMouseDown = (ev, window, src) => {
        const windows = [...this.props.windows];
        const activePos = windows.findIndex(win => win.id === window.id);
        const activeWindow = {
            ...windows[activePos],
            src,
            pos: activePos,
            layerX: ev.nativeEvent.layerX,
            layerY: ev.nativeEvent.layerY,
            clientX: ev.nativeEvent.clientX,
            clientY: ev.nativeEvent.clientY,
            window: {
                width: windows[activePos].width,
                height: windows[activePos].height
            }
        };

        this.props.activeWindow(window);
        this.props.updateWindow(window, {...activeWindow, active: true});
        this.setState({activeWindow});
    };

    onMouseMove = (ev) => {
        const windowConfig = windowInteraction(this.state.activeWindow, {transition: null}, ev);

        if (windowConfig) {
            this.props.updateWindow(this.state.activeWindow, windowConfig);
        }
    };

    onMouseUp = () => {
        this.setState({activeWindow: {}});
    };

    render() {
        return (
            <DesktopMainFrame
                onMouseMove={this.onMouseMove}
                onMouseUp={this.onMouseUp}>
                {this.props.windows.map((window, pos) => <Window
                    windowPos={pos}
                    key={window.id}
                    onMouseDown={this.onMouseDown}
                />)}
                <Dock/>
            </DesktopMainFrame>
        );
    }
}

const mapStateToProps = state => ({
    windows: state.windows
});

const mapDispatchToProps = dispatch => ({
    updateWindow: (window, data) => dispatch(updateWindow(window, data)),
    activeWindow: window => dispatch(activeWindow(window))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Desktop)

