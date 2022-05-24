import React from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';

import { relativeDate, capitalizeFirstLetter } from '../utils';

import { IComment, IIssue, IUser } from '../types';

import { useIssueAndComments, useUser } from '../hooks';

import IssueDetails from '../components/IssueDetails';
import IssueDetailsSkeletonLoader from '../components/IssueDetails/IssueDetailsSkeletonLoader';
import IssueComment from '../components/IssueComment';
import Row from '../components/Row';
import Column from '../components/Column';

// =============================================================================
// Styled Components
// =============================================================================

const Island = styled.div`
  position: relative;
  margin: 0 auto;
  padding: 20px;
  border-radius: 16px;
  border-width: 2px 2px 4px;
  border-style: solid;
  border-color: #e8e8e8;
  max-width: 600px;
`;

const IslandHeader = styled(Row).attrs({
  align: 'flex-start',
  margin: '0 0 20px 0',
  padding: '0 0 20px 0',
})`
  border-bottom: 2px solid #e8e8e8;
`;

const IslandBody = styled(Row).attrs({
  justify: 'space-between',
})``;

const CommentsContainer = styled(Column)``;

// =============================================================================
// Typedefs
// =============================================================================

interface IssueProps {
  data: {
    number?: string;
    issue?: IIssue;
    user?: IUser;
    comments?: IComment[];
  };
  loading: boolean;
  issueError: unknown;
  userError: unknown;
}

// =============================================================================
// Hooks
// =============================================================================

const useIssueProps = () => {
  const { number } = useParams();

  // fetch issue
  const issueAndCommentsQuery = useIssueAndComments(number);
  const [issue, comments] = issueAndCommentsQuery.data ?? [];

  // fetch user
  const userQuery = useUser(issue?.createdBy);
  const user = userQuery.data;

  return {
    data: {
      number,
      issue,
      user,
      comments,
    },
    loading: issueAndCommentsQuery.isLoading || userQuery.isLoading,
    issueError: issueAndCommentsQuery.error,
    userError: userQuery.error,
  };
};

// =============================================================================
// Stateless Issue
// =============================================================================

const StatelessIssue = React.memo((props: IssueProps) => {
  const { data, loading, issueError, userError } = props;
  const { number, issue, user, comments } = data;

  if (issueError) {
    return <div>Failed to find issue {number}</div>;
  }

  return (
    <Island>
      <IslandHeader>
        {loading ? (
          <IssueDetailsSkeletonLoader />
        ) : issue ? (
          <IssueDetails
            number={number}
            title={issue.title}
            subtitle={`${user?.name || issue.createdBy} opened this issue ${relativeDate(issue.createdDate)} · ${
              issue.comments.length
            } comments`}
            status={issue.status.length > 0 ? capitalizeFirstLetter(issue.status) : issue.status}
          />
        ) : null}
      </IslandHeader>
      <IslandBody>
        <CommentsContainer>
          {comments && (
            <>
              {comments.map((comment) => (
                <IssueComment
                  key={comment.id}
                  createdBy={comment.createdBy}
                  createdDate={relativeDate(comment.createdDate)}
                  comment={comment.comment}
                />
              ))}
            </>
          )}
        </CommentsContainer>

        <aside>
          <div className="issue-options">
            <div>
              <span>Status</span>
            </div>
          </div>
          <div className="issue-options">
            <div>
              <span>Assignment</span>
            </div>
          </div>
          <div className="issue-options">
            <div>
              <span>Labels</span>
            </div>
          </div>
        </aside>
      </IslandBody>
    </Island>
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
