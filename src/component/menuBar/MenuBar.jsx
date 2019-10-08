import React from 'react';
import connect from 'react-redux/es/connect/connect';

import Icon from '../common/Icon';
import {openContextMenu} from '../../actions/contextMenu';
import './menuBar.scss';

class MenuBar extends React.Component {
    defaultActiveWindow = {
        title: 'Finder'
    };

    systemContextMenu = [
        {
            type: 'button',
            value: 'demo'
        }
    ];

    onMenuClick = (from, ev) => {
        const position = {
            top: ev.target.offsetTop + ev.target.offsetHeight,
            left: ev.target.offsetLeft
        };

        ev.preventDefault();
        ev.stopPropagation();
        switch (from) {
            case 'system':
                this.props.openContextMenu({position, content: this.systemContextMenu});
        }
    };

    render() {
        const activeWindow = this.props.activeWindow || this.defaultActiveWindow;
        return (
            <div className={'menu-bar'}
                 onContextMenu={ev => ev.preventDefault()}>
                <div
                    onClick={(ev) => this.onMenuClick('system', ev)}
                    className={'menu-option system'}><Icon type={'layers'}/></div>
                <div className={'menu-option app'}><span>{activeWindow.title}</span></div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    activeWindow: [...state.windows].find(window => window.active)
});

const mapDispatchToProps = dispatch => ({
    openContextMenu: config => dispatch(openContextMenu(config))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MenuBar)
