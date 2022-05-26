import React, { useRef, useState, useCallback } from 'react';
import styled from 'styled-components';

// =============================================================================
// Typedefs
// =============================================================================

interface OverlayTriggerProps extends React.HTMLAttributes<HTMLDivElement> {
  overlay?: React.ReactNode;
  margin?: string;
}

// =============================================================================
// Styled Components
// =============================================================================

const StyledOverlayTrigger = styled.span<OverlayTriggerProps>`
  cursor: pointer;
  position: relative;
  display: inline-flex;
  margin: ${({ margin }) => margin};
`;

const StyledOverlayContainer = styled.span<{ show: boolean }>`
  opacity: ${({ show }) => (show ? '1' : '0')};
  visibility: ${({ show }) => (show ? 'default' : 'hidden')};
  transition: opacity 0.3s cubic-bezier(0.4, 0.03, 0, 1), visibility 0.3s cubic-bezier(0.4, 0.03, 0, 1);
`;

// =============================================================================
// Main Component
// =============================================================================

const OverlayTrigger: React.FC<OverlayTriggerProps> = React.memo(({ overlay, margin, className, children }) => {
  const [show, setShow] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  const togglePopover = useCallback(() => {
    const prevShow = show;
    setShow(!prevShow);
  }, [show, setShow]);

  return (
    <StyledOverlayTrigger ref={ref} className={`${className}`} margin={margin} onClick={togglePopover}>
      <StyledOverlayContainer show={show}>{overlay}</StyledOverlayContainer>
      {children}
    </StyledOverlayTrigger>
  );
});

export default OverlayTrigger;
