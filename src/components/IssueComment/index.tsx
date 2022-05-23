import React from 'react';

// =============================================================================
// Typedefs
// =============================================================================

interface IssueCommentProps {
  avatar: string;
  createdBy: string;
  createdDate: string;
  comment: string;
}

// =============================================================================
// Issue Comment
// =============================================================================

const IssueComment = React.memo((props: IssueCommentProps) => (
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
