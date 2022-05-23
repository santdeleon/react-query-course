import React from 'react';
import styled from 'styled-components';

// =============================================================================
// Styled Components
// =============================================================================

const StyledMain = styled.main`
  margin: 20px 0;
`;
// =============================================================================
// Main Component
// =============================================================================

const Main: React.FC<React.HTMLProps<HTMLDivElement>> = ({ children }) => <StyledMain>{children}</StyledMain>;

export default Main;
