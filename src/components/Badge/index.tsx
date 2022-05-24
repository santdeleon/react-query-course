import React from 'react';
import styled from 'styled-components';

import { hexToRGB } from '../../utils';

interface BadgeProps extends React.HTMLProps<HTMLButtonElement> {
  color: string;
  isActive: boolean;
}

const Badge = styled.button<BadgeProps>`
  cursor: pointer;
  user-select: none;
  border: 0;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  color: ${(props) => (props.isActive ? props.color : '#000')};
  // background-color: ${(props) => (props.isActive ? hexToRGB(props.color, 0.1) : hexToRGB('gray', 0.5))}};
  opacity: ${(props) => (props.isActive ? 1 : 0.5)};
  &:hover {
    opacity: 1;
  }
  &:focus-visible {
    outline-color: ${(props) => (props.isActive ? props.color : 'gray')};
  }
`;

export default Badge;
