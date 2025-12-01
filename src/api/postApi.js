// postApi.js - PERBAIKI DENGAN ENDPOINT YANG BENAR
import apiService from './apiService';

export const postApi = {
  
  getExplorePosts: (params) => apiService.get('/api/v1/explore-post', { params }),
  
  getPostsByUserId: (userId, params) => apiService.get(`/api/v1/users-post/${userId}`, { params }),
  

  getMyPosts: (params) => apiService.get('/api/v1/following-post', { params }),
  
 
  
  getPostById: (postId) => apiService.get(`/api/v1/post/${postId}`),
  

  createPost: (data) => apiService.post('/api/v1/create-post', data),


  updatePost: (postId, data) => apiService.post(`/api/v1/update-post/${postId}`, data),

  deletePost: (postId) => apiService.delete(`/api/v1/delete-post/${postId}`),
};