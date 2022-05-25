import React, { useMemo } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';

import { relativeDate, capitalizeFirstLetter } from '../utils';

import { IComment, IIssue, IUser } from '../types';

import { useIssueAndComments, useMultipleUsers } from '../hooks';

import IssueDetails from '../components/IssueDetails';
import IssueDetailsSkeletonLoader from '../components/IssueDetails/IssueDetailsSkeletonLoader';
import IssueComment from '../components/IssueComment';
import Column from '../components/Column';
import IssueCommentSkeletonLoader from '../components/IssueComment/IssueCommentSkeletonLoader';

// =============================================================================
// Styled Components
// =============================================================================

const Header = styled(Column).attrs({
  padding: '20px',
})`
  border-bottom: 2px solid #e8e8e8;
`;

const Body = styled(Column).attrs({})`
  padding: 20px;
  background-color: #fff;
  border-radius: 0 0 14px 14px;
`;

// =============================================================================
// Typedefs
// =============================================================================

type UserIDToUser = Map<string, IUser>;

interface IssueProps {
  data: {
    number?: string;
    issue?: IIssue;
    comments?: IComment[];
    userIDToUser: UserIDToUser;
  };
  loading: boolean;
  issueError: unknown;
  usersError: unknown;
}

// =============================================================================
// Hooks
// =============================================================================

const useIssueProps = () => {
  const { number } = useParams();

  // fetch issue
  const issueAndCommentsQuery = useIssueAndComments(number);
  const [issue, comments] = issueAndCommentsQuery.data ?? [];

  // fetch and format user data
  const issueIDs = issue ? [issue.assignee, issue.createdBy] : [];
  const commentIDs = comments ? comments.map((c) => c.createdBy) : [];
  const userIDSet = new Set([...issueIDs].concat(commentIDs));
  const usersQuery = useMultipleUsers([...userIDSet].filter(Boolean));
  const users = usersQuery.data ?? [];
  const userIDToUser = useMemo(() => new Map(users.map((user) => [user.id, user])), [users]);

  return {
    data: {
      number,
      issue,
      comments,
      userIDToUser,
    },
    loading: issueAndCommentsQuery.isLoading || usersQuery.isLoading,
    issueError: issueAndCommentsQuery.error,
    usersError: usersQuery.error,
  };
};

// =============================================================================
// Stateless Issue
// =============================================================================

const StatelessIssue = React.memo((props: IssueProps) => {
  const { data, loading, issueError, usersError } = props;
  const { number, issue, userIDToUser, comments } = data;

  // TODO: this isn't quite right
  if (issueError) {
    return <div>Failed to find issue {number}</div>;
  }

  return (
    <>
      <Header>
        {loading ? (
          <IssueDetailsSkeletonLoader />
        ) : issue ? (
          <IssueDetails
            number={number}
            title={issue.title}
            status={issue.status}
            createdBy={userIDToUser.get(issue.createdBy)?.name || issue.createdBy}
            createdDate={relativeDate(issue.createdDate)}
            commentsLength={issue.comments.length}
          />
        ) : null}
      </Header>
      <Body>
        {loading
          ? [1, 2, 3, 4].map((n) => <IssueCommentSkeletonLoader key={n} />)
          : comments && (
              <>
                {comments.map((comment) => (
                  <IssueComment
                    key={comment.id}
                    avatar={userIDToUser.get(comment.createdBy)?.profilePictureUrl}
                    createdBy={userIDToUser.get(comment.createdBy)?.name || comment.createdBy}
                    createdDate={relativeDate(comment.createdDate)}
                    comment={comment.comment}
                  />
                ))}
              </>
            )}
      </Body>
    </>
  );
});

// =============================================================================
// Issue
// =============================================================================

const Issue = () => {
  const props = useIssueProps();
  return <StatelessIssue {...props} />;
};

export default Issue;
