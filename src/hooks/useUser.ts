import { useQuery } from 'react-query';

import { IUser } from '../types';

const BASE_USER_URL = '/api/users';

// =============================================================================
// useUser
// =============================================================================

const fetchUser = async (userId: string) => {
  const res = await fetch(`${BASE_USER_URL}/${userId}`);
  const data: IUser = await res.json();
  return data;
};

const QUERY_KEY_USER = 'user';

const useUser = (userId?: string) => {
  return useQuery({
    queryKey: [QUERY_KEY_USER, { userId }],
    async queryFn() {
      if (!userId) throw new Error('You must provide a user ID');
      const user = await fetchUser(userId);
      return user;
    },
    enabled: !!userId,
  });
};

export default useUser;

// =============================================================================
// useMultipleUsers
// =============================================================================

export const fetchMultipleUsers = async (userIds: string[]) => {
  const users = await Promise.all(
    // filter null ids
    userIds.filter(Boolean).map(async (userId) => fetchUser(userId)),
  );
  return users;
};

const QUERY_KEY_MULTIPLE_USERS = 'multiple-users';

export const useMultipleUsers = (userIds?: string[]) => {
  return useQuery({
    queryKey: [QUERY_KEY_MULTIPLE_USERS, { userIds }],
    async queryFn() {
      if (!userIds) throw new Error('You must provide user IDs');
      const users = await fetchMultipleUsers(userIds);
      return users;
    },
    enabled: !!userIds,
  });
};
