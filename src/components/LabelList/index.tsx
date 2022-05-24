import React from 'react';
import styled from 'styled-components';

import { TLabel, ILabel } from '../../types';

import SkeletonLoader from '../../components/SkeletonLoader';

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

interface LabelListData {
  labels: ILabel[];
  labelFilters: Set<TLabel>;
  toggleLabelFilter: (label: TLabel) => void;
}

interface LabelListProps {
  data: LabelListData;
  loading: boolean;
  error: unknown;
}

// =============================================================================
// Stateless Label List
// =============================================================================

const StatelessLabelList = React.memo((props: LabelListData) => {
  return (
    <UnorderedList>
      {props.labels.map((label) => (
        <LabelListItem
          key={label.id}
          color={label.color}
          isActive={props.labelFilters.has(label.id)}
          onClick={() => props.toggleLabelFilter(label.id)}
        >
          {label.name}
        </LabelListItem>
      ))}
    </UnorderedList>
  );
});

// =============================================================================
// Main Component
// =============================================================================

const LabelList = React.memo((props: LabelListProps) => {
  return props.loading ? (
    <SkeletonLoader width="200px" height="12px" borderRadius="6px" />
  ) : props.error ? (
    <h3>Failed to fetch labels</h3>
  ) : (
    <StatelessLabelList {...props.data} />
  );
});

export default LabelList;
