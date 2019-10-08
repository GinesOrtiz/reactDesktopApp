import React from 'react';
import {connect} from 'react-redux'

import Window from '../window/Window';
import Dock from '../dock/Dock';
import MenuBar from '../menuBar/MenuBar';
import {windowInteraction} from './utils/windows';
import {updateWindow, activeWindow} from '../../actions/windows';
import {closeContextMenu, openContextMenu} from '../../actions/contextMenu';
import ContextMenu from '../contextMenu/ContextMenu';
import './desktop.scss';

class Desktop extends React.Component {
    state = {
        activeWindow: {}
    };

    desktopContextMenu = [
        {
            type: 'button',
            value: 'text',
            icon: 'layers'
        },
        {
            type: 'button',
            value: 'demo2',
            icon: 'lens'
        }
    ];

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

    onContextMenu = ev => {
        const position = {
            top: ev.clientY,
            left: ev.clientX
        };

        ev.preventDefault();
        this.props.openContextMenu({position, content: this.desktopContextMenu});
    };

    render() {
        return (
            <div className={'desktop'}
                 onClick={this.props.closeContextMenu}
                 onMouseMove={this.onMouseMove}
                 onMouseUp={this.onMouseUp}>
                <MenuBar/>
                <div
                    onContextMenu={this.onContextMenu}
                    className={'desktop-layer'}
                    onClick={() => this.props.activeWindow({})}>
                    {this.props.windows.map((window, pos) => <Window
                        windowPos={pos}
                        key={window.id}
                        onMouseDown={this.onMouseDown}
                    />)}
                </div>
                <Dock/>
                <ContextMenu/>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    windows: state.windows
});

const mapDispatchToProps = dispatch => ({
    updateWindow: (window, data) => dispatch(updateWindow(window, data)),
    activeWindow: window => dispatch(activeWindow(window)),
    openContextMenu: config => dispatch(openContextMenu(config)),
    closeContextMenu: () => dispatch(closeContextMenu()),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Desktop)

