
import apiService from './apiService';

export const likeApi = {
  // Like a post
  likePost: (postId) => apiService.post('/api/v1/like', { postId }),
  
  // Unlike a post
  unlikePost: (postId) => apiService.post('/api/v1/unlike', { postId }),
  
  // Toggle like (convenience method)
  toggleLike: async (postId, isCurrentlyLiked) => {
    if (isCurrentlyLiked) {
      return apiService.post('/api/v1/unlike', { postId });
    } else {
      return apiService.post('/api/v1/like', { postId });
    }
  },
  
  // Get likes for a post
  getLikes: (postId) => apiService.get(`/api/v1/posts/${postId}/likes`),
  
  // Check if current user liked a post
  checkLike: (postId) => apiService.get(`/api/v1/posts/${postId}/like-status`),
};