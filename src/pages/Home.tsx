import React, { useState, useCallback, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import Fuse from 'fuse.js';

import { TLabel, TStatus, IIssue } from '../types';

import { useIssues } from '../hooks';

import IssueList from '../components/IssueList';
import Row from '../components/Row';
import Column from '../components/Column';
import LabelList from '../components/LabelList';
import StatusSelect from '../components/StatusSelect';

// =============================================================================
// Styled Components
// =============================================================================

const Island = styled.div`
  position: relative;
  margin: 0 auto;
  padding: 20px;
  border-radius: 16px;
  border-width: 2px 2px 4px;
  border-style: solid;
  border-color: #e8e8e8;
  max-width: 600px;
`;

const IslandHeader = styled(Row).attrs({
  align: 'flex-start',
  margin: '0 0 20px 0',
  padding: '0 0 20px 0',
})`
  border-bottom: 2px solid #e8e8e8;
`;

const IslandBody = styled(Column).attrs({
  align: 'center',
})``;

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

const Title = styled.h2`
  margin: 0 15px 0 0;
`;

// =============================================================================
// Typedefs
// =============================================================================

type LabelFilters = Set<TLabel>;

type StatusFilter = TStatus | 'default';

interface HomeProps {
  data: {
    issues: IIssue[];
    labelFilters: LabelFilters;
    status: StatusFilter;
    toggleLabelFilter: (label: TLabel) => void;
    handleStatusSelect: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  };
  loading: boolean;
  error: unknown;
}

// =============================================================================
// Hooks
// =============================================================================

const useHomeProps = () => {
  // check for a search query
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search');

  // setup filters
  const [labelFilters, setLabelFilters] = useState<LabelFilters>(new Set());
  const [status, setStatus] = useState<StatusFilter>('default');

  // fetch issues
  const issuesQuery = useIssues();
  const issues = issuesQuery.data ?? [];

  // filter issues
  const fuse = new Fuse(issues, {
    keys: [
      {
        name: 'title',
        weight: 0.5,
      },
      {
        name: 'labels',
        weight: 0.3,
      },
      {
        name: 'status',
        weight: 0.2,
      },
    ],
  });

  const result = searchQuery ? fuse.search(searchQuery).map((issue) => issue.item) : issues;
  const resultByStatus = useMemo(
    () => (status !== 'default' ? result.filter((item) => item.status === status) : result),
    [result, status],
  );
  const finalResult = useMemo(() => {
    const hasNoLabelFilters = labelFilters.size === 0;
    return hasNoLabelFilters
      ? resultByStatus
      : resultByStatus.filter((item) => {
          let hasLabel = false;

          for (const label of item.labels) {
            if (labelFilters.has(label as TLabel)) {
              hasLabel = true;
              break;
            }
          }

          return hasLabel;
        });
  }, [resultByStatus, labelFilters]);

  const toggleLabelFilter = useCallback(
    (label: TLabel) => {
      labelFilters.has(label) ? labelFilters.delete(label) : labelFilters.add(label);
      setLabelFilters(new Set(labelFilters));
    },
    [labelFilters, setLabelFilters],
  );

  const handleStatusSelect = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => setStatus(e.currentTarget.value as TStatus),
    [setStatus],
  );

  return {
    data: {
      issues: finalResult,
      labelFilters,
      status,
      toggleLabelFilter,
      handleStatusSelect,
    },
    loading: !issuesQuery.isFetched,
    error: issuesQuery.error,
  };
};

// =============================================================================
// Main Component
// =============================================================================

const StatelessHome = React.memo((props: HomeProps) => (
  <Island>
    <CreateIssueButton>+</CreateIssueButton>
    <IslandHeader>
      <Column>
        <Row align="center" margin="0 0 10px 0">
          <Title>Issues</Title>
          <StatusSelect status={props.data.status} handleChange={props.data.handleStatusSelect} />
        </Row>
        <LabelList labelFilters={props.data.labelFilters} toggleLabelFilter={props.data.toggleLabelFilter} />
      </Column>
    </IslandHeader>
    <IslandBody>
      <Row width="100%" align="center" justify="center" margin="0 0 20px 0">
        <PaginationButton margin="0 50px 0 0">Previous</PaginationButton> Page 1
        <PaginationButton margin="0 0 0 50px">Next</PaginationButton>
      </Row>
      <IssueList data={props.data.issues} loading={props.loading} error={props.error} />
    </IslandBody>
  </Island>
));

// =============================================================================
// Home
// =============================================================================

const Home = () => {
  const props = useHomeProps();
  return <StatelessHome {...props} />;
};

export default Home;