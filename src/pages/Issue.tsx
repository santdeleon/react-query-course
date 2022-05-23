import React, { useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';

import IssueDetails from '../components/IssueDetails';
import IssueComment from '../components/IssueComment';

import { relativeDate, capitalizeFirstLetter } from '../utils';

import { TIssue, TComment } from '../types';

// =============================================================================
// Hooks
// =============================================================================

const useIssueProps = () => {
  const { number } = useParams();

  // fetch issue
  const fetchIssue = useCallback(
    async (): Promise<TIssue> => await (await fetch(`/api/issues/${number}`)).json(),
    [number],
  );
  const issuesQuery = useQuery(['issues', number], fetchIssue);
  const issue = issuesQuery.data;

  // fetch comments
  const fetchComments = useCallback(
    async (): Promise<TComment[]> => await (await fetch(`/api/issues/${number}/comments`)).json(),
    [number],
  );
  const commentsQuery = useQuery(['comments', number], fetchComments);
  const comments = commentsQuery.data ?? [];

  // format props
  const status = issue ? capitalizeFirstLetter(issue.status) : undefined;
  const createdDate = issue ? relativeDate(issue.createdDate) : undefined;
  const statusLabel = `opened this issue ${createdDate} · ${comments.length} comments`;

  const error = issuesQuery.error || commentsQuery.error;
  const loading = !issuesQuery.isFetched || !commentsQuery.isFetched;

  return {
    data: {
      number,
      title: issue?.title,
      status,
      createdBy: issue?.createdBy,
      createdDate,
      statusLabel,
      comments,
    },
    loading,
    error,
  };
};

// =============================================================================
// Typedefs
// =============================================================================

interface IssueProps {
  number: number;
  title?: string;
  status?: string;
  createdBy?: string;
  createdDate?: string;
  statusLabel: string;
  comments: TComment[];
}

// =============================================================================
// Stateless Issue
// =============================================================================

const StatelessIssue = React.memo((props: IssueProps) => {
  const { number, title, status, createdBy, statusLabel, comments } = props;

  return (
    <>
      <IssueDetails number={number} title={title} status={status} createdBy={createdBy} statusLabel={statusLabel} />
      <main>
        {/* <section>
          {comments.map(({ id, createdBy, createdDate, comment }) => (
            <IssueComment
              key={id}
              avatar={`https://res.cloudinary.com/uidotdev/image/twitter_name/${createdBy}`}
              createdBy={createdBy}
              createdDate={relativeDate(createdDate)}
              comment={comment}
            />
          ))}
        </section> */}
        {/* <aside>
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
        </aside> */}
      </main>
    </>
  );
});

// =============================================================================
// Issue
// =============================================================================

const Issue = () => {
  const props: any = useIssueProps();

  return props.loading ? (
    <div>Loading...</div>
  ) : props.error ? (
    <div>{props.error}</div>
  ) : (
    <StatelessIssue {...props.data} />
  );
};

export default Issue;
