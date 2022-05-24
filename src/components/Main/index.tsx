import React from 'react';
import styled from 'styled-components';

// =============================================================================
// Styled Components
// =============================================================================

const StyledMain = styled.main`
  position: relative;
  margin: 20px auto 50px auto;
  border-radius: 16px;
  border-width: 2px 2px 4px;
  border-style: solid;
  border-color: #e8e8e8;
  max-width: 600px;
`;

// =============================================================================
// Main Component
// =============================================================================

const Main: React.FC<React.HTMLProps<HTMLDivElement>> = ({ children }) => <StyledMain>{children}</StyledMain>;

export default Main;
