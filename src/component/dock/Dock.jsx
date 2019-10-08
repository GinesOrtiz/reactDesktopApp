import React from 'react';
import connect from 'react-redux/es/connect/connect';

import {activeWindow, createWindow} from '../../actions/windows';
import Icon from '../common/Icon';
import './dock.scss';

class Dock extends React.Component {
    createWindow = () => {
        const random = (Math.random()).toString(21).substr(2);
        const window = {
            title: random,
            id: random,
        };

        this.props.createWindow(window);
    };

    launchAppDock = () => {

    };

    render() {
        return (
            <div className={'dock'}>
                <div className={'dock-display'}>
                    <div className={'dock-actions'}>
                        <button
                            className={'dock-button'}
                            onClick={this.launchAppDock()}>
                            <Icon type={'apps'}/>
                        </button>
                    </div>
                    <div className={'dock-separator'}/>
                    <div className={'dock-apps'}>
                        {this.props.windows
                            .map(window => (
                                <button
                                    key={window.id}
                                    className={'dock-button'}
                                    onClick={() => this.props.activeWindow(window)}>
                                    {window.customIcon
                                        ? <div style={{backgroundImage: window.customIcon}}/>
                                        : <div><Icon type={window.icon || 'extension'}/></div>
                                    }
                                </button>))}
                    </div>
                    <div className={'dock-separator'}/>
                    <div className={'dock-actions'}>
                        <button
                            className={'dock-button'}
                            onClick={this.createWindow}>
                            <Icon type={'add'}/>
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    windows: [...state.windows].sort((a, b) => a.createdAt > b.createdAt ? 1 : -1)
});

const mapDispatchToProps = dispatch => ({
    createWindow: window => dispatch(createWindow(window)),
    activeWindow: window => dispatch(activeWindow(window))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Dock)

