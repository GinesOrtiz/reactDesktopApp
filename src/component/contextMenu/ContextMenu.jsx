import React from 'react';
import {connect} from 'react-redux';

import {closeContextMenu} from '../../actions/contextMenu';
import Icon from '../common/Icon';
import './contextMenu.scss';

class ContextMenu extends React.Component {
    render() {
        if (!this.props.contextMenu.active) {
            return null;
        }

        return (
            <div className={'context-menu'}>
                <div
                    style={this.props.contextMenu.position}
                    className={'menu'}>
                    {this.props.contextMenu.content.map(option => {
                        switch (option.type) {
                            case 'button':
                                return (
                                    <div className={'menu-option'}
                                         key={option.value}>
                                        {option.icon && <Icon type={option.icon}/>}
                                        <span>{option.value}</span>
                                    </div>
                                );
                            case 'separator':
                                return (
                                    <div className={'menu-separator'}/>
                                );
                            default:
                                return null;
                        }

                    })}
                </div>
                <div
                    onClick={this.props.closeContextMenu}
                    className={'background-layer'}/>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    contextMenu: state.contextMenu
});

const mapDispatchToProps = dispatch => ({
    closeContextMenu: () => dispatch(closeContextMenu()),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ContextMenu)