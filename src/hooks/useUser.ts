import { useQuery } from 'react-query';

import { IUser } from '../types';

const fetchUser = async (userId: string) => {
  const res = await fetch(`api/users/${userId}`);
  const data: IUser = await res.json();
  return data;
};

const QUERY_KEY_USER = 'user';

const useUser = (userId: string) => {
  return useQuery({
    queryKey: [QUERY_KEY_USER, { userId }],
    async queryFn() {
      const user = await fetchUser(userId);
      return user;
    },
    enabled: !!userId,
  });
};

export default useUser;
