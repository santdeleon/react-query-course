import { useQuery, useQueryClient } from 'react-query';

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
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: ['issues', 'labels[]=', args?.labels, 'status=', args?.status],
    async queryFn({ signal }) {
      const issues = await fetchIssues(args, { signal });
      for (const issue of issues) {
        queryClient.setQueryData(['issues', issue.number], issue);
      }
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
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: ['search', 'issues', 'q=', query],
    async queryFn({ signal }) {
      if (!query) return;
      const issuesByQuery = await fetchIssuesByQuery(query, { signal });
      for (const issue of issuesByQuery.items) {
        queryClient.setQueryData(['issues', issue.number], issue);
      }
      return issuesByQuery;
    },
    enabled: !!query && query.length > 0,
  });
};

// =============================================================================
// useIssue
// =============================================================================

const fetchIssue = async (issueId: number, opts?: RequestInit) => {
  const data: IIssue = await fetchWithError(`/api/issues/${issueId}`, opts);
  return data;
};

export const useIssue = (issueId?: number) => {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: ['issues', issueId],
    enabled: !!issueId,
    async queryFn({ signal }) {
      if (!issueId) throw new Error('You must provide an issue ID');
      const issue = await fetchIssue(issueId, { signal });
      return issue;
    },
    initialData() {
      const issue: IIssue | undefined = queryClient.getQueryData(['issues', issueId]);
      return issue;
    },
  });
};

// =============================================================================
// useIssueComments
// =============================================================================

export const fetchIssueComments = async (issueId: number, opts?: RequestInit) => {
  const data: IComment[] = await fetchWithError(`/api/issues/${issueId}/comments`, opts);
  return data;
};

export const useIssueComments = (issueId?: number) => {
  return useQuery({
    queryKey: ['issues', issueId, 'comments'],
    enabled: !!issueId,
    async queryFn({ signal }) {
      if (!issueId) throw new Error('You must provide an issue ID');
      const issue = await fetchIssueComments(issueId, { signal });
      return issue;
    },
  });
};
