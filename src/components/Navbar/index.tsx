import { useQueryClient } from 'react-query';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

import Searchbar from '../Searchbar';

// =============================================================================
// Styled Components
// =============================================================================

const StyledNavbar = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 15px 0;
  border-bottom: 2px solid #e8e8e8;
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
  &:focus-visible {
    outline-width: 3px;
    outline-style: solid;
    outline-color: #f9d4f6;
  }
`;

// =============================================================================
// Main Component
// =============================================================================

const Navbar = () => {
  const location = useLocation();
  const queryClient = useQueryClient();

  return (
    <StyledNavbar>
      <nav>
        <NavbarBrand
          onClick={() => {
            // little hacky but will allow issues to reflect updates from issue page
            if (location.pathname !== '/') {
              queryClient.invalidateQueries(['issues']);
            }
          }}
        >
          <span role="img" aria-label="Sparkles Emoji">
            ✨
          </span>{' '}
          Issue Tracker
        </NavbarBrand>
      </nav>
      <Searchbar />
    </StyledNavbar>
  );
};

export default Navbar;
