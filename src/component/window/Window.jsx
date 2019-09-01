import React from 'react';

import Icon from '../common/Icon';
import './window.scss';

const WindowNavBar = (props) => (
    <div className={'navbar'}
         onMouseDown={ev => props.onMouseDown(ev, props.window.id, 'window')}
         onDoubleClick={(ev) => props.onDoubleClick(ev, props.window.id)}>
        <div className={'action-buttons'}>
            <button className={'close'}><Icon type={'close'}/></button>
            <button className={'minimize'}><Icon type={'minimize'}/></button>
            <button className={'maximize'}
                    onClick={(ev) => props.onDoubleClick(ev, props.window.id)}>
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
                 onMouseDown={ev => props.onMouseDown(ev, props.window.id, `resize-${resizer}`)}
            />
        ))}
    </React.Fragment>
);

class Window extends React.Component {
    render() {
        return (
            <div className={'window frame'}
                onClick={this.props.onClick}
                style={{
                    top: `${this.props.window.y}px`,
                    left: `${this.props.window.x}px`,
                    width: `${this.props.window.width}px`,
                    height: `${this.props.window.height}px`,
                    transition: this.props.window.transition,
                    zIndex: this.props.window.active ? 2 : 1
                }}>
                <WindowNavBar
                    window={this.props.window}
                    onMouseDown={this.props.onMouseDown}
                    onDoubleClick={this.props.onDoubleClick}
                />
                <WindowResizerZone
                    window={this.props.window}
                    onMouseDown={this.props.onMouseDown}
                />
                <div className={'content'}/>
            </div>
        );
    }
}

export default Window;