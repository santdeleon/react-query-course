import React from 'react';
import styled from 'styled-components';

import { IIssue } from '../../types';

import Spinner from '../../components/Spinner';
import SkeletonLoader from '../../components/SkeletonLoader';

import IssueListItem from './IssueListItem';

// =============================================================================
// Styled Components
// =============================================================================

const List = styled.ul`
  display: flex;
  flex-direction: column;
`;

// =============================================================================
// Typedefs
// =============================================================================

interface IssueListProps {
  data: IIssue[];
  loading: boolean;
  error: unknown;
}

// =============================================================================
// Main Component
// =============================================================================

const IssueList = React.memo((props: IssueListProps) => {
  const { data, loading, error } = props;

  return (
    <>
      {loading ? (
        <>
          {[1, 2, 3, 4].map((n) => (
            <SkeletonLoader key={n} width="100%" height="100px" borderRadius="6px" margin="0 0 15px 0" />
          ))}
        </>
      ) : error ? (
        <h3>{typeof error === 'string' && error}</h3>
      ) : data.length > 0 ? (
        <List>
          {data.map((issue) => (
            <IssueListItem key={issue.id} {...issue} />
          ))}
        </List>
      ) : (
        <div>No Issues...</div>
      )}
    </>
  );
});

export default IssueList;
