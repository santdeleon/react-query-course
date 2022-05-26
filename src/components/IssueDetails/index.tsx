import React from 'react';
import styled from 'styled-components';

import { TStatus } from '../../types';

import { hexToRGB } from '../../utils';

import { GRAY, BLUE, YELLOW, GREEN, RED, DEFAULT_STATUSES } from '../../constants';

import Row from '../Row';
import Column from '../Column';

// =============================================================================
// Styled Components
// =============================================================================

const Title = styled.h2`
  margin: 0 15px 0 0;
`;

const Subtitle = styled.p`
  color: #918f8f;
  margin: 0;
  span {
    color: ${hexToRGB('#222222', 0.7)};
    font-weight: 500;
  }
`;

const IssueNumber = styled.h3`
  margin: 0;
  color: #bfbdbd;
`;

const StatusBadge = styled.div<{ status: TStatus }>`
  padding: 4px 8px;
  border-radius: 4px;
  font-weight: 500;
  color: ${({ status }) => {
    switch (status) {
      case 'backlog':
        return GRAY;
      case 'todo':
        return BLUE;
      case 'inProgress':
        return YELLOW;
      case 'done':
        return GREEN;
      case 'cancelled':
        return RED;
      default:
        return GRAY;
    }
  }};
  background-color: ${({ status }) => {
    switch (status) {
      case 'backlog':
        return hexToRGB(GRAY, 0.2);
      case 'todo':
        return hexToRGB(BLUE, 0.2);
      case 'inProgress':
        return hexToRGB(YELLOW, 0.2);
      case 'done':
        return hexToRGB(GREEN, 0.2);
      case 'cancelled':
        return hexToRGB(RED, 0.2);
      default:
        return hexToRGB(GRAY, 0.2);
    }
  }};
`;

// =============================================================================
// Typedefs
// =============================================================================

interface IssueDetailsProps {
  number?: string;
  title: string;
  status: TStatus;
  createdByName: string;
  createdDate: string;
  commentsLength: number;
}

// =============================================================================
// Issue Details
// =============================================================================

const IssueDetails = React.memo((props: IssueDetailsProps) => {
  const statusFormatted = DEFAULT_STATUSES.find((s) => s.id === props.status);

  return (
    <Column width="100%">
      <Row width="100%" align="center" justify="space-between" margin="0 0 10px 0">
        <IssueNumber>#{props.number}</IssueNumber>
        <StatusBadge status={props.status}>{statusFormatted?.label || 'No Status'}</StatusBadge>
      </Row>
      <Title>{props.title}</Title>
      <Subtitle>
        <span>{props.createdByName}</span> opened this issue {props.createdDate} · {props.commentsLength} comments
      </Subtitle>
    </Column>
  );
});

export default IssueDetails;
