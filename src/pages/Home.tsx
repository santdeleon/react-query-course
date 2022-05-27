import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { useQueryClient } from 'react-query';

import { Link, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

import { TLabel, TStatus, IIssue, ILabel, IUser } from '../types';

import { useIssues, fetchIssues, useIssuesByQuery, useLabels, useUsers } from '../hooks';

import { RED } from '../constants';

import IssueList from '../components/IssueList';
import Row from '../components/Row';
import Column from '../components/Column';
import LabelList from '../components/LabelList';
import StatusSelect from '../components/StatusSelect';
import Spinner from '../components/Spinner';
import SkeletonLoader from '../components/SkeletonLoader';

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

const UnorderedList = styled.ul`
  display: flex;
  flex-direction: column;
  li {
    &:not(:last-child) {
      margin-bottom: 20px;
    }
  }
`;

const ErrorMessage = styled.p`
  margin: 0;
  color: ${RED};
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
  opacity: ${(props) => (props.disabled ? '0.5' : '1')};
  pointer-events: ${(props) => (props.disabled ? 'none' : 'default')};
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
    isPreviousData: boolean;
    labels: ILabel[];
    labelFilters: LabelFilters;
    status: StatusFilter;
    issues: IIssue[];
    userIDToUser: UserIDToUser;
    page: number;
    changePage: (action: 'prev' | 'next') => void;
    toggleLabelFilter: (label: TLabel) => void;
    handleStatusSelect: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  };
  isLoadingIssues: boolean;
  isLoadingUsers: boolean;
  isFetchingIssues: boolean;
  error: unknown;
}

// =============================================================================
// Constants
// =============================================================================

// =============================================================================
// Hooks
// =============================================================================

const useHomeProps = () => {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);

  // setup filters
  const [labelFilters, setLabelFilters] = useState<LabelFilters>(new Set());
  const [status, setStatus] = useState<StatusFilter>('default');

  // fetch labels
  const labelsQuery = useLabels();
  const labels = labelsQuery.data ?? [];

  // fetch issues
  /**
   * sort to prevent redundant calls to the same data based on label position in api call
   * Example:
   * fetch(/api/issues?labels=["bug", "question"]) returns the same data as -> fetch(/api/issues?labels=["question", "bug"])
   * but they make 2 API calls and thus send the app into loading for no reason
   */
  const issuesQuery = useIssues({ page, labels: [...labelFilters].sort(), status });
  const issues = issuesQuery.data ?? [];

  // check for a search query
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('search');

  // fetch issues by query
  const searchedIssuesQuery = useIssuesByQuery(searchQuery);
  const issuesByQuery = searchedIssuesQuery.data;

  const result = searchQuery ? issuesByQuery?.items ?? [] : issues;

  // fetch all users
  const usersQuery = useUsers();
  const users = usersQuery.data ?? [];
  const userIDToUser = useMemo(() => new Map(users.map((user) => [user.id, user])), [users]);

  const changePage = useCallback(
    (action: 'prev' | 'next') => {
      const prevPage = page;
      if (action === 'prev') {
        if (page - 1 > 0) {
          setPage(prevPage - 1);
        }
      } else {
        if (result.length !== 0) {
          setPage(prevPage + 1);
        }
      }
    },
    [page, setPage, result],
  );

  const toggleLabelFilter = useCallback(
    (label: TLabel) => {
      setPage(1);
      labelFilters.has(label) ? labelFilters.delete(label) : labelFilters.add(label);
      setLabelFilters(new Set(labelFilters));
      if (searchParams) setSearchParams({});
    },
    [labelFilters, setLabelFilters, setPage],
  );

  const handleStatusSelect = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setPage(1);
      setStatus(e.currentTarget.value as TStatus);
    },
    [setPage, setStatus],
  );

  useEffect(() => {
    const nextPage = page + 1;
    queryClient.prefetchQuery(['issues', { page: nextPage, labels: [...labelFilters], status }], () =>
      fetchIssues({ page: nextPage, labels: [...labelFilters], status }),
    );
  }, [queryClient, page, labelFilters, status]);

  return {
    data: {
      isPreviousData: issuesQuery.isPreviousData || searchedIssuesQuery.isPreviousData,
      labels,
      labelFilters,
      status,
      issues: result,
      userIDToUser,
      page,
      changePage,
      toggleLabelFilter,
      handleStatusSelect,
    },
    isLoadingIssues:
      (issuesQuery.fetchStatus !== 'idle' && issuesQuery.isLoading) ||
      (searchedIssuesQuery.fetchStatus !== 'idle' && searchedIssuesQuery.isLoading),
    isLoadingUsers: usersQuery.fetchStatus !== 'idle' && usersQuery.isLoading,
    isFetchingIssues: issuesQuery.isFetching || searchedIssuesQuery.isFetching,
    error: issuesQuery.error,
  };
};

// =============================================================================
// Main Component
// =============================================================================

const StatelessHome = React.memo((props: HomeProps) => {
  const { data, isLoadingIssues, isLoadingUsers, isFetchingIssues, error } = props;
  const isLoadingIssuesAndUsers = isLoadingIssues || isLoadingUsers;

  return (
    <>
      <CreateIssueButton>+</CreateIssueButton>
      <Header>
        <Row align="center" justify="space-between" margin="0 0 10px 0">
          <Row>
            <Title>Issues</Title>
            <StatusSelect status={data.status} handleChange={data.handleStatusSelect} />
          </Row>
          {!isLoadingIssuesAndUsers && isFetchingIssues && <Spinner />}
        </Row>
        <LabelList labels={data.labels} labelFilters={data.labelFilters} toggleLabelFilter={data.toggleLabelFilter} />
      </Header>
      <Body isLoading={isLoadingIssuesAndUsers}>
        {isLoadingIssuesAndUsers ? (
          <UnorderedList>
            {[1, 2, 3, 4].map((n) => (
              <li key={n}>
                <SkeletonLoader width="100%" height="100px" borderRadius="6px" backgroundColor="#FFF" />
              </li>
            ))}
          </UnorderedList>
        ) : error ? (
          <ErrorMessage>Failed to fetch issues</ErrorMessage>
        ) : data.issues.length > 0 ? (
          <IssueList issues={data.issues} userIDToUser={data.userIDToUser} />
        ) : (
          <div>No issues...</div>
        )}
      </Body>
      {!isLoadingIssuesAndUsers && (
        <Footer>
          <PaginationButton margin="0 25px 0 0" onClick={() => data.changePage('prev')} disabled={data.page === 1}>
            Previous
          </PaginationButton>
          <span>Page {data.page}</span>
          <PaginationButton
            margin="0 0 0 25px"
            onClick={() => data.changePage('next')}
            disabled={data.issues.length === 0 || data.isPreviousData}
          >
            Next
          </PaginationButton>
        </Footer>
      )}
    </>
  );
});

// =============================================================================
// Home
// =============================================================================

const Home = () => {
  const props = useHomeProps();
  return <StatelessHome {...props} />;
};

export default Home;
