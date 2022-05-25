import { useQuery } from 'react-query';

import { IUser } from '../types';

import { fetchWithError } from '../utils';

// =============================================================================
// useUser
// =============================================================================

const fetchUser = async (userId: string, opts?: RequestInit) => {
  const data: IUser = await fetchWithError(`${'/api/users'}/${userId}`, opts);
  return data;
};

const useUser = (userId?: string) => {
  return useQuery({
    queryKey: ['users', userId],
    async queryFn({ signal }) {
      if (!userId) throw new Error('You must provide a user ID');
      const user = await fetchUser(userId, { signal });
      return user;
    },
    enabled: !!userId,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export default useUser;

// =============================================================================
// useMultipleUsers
// =============================================================================

export const fetchMultipleUsers = async (userIds: string[], opts?: RequestInit) => {
  const users = await Promise.all(userIds.map(async (userId) => fetchUser(userId, opts)));
  return users;
};

export const useMultipleUsers = (userIds?: string[]) => {
  return useQuery({
    queryKey: ['users', userIds],
    async queryFn({ signal }) {
      if (!userIds) throw new Error('You must provide user IDs');
      const users = await fetchMultipleUsers(userIds, { signal });
      return users;
    },
    enabled: !!userIds,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
