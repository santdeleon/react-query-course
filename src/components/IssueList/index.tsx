import React from 'react';
import { useQueryClient } from 'react-query';
import styled from 'styled-components';

import { IIssue, IUser } from '../../types';

import { relativeDate } from '../../utils';

import { fetchIssueComments, fetchMultipleUsers } from '../../hooks';

import { RED } from '../../constants';

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

const ErrorMessage = styled.p`
  margin: 0;
  color: ${RED};
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

const IssueList = React.memo((props: IssueListProps) => {
  const queryClient = useQueryClient();

  return props.loading ? (
    <List>
      {[1, 2, 3, 4].map((n) => (
        <li key={n}>
          <SkeletonLoader width="100%" height="100px" borderRadius="6px" backgroundColor="#FFF" />
        </li>
      ))}
    </List>
  ) : props.error ? (
    <ErrorMessage>Failed to fetch issues</ErrorMessage>
  ) : props.data.issues.length > 0 ? (
    <List>
      {props.data.issues.map((issue) => {
        const assignee = props.data.userIDToUser.get(issue.assignee);
        const createdBy = props.data.userIDToUser.get(issue.createdBy);

        const prefetchIssueComments = async () => {
          await queryClient.prefetchQuery(['issues', issue.number, 'comments'], async () => {
            return fetchIssueComments(issue.number);
          });
        };

        const prefetchIssueUsers = async () => {
          const ids: string[] = [];

          if (assignee?.id) ids.push(assignee.id);
          if (createdBy?.id) ids.push(createdBy.id);
          if (ids.length > 0) await queryClient.prefetchQuery(['users', ids], async () => fetchMultipleUsers(ids));
        };

        return (
          <IssueListItem
            key={issue.id}
            title={issue.title}
            number={issue.number}
            status={issue.status}
            labels={issue.labels}
            createdDate={relativeDate(issue.createdDate)}
            commentsLength={issue.comments.length}
            assigneeName={assignee?.name}
            assigneeAvatar={assignee?.profilePictureUrl}
            createdByName={createdBy?.name}
            onMouseEnter={() => {
              prefetchIssueComments();
              prefetchIssueUsers();
            }}
          />
        );
      })}
    </List>
  ) : (
    <div>No issues...</div>
  );
});

export default IssueList;
