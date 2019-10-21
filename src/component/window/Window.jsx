import React from 'react';
import connect from 'react-redux/es/connect/connect';

import Icon from '../common/Icon';
import {activeWindow, deleteWindow, fullScreenWindow, minimizeWindow} from '../../actions/windows';
import './window.scss';
import {closeContextMenu} from '../../actions/contextMenu';

const WindowNavBar = (props) => (
    <div className={'navbar'}
         onDoubleClick={() => props.fullScreenWindow(props.window)}>
        <div className={'action-buttons'}>
            <button className={'close'}
                    onClick={ev => props.onNavBarAction('delete', props.window, ev)}><Icon type={'close'}/></button>
            <button className={'minimize'}
                    onClick={ev => props.onNavBarAction('minimize', props.window, ev)}><Icon type={'minimize'}/>
            </button>
            <button className={'maximize'}
                    onClick={ev => props.onNavBarAction('fullScreen', props.window, ev)}>
                <Icon type={'crop_landscape'}/>
            </button>
        </div>
        <div className={'title'}
             onMouseDown={ev => props.onMouseDown(ev, props.window, 'window')}>{props.window.title}</div>
    </div>
);

const WindowResizerZone = (props) => (
    <React.Fragment>
        {['tl', 't', 'tr', 'r', 'br', 'b', 'bl', 'l'].map(resizer => (
            <div className={`resizer ${resizer}`}
                 key={resizer}
                 onMouseDown={ev => props.onMouseDown(ev, props.window, `resize-${resizer}`)}
            />
        ))}
    </React.Fragment>
);

class Window extends React.Component {
    onNavBarAction = (action, window, ev) => {
        ev.stopPropagation();
        this.props[`${action}Window`](window);
    };

    render() {
        const window = this.props.windows[this.props.windowPos];

        return (
            <div className={`window frame ${window.active ? 'active' : ''} ${window.className || ''}`}
                 onClick={ev => {
                     ev.stopPropagation();
                     this.props.closeContextMenu();
                     this.props.activeWindow(window)
                 }}
                 style={{
                     top: `${window.y}px`,
                     left: `${window.x}px`,
                     width: `${window.width}px`,
                     height: `${window.height}px`,
                     transition: window.transition,
                     zIndex: window.active ? 2 : 1,
                     ...window.styles
                 }}>
                <WindowNavBar
                    window={window}
                    onNavBarAction={this.onNavBarAction}
                    onMouseDown={this.props.onMouseDown}
                />
                <WindowResizerZone
                    window={window}
                    onMouseDown={this.props.onMouseDown}
                />
                <div className={'content'}>
                    <pre>{JSON.stringify(window, null, 2)}</pre>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    windows: state.windows
});

const mapDispatchToProps = dispatch => ({
    activeWindow: window => dispatch(activeWindow(window)),
    fullScreenWindow: window => dispatch(fullScreenWindow(window)),
    deleteWindow: window => dispatch(deleteWindow(window)),
    minimizeWindow: window => dispatch(minimizeWindow(window)),
    closeContextMenu: () => dispatch(closeContextMenu())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Window)
