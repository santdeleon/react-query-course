import React, { useState, useCallback, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

import { TLabel, TStatus, IIssue, ILabel, IUser } from '../types';

import { useIssues, useIssuesByQuery, useLabels, useMultipleUsers } from '../hooks';

import IssueList from '../components/IssueList';
import Row from '../components/Row';
import Column from '../components/Column';
import LabelList from '../components/LabelList';
import StatusSelect from '../components/StatusSelect';

// =============================================================================
// Styled Components
// =============================================================================

const Header = styled(Column).attrs({
  padding: '20px',
})`
  border-bottom: 2px solid #e8e8e8;
`;

const Title = styled.h2`
  margin: 0 15px 0 0;
`;

const CreateIssueButton = styled(Link).attrs({
  to: '/add',
})`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  width: 32px;
  height: 32px;
  margin: 0;
  font-weight: 600;
  background-color: #ef70e2;
  border-color: #bc49b1;
  box-shadow: 0 2px 0 0 #bc49b1;
  position: absolute;
  top: -10px;
  right: -10px;
  text-align: center;
  text-decoration: none;
  vertical-align: middle;
  font-size: 20px;
  border-width: 2px;
  border-style: solid;
  border-radius: 50%;
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
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

const Body = styled(Column).attrs({
  align: 'center',
})<{ isLoading: boolean }>`
  padding: 20px;
  background-color: ghostwhite;
  border-radius: ${({ isLoading }) => isLoading && '0 0 10px 10px'};
`;

const Footer = styled(Row).attrs({
  width: '100%',
  align: 'center',
  justify: 'center',
  padding: '20px 0',
})`
  border-top: 2px solid #e8e8e8;
  border-radius: 0 0 14px 14px;
  background-color: #fff;
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

type LabelFilters = Set<TLabel>;

type StatusFilter = TStatus | 'default';

type UserIDToUser = Map<string, IUser>;

interface HomeProps {
  data: {
    labels: ILabel[];
    labelFilters: LabelFilters;
    status: StatusFilter;
    issues: IIssue[];
    userIDToUser: UserIDToUser;
    toggleLabelFilter: (label: TLabel) => void;
    handleStatusSelect: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  };
  loading: boolean;
  labelsError: unknown;
  issuesError: unknown;
}

// =============================================================================
// Hooks
// =============================================================================

const useHomeProps = () => {
  // setup filters
  const [labelFilters, setLabelFilters] = useState<LabelFilters>(new Set());
  const [status, setStatus] = useState<StatusFilter>('default');

  // fetch labels
  const labelsQuery = useLabels();
  const labels = labelsQuery.data ?? [];

  // fetch issues
  // sort to prevent redundant calls to the same data based on label position in api call
  const issuesQuery = useIssues({ labels: [...labelFilters].sort(), status });
  const issues = issuesQuery.data ?? [];

  // check for a search query
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('search');

  // fetch issues by query
  const searchedIssuesQuery = useIssuesByQuery(searchQuery);
  const issuesByQuery = searchedIssuesQuery.data;

  const result = searchQuery ? issuesByQuery?.items ?? [] : issues;
  const resultUsers =
    searchQuery && issuesByQuery
      ? [...new Set(issuesByQuery.items.flatMap((item) => [item.assignee, item.createdBy]))]
      : [...new Set(issues.flatMap((r) => [r.assignee, r.createdBy]))];

  // fetch and format user data
  const usersQuery = useMultipleUsers(resultUsers);
  const users = usersQuery.data ?? [];
  const userIDToUser = useMemo(() => new Map(users.map((user) => [user.id, user])), [users]);

  const toggleLabelFilter = useCallback(
    (label: TLabel) => {
      labelFilters.has(label) ? labelFilters.delete(label) : labelFilters.add(label);
      setLabelFilters(new Set(labelFilters));
      if (searchParams) setSearchParams({});
    },
    [labelFilters, setLabelFilters],
  );

  const handleStatusSelect = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => setStatus(e.currentTarget.value as TStatus),
    [setStatus],
  );

  return {
    data: {
      labels,
      labelFilters,
      status,
      issues: result,
      userIDToUser,
      toggleLabelFilter,
      handleStatusSelect,
    },
    loading: labelsQuery.isLoading || issuesQuery.isLoading || usersQuery.isLoading,
    labelsError: labelsQuery.error,
    issuesError: issuesQuery.error,
  };
};

// =============================================================================
// Main Component
// =============================================================================

const StatelessHome = React.memo((props: HomeProps) => (
  <>
    <CreateIssueButton>+</CreateIssueButton>
    <Header>
      <Row align="center" margin="0 0 10px 0">
        <Title>Issues</Title>
        <StatusSelect status={props.data.status} handleChange={props.data.handleStatusSelect} />
      </Row>
      <LabelList
        data={{
          labels: props.data.labels,
          labelFilters: props.data.labelFilters,
          toggleLabelFilter: props.data.toggleLabelFilter,
        }}
        loading={props.loading}
        error={props.labelsError}
      />
    </Header>
    <Body isLoading={props.loading}>
      <IssueList
        data={{
          issues: props.data.issues,
          userIDToUser: props.data.userIDToUser,
        }}
        loading={props.loading}
        error={props.issuesError}
      />
    </Body>
    {!props.loading && (
      // TODO: Hook these up to pagination
      <Footer>
        <PaginationButton margin="0 25px 0 0">Previous</PaginationButton>
        <span>Page 1</span>
        <PaginationButton margin="0 0 0 25px">Next</PaginationButton>
      </Footer>
    )}
  </>
));

// =============================================================================
// Home
// =============================================================================

const Home = () => {
  const props = useHomeProps();
  return <StatelessHome {...props} />;
};

export default Home;
