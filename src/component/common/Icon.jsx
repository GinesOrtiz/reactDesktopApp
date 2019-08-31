import React from 'react';
import styled from 'styled-components';

const Icon = styled.i`
    font-family: 'Material Icons';
    font-weight: normal;
    font-style: normal;
    font-size: 12px;
    display: inline-block;
    text-transform: none;
    letter-spacing: normal;
    word-wrap: normal;
    white-space: nowrap;
    direction: ltr;
`;

export default props => (
    <Icon>{props.type}</Icon>
)