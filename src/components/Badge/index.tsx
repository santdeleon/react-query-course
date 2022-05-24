import React from 'react';
import styled from 'styled-components';

import { hexToRGB } from '../../utils';

import { TLabel } from '../../types';

import { RED, ORANGE, YELLOW, GREEN, BLUE, PURPLE, PINK, GRAY } from '../../constants';

// =============================================================================
// Typedefs
// =============================================================================

interface BadgeProps extends React.HTMLProps<HTMLButtonElement> {
  label: TLabel;
  isActive: boolean;
}

// =============================================================================
// Main Component
// =============================================================================

const Badge = styled.button<BadgeProps>`
  cursor: ${(props) => (props.onClick ? 'pointer' : 'default')};
  user-select: none;
  padding: 2px 6px;
  border: 0;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  color: ${(props) => {
    if (props.isActive) {
      switch (props.label) {
        case 'bug':
          return RED;
        case 'feature':
          return ORANGE;
        case 'question':
          return YELLOW;
        case 'enhancement':
          return GREEN;
        case 'help':
          return BLUE;
        case 'wontfix':
          return PURPLE;
        case 'duplicate':
          return PINK;
      }
    } else {
      return '#000';
    }
  }};
  background-color: ${(props) => {
    if (props.isActive) {
      switch (props.label) {
        case 'bug':
          return hexToRGB(RED, 0.1);
        case 'feature':
          return hexToRGB(ORANGE, 0.1);
        case 'question':
          return hexToRGB(YELLOW, 0.1);
        case 'enhancement':
          return hexToRGB(GREEN, 0.1);
        case 'help':
          return hexToRGB(BLUE, 0.1);
        case 'wontfix':
          return hexToRGB(PURPLE, 0.1);
        case 'duplicate':
          return hexToRGB(PINK, 0.1);
      }
    } else {
      return hexToRGB(GRAY, 0.5);
    }
  }};
  opacity: ${(props) => (props.isActive ? 1 : 0.5)};
  &:hover {
    opacity: ${(props) => (props.onClick ? 1 : undefined)};
  }
  &:focus-visible {
    opacity: 1;
    outline-width: 1px;
    outline-style: solid;
    outline-color: ${(props) => {
      if (props.isActive) {
        switch (props.label) {
          case 'bug':
            return RED;
          case 'feature':
            return ORANGE;
          case 'question':
            return YELLOW;
          case 'enhancement':
            return GREEN;
          case 'help':
            return BLUE;
          case 'wontfix':
            return PURPLE;
          case 'duplicate':
            return PINK;
        }
      } else {
        return GRAY;
      }
    }};
  }
`;

export default Badge;
