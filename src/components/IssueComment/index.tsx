import React from 'react';
import styled from 'styled-components';

import Row from '../Row';
import Column from '../Column';

// =============================================================================
// Typedefs
// =============================================================================

const StyledIssueComment = styled(Row).attrs({
  align: 'center',
  margin: ' 0 0 15px 0',
})``;

const Avatar = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 10px;
`;

const IssueCommentCard = styled(Column).attrs({
  justify: 'center',
})`
  border: 2px solid #e8e8e8;
  border-radius: 6px;
  min-width: 300px;
  max-width: 300px;
`;

const IssueCommentCardHeader = styled(Row).attrs({
  align: 'center',
})`
  padding: 8px;
  background-color: ghostwhite;
  border-bottom: 1px solid #e8e8e8;
  border-radius: 4px 4px 0 0;
`;

const Name = styled.span`
  color: #000;
  font-weight: 500;
  margin-right: 3px;
`;

const IssueCommentCardBody = styled(Row)`
  padding: 8px;
`;

// =============================================================================
// Typedefs
// =============================================================================

interface IssueCommentProps {
  avatar: string;
  createdByName: string;
  createdDate: string;
  comment: string;
}

// =============================================================================
// Main Component
// =============================================================================

const IssueComment = React.memo((props: IssueCommentProps) => {
  const { avatar, createdByName, createdDate, comment } = props;

  return (
    <StyledIssueComment>
      <Avatar src={avatar} alt={createdByName} />
      <IssueCommentCard>
        <IssueCommentCardHeader>
          <Name>{createdByName}</Name> commented {createdDate}
        </IssueCommentCardHeader>
        <IssueCommentCardBody>{comment}</IssueCommentCardBody>
      </IssueCommentCard>
    </StyledIssueComment>
  );
});

export default IssueComment;
