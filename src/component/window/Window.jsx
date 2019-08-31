import React from 'react';
import styled from 'styled-components';
import Icon from '../common/Icon';

const WindowFrame = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    background: white;
    box-shadow: 0 0 10px rgba(0,0,0,0.2)
`;

const WindowNavBarContainer = styled.div`
    width: 100%;
    height: 20px;
    background: #f0f0f0;
    cursor: move;
    position: relative;
`;

const NavButtons = styled.div`
    position: absolute;
    top:0;
    left: 0;
    z-index: 1;
    height: 100%;
    &:hover i {
        color: rgba(0,0,0,0.7);
    }
`;

const NavButton = styled.button`
    border: none;
    outline: none;
    width: 20px;
    height: 100%;
    font-size: 12px;
    line-height: 18px;
    padding: 0 6px;
    vertical-align: top;
    padding: 0;
    background: transparent;
    cursor: pointer;
    transition: all .1s;
    &:hover {
        background: rgba(0,0,0,0.1);
    }
    i {
        color: rgba(0,0,0,0.3);
        transition: all .1s;
    }
`;

const NavTitle = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 100%;
    text-align: center;
    line-height: 18px;
    font-size: 12px;
`;

const WindowResizer = styled.div`
    position: absolute;
    right: 0;
    bottom: 0;
    width: 10px;
    height: 10px;
    cursor: nwse-resize;
`;

const WindowContent = styled.div`
    width: 100%;
    height: calc(100% - 20px);
    > * {
        width: 100%;
        height: 100%;
        border: none;
    }
`;

const WindowNavBar = (props) => (
    <WindowNavBarContainer
        onMouseDown={ev => props.onMouseDown(ev, props.window.id, 'window')}
        onDoubleClick={(ev) => props.onDoubleClick(ev, props.window.id)}
    >
        <NavButtons>
            <NavButton><Icon type={'close'}/></NavButton>
            <NavButton><Icon type={'minimize'}/></NavButton>
            <NavButton
                onClick={(ev) => props.onDoubleClick(ev, props.window.id)}>
                <Icon type={'crop_landscape'}/>
            </NavButton>
        </NavButtons>
        <NavTitle>{props.window.title}</NavTitle>
    </WindowNavBarContainer>
);

class Window extends React.Component {
    render() {
        return (
            <WindowFrame
                onClick={this.props.onClick}
                style={{
                    top: `${this.props.window.y}px`,
                    left: `${this.props.window.x}px`,
                    width: `${this.props.window.width}px`,
                    height: `${this.props.window.height}px`,
                    transition: this.props.window.transition,
                    zIndex: this.props.window.active ? 1 : 0
                }}
            >
                <WindowNavBar
                    window={this.props.window}
                    onMouseDown={this.props.onMouseDown}
                    onDoubleClick={this.props.onDoubleClick}
                />
                <WindowResizer
                    onMouseDown={ev => this.props.onMouseDown(ev, this.props.window.id, 'resize')}
                />
                <WindowContent>

                </WindowContent>
            </WindowFrame>
        );
    }
}

export default Window;