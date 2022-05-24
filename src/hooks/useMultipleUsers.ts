import { useQuery } from 'react-query';

import { IUser } from '../types';

const fetchMultipleUsers = async (userIds: string[]) => {
  const users = Promise.all(
    // filter null ids
    userIds.filter(Boolean).map(async (userId) => {
      const res = await fetch(`api/users/${userId}`);
      const data: IUser = await res.json();
      return data;
    }),
  );
  return users;
};

const QUERY_KEY_MULTIPLE_USERS = 'multiple-users';

const useMultipleUsers = (userIds: string[]) => {
  return useQuery({
    queryKey: [QUERY_KEY_MULTIPLE_USERS, { userIds }],
    async queryFn() {
      const users = await fetchMultipleUsers(userIds);
      return users;
    },
    enabled: !!userIds,
  });
};

export default useMultipleUsers;
