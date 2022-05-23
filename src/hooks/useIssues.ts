import { useQuery } from 'react-query';
import { IIssue } from '../types';

const fetchIssues = async () => {
  const res = await fetch('/api/issues');
  const data: IIssue[] = await res.json();
  return data;
};

const ISSUES_QUERY_KEY = 'issues';

const useIssues = () => {
  return useQuery({
    queryKey: [ISSUES_QUERY_KEY],
    async queryFn() {
      const issues = await fetchIssues();
      return issues;
    },
  });
};

export default useIssues;
