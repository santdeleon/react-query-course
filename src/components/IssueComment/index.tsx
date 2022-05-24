import React from 'react';
import styled from 'styled-components';

import { IUser } from '../../types';

import { useUser } from '../../hooks';

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
  createdBy: string;
  createdDate: string;
  comment: string;
}

interface StatelessIssueCommentProps extends IssueCommentProps {
  user?: IUser;
  loading: boolean;
  error: unknown;
}

// =============================================================================
// Hooks
// =============================================================================

const useIssueCommentProps = (createdBy: string) => {
  // fetch user
  const userQuery = useUser(createdBy);
  const user = userQuery.data;

  return {
    user,
    loading: userQuery.isLoading,
    error: userQuery,
  };
};

// =============================================================================
// Stateless Issue Comment
// =============================================================================

const StatelessIssueComment = React.memo((props: StatelessIssueCommentProps) => {
  const { createdBy, createdDate, comment, user, loading, error } = props;
  const name = user?.name || createdBy;

  return (
    <StyledIssueComment>
      <Avatar src={user?.profilePictureUrl} alt={name} />
      <IssueCommentCard>
        <IssueCommentCardHeader>
          <Name>{name}</Name> commented {createdDate}
        </IssueCommentCardHeader>
        <IssueCommentCardBody>{comment}</IssueCommentCardBody>
      </IssueCommentCard>
    </StyledIssueComment>
  );
});

// =============================================================================
// Main Component
// =============================================================================

const IssueComment = React.memo((props: IssueCommentProps) => {
  const propsFromHook = useIssueCommentProps(props.createdBy);
  return <StatelessIssueComment {...propsFromHook} {...props} />;
});
export default IssueComment;
