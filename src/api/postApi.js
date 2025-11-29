import apiService from './apiService';

export const postApi = {
 
  getExplorePosts: (params) => apiService.get('/api/v1/explore-post', { params }),
  
 
  getMyPosts: (params) => apiService.get('/api/v1/following-post', { params }),

  getPostsByUserId: (userId, params) => apiService.get(`/api/v1/users-post/${userId}`, { params }),
  
  
  getPostById: (id) => apiService.get(`/api/v1/post/${id}`),
  
  
  createPost: (data) => apiService.post('/api/v1/create-post', data),

  updatePost: (id, data) => apiService.post(`/api/v1/update-post/${id}`, data),
  

  deletePost: (id) => apiService.delete(`/api/v1/delete-post/${id}`),
};