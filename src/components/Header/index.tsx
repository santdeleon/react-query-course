import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Searchbar from '../Searchbar';

// =============================================================================
// Styled Components
// =============================================================================

const Navbar = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 15px 0;
  border-bottom: 1px solid #e8e8e8;
`;

const NavbarBrand = styled(Link).attrs({
  to: '/',
})`
  text-decoration: none;
  font-size: 20px;
  font-weight: 500;
  color: #000;
  font-family: Whitney;
  margin-right: 20px;
  &:focus {
    outline-width: 3px;
    outline-style: solid;
    outline-color: #f9d4f6;
  }
`;

// =============================================================================
// Main Component
// =============================================================================

const Header = () => (
  <Navbar>
    <nav>
      <NavbarBrand>
        <span role="img" aria-label="Sparkles Emoji">
          ✨
        </span>{' '}
        Issue Tracker
      </NavbarBrand>
    </nav>
    <Searchbar />
  </Navbar>
);

export default Header;
