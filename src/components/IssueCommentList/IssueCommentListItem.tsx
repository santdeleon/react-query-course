import React from 'react';
import styled from 'styled-components';

import Row from '../Row';
import Column from '../Column';

// =============================================================================
// Typedefs
// =============================================================================

const ListItem = styled.li`
  display: flex;
  align-items: center;
`;

const Avatar = styled.img.attrs({
  width: 36,
})`
  border-radius: 50%;
  margin-right: 10px;
`;

const Card = styled(Column).attrs({
  justify: 'center',
})`
  border: 2px solid #e8e8e8;
  border-radius: 6px;
  min-width: 300px;
  max-width: 300px;
`;

const CardHeader = styled(Row).attrs({
  align: 'center',
})`
  padding: 8px;
  background-color: #f7f4f4;
  border-bottom: 1px solid #e8e8e8;
  border-radius: 4px 4px 0 0;
`;

const CardBody = styled(Row)`
  padding: 8px;
  background-color: #fff;
  border-radius: 0 0 4px 4px;
`;

const Name = styled.span`
  color: #000;
  font-weight: 500;
  margin-right: 3px;
`;

// =============================================================================
// Typedefs
// =============================================================================

interface IssueCommentListItemProps {
  avatar: string;
  createdByName: string;
  createdDate: string;
  comment: string;
}

// =============================================================================
// Main Component
// =============================================================================

const IssueCommentListItem = React.memo((props: IssueCommentListItemProps) => {
  const { avatar, createdByName, createdDate, comment } = props;

  return (
    <ListItem>
      <Avatar src={avatar} alt={createdByName} />
      <Card>
        <CardHeader>
          <Name>{createdByName}</Name> commented {createdDate}
        </CardHeader>
        <CardBody>{comment}</CardBody>
      </Card>
    </ListItem>
  );
});

export default IssueCommentListItem;
