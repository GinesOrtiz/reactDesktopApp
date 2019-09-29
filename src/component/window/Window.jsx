import React from 'react';
import connect from 'react-redux/es/connect/connect';

import Icon from '../common/Icon';
import {activeWindow, deleteWindow, fullScreenWindow} from '../../actions/windows';
import './window.scss';

const WindowNavBar = (props) => (
    <div className={'navbar'}
         onMouseDown={ev => props.onMouseDown(ev, props.window, 'window')}
         onDoubleClick={() => props.fullScreenWindow(props.window)}>
        <div className={'action-buttons'}>
            <button className={'close'}
                    onClick={() => props.deleteWindow(props.window)}><Icon type={'close'}/></button>
            <button className={'minimize'}><Icon type={'minimize'}/></button>
            <button className={'maximize'}
                    onClick={() => props.fullScreenWindow(props.window)}>
                <Icon type={'crop_landscape'}/>
            </button>
        </div>
        <div className={'title'}>{props.window.title}</div>
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
    render() {
        const window = this.props.windows[this.props.windowPos];

        return (
            <div className={`window frame ${window.active ? 'active' : ''}`}
                 onClick={() => this.props.activeWindow(window)}
                 style={{
                     top: `${window.y}px`,
                     left: `${window.x}px`,
                     width: `${window.width}px`,
                     height: `${window.height}px`,
                     transition: window.transition,
                     zIndex: window.active ? 2 : 1
                 }}>
                <WindowNavBar
                    window={window}
                    deleteWindow={this.props.deleteWindow}
                    fullScreenWindow={this.props.fullScreenWindow}
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
    deleteWindow: window => dispatch(deleteWindow(window))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Window)
