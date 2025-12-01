// commentApi.js
import apiService from './apiService';

export const commentApi = {
  // Create new comment
  createComment: (data) => apiService.post('/api/v1/create-comment', data),
  
  // Delete comment
  deleteComment: (commentId) => apiService.delete(`/api/v1/delete-comment/${commentId}`),
  
  // Optional: Get comments by post ID (jika endpoint tersedia)
  getCommentsByPostId: (postId, params = {}) => 
    apiService.get(`/api/v1/comments-by-post/${postId}`, { params }),
  
  // Optional: Update comment (jika endpoint tersedia)
  updateComment: (commentId, data) => 
    apiService.put(`/api/v1/update-comment/${commentId}`, data),
};