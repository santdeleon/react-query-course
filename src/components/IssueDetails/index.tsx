import React from 'react';

// =============================================================================
// Typedefs
// =============================================================================

interface IssueDetailsProps {
  title: string;
  number: number;
  status?: string;
  createdBy: string;
  statusLabel: string;
}

// =============================================================================
// Issue Details
// =============================================================================

const IssueDetails = React.memo((props: IssueDetailsProps) => (
  <div className="issue-details">
    <header>
      <h2>
        {props.title} <span>#{props.number}</span>
      </h2>
      <div>
        <span className="open">
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 14 16"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"
            />
          </svg>
          {props.status && props.status}
        </span>
        <span className="created-by">{props.createdBy}</span>
        {props.statusLabel}
      </div>
    </header>
  </div>
));

export default IssueDetails;