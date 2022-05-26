import React from 'react';
import styled from 'styled-components';

// =============================================================================
// Styled Components
// =============================================================================

const StyledPopover = styled.span`
  z-index: 99;
  position: absolute;
  display: flex;
  right: 100%;
  align-items: center;
  justify-content: center;
  font-size: 90%;
  font-weight: 500;
  line-height: 100%;
  text-align: center;
  white-space: nowrap;
  padding: 5px;
  color: #000;
  background-color: ghostwhite;
  border-width: 1px;
  border-style: solid;
  border-color: #e8e8e8;
  border-radius: 6px;
  box-shadow: 2px 2px 10px hsla(0, 0%, 0%, 0.1);
  &:before {
    content: '';
    position: absolute;
    top: 50%;
    left: 100%;
    margin-top: -6px;
    border-width: 6px;
    border-style: solid;
    border-color: transparent transparent transparent #e8e8e8;
  }
  &:after {
    content: '';
    position: absolute;
    top: 50%;
    left: 100%;
    margin-top: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: transparent transparent transparent #e8e8e8;
  }
`;

// =============================================================================
// Typedefs
// =============================================================================

interface PopoverProps {
  ariaLabel: string;
  className?: string;
  children: React.ReactNode;
}

// =============================================================================
// Main Component
// =============================================================================

const Popover: React.FC<PopoverProps> = React.memo((props: PopoverProps) => (
  <StyledPopover tabIndex={-11} aria-label={props.ariaLabel} className={`${props.className}`}>
    {props.children}
  </StyledPopover>
));

export default Popover;
