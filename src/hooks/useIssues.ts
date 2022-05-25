import { useQuery } from 'react-query';

import { TLabel, TStatus, IIssue, IComment } from '../types';

import { fetchWithError } from '../utils';

// =============================================================================
// useIssues
// =============================================================================

interface FetchIssuesArgs {
  labels?: TLabel[];
  status?: TStatus | 'default';
}

const fetchIssues = async (args?: FetchIssuesArgs, opts?: RequestInit) => {
  const labels = args?.labels;
  const hasLabels = labels && labels.length > 0;
  const status = args?.status;
  let url = '/api/issues?';

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

  const data: IIssue[] = await fetchWithError(url, opts);
  return data;
};

const useIssues = (args?: FetchIssuesArgs) => {
  return useQuery({
    queryKey: ['issues', 'labels[]=', args?.labels, 'status=', args?.status],
    async queryFn({ signal }) {
      const issues = await fetchIssues(args, { signal });
      return issues;
    },
  });
};

export default useIssues;

// =============================================================================
// useIssuesByQuery
// =============================================================================

interface IssuesByQueryResponse {
  count: number;
  items: IIssue[];
}

const fetchIssuesByQuery = async (query: string, opts?: RequestInit) => {
  const data: IssuesByQueryResponse = await fetchWithError(`/api/search/issues?q=${query}`, opts);
  return data;
};

export const useIssuesByQuery = (query: string | null) => {
  return useQuery({
    queryKey: ['search', 'issues', 'q=', query],
    async queryFn({ signal }) {
      if (!query) return;
      const issuesByQuery = await fetchIssuesByQuery(query, { signal });
      return issuesByQuery;
    },
    enabled: !!query && query.length > 0,
  });
};

// =============================================================================
// useIssueAndComments
// =============================================================================

const fetchIssue = async (issueId: string, opts?: RequestInit) => {
  const data: IIssue = await fetchWithError(`/api/issues/${issueId}`, opts);
  return data;
};

const fetchIssueComments = async (issueId: string, opts?: RequestInit) => {
  const data: IComment[] = await fetchWithError(`/api/issues/${issueId}/comments`, opts);
  return data;
};

const fetchIssueAndComments = async (issueId: string, opts?: RequestInit) => {
  const issueAndComments = await Promise.all([fetchIssue(issueId, opts), fetchIssueComments(issueId, opts)]);
  return issueAndComments;
};

export const useIssueAndComments = (issueId?: string) => {
  return useQuery({
    queryKey: ['issues', issueId, 'comments'],
    async queryFn({ signal }) {
      if (!issueId) throw new Error('You must provide an issue ID');
      const issueAndComments = await fetchIssueAndComments(issueId, { signal });
      return issueAndComments;
    },
    enabled: !!issueId,
  });
};
