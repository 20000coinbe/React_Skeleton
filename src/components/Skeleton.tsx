import React, { ReactElement, useMemo } from 'react';
import styled from '@emotion/styled/macro'
import { keyframes, css } from '@emotion/react';

interface Props {
    width?: number;
    height?: number;
    circle?: boolean;
    rounded?: boolean;
    count?: number; // 글자수만큼의 스켈레톤
    unit?: string;
    animation?: boolean;
    color?: string;
    style?: React.CSSProperties;
    children?: ReactElement;
}

const pulseKeyframes = keyframes`
    0% {
        opacity: 1;
    }
    50% {
        opacity: 0.4;
    }
    100% {
        opacity: 1;
    }
`

const pulseAnimation = css`
    animation: ${pulseKeyframes} 1.5s ease-in-out infinite;
`

const Base = styled.div<Props>`
    ${({ color }) => color && `background-color: ${color}`};
    ${({ rounded }) => rounded && `border-radius: 8px`}
    ${({ circle }) => circle && 'border-radius: 50%'}
    ${({ width, height }) => (width || height) && `display: block`}
    ${({ animation }) => animation && pulseAnimation}
    width: ${({ width, unit }) => width && unit && `${width}${unit}`};
    height: ${({ height, unit })=> height && unit && `${height}${unit}`};
`;  

const Content = styled.div`
    opacity: 0;
`

const Skeleton: React.FC<Props> = ({ animation = true, children, width, height, circle, rounded, count, unit='px', color='#F4F4F4', style}) => {
    
    // count 4 => `----` 글자의 길이를 '-'로 채우겠다
    const content = useMemo(() => [...Array({ length: count })].map(() => `-`).join(''), [count]);
    
    return (
        <Base>
            <Content></Content>
        </Base>
    )
}

export default Skeleton;