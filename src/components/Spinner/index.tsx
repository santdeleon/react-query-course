import React from 'react';
import styled from 'styled-components';

import SpinnerSVG from './SpinnerSVG';

// =============================================================================
// Typedefs
// =============================================================================

export interface SpinnerProps {
  margin?: string;
}

// =============================================================================
// Styled Components
// =============================================================================

const StyledSpinner = styled.div<SpinnerProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: ${({ margin }) => margin};
`;

// =============================================================================
// Spinner
// =============================================================================

const Spinner = React.memo((props: SpinnerProps) => (
  <StyledSpinner margin={props.margin}>
    <SpinnerSVG />
  </StyledSpinner>
));

export default Spinner;
