import React from 'react';

import Badge from '../../components/Badge';

// =============================================================================
// Typedefs
// =============================================================================

interface LabelListItemProps {
  color: string;
  isActive: boolean;
  children: React.ReactNode;
  onClick: () => void;
}

// =============================================================================
// Main Component
// =============================================================================

const LabelListItem = React.memo((props: LabelListItemProps) => (
  <li>
    <Badge color={props.color} isActive={props.isActive} onClick={props.onClick}>
      {props.children}
    </Badge>
  </li>
));

export default LabelListItem;
