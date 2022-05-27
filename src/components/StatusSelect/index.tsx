import React from 'react';
import styled from 'styled-components';

import { TStatus } from '../../types';
import { DEFAULT_STATUSES } from '../../constants';

// =============================================================================
// Styled Components
// =============================================================================

const Select = styled.select`
  color: black;
  border-width: 1px;
  border-style: solid;
  border-color: #d1d1d1;
  border-radius: 6px;
  padding: 5px;
  font-size: 14px;
  width: 150px;
  &:focus {
    outline-width: 3px;
    outline-style: solid;
    outline-color: #f9d4f6;
    border-color: #f774ee;
  }
`;

// =============================================================================
// Typedefs
// =============================================================================

interface StatusSelectProps {
  status: TStatus | 'default';
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

// =============================================================================
// Status Select
// =============================================================================

const StatusSelect = React.memo((props: StatusSelectProps) => {
  const { status, handleChange } = props;

  return (
    <form>
      <Select value={status} onChange={handleChange}>
        <option value="default">Choose an option</option>
        {DEFAULT_STATUSES.map(({ id, label }) => (
          <option key={id} id={label} value={id}>
            {label}
          </option>
        ))}
      </Select>
    </form>
  );
});

export default StatusSelect;
