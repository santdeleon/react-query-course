import React from "react";
import { Link } from "react-router-dom";
import { defaultLabels } from "../helpers/defaultData";
import { relativeDate } from "../helpers/relativeDate";

const IssueListItem = React.memo(
  ({
    id,
    title,
    number,
    assignee,
    comments,
    createdBy,
    createdDate,
    labels,
  }) => {
    const smallText = `#${number} opened ${relativeDate(
      createdDate
    )} by ${createdBy}`;

    return (
      <li key={id}>
        <div>
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 14 16"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
            style={{ color: "green" }}
          >
            <path
              fillRule="evenodd"
              d="M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"
            />
          </svg>
        </div>
        <div className="issue-content">
          <span>
            <Link to={`/issue/${number}`}>{title}</Link>
            {labels?.map((label) => {
              const currentLabel = defaultLabels.find((l) => l.name === label);
              return (
                <span key={id} className={`label ${currentLabel?.color}`}>
                  {label}
                </span>
              );
            })}
          </span>
          <small>{smallText}</small>
        </div>
        {assignee && (
          <img
            className="assigned-to"
            src={`https://res.cloudinary.com/uidotdev/image/twitter_name/${assignee}`}
            alt="Avatar of the assignee to this issue"
          />
        )}
        <span className="comment-count">
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 16 16"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M14 1H2c-.55 0-1 .45-1 1v8c0 .55.45 1 1 1h2v3.5L7.5 11H14c.55 0 1-.45 1-1V2c0-.55-.45-1-1-1zm0 9H7l-2 2v-2H2V2h12v8z"
            />
          </svg>
          {comments.length}
        </span>
      </li>
    );
  }
);

export default IssueListItem;
