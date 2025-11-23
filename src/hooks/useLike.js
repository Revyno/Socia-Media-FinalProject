import { useState } from 'react';
import { likeApi } from '../api/likeApi';

export function useLike() {
  const [isLiking, setIsLiking] = useState(false);

  const handleLike = async (postId, isLiked) => {
    setIsLiking(true);
    try {
      if (isLiked) {
        await likeApi.unlikePost(postId);
      } else {
        await likeApi.likePost(postId);
      }
      return true;
    } catch (err) {
      console.error('Error toggling like:', err);
      return false;
    } finally {
      setIsLiking(false);
    }
  };

  return { handleLike, isLiking };
}