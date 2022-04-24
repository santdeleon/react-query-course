import React from "react";
import { useQuery } from "react-query";

// =============================================================================
// Issue Comment
// =============================================================================

const IssueComment = React.memo((props) => (
  <div className="comment">
    <img src={props.avatar} alt="Commenter avatar" />
    <div>
      <div className="comment-header">
        <span>{props.createdBy}</span> commented {props.createdDate}
      </div>
      <div className="comment-body">{props.comment}</div>
    </div>
  </div>
));

export default IssueComment;
