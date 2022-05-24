import React from 'react';
import styled from 'styled-components';

import Container from '../Container';
import Navbar from '../Navbar';
import Main from '../Main';

import { RED, ORANGE, YELLOW, GREEN, BLUE, PURPLE, PINK } from '../../constants';

import { hexToRGB } from '../../utils';

// =============================================================================
// Styled Components
// =============================================================================

const RainbowBorder = styled.div`
  width: 100%;
  height: 5px;
  background: linear-gradient(
    to right,
    ${hexToRGB(RED, 0.6)},
    ${hexToRGB(ORANGE, 0.6)},
    ${hexToRGB(YELLOW, 0.6)},
    ${hexToRGB(GREEN, 0.6)},
    ${hexToRGB(BLUE, 0.6)},
    ${hexToRGB(PURPLE, 0.6)},
    ${hexToRGB(PINK, 0.6)}
  );
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
