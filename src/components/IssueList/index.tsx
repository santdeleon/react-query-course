import React from 'react';
import { useQueryClient } from 'react-query';
import styled from 'styled-components';

import { IIssue, IUser } from '../../types';

import { relativeDate } from '../../utils';

import { fetchIssueComments } from '../../hooks';

import IssueListItem from './IssueListItem';

// =============================================================================
// Styled Components
// =============================================================================

const UnorderedList = styled.ul`
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
  issues: IIssue[];
  userIDToUser: UserIDToUser;
}

// =============================================================================
// Main Component
// =============================================================================

const IssueList = React.memo((props: IssueListProps) => {
  const { issues, userIDToUser } = props;
  const queryClient = useQueryClient();

  return (
    <UnorderedList>
      {issues.map((issue) => {
        const assignee = userIDToUser.get(issue.assignee);
        const createdBy = userIDToUser.get(issue.createdBy);

        const prefetchIssueComments = async () => {
          await queryClient.prefetchInfiniteQuery(['issues', issue.number, 'comments'], async () => {
            return fetchIssueComments(issue.number, 1);
          });
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
            onMouseEnter={prefetchIssueComments}
          />
        );
      })}
    </UnorderedList>
  );
});

export default IssueList;
