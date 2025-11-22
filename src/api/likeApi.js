import apiService from './apiService';

export const likeApi = {
  likePost: (postId) => apiService.post(`/api/v1/like/${postId}`),
  unlikePost: (postId) => apiService.post(`/api/v1/unlike/${postId}`),
};