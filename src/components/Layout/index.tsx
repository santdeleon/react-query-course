import React from 'react';
import styled from 'styled-components';

import Container from '../Container';
import Navbar from '../Navbar';
import Main from '../Main';

// =============================================================================
// Styled Components
// =============================================================================

const RainbowBorder = styled.div`
  width: 100%;
  height: 5px;
  background: linear-gradient(to right, #f97070, #f9c270, #f9e17f, #a2f97f, #73eef4, #c073f4, #ff89ef);
`;

// =============================================================================
// Main Component
// =============================================================================

const Layout: React.FC<React.HTMLProps<HTMLDivElement>> = ({ children }) => (
  <>
    <RainbowBorder />
    <Container>
      <Navbar />
      <Main>{children}</Main>
    </Container>
  </>
);

export default Layout;
