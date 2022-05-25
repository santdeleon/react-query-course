import { useQuery } from 'react-query';

import { ILabel } from '../types';

import { fetchWithError } from '../utils';

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
    staleTime: Infinity,
  });
};

export default useLabels;
