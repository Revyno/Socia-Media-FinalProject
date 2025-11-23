import { useState } from 'react';
import { followApi } from '../api/followApi';

export function useFollow() {
  const [isLoading, setIsLoading] = useState(false);

  const handleFollow = async (userId, isFollowing) => {
    setIsLoading(true);
    try {
      if (isFollowing) {
        await followApi.unfollowUser(userId);
      } else {
        await followApi.followUser(userId);
      }
      return true;
    } catch (err) {
      console.error('Error toggling follow:', err);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { handleFollow, isLoading };
}