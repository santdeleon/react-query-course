import React from 'react';
import styled from 'styled-components';

import Badge from '../Badge';
import Row from '../Row';
import Column from '../Column';

// =============================================================================
// Styled Components
// =============================================================================

const Title = styled.h2`
  margin: 0 15px 0 0;
`;

const Subtitle = styled.p`
  color: #918f8f;
  margin: 0;
`;

const IssueNumber = styled.h3`
  margin: 0;
  color: #bfbdbd;
`;

// =============================================================================
// Typedefs
// =============================================================================

interface IssueDetailsProps {
  number?: string;
  title: string;
  status: string;
  subtitle: string;
}

// =============================================================================
// Issue Details
// =============================================================================

const IssueDetails = React.memo((props: IssueDetailsProps) => (
  <Column width="100%">
    <Row width="100%" align="center" justify="space-between" margin="0 0 10px 0">
      <IssueNumber>#{props.number}</IssueNumber>
      <Badge color="#d2d2d2" isActive={false}>
        {props.status}
      </Badge>
    </Row>
    <Title>{props.title}</Title>
    <Subtitle>{props.subtitle}</Subtitle>
  </Column>
));

export default IssueDetails;
