import React from 'react';
import styled from 'styled-components';

import { TLabel, ILabel } from '../../types';

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
  labels: ILabel[];
  labelFilters: Set<TLabel>;
  toggleLabelFilter: (label: TLabel) => void;
}

// =============================================================================
// Main Component
// =============================================================================

const LabelList = React.memo((props: LabelListProps) => (
  <UnorderedList>
    {props.labels.map((label) => (
      <LabelListItem
        key={label.id}
        label={label.id}
        isActive={props.labelFilters.has(label.id)}
        onClick={() => props.toggleLabelFilter(label.id)}
      >
        {label.name}
      </LabelListItem>
    ))}
  </UnorderedList>
));

export default LabelList;
