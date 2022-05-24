import { useQuery } from 'react-query';
import { ILabel } from '../types';

const BASE_LABELS_URL = '/api/labels';

// =============================================================================
// useLabels
// =============================================================================

const fetchLabels = async () => {
  const res = await fetch(BASE_LABELS_URL);
  const data: ILabel[] = await res.json();
  return data;
};

const QUERY_KEY_LABELS = 'labels';

const useLabels = () => {
  return useQuery({
    queryKey: [QUERY_KEY_LABELS],
    async queryFn() {
      const labels = await fetchLabels();
      return labels;
    },
  });
};

export default useLabels;
