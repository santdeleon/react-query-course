import React from 'react';
import styled from 'styled-components';

import { TLabel } from '../../types';

import { DEFAULT_LABELS } from '../../constants';

import LabelListItem from './LabelListItem';

// =============================================================================
// Styled Components
// =============================================================================

const UnorderedList = styled.ul`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  li:not(:last-child) {
    margin-right: 10px;
  }
`;

// =============================================================================
// Typedefs
// =============================================================================

interface LabelListProps {
  labelFilters: Set<TLabel>;
  toggleLabelFilter: (label: TLabel) => void;
}

// =============================================================================
// Main Component
// =============================================================================

const LabelList = React.memo((props: LabelListProps) => (
  <UnorderedList>
    {DEFAULT_LABELS.map((label) => (
      <LabelListItem
        key={label.id}
        color={label.color}
        isActive={props.labelFilters.has(label.name)}
        onClick={() => props.toggleLabelFilter(label.name)}
      >
        {label.name}
      </LabelListItem>
    ))}
  </UnorderedList>
));

export default LabelList;
