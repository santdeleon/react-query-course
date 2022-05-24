import React from 'react';
import styled from 'styled-components';

import { IIssue, IUser } from '../../types';

import { relativeDate } from '../../utils';

import SkeletonLoader from '../../components/SkeletonLoader';

import IssueListItem from './IssueListItem';

// =============================================================================
// Styled Components
// =============================================================================

const List = styled.ul`
  display: flex;
  flex-direction: column;
  li {
    &:not(:last-child) {
      margin-bottom: 20px;
    }
  }
`;

// =============================================================================
// Typedefs
// =============================================================================

type UserIDToUser = Map<string, IUser>;

interface IssueListProps {
  data: {
    issues: IIssue[];
    userIDToUser: UserIDToUser;
  };
  loading: boolean;
  error: unknown;
}

// =============================================================================
// Main Component
// =============================================================================

const IssueList = React.memo((props: IssueListProps) =>
  props.loading ? (
    <List>
      {[1, 2, 3, 4].map((n) => (
        <li key={n}>
          <SkeletonLoader width="100%" height="100px" borderRadius="6px" backgroundColor="#FFF" />
        </li>
      ))}
    </List>
  ) : props.error ? (
    <h3>Failed to fetch issues</h3>
  ) : props.data.issues.length > 0 ? (
    <List>
      {props.data.issues.map((issue) => {
        const assignee = props.data.userIDToUser.get(issue.assignee);
        const createdBy = props.data.userIDToUser.get(issue.createdBy);
        return (
          <IssueListItem
            key={issue.id}
            title={issue.title}
            number={issue.number}
            labels={issue.labels}
            createdDate={relativeDate(issue.createdDate)}
            commentsLength={issue.comments.length}
            assigneeName={assignee?.name}
            assigneeAvatar={assignee?.profilePictureUrl}
            createdByName={createdBy?.name}
          />
        );
      })}
    </List>
  ) : (
    <div>No issues...</div>
  ),
);

export default IssueList;
