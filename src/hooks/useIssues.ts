import { useQuery } from 'react-query';
import { TLabel, TStatus, IIssue } from '../types';

const BASE_ISSUES_URL = '/api/issues?';

interface FetchIssuesOpts {
  labels?: TLabel[];
  status?: TStatus | 'default';
}

const fetchIssues = async (opts?: FetchIssuesOpts) => {
  const labels = opts?.labels;
  const hasLabels = labels && labels.length > 0;
  const status = opts?.status;
  let url = BASE_ISSUES_URL;

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

  // console.log(url);

  const res = await fetch(url);
  const data: IIssue[] = await res.json();
  return data;
};

const QUERY_KEY_ISSUES = 'issues';

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
