import React from 'react';
import {connect} from 'react-redux';

import {closeContextMenu} from '../../actions/contextMenu';
import Icon from '../common/Icon';
import './contextMenu.scss';

class ContextMenu extends React.Component {
    onSelectMenu = option => {
        console.log(option)
    };

    render() {
        if (!this.props.contextMenu.active) {
            return null;
        }

        return (
            <div className={'context-menu'}>
                <div
                    style={this.props.contextMenu.position}
                    className={'menu'}>
                    {this.props.contextMenu.content.map(option => (
                        <div
                            onClick={() => this.onSelectMenu(option)}
                            className={'menu-option'}
                            key={option.value}>
                            {option.icon && <Icon type={option.icon}/>}
                            <span>{option.value}</span>
                        </div>
                    ))}
                </div>
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