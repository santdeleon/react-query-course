import React from 'react';
import styled from 'styled-components';

import { IIssue } from '../../types';

import SkeletonLoader from '../../components/SkeletonLoader';
import Row from '../../components/Row';

import IssueListItem from './IssueListItem';

// =============================================================================
// Styled Components
// =============================================================================

const List = styled.ul`
  display: flex;
  flex-direction: column;
`;

const PaginationButton = styled.button<{ margin?: string }>`
  position: relative;
  cursor: pointer;
  display: block;
  color: #fff;
  margin: ${(props) => props.margin};
  padding: 5px 10px;
  font-weight: 600;
  background-color: #ef70e2;
  border-color: #bc49b1;
  box-shadow: 0 2px 0 0 #bc49b1;
  text-align: center;
  text-decoration: none;
  vertical-align: middle;
  border-width: 2px;
  border-style: solid;
  border-radius: 6px;
  -webkit-border-radius: 6px;
  -moz-border-radius: 6px;
  overflow: visible;
  white-space: nowrap;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  transform: translateY(0);
  &:hover {
    background-color: #d660c8;
    border-color: #bc47af;
    box-shadow: #bc47af;
  }
  &:focus-visible:not(:active) {
    outline-width: 3px;
    outline-style: solid;
    outline-color: #f9d4f6;
  }
  &:active {
    box-shadow: 0 0 0 0 #bc47af;
    transform: translateY(0.14rem);
  }
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

const IssueList = React.memo((props: IssueListProps) => (
  <>
    {props.loading ? (
      <>
        {[1, 2, 3, 4].map((n) => (
          <SkeletonLoader key={n} width="100%" height="100px" borderRadius="6px" margin="0 0 15px 0" />
        ))}
      </>
    ) : props.error ? (
      <h3>Failed to fetch issues</h3>
    ) : props.data.length > 0 ? (
      <List>
        {props.data.map((issue) => (
          <IssueListItem key={issue.id} {...issue} />
        ))}
        <Row width="100%" align="center" justify="center" margin="0 0 20px 0">
          <PaginationButton margin="0 25px 0 0">Previous</PaginationButton> Page 1
          <PaginationButton margin="0 0 0 25px">Next</PaginationButton>
        </Row>
      </List>
    ) : (
      <div>No Issues...</div>
    )}
  </>
));

export default IssueList;
