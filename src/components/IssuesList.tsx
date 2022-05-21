import React from "react";

import IssueListItem from "./IssueListItem";

// =============================================================================
// Issue List
// =============================================================================

const IssuesList = React.memo(({ data, loading, error }) => (
  <>
    <h2>Issues List</h2>
    {loading ? (
      <span>Loading...</span>
    ) : error ? (
      <h3>{error}</h3>
    ) : data.length > 0 ? (
      <ul className="issues-list">
        {data.map((issue) => (
          <IssueListItem key={issue.id} {...issue} />
        ))}
      </ul>
    ) : (
      <div>No Issues...</div>
    )}
  </>
));

export default IssuesList;
