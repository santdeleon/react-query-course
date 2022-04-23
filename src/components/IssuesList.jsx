import React from "react";
import IssueListItem from "./IssueListItem";

const IssuesList = React.memo(({ issues }) => (
  <>
    <h2>Issues List</h2>
    <ul className="issues-list">
      {issues.map(issue => <IssueListItem key={issue.id} {...issue} />)}
    </ul>
  </>
))

export default IssuesList;
