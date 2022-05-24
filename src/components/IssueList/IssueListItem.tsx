import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { TLabel, TStatus } from '../../types';

import { hexToRGB } from '../../utils';

import { BLUE, GREEN, ORANGE, PINK, PURPLE, RED, YELLOW, GRAY } from '../../constants';

import CommentIcon from '../../assets/icons/CommentIcon';

import Row from '../Row';
import Column from '../Column';

// =============================================================================
// Styled Components
// =============================================================================

const StyledIssueListItem = styled.div`
  position: relative;
  border-width: 2px 2px 4px;
  border-style: solid;
  border-color: #e5e0e0;
  border-radius: 6px;
  background-color: #fff;
`;

const StatusBar = styled.div<{ status: TStatus }>`
  position: absolute;
  width: 5px;
  height: 100%;
  border-radius: 3px 0 0 3px;
  background-color: ${({ status }) => {
    switch (status) {
      case 'backlog':
        return hexToRGB(GRAY, 0.5);
      case 'todo':
        return hexToRGB(BLUE, 0.5);
      case 'inProgress':
        return hexToRGB(YELLOW, 0.5);
      case 'done':
        return hexToRGB(GREEN, 0.5);
      case 'cancelled':
        return hexToRGB(RED, 0.5);
      // handle undefined case
      default:
        return hexToRGB(GRAY, 0.5);
    }
  }};
`;

const AssigneeAvatar = styled.img`
  border-radius: 50%;
  width: 22px;
  height: 22px;
  margin-right: 5px;
`;

const Title = styled(Link)`
  font-size: 17px;
  font-weight: 500;
  margin-bottom: 5px;
  text-decoration: none;
  max-width: 100%;
  text-wrap: nowrap;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: black;
  &:hover {
    color: ${PINK};
  }
  &:focus {
    outline-color: #f9d4f6;
  }
`;

const SubtitleRow = styled(Row).attrs({
  align: 'center',
  justify: 'space-between',
  margin: '0 0 10px 0',
})`
  flex-wrap: wrap;

  > * {
    color: #9b9b9b;
    font-size: 14px;
  }
`;

const Subtitle = styled.h4`
  margin: 0;
  font-weight: 500;
  max-width: 100%;
  text-wrap: nowrap;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #9b9b9b;
`;

const Comments = styled(Row).attrs({ align: 'center' })`
  svg {
    margin-right: 4px;
  }
`;

const Badge = styled.span<{ label: TLabel }>`
  color: ${(props) => {
    switch (props.label) {
      case 'bug':
        return RED;
      case 'feature':
        return ORANGE;
      case 'question':
        return YELLOW;
      case 'enhancement':
        return GREEN;
      case 'help':
        return BLUE;
      case 'wontfix':
        return PURPLE;
      case 'duplicate':
        return PINK;
    }
  }};
  background-color: ${(props) => {
    switch (props.label) {
      case 'bug':
        return hexToRGB(RED, 0.1);
      case 'feature':
        return hexToRGB(ORANGE, 0.1);
      case 'question':
        return hexToRGB(YELLOW, 0.1);
      case 'enhancement':
        return hexToRGB(GREEN, 0.1);
      case 'help':
        return hexToRGB(BLUE, 0.1);
      case 'wontfix':
        return hexToRGB(PURPLE, 0.1);
      case 'duplicate':
        return hexToRGB(PINK, 0.1);
    }
  }};
  font-size: 13px;
  font-weight: 500;
  padding: 2px 6px;
  border-radius: 6px;
`;

// =============================================================================
// Typedefs
// =============================================================================

interface IssueListItemProps {
  title: string;
  number: number;
  status: TStatus;
  labels: TLabel[];
  commentsLength: number;
  createdDate: string;
  assigneeName?: string;
  assigneeAvatar?: string;
  createdByName?: string;
}

// =============================================================================
// Main Component
// =============================================================================

const IssueListItem = React.memo((props: IssueListItemProps) => {
  const { title, number, status, labels, commentsLength, createdDate, assigneeName, assigneeAvatar, createdByName } =
    props;

  return (
    <li>
      <StyledIssueListItem>
        <StatusBar status={status} />
        <Column padding="15px">
          {/* Title and Avatar */}
          <Row justify="space-between">
            <Title to={`/issue/${number}`}>{title}</Title>
            {assigneeAvatar && (
              <AssigneeAvatar src={assigneeAvatar} alt={`${assigneeName}'s avatar` || 'Issue assignee'} />
            )}
          </Row>
          {/* Timestamp and comment count */}
          <SubtitleRow>
            <Subtitle>
              #{number} opened {createdDate} {createdByName && `by ${createdByName}`}
            </Subtitle>
            <Comments>
              <CommentIcon />
              {commentsLength}
            </Comments>
          </SubtitleRow>
          {/* Labels */}
          <Row align="center">
            {labels.map((label) => (
              <Badge key={label} label={label}>
                {label}
              </Badge>
            ))}
          </Row>
        </Column>
      </StyledIssueListItem>
    </li>
  );
});

export default IssueListItem;
