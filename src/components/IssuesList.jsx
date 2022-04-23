import React, { useCallback } from "react";
import { useQuery } from "react-query";

import IssueListItem from "./IssueListItem";

const API_URI = "/api/issues";

const IssuesList = () => {
  const fetchIssues = async () => await (await fetch(API_URI)).json();

  const issuesQuery = useQuery(["issues"], fetchIssues);
  const { data, isLoading, isFetching, isError, error } = issuesQuery;
  const loading = isLoading || isFetching;

  return (
    <>
      <h2>Issues List</h2>
      {loading ? (
        <span>Loading...</span>
      ) : isError ? (
        <h3>{error}</h3>
      ) : data ? (
        <ul className="issues-list">
          {data.map((issue) => {
            console.log(issue);
            return <IssueListItem key={issue.id} {...issue} />;
          })}
        </ul>
      ) : null}
    </>
  );
};

export default IssuesList;
