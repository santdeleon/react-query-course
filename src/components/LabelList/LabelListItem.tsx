import React from 'react';

import { TLabel } from '../../types';

import Badge from '../../components/Badge';

// =============================================================================
// Typedefs
// =============================================================================

interface LabelListItemProps {
  label: TLabel;
  isActive: boolean;
  children: React.ReactNode;
  onClick: () => void;
}

// =============================================================================
// Main Component
// =============================================================================

const LabelListItem = React.memo((props: LabelListItemProps) => (
  <li>
    <Badge label={props.label} isActive={props.isActive} onClick={props.onClick}>
      {props.children}
    </Badge>
  </li>
));

export default LabelListItem;
