import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

// =============================================================================
// Styled Components
// =============================================================================

const Input = styled.input`
  color: black;
  border-width: 1px;
  border-style: solid;
  border-color: #d1d1d1;
  border-radius: 6px;
  padding: 8px 12px;
  font-size: 14px;
  width: 180px;
  &:focus {
    outline-width: 3px;
    outline-style: solid;
    outline-color: #f9d4f6;
    border-color: #f774ee;
  }
  :-webkit-autofill,
  :-webkit-autofill:hover,
  :-webkit-autofill:focus,
  :-webkit-autofill:active {
    -webkit-box-shadow: 0 0 0 30px #d1d1d1 inset !important;
    -webkit-text-fill-color: #f774ee;
  }
`;

// =============================================================================
// Main Component
// =============================================================================

const Searchbar = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  const handleChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      setQuery(e.currentTarget.value);
    },
    [setQuery],
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      navigate(`/?search=${query}`);
    },
    [query, setQuery],
  );

  return (
    <form onSubmit={handleSubmit}>
      <Input
        type="search"
        id="search"
        name="search"
        value={query}
        placeholder="Search Issues..."
        onChange={handleChange}
      />
    </form>
  );
};

export default Searchbar;
