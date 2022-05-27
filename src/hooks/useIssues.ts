import { useQuery, useQueryClient, useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';

import { TLabel, TStatus, IIssue, IComment } from '../types';

import { DEFAULT_USERS } from '../constants';

import { fetchWithError } from '../utils';

// =============================================================================
// useIssues
// =============================================================================

const ISSUES_PER_PAGE = 4;

interface FetchIssuesArgs {
  page: number;
  labels?: TLabel[];
  status?: TStatus | 'default';
}

export const fetchIssues = async (args: FetchIssuesArgs, opts?: RequestInit) => {
  const labels = args.labels;
  const hasLabels = labels && labels.length > 0;
  const status = args?.status;
  let url = `/api/issues?limit=${ISSUES_PER_PAGE}&page=${args.page}`;

  // apply label filters
  if (hasLabels) {
    const labelString = labels.map((l) => `labels[]=${l}`).join('&');
    url += `&${labelString}`;
  }

  // apply status filter
  if (status && status !== 'default') {
    const statusString = `&status=${status}`;
    url += statusString;
  }

  console.log(url);

  const data: IIssue[] = await fetchWithError(url, opts);
  return data;
};

const useIssues = (args: FetchIssuesArgs) => {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: ['issues', args],
    async queryFn({ signal }) {
      const issues = await fetchIssues(args, { signal });
      for (const issue of issues) {
        queryClient.setQueryData(['issues', issue.number], issue);
      }
      return issues;
    },
    keepPreviousData: true,
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
    queryKey: ['search', 'issues', query],
    async queryFn({ signal }) {
      if (!query) return;
      const issuesByQuery = await fetchIssuesByQuery(query, { signal });
      for (const issue of issuesByQuery.items) {
        queryClient.setQueryData(['issues', issue.number], issue);
      }
      return issuesByQuery;
    },
    enabled: !!query && query.length > 0,
    keepPreviousData: true,
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

// =============================================================================
// useCreateIssue
// =============================================================================

interface CreateIssueArgs {
  title: string;
  comment: string;
}

const createIssue = async (args: CreateIssueArgs) => {
  const res = await fetch('/api/issues', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(args),
  });
  const data = res.json();
  return data;
};

// leaving this as is to avoid wasting time on a non-production app lol
const isIssue = (x: any): x is IIssue => true;

export const useCreateIssue = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation((args: CreateIssueArgs) => createIssue(args), {
    onMutate(variables) {
      const [defaultUser] = DEFAULT_USERS;

      const newIssue: IIssue = {
        assignee: defaultUser.id,
        comments: [variables.comment],
        completedDate: null,
        createdBy: defaultUser.id,
        createdDate: new Date(),
        dueDate: new Date(),
        id: Math.random().toString(),
        labels: [],
        number: 1001,
        status: 'backlog',
        title: variables.title,
      };

      queryClient.setQueryData(['issues'], (state: unknown) => {
        if (!Array.isArray(state) || !state.every(isIssue)) return;
        return [newIssue, ...state];
      });

      return () => {
        queryClient.setQueryData(['issues'], (state: any) => {
          if (!Array.isArray(state) || !state.every(isIssue)) return;
          state.filter((issue: IIssue) => issue.id !== newIssue.id);
        });
      };
    },
    onError(error: Error, variables, rollback: any) {
      rollback();
    },
    onSuccess(issue: IIssue) {
      queryClient.invalidateQueries(['issues']);
      queryClient.setQueryData(['issues', issue.number], issue);
      navigate(`/issue/${issue.number}`);
    },
  });
};

// =============================================================================
// useUpdateIssue
// =============================================================================

export interface UpdateIssueArgs {
  issueId: number;
  assignee?: string;
  status?: TStatus;
  labels?: TLabel[];
}

const updateIssue = async (args: UpdateIssueArgs) => {
  let newData = {} as Exclude<UpdateIssueArgs, 'issueId'>;
  if (args.status) newData.status = args.status;
  if (args.labels) newData.labels = args.labels;
  if (args.assignee) newData.assignee = args.assignee;

  const res = await fetch(`/api/issues/${args.issueId}`, {
    method: 'PUT',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(newData),
  });
  const data = res.json();
  return data;
};

export const useUpdateIssue = () => {
  const queryClient = useQueryClient();

  return useMutation((args: UpdateIssueArgs) => updateIssue(args), {
    onMutate(variables) {
      const savedData = queryClient.getQueryData(['issues', variables.issueId]);

      queryClient.setQueryData(['issues', variables.issueId], (state: unknown) => {
        if (!isIssue(state)) return;
        let newIssue = { ...state } as IIssue;
        if (variables.status) newIssue.status = variables.status;
        if (variables.labels) newIssue.labels = variables.labels;
        if (variables.assignee) newIssue.assignee = variables.assignee;
        return newIssue;
      });

      return () => {
        queryClient.setQueryData(['issues', variables.issueId], savedData);
      };
    },
    onError(error: Error, variables, rollback: any) {
      rollback();
    },
    onSettled(variables) {
      queryClient.invalidateQueries(['issues', variables.issueId], { exact: true });
    },
  });
};
