import React from 'react';
import { QueryClient } from 'react-query';
import styled from 'styled-components';

import { IComment, IUser } from '../../types';

import { relativeDate } from '../../utils';

import IssueCommentListItem from './IssueCommentListItem';

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
  comments: IComment[];
  userIDToUser: UserIDToUser;
  queryClient: QueryClient;
}

// =============================================================================
// Main Component
// =============================================================================

const IssueCommentList = React.memo((props: IssueListProps) => (
  <UnorderedList>
    {props.comments.map((comment) => {
      const commentCreator: IUser | undefined =
        props.queryClient.getQueryData(['users', comment.createdBy]) || props.userIDToUser.get(comment.createdBy);

      return (
        <IssueCommentListItem
          key={comment.id}
          avatar={commentCreator?.profilePictureUrl || 'https://placekitten.com/g/22/22'}
          createdByName={commentCreator?.name || comment.createdBy}
          createdDate={relativeDate(comment.createdDate)}
          comment={comment.comment}
        />
      );
    })}
  </UnorderedList>
));

export default IssueCommentList;
