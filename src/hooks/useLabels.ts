import { useQueryClient, useQuery, useMutation } from 'react-query';

import { ILabel } from '../types';

import { fetchWithError } from '../utils';

import { DEFAULT_LABELS } from '../constants';

// =============================================================================
// useLabels
// =============================================================================

const fetchLabels = async () => {
  const data: ILabel[] = await fetchWithError('/api/labels');
  return data;
};

const useLabels = () => {
  return useQuery({
    queryKey: ['labels'],
    async queryFn() {
      const labels = await fetchLabels();
      return labels;
    },
    placeholderData: DEFAULT_LABELS,
    staleTime: Infinity,
  });
};

export default useLabels;

// =============================================================================
// useMutateIssueLabels
// =============================================================================

interface UseMutateIssueLabelsArgs {
  issueId: number;
  labels: ILabel[];
}

const updateLabels = async (args: UseMutateIssueLabelsArgs) => {
  const res = await fetch('/api/labels', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({ ...args }),
  });
  const data = res.json();
  return data;
};

export const useMutateIssueLabels = (args: UseMutateIssueLabelsArgs) => {
  const queryClient = useQueryClient();
  return useMutation(() => updateLabels(args), {
    onSuccess(data) {
      queryClient.setQueryData(['issues', args.issueId], data);
    },
    onSettled() {
      queryClient.invalidateQueries(['issues', args.issueId], { exact: true });
    },
  });
};
