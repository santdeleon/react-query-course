import { useQuery } from 'react-query';

import { TLabel, TStatus, IIssue, IComment } from '../types';

const BASE_ISSUES_URL = '/api/issues';

// =============================================================================
// useIssues
// =============================================================================

const QUERY_KEY_ISSUES = 'issues';

interface FetchIssuesOpts {
  labels?: TLabel[];
  status?: TStatus | 'default';
}

const fetchIssues = async (opts?: FetchIssuesOpts) => {
  const labels = opts?.labels;
  const hasLabels = labels && labels.length > 0;
  const status = opts?.status;
  let url = `${BASE_ISSUES_URL}?`;

  // apply label filters
  if (hasLabels) {
    const labelString = labels.map((l) => `labels[]=${l}`).join('&');
    url += `${labelString}`;
  }

  // apply status filter
  if (status && status !== 'default') {
    const statusString = `${hasLabels ? '&' : ''}status=${status}`;
    url += statusString;
  }

  const res = await fetch(url);
  const data: IIssue[] = await res.json();
  return data;
};

const useIssues = (opts?: FetchIssuesOpts) => {
  return useQuery({
    queryKey: [QUERY_KEY_ISSUES, { opts }],
    async queryFn() {
      const issues = await fetchIssues(opts);
      return issues;
    },
  });
};

export default useIssues;

// =============================================================================
// useIssuesByQuery
// =============================================================================

const QUERY_KEY_ISSUES_QUERY = 'issues-by-query';

interface IssuesByQueryResponse {
  count: number;
  items: IIssue[];
}

const fetchIssuesByQuery = async (query: string) => {
  const res = await fetch(`/api/search/issues?q=${query}`);
  const data: IssuesByQueryResponse = await res.json();
  return data;
};

export const useIssuesByQuery = (query: string | null) => {
  return useQuery({
    queryKey: [QUERY_KEY_ISSUES_QUERY, { query }],
    async queryFn() {
      if (!query) return;
      const issuesByQuery = await fetchIssuesByQuery(query);
      return issuesByQuery;
    },
    enabled: !!query,
  });
};

// =============================================================================
// useIssueAndComments
// =============================================================================

const QUERY_KEY_ISSUE_AND_COMMENTS = 'issue-and-comments';

const fetchIssue = async (issueId: string) => {
  const res = await fetch(`${BASE_ISSUES_URL}/${issueId}`);
  const data: IIssue = await res.json();
  return data;
};

const fetchIssueComments = async (issueId: string) => {
  const res = await fetch(`${BASE_ISSUES_URL}/${issueId}/comments`);
  const data: IComment[] = await res.json();
  return data;
};

const fetchIssueAndComments = async (issueId: string) => {
  const issueAndComments = await Promise.all([fetchIssue(issueId), fetchIssueComments(issueId)]);
  return issueAndComments;
};

export const useIssueAndComments = (issueId?: string) => {
  return useQuery({
    queryKey: [QUERY_KEY_ISSUE_AND_COMMENTS, { issueId }],
    async queryFn() {
      if (!issueId) throw new Error('You must provide an issue ID');
      const issueAndComments = await fetchIssueAndComments(issueId);
      return issueAndComments;
    },
    enabled: !!issueId,
  });
};
