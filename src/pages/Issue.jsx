import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";

import IssueDetails from "../components/IssueDetails";
import IssueComment from "../components/IssueComment";

import { relativeDate } from "../helpers/relativeDate";

// =============================================================================
// Utils
// =============================================================================

const capitalizeFirstLetter = (str) => {
  if (!str) return;
  return str.charAt(0).toUpperCase() + str.slice(1);
};

// =============================================================================
// Hooks
// =============================================================================

const useIssueProps = () => {
  const { number } = useParams();

  // fetch issues
  const issuesQuery = useQuery(
    ["issues"],
    async () => await (await fetch("/api/issues")).json()
  );
  const issues = issuesQuery.data ?? [];

  // fetch comments
  const commentsQuery = useQuery(
    ["comments", number],
    async () => await (await fetch(`/api/issues/${number}/comments`)).json()
  );
  const comments = commentsQuery.data ?? [];

  const currentIssue = issues.find((issue) => issue.number === +number);
  const formattedStatus = currentIssue
    ? capitalizeFirstLetter(currentIssue.status)
    : undefined;
  const formattedDate = currentIssue
    ? relativeDate(currentIssue.createdDate)
    : undefined;
  const statusLabel = currentIssue
    ? `opened this issue ${formattedDate} · ${comments.length} comments`
    : undefined;

  const error = issuesQuery.error || issuesQuery.error;
  const loading =
    issuesQuery.isLoading ||
    issuesQuery.isFetching ||
    commentsQuery.isLoading ||
    commentsQuery.isFetching;

  return {
    data: {
      number,
      title: currentIssue?.title,
      status: formattedStatus,
      createdBy: currentIssue?.createdBy,
      createdDate: formattedDate,
      statusLabel,
      comments,
    },
    loading,
    error,
  };
};

// =============================================================================
// Issue
// =============================================================================

const StatelessIssue = React.memo((props) => {
  const { number, title, status, createdBy, statusLabel, comments } = props;

  return (
    <>
      <IssueDetails
        number={number}
        title={title}
        status={status}
        createdBy={createdBy}
        statusLabel={statusLabel}
      />
      <main>
        <section>
          {comments.map(({ id, createdBy, createdDate, comment }) => (
            <IssueComment
              key={id}
              avatar={`https://res.cloudinary.com/uidotdev/image/twitter_name/${createdBy}`}
              createdBy={createdBy}
              createdDate={relativeDate(createdDate)}
              comment={comment}
            />
          ))}
        </section>
      </main>
    </>
  );
});

const Issue = () => {
  const props = useIssueProps();

  if (props.loading) {
    return <div>Loading...</div>;
  }

  if (props.error) {
    return <div>Error...</div>;
  }
  return <StatelessIssue {...props.data} />;
};

export default Issue;
